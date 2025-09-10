import axios from 'axios';

export const fetchSamplePackById = async (id: string) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/samplepacks/${id}`);

    return res.data;
  } catch (err) {
    console.error('Error fetching sample pack:', err);
    throw err;
  }
};
