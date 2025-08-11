'use client';

import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

interface VideoUploaderProps {
  setFile: (file: File | string) => void;
  previewUrl?: string | null;
}

export const VideoUploader = ({ setFile, previewUrl }: VideoUploaderProps) => {
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(previewUrl ?? '');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;

    if (selected) {
      setLocalPreviewUrl(URL.createObjectURL(selected));
      setFile(selected);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Input className="file:px-2" type="file" accept="video/*" onChange={handleFileChange} />

      {(previewUrl || localPreviewUrl) && (
        <div className="mt-4">
          <p className="mb-2 font-medium">Previsualización:</p>
          <video
            src={previewUrl || localPreviewUrl || undefined}
            controls
            className="aspect-video w-full rounded-xl border"
          />
        </div>
      )}
    </div>
  );
};
