import axios from 'axios';

export const fetchSamplePacks = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/samplepacks`);

    return res.data;
  } catch (err) {
    console.error('Error fetching sample packs:', err);
    throw err;
  }
};
