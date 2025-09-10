'use client';

import React from 'react';

type CourseIntroVideoProps = {
  videoUrl?: string | null;
};

export const CourseIntroVideo: React.FC<CourseIntroVideoProps> = ({ videoUrl }) => {
  if (!videoUrl) return null;

  return (
    <div className="mx-auto my-10 max-w-4xl overflow-hidden rounded-2xl shadow-lg">
      <p className="pb-4 text-center text-3xl font-semibold">Introducción al curso</p>
      <div className="relative w-full pb-[56.25%]">
        <iframe
          src={videoUrl}
          title="Intro del curso"
          className="absolute top-0 left-0 h-full w-full rounded-2xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};
