import React from "react";
import HelpVideo from "../components/HelpVideo";
export default function Help() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4 dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold">Help & Documentation</h2>

      <p>
        This software helps schools and colleges generate academic transcripts
        easily and accurately.
      </p>
      <div>
        <HelpVideo
        videoUrl="https://www.youtube.com/embed/YOUR_VIDEO_ID"
        title="Transcript Software Usage Guide"
      />

      <p className="text-center mt-4 text-gray-600">
        এখানে ভিডিওটি দেখুন এবং শিখুন কিভাবে সফটওয়্যার ব্যবহার করবেন, ইনপুট দেবেন ও PDF ডাউনলোড করবেন।
      </p>
      </div>

      <ul className="list-disc pl-6 space-y-2">
        <li>Fill institute & student information</li>
        <li>Enter subject marks correctly</li>
        <li>Select optional (4th) subject if applicable</li>
        <li>Preview the marksheet before download</li>
        <li>Download PDF with QR verification</li>
      </ul>

      <p className="text-gray-600">
        If you face any issue, please contact support from the footer section.
      </p>
     
    </div>
    
    
  );
  
}
