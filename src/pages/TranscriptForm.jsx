import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import { useTranslation } from "react-i18next";

import MarksTable from "../components/MarksTable";
import { calculateGPA } from "../utils/gpa";
import { toTitleCase } from "../utils/textUtils";

export default function TranscriptForm() {
  const previewRef = useRef(null);
  const [qrImage, setQrImage] = useState("");
  //language translate
  const { t } = useTranslation();
  //QR generate
  const generateQR = async () => {
  const qrData = JSON.stringify({
    studentID: student.studentID,
    name: student.studentName,
    institute: institute.name,
    session: exam.session,
  });

  const url = await QRCode.toDataURL(qrData);
  setQrImage(url);
};



  /* ================= INSTITUTE ================= */
  const [institute, setInstitute] = useState({
    name: "",
    examTitle: "",
    address: "",
    transcript: "",
    logo: "",
     authorityTitle: "Headmaster", // default
  });
  /*Browser auto save storage */
    useEffect(() => {
    const saved = localStorage.getItem("instituteInfo");
    if (saved) {
      setInstitute(JSON.parse(saved));
    }
  }, []);

  /* ================= STUDENT ================= */
  const [student, setStudent] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    studentID: "",
    photo: "",
  });

  /* ================= EXAM ================= */
  const [exam, setExam] = useState({
    session: "",
    group: "",
    class : "",
    
  });

  /* ================= SUBJECTS ================= */
  const [subjects, setSubjects] = useState([
    { code: "", name: "", cq: 0, mcq: 0, pr: 0, is4th: false },
  ]);

  const handleSubjectChange = (i, field, value) => {
    const updated = [...subjects];
    updated[i][field] = value;
    setSubjects(updated);
  };

  const addSubject = () =>
    setSubjects([...subjects, { code: "", subject: "", cq: 0, mcq: 0, pr: 0 }]);

  const removeSubject = (i) =>
    setSubjects(subjects.filter((_, index) => index !== i));
  // 🔹 Generic text handler (Title Case)
const handleText = (setter, field) => (e) => {
  setter((prev) => ({
    ...prev,
    [field]: toTitleCase(e.target.value),
  }));
};

