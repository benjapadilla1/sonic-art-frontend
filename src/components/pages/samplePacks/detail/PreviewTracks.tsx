'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

type PreviewTracksProps = {
  previewTracks: string[];
};

export const PreviewTracks: React.FC<PreviewTracksProps> = ({ previewTracks }) => {
  if (!previewTracks || previewTracks.length === 0) {
    return (
      <div className="audio-player-section">
        <p className="text-center text-gray-500">Todavía no hay previews disponibles.</p>
      </div>
    );
  }

  return (
    <div className="audio-player-section">
      <h2 className="audio-player-title">Escucha un adelanto</h2>
      <div className="space-y-6">
        {previewTracks.map((url, idx) => (
          <WaveformPlayer key={idx} url={url} trackName={`Preview ${idx + 1}`} />
        ))}
      </div>
    </div>
  );
};

interface WaveformPlayerProps {
  url: string;
  trackName: string;
}

const WaveformPlayer: React.FC<WaveformPlayerProps> = ({ url, trackName }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState<string>('0:00');
  const [currentTime, setCurrentTime] = useState<string>('0:00');

  useEffect(() => {
    if (!waveformRef.current) return;

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#666666',
      progressColor: '#ff3366',
      cursorColor: '#ff3366',
      barWidth: 3,
      barRadius: 3,
      barGap: 2,
      height: 60,
      normalize: true,
      backend: 'WebAudio',
      mediaControls: false,
    });

    wavesurferRef.current = wavesurfer;

    // Load the audio
    wavesurfer.load(url);

    // Event listeners
    wavesurfer.on('ready', () => {
      setIsLoading(false);
      setDuration(formatTime(wavesurfer.getDuration()));
    });

    wavesurfer.on('play', () => setIsPlaying(true));
    wavesurfer.on('pause', () => setIsPlaying(false));

    wavesurfer.on('audioprocess', () => {
      setCurrentTime(formatTime(wavesurfer.getCurrentTime()));
    });

    wavesurfer.on('error', err => {
      setError('Error loading audio file');
      setIsLoading(false);
      console.error('WaveSurfer error:', err);
    });

    return () => {
      wavesurfer.destroy();
    };
  }, [url]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };

  const handleStop = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.stop();
      setIsPlaying(false);
    }
  };

  const handleSkipBackward = () => {
    if (wavesurferRef.current) {
      const currentTime = wavesurferRef.current.getCurrentTime();
      wavesurferRef.current.seekTo(
        Math.max(0, currentTime - 10) / wavesurferRef.current.getDuration()
      );
    }
  };

  const handleSkipForward = () => {
    if (wavesurferRef.current) {
      const currentTime = wavesurferRef.current.getCurrentTime();
      const duration = wavesurferRef.current.getDuration();
      wavesurferRef.current.seekTo(Math.min(duration, currentTime + 10) / duration);
    }
  };

  if (error) {
    return (
      <div className="waveform-player-card">
        <div className="waveform-error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="waveform-player-card">
      <div className="waveform-track-info">
        <h3 className="waveform-track-title">{trackName}</h3>
        <span className="waveform-track-duration">{duration}</span>
      </div>

      <div className="waveform-container">
        {isLoading ? (
          <div className="waveform-loading">Loading waveform...</div>
        ) : (
          <div ref={waveformRef} className="audio-visualizer" />
        )}
      </div>

      <div className="track-progress">
        <span>{currentTime}</span>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: wavesurferRef.current
                ? `${(wavesurferRef.current.getCurrentTime() / wavesurferRef.current.getDuration()) * 100}%`
                : '0%',
            }}
          />
        </div>
        <span>{duration}</span>
      </div>

      <div className="waveform-controls">
        <button
          className="waveform-control-btn"
          onClick={handleSkipBackward}
          disabled={isLoading}
          title="Skip backward 10s"
        >
          ⏪
        </button>

        <button
          className="waveform-control-btn primary"
          onClick={handlePlayPause}
          disabled={isLoading}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>

        <button
          className="waveform-control-btn"
          onClick={handleStop}
          disabled={isLoading}
          title="Stop"
        >
          ⏹️
        </button>

        <button
          className="waveform-control-btn"
          onClick={handleSkipForward}
          disabled={isLoading}
          title="Skip forward 10s"
        >
          ⏩
        </button>
      </div>
    </div>
  );
};

export default WaveformPlayer;
