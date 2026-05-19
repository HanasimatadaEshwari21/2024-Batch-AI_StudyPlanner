import React, { useState } from "react";

export default function ExamPlanner() {
  const [exams, setExams] = useState([]);
  const [subject, setSubject] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examTime, setExamTime] = useState("");
  const dailyHours = 4; // total study hours available per day

  const addExam = () => {
    if (!subject || !examDate || !examTime) return;
    setExams([
      ...exams,
      { subject, examDate: new Date(`${examDate}T${examTime}`) }
    ]);
    setSubject("");
    setExamDate("");
    setExamTime("");
  };

  const removeExam = (index) => {
    setExams(exams.filter((_, i) => i !== index));
  };

  const today = new Date();
  const schedule = exams.map((exam) => {
    const daysLeft = Math.ceil(
      (exam.examDate - today) / (1000 * 60 * 60 * 24)
    );
    const suggestedHours = (dailyHours * daysLeft) / exams.length;
    return { ...exam, daysLeft, suggestedHours: suggestedHours.toFixed(1) };
  });

  const nearestExam = schedule.reduce((nearest, exam) => {
    if (!nearest || exam.daysLeft < nearest.daysLeft) return exam;
    return nearest;
  }, null);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        🎓 AI Exam Study Planner
      </h1>

      {/* Form to add exams */}
      <div className="mb-6 border p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="time"
          value={examTime}
          onChange={(e) => setExamTime(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={addExam}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Exam
        </button>
      </div>

      {/* Display schedule */}
      {schedule.map((exam, i) => (
        <div key={i} className="border rounded-lg p-4 mb-4 shadow flex justify-between items-center">
          <div>
            <p><span className="font-semibold">Subject:</span> {exam.subject}</p>
            <p><span className="font-semibold">Exam Date:</span> {exam.examDate.toDateString()}</p>
            <p><span className="font-semibold">Days Left:</span> {exam.daysLeft}</p>
            <p><span className="font-semibold">Suggested Study Hours:</span> {exam.suggestedHours} per day</p>
          </div>
          <button
            onClick={() => removeExam(i)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}

      {/* AI suggestion */}
      {nearestExam && (
        <div className="mt-6 border-t pt-4 text-center">
          <p className="text-lg font-semibold">
            🧠 AI Suggestion: Focus more on{" "}
            <span className="text-blue-600 font-bold">
              {nearestExam.subject}
            </span>{" "}
            — its exam is coming up soon!
          </p>
        </div>
      )}
    </div>
  );
}
