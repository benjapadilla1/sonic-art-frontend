'use client';

import WavesurferPlayer from '@wavesurfer/react';
import React, { useState } from 'react';

type PreviewTracksProps = {
  previewTracks: string[];
};

export const PreviewTracks: React.FC<PreviewTracksProps> = ({ previewTracks }) => {
  if (!previewTracks || previewTracks.length === 0) {
    return <p className="text-gray-500">Todavía no hay previews disponibles.</p>;
  }

  return (
    <div className="mt-10">
      <h2 className="font-engravers mb-6 text-2xl font-bold text-gray-900">Escucha un adelanto</h2>
      <div className="space-y-8">
        {previewTracks.map((url, idx) => (
          <Waveform key={idx} url={url} label={`Preview ${idx + 1}`} />
        ))}
      </div>
    </div>
  );
};

const Waveform: React.FC<{ url: string; label: string }> = ({ url, label }) => {
  const [wavesurfer, setWavesurfer] = useState(null);
  const [playing, setPlaying] = useState(false);

  const onReady = (ws: any) => {
    setWavesurfer(ws);
    setPlaying(false);
  };

  const handlePlay = () => {
    if (!wavesurfer) return;
    // wavesurfer.playPause();
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>

      <WavesurferPlayer
        height={80}
        waveColor="#E5E7EB" // gris claro
        progressColor="#2563EB" // azul (como el ejemplo del artículo)
        cursorColor="transparent"
        barWidth={3}
        url={url}
        onReady={onReady}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <button
        onClick={handlePlay}
        className="self-start rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
      >
        {playing ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};
