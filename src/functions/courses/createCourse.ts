import axios from 'axios';

export const createCourse = async (form: FormData) => {
  console.log('Form Data:', form);
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/courses`;

  const response = await axios.post(url, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
