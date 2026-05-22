import React, { useState } from "react";
import { Play } from "lucide-react";

const VideoG = () => {
  const [playingIndex, setPlayingIndex] = useState(null);

  const videos = [
    {
      title: "CSJMU Sustainability Report 2024-25",
      video: "/assets/Updated Video and Thumbnail/YouTube all video/CSJMU Sustainability Report 2024- 25.mp4",
      thumbnail: "/assets/Updated Video and Thumbnail/EHM- CSJMU Sustainability report 2024-25 - YOUTUBE THUMBNAILS  (1).webp",
    },
    {
      title: "CSJMU Water-Positive Campus",
      video: "/assets/Updated Video and Thumbnail/YouTube all video/EHM- CSJMU Water- Positive Campus.mp4",
      thumbnail: "/assets/Updated Video and Thumbnail/EHM- CSJMU UNIVERSITY WATER POSITIVE CAMPUS - YOUTUBE THUMBNAILS.webp",
    },
    {
      title: "Centralised STPs vs DNTS",
      video: "/assets/Updated Video and Thumbnail/YouTube all video/Centralised STPs vs DECENTRALISED NATURAL TREATMENT SYSTEM (DNTS).mp4",
      thumbnail: "/assets/Updated Video and Thumbnail/EHM- Centralised STPs vs DNTS- Youtube Thumbnail.webp",
    },
    {
      title: "Decentralized Natural Treatment System (DNTS)",
      video: "/assets/Updated Video and Thumbnail/YouTube all video/DECENTRALIZED NATURAL TREATMENT SYSTEM (DNTS).mp4",
      thumbnail: "/assets/Updated Video and Thumbnail/EHM- DNTS - YOUTUBE THUMBNAILS.webp",
    },
    {
      title: "ESG Overview",
      video: "/assets/Updated Video and Thumbnail/YouTube all video/EHM - ESG VIDEO.mp4",
      thumbnail: "/assets/Updated Video and Thumbnail/EHM- ESG - YOUTUBE THUMBNAILS .webp",
    },
    {
      title: "Water Positive Campus",
      video: "/assets/Updated Video and Thumbnail/YouTube all video/Water Positive Campus.mp4",
      thumbnail: "/assets/Updated Video and Thumbnail/EHM- WATER POSITIVE CAMPUS - YOUTUBE THUMBNAILS  (1).webp",
    },
    {
      title: "Water Positive",
      video: "/assets/Updated Video and Thumbnail/YouTube all video/Water Positive.mp4",
      thumbnail: "/assets/Updated Video and Thumbnail/EHM- WATER POSITIVE- YOUTUBE THUMBNAILS  (1).webp",
    },
  ];

  const handlePlay = (index) => {
    setPlayingIndex(index);
  };

  const handleClose = () => {
    setPlayingIndex(null);
  };

  return (
    <div className="bg-[#f4f7f6] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#1b3b22] text-center mb-12">
          Featured Videos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {playingIndex === index ? (
                <div className="aspect-video w-full bg-black relative">
                  <video
                    src={item.video}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-white bg-black/60 rounded-full px-2 py-1 text-xs hover:bg-black"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div
                  className="aspect-video w-full relative cursor-pointer overflow-hidden bg-gray-200"
                  onClick={() => handlePlay(index)}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center text-emerald-700 shadow-md group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current" />
                    </div>
                  </div>
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoG;
