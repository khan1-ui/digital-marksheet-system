import React from "react";
import { calculateGrade } from "../utils/gradeUtils";
import { useTranslation } from "react-i18next";
import { toTitleCase } from "../utils/textUtils";

export default function MarksTable({ subjects }) {
  const { t } = useTranslation();
  const normalSubs = subjects.filter(s => !s.is4th);
  const fourthSub = subjects.find(s => s.is4th);


  const cell = {
    border: "1px solid #000",
    padding: "10px",
    textAlign: "center",
    fontSize: "14px",
  };

  const renderRow = (s, i) => {
    const total =
      Number(s.cq || 0) +
      Number(s.mcq || 0) +
      Number(s.pr || 0);

    const { letter, point } = calculateGrade(total);

    return (
      <tr key={i}>
        <td style={cell}>{s.code}</td>
        <td style={{ ...cell, textAlign: "left" }}>{s.name}</td>
        <td style={cell}>{s.cq}</td>
        <td style={cell}>{s.mcq}</td>
        <td style={cell}>{s.pr}</td>
        <td style={cell}>{total}</td>
        <td style={cell}>{letter}</td>
        <td style={cell}>{point.toFixed(1)}</td>
      </tr>
    );
  };

  return (
    <>
      {/* ===== MAIN SUBJECT TABLE ===== */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {[
              
              t("code"),
              t("subject"),
              t("cq"),
              t("mcq"),
              t("pr"),
              t("total"),
              t("grade"),
              t("point"),
            ].map(h=>(
              <th key={h} style={cell}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {normalSubs.map(renderRow)}
        </tbody>
      </table>

      {/* ===== 4TH SUBJECT ===== */}
      {fourthSub && (
        <>
          <p style={{ marginTop: "12px", fontWeight: "bold" }}>
            {t("fourthSubject")}
          </p>

          <table style={{ width: "100%",marginTop: "6px", borderCollapse: "collapse" }}>
            <tbody>
              {renderRow(fourthSub, "4th")}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
