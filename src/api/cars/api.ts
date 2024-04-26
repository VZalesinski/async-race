import { API_URL } from '@/utils';

export async function fetchCarsData(): Promise<number | undefined> {
  try {
    const url = `${API_URL}/garage?_limit=7&_page=1`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const totalCountHeader = response.headers.get('X-Total-Count');

    if (totalCountHeader) {
      const totalCount = parseInt(totalCountHeader, 10);
      return totalCount;
    } else {
      console.log('X-Total-Count header not found');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
