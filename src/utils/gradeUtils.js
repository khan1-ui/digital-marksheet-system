import React from "react";
// utils/gradeUtils.js
export function calculateGrade(mark) {
  const m = Number(mark);

  if (isNaN(m) || m < 0) {
    return { letter: "-", point: 0 };
  }

  if (m >= 80) return { letter: "A+", point: 5.0 };
  if (m >= 70) return { letter: "A", point: 4.0 };
  if (m >= 60) return { letter: "A-", point: 3.5 };
  if (m >= 50) return { letter: "B", point: 3.0 };
  if (m >= 40) return { letter: "C", point: 2.0 };
  if (m >= 33) return { letter: "D", point: 1.0 };

  return { letter: "F", point: 0.0 };
}
