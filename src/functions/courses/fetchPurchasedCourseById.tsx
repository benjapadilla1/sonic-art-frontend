import axios from 'axios';

export const fetchPurchasedCourseById = async (userId: string, id: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/purchased/${userId}/${id}`
    );

    return res.data;
  } catch (err) {
    console.error('Error fetching purchased courses:', err);
  }
};
