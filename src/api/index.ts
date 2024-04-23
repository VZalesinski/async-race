import { API_URL } from '../utils';

export async function getAllCars() {
  try {
    const response = await fetch(`${API_URL}/garage`);

    if (!response.ok) {
      throw new Error('Not found');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function createCar(name: string, color: string) {
  try {
    const response = await fetch(`${API_URL}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        color: color,
      }),
    });
    const car = await response.json();

    console.log(car);
  } catch (error) {
    console.error(error);
  }
}
