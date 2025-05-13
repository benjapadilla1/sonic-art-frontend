'use client';

import Section from '@/components/ui/section';
import { useEffect, useState } from 'react';

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = 'UCRTidIvv5e1JXhE0O5Mfl7Q';
const MAX_RESULTS = 6;

type Video = {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: { medium: { url: string } };
  };
};

const LatestVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`
        );
        const data = await res.json();
        setVideos(data.items);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  if (!videos.length || !videos) return <p className="text-center">Cargando videos...</p>;

  return (
    <Section className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {videos.map((video, idx) => (
        <div key={idx} className="flex flex-col gap-2">
          <iframe
            className="aspect-video w-full rounded-lg"
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            title={video.snippet.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <p className="font-engravers font-bold">{video.snippet.title}</p>
        </div>
      ))}
    </Section>
  );
};

export default LatestVideos;
