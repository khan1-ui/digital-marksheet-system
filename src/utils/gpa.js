import React from "react";
import { calculateGrade } from "./gradeUtils";

export function calculateGPA(subjects, include4th = true) {
  let totalPoints = 0;
  let count = 0;
  let fourthBonus = 0;

  for (const sub of subjects) {
    const total =
      Number(sub.cq || 0) +
      Number(sub.mcq || 0) +
      Number(sub.pr || 0);

    const { letter, point } = calculateGrade(total);

    // ❌ MAIN subject fail ⇒ GPA 0
    if (!sub.is4th && letter === "F") {
      return "0.00";
    }

    // ⭐ 4th subject logic
    if (sub.is4th) {
      // pass হলে bonus
      if (include4th && point > 2) {
        fourthBonus = point - 2;
      }
      // fail হলেও GPA থাকবে
      continue;
    }

    // ✅ main subjects
    totalPoints += point;
    count++;
  }

  if (!count) return "-";

  const gpa = (totalPoints + (include4th ? fourthBonus : 0)) / count;

  return gpa.toFixed(2);
}
