import axios from 'axios';

export const fetchPurchasedSamplePacks = async (id: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/samplepacks/purchased/user/${id}`
    );

    return res.data;
  } catch (err) {
    console.error('Error fetching purchased samplepacks:', err);
    throw err;
  }
};
