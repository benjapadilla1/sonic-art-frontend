import axios from 'axios';

export const fetchCourseById = async (id: string) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${id}`);

    return res.data;
  } catch (err) {
    console.error('Error fetching course:', err);
    throw err;
  }
};
