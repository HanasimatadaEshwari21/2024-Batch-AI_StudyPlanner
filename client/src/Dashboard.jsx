import React, { useState } from "react";
import ExamPlanner from "./ExamPlanner";
import BackgroundChanger from "./BackgroundChanger";

export default function Dashboard() {
  const [bg, setBg] = useState("bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200");

  return (
    <div className={`min-h-screen ${bg} p-8 transition-all duration-500`}>
      <h1 className="text-5xl font-extrabold text-center mb-6 text-white drop-shadow-lg">
        🌈 Student Dashboard
      </h1>

      <div className="flex justify-center">
        <BackgroundChanger onChange={setBg} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <ExamPlanner />
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-center">
          <p className="text-gray-600">📈 Progress Chart (coming soon)</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-center">
          <p className="text-gray-600">🧠 AI Suggestions (coming soon)</p>
        </div>
      </div>
    </div>
  );
}
