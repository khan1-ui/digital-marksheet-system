import React from "react";
export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4 dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold">Terms & Conditions</h2>

      <p>
        This software is provided free of cost for educational use.
      </p>

      <ul className="list-disc pl-6 space-y-2">
        <li>No misuse or illegal use is allowed</li>
        <li>Users are responsible for data accuracy</li>
        <li>No warranty is provided</li>
      </ul>

      <p className="text-gray-600">
        By using this application, you agree to these terms.
      </p>

    </div>
  );
}
