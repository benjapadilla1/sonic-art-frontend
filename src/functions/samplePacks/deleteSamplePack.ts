import axios from 'axios';

export const deleteSamplePack = async (id: string) => {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/samplepacks/${id}`);

    return res.data;
  } catch (err) {
    console.error('Error deleting sample pack:', err);
  }
};
