import axios from 'axios';

export const fetchCourses = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses`);

    return res.data;
  } catch (err) {
    console.error('Error fetching courses:', err);
    throw err;
  }
};
