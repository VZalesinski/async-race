import { useEffect, useState } from 'react';
import { getAllCars } from '../../api';
import { CarsData } from '../../api/types';
import { ItemCar } from '../../ui/components';

export const ListItemsCar = () => {
  const [cars, setCars] = useState<CarsData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const cars = await getAllCars();
      setCars(cars);
    }

    fetchData();
  }, []);

  return cars.map((item) => (
    <ItemCar key={item.id} title={item.name} color={item.color} />
  ));
};
