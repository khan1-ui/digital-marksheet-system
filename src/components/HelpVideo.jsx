// components/HelpVideo.jsx
import React from "react";

export default function HelpVideo({ videoUrl, title = "Help Video" }) {
  return (
    <div className="max-w-4xl mx-auto my-6 p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={videoUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg border"
        ></iframe>
      </div>
    </div>
  );
}
