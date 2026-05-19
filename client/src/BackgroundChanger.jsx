import React, { useState, useEffect } from "react";

export default function BackgroundChanger({ onChange }) {
  const colors = [
    "bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200",
    "bg-gradient-to-r from-green-200 via-yellow-200 to-red-200",
    "bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200",
    "bg-gradient-to-r from-blue-200 via-cyan-200 to-teal-200"
  ];

  const [current, setCurrent] = useState(0);

  // Auto change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % colors.length;
        onChange(colors[next]);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [onChange]);

  // Manual button click
  const changeBackground = () => {
    const next = (current + 1) % colors.length;
    setCurrent(next);
    onChange(colors[next]);
  };

  return (
    <button
      onClick={changeBackground}
      className="bg-black text-white px-4 py-2 rounded mb-6"
    >
      🎨 Change Background
    </button>
  );
}

