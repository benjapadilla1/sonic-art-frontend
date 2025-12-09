'use client';

import { Button } from '@/components/ui/button';
import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

type AudioWaveformPlayerProps = {
  audioUrl: string;
  trackNumber: number;
};

export const AudioWaveformPlayer = ({ audioUrl, trackNumber }: AudioWaveformPlayerProps) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [isLoading, setIsLoading] = useState(true);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!waveformRef.current) return;

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'rgb(148, 163, 184)',
      progressColor: 'rgb(59, 130, 246)',
      cursorColor: 'rgb(37, 99, 235)',
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      height: 80,
      normalize: true,
      interact: true,
    });

    wavesurfer.load(audioUrl);

    wavesurfer.on('ready', () => {
      setIsLoading(false);
      setDuration(formatTime(wavesurfer.getDuration()));
    });

    wavesurfer.on('audioprocess', () => {
      setCurrentTime(formatTime(wavesurfer.getCurrentTime()));
    });

    wavesurfer.on('play', () => setIsPlaying(true));
    wavesurfer.on('pause', () => setIsPlaying(false));
    wavesurfer.on('finish', () => setIsPlaying(false));

    wavesurferRef.current = wavesurfer;

    return () => {
      wavesurfer.destroy();
    };
  }, [audioUrl]);

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm transition-all hover:shadow-lg dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-800">
      <div className="flex items-center gap-6">
        <Button
          onClick={handlePlayPause}
          disabled={isLoading}
          className="h-14 w-14 flex-shrink-0 rounded-full shadow-md transition-transform hover:scale-105"
          size="icon"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" fill="currentColor" />
          ) : (
            <Play className="h-6 w-6" fill="currentColor" />
          )}
        </Button>

        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              Preview Track {trackNumber}
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {currentTime} / {duration}
            </span>
          </div>

          <div
            ref={waveformRef}
            className="relative min-h-[80px] overflow-hidden rounded-lg bg-gray-100 dark:bg-neutral-950"
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
