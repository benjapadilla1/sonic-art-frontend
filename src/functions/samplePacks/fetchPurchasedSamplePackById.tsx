import axios from 'axios';

export const fetchPurchasedSamplePackById = async (userId: string, id: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/samplepacks/purchased/${userId}/${id}`
    );

    return res.data;
  } catch (err) {
    console.error('Error fetching purchased sample pack:', err);
    throw err;
  }
};
