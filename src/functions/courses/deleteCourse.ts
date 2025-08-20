import axios from 'axios';

export const deleteCourse = async (id: string) => {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${id}`);

    return res.data;
  } catch (err) {
    console.error('Error deleting course:', err);
  }
};
