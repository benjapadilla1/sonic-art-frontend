import axios from 'axios';

export const createCourse = async (form: FormData, onProgress: (progress: number) => void) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/courses`;

  const response = await axios.post(url, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: progressEvent => {
      const total = progressEvent.total ?? 0;
      const current = progressEvent.loaded;
      const percentCompleted = Math.round((current / total) * 100);
      onProgress(percentCompleted);
    },
  });

  return response.data;
};
