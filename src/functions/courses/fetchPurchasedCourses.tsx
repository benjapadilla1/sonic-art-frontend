import axios from 'axios';

export const fetchPurchasedCourses = async (id: string) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/purchased/${id}`);

    return res.data;
  } catch (err) {
    console.error('Error fetching purchased courses:', err);
    throw err;
  }
};