// 🔹 Institute handler + localStorage save
const handleInstitute = (field) => (e) => {
  const updated = {
    ...institute,
    [field]: toTitleCase(e.target.value),
  };
  setInstitute(updated);
  localStorage.setItem("instituteInfo", JSON.stringify(updated));
};
// Subject handler upperCase
const handleSubjectText = (index, field, value) => {
  setSubjects((prev) =>
    prev.map((sub, i) =>
      i === index
        ? { ...sub, [field]: toTitleCase(value) }
        : sub
    )
  );
};



  /* ================= PDF DOWNLOAD ================= */
  const downloadPDF = async () => {
    await generateQR();
    const element = previewRef.current;
    if (!element) return;
    //pdf name function
    const makeFileName = () => {
  const name = student.studentName
    ? student.studentName.replace(/\s+/g, "_")
    : "Student";

  const id = student.studentID || "ID";
  const session = exam.session || "Session";

  return `${name}_${id}_${session}_Transcript.pdf`;
};


    // wait for images
    const images = element.querySelectorAll("img");
    await Promise.all(
      [...images].map(
        (img) =>
          new Promise((res) => {
            if (img.complete) res();
            else img.onload = res;
          })
      )
    );

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const w = pdf.internal.pageSize.getWidth();
    const h = (canvas.height * w) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, w, h);
    pdf.save(makeFileName());

  };

  /* ================= QR DATA ================= */
  const qrValue = JSON.stringify({
    studentID: student.studentID,
    name: student.studentName,
    institute: institute.name,
    session: exam.session,
  });

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold text-center">
        📝 {t("Academic Transcript Generator")}
      </h1>

      {/* ================= FORM (TAILWIND ONLY) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       <select
        className="border rounded-xl p-2"
        value={institute.authorityTitle}
        onChange={(e) =>
          setInstitute({ ...institute, authorityTitle: e.target.value })
        }
      >
        <option value="headmaster">{t("authority.headmaster")}</option>
        <option value="principal">{t("authority.principal")}</option>
        <option value="superintendent">{t("authority.superintendent")}</option>
        <option value="chairman">{t("authority.chairman")}</option>
        <option value="inCharge">{t("authority.inCharge")}</option>
      </select>



        <input
          placeholder={t("instituteName")}
          className="input border rounded-xl p-2"
          value={institute.name}
           onChange={handleInstitute("name")}
        />

         <input
            placeholder={t("examTitle")}
            className="input border rounded-xl p-2"
            value={institute.examTitle}
            onChange={handleInstitute("examTitle")}
          />

         <input
          placeholder={t("address")}
          className="input border rounded-xl p-2"
          value={institute.address}
          onChange={handleInstitute("address")}
        />
              <input
                placeholder={t("transcriptName")}
                className="input border rounded-xl p-2"
                value={institute.transcript}
               onChange={handleInstitute("transcript")}
              />

        {/* LOGO */}
        
        
          <div className="flex gap-2">
               <label  >School logo:</label>
              <input
                type="file"
                 className="border-2 border-amber-900  rounded-2xl w-32 p-0.5"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  const reader = new FileReader();
                  reader.onload = () => {
                    const updated = { ...institute, logo: reader.result };
                    setInstitute(updated);
                    localStorage.setItem("instituteInfo", JSON.stringify(updated));
                  };
                  reader.readAsDataURL(file);
                }}
              />

          </div>
          

        {/* STUDENT PHOTO */}
       
           <div className="flex gap-2">
              <label >Student photo:</label>
            <input
              type="file"
              className="border-2 border-amber-900  rounded-2xl w-32 p-2"          
              accept="image/*"
              onChange={(e) => {
                const r = new FileReader();
                r.onload = () =>
                  setStudent({ ...student, photo: r.result });
                r.readAsDataURL(e.target.files[0]);
              }}
            />
           </div>
        
      </div>
       
     

      {/* STUDENT INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input placeholder={t("studentName")} className="border rounded-xl p-2"
          onChange={handleText(setStudent, "studentName")}/>
        <input placeholder={t("fatherName")} className="border rounded-xl p-2"
          onChange={handleText(setStudent, "fatherName")}/>
        <input placeholder={t("motherName")} className="border rounded-xl p-2"
          onChange={handleText(setStudent, "motherName")}/>
          <input placeholder={t("class")} className="border rounded-xl p-2"
          onChange={handleText(setExam, "class")}/>
        <input
            placeholder={t("studentID")}
            className="border rounded-xl p-2"
            value={student.studentID}
            onChange={(e) =>
              setStudent({ ...student, studentID: e.target.value })
            }
          />

        <input placeholder={t("session")} className="border rounded-xl p-2"
          onChange={handleText(setExam, "session")}/>
        <input placeholder={t("group")} className="border rounded-xl p-2"
          onChange={handleText(setExam, "group")}/>
      </div>

      {/* SUBJECTS */}
     {subjects.map((s, i) => (
      <div key={i} className="grid grid-cols-1 md:grid-cols-7 gap-1 items-center">
        <input
          placeholder={t("code")}
          className="border p-1"
          onChange={(e) => handleSubjectChange(i, "code", e.target.value)}
        />

        <input
            placeholder={t("subject")}
            className="border p-1"
            value={subjects[i].name}
            onChange={(e) =>
              handleSubjectText(i, "name", e.target.value)
            }
          />


        <input
          type="number"
          placeholder={t("cq")}
          className="border p-1"
          onChange={(e) => handleSubjectChange(i, "cq", e.target.value)}
        />

        <input
          type="number"
          placeholder={t("mcq")}
          className="border p-1"
          onChange={(e) => handleSubjectChange(i, "mcq", e.target.value)}
        />

        <input
          type="number"
          placeholder={t("pr")}
          className="border p-1"
          onChange={(e) => handleSubjectChange(i, "pr", e.target.value)}
        />

        {/* ✅ 4th Subject checkbox (FORM ONLY) */}
        <label style={{ fontSize: "12px", textAlign: "center" }}>
          <input
            type="checkbox"
            checked={s.is4th}
            onChange={(e) =>
              handleSubjectChange(i, "is4th", e.target.checked)
            }
          />{" "}
          4th
        </label>

        <button
          onClick={() => removeSubject(i)}
          className="bg-gray-900 text-white rounded px-2 py-1.5 cursor-pointer"
        >
          ❌
        </button>
      </div>
    ))}

      <button onClick={addSubject} className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
        ➕ Add Subject
      </button>

      {/* ================= PDF PREVIEW (PURE CSS) ================= */}
          <div
            ref={previewRef}
            style={{
              position: "relative", // ⭐ খুব গুরুত্বপূর্ণ
              background: "#ffffff",
              color: "#000",
              fontFamily: "Times New Roman, serif",
              fontSize: "14px",
              padding: "20px",
              border: "1px solid #000",
            }}
          >
      {institute.logo && (
        <img
           src={institute.logo}
            alt="watermark"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "80%",      // পুরো 100% না
              maxWidth: "500px", // A4 friendly
              opacity: 0.07,
              transform: "translate(-50%, -50%)",
              zIndex: 0,
              pointerEvents: "none",
          }}
        />
      )}
                <div style={{ position: "relative", zIndex: 1 }}>
                  {/* real content */}
                </div>

        {/* HEADER */}
        <div style={{ display:"flex", justifyContent: "center",  gap:"5px" }}>
          {institute.logo && (
            <img src={institute.logo} style={{ width:"60px",height:"60px", textAlign:"center", }} />
          )}
            <div style={{  marginBottom: "6px" }}>
              <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
                {institute.name}
              </h2>

              <p style={{ textAlign:"center", }}>{institute.address}</p>

              <p style={{ marginTop: "5px", fontWeight: "bold" ,textAlign:"center",}}>
                {institute.examTitle}
              </p>
                <h2 style={{ textAlign:"center", marginTop:"90px",fontSize: "28px", fontWeight: "bold" }}>
                 {institute.transcript}
              </h2>
            </div>
          

        </div>

        

        {/* STUDENT PHOTO */}
        {student.photo && (
          <img src={student.photo}
            style={{ width:"90px", marginBottom: "28px", border:"1px solid #000" }} />
        )}

        <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
            }}
          >
        <tbody style={{padding:"4px"}} >
          <tr>
            <td><b>Name</b></td>
            <td>: {student.studentName}</td>
            <td><b>Class</b></td>
            <td>: {exam.class}</td>
            <td><b>Student ID/Roll</b></td>
            <td>: {student.studentID}</td>
          </tr>
          <tr>
            <td><b>Father</b></td>
            <td>: {student.fatherName}</td>
            <td><b>Session</b></td>
            <td>: {exam.session}</td>
          </tr>
          <tr>
            <td><b>Mother</b></td>
            <td>: {student.motherName}</td>
            <td><b>Group</b></td>
            <td>: {exam.group}</td>
          </tr>
        </tbody>
      </table>


        <MarksTable subjects={subjects} />
       
        <div style={{ marginTop: "20px", textAlign: "right" }}>
              <p>
                <b>GPA (Without 4th Subject):</b>{" "}
                {calculateGPA(subjects, false)}
              </p>
              <p>
                <b>GPA (With 4th Subject):</b>{" "}
                {calculateGPA(subjects, true)}
              </p>
       </div>


        {/* QR */}
                  {qrImage && ( 
                      <img
                        src={qrImage}
                        alt="QR Verification"
                        style={{ width: "90px", marginTop: "10px" }}
                      />
                    )}
         <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
            {/* Class Teacher */}
            <div>
              _______________________<br />
              {t("authority.classTeacher")}
            </div>

           {/* Authority (Dynamic) */}
            <div style={{ textAlign: "right" }}>
              _______________________<br />
              {institute.authorityTitle &&
                t(`authority.${institute.authorityTitle}`)}
            </div>

         </div>




      </div>

      <button
        onClick={downloadPDF}
        className="bg-emerald-700 text-white py-3 rounded-xl w-full"
      >
        📥 Download PDF
      </button>
    </div>
  );
} 