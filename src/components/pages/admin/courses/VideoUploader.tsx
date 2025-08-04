'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const VideoUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [videoUID, setVideoUID] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return toast.error('Seleccioná un archivo');

    const formData = new FormData();
    formData.append('video', file);

    try {
      setUploading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Error al subir el video');

      const data = await res.json();
      const uid = data.result.uid;

      setVideoUID(uid);
      toast.success('Video subido correctamente');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Error al subir el video');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Input type="file" accept="video/*" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Subiendo...' : 'Subir video'}
      </Button>

      {videoUID && (
        <div className="mt-4">
          <p className="mb-2 font-medium">Previsualización:</p>
          <iframe
            src={`https://iframe.videodelivery.net/${videoUID}`}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
            className="aspect-video w-full rounded-xl border"
          />
        </div>
      )}
    </div>
  );
};
