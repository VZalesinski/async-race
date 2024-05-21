import { useCreateCarMutation } from '@/api';
import { useTotalCars } from '@/hooks';
import { carColors, carModels, carNames } from '@/utils';
import { Button } from 'antd';

export const GenerateCars = () => {
  const [createCar] = useCreateCarMutation();
  const fetchTotalCountCars = useTotalCars();
  const amountOfGeneratedCars = 100;
  const generateRandomCars = async () => {
    for (let i = 0; i < amountOfGeneratedCars; i++) {
      const randomNameIndex = Math.floor(Math.random() * carNames.length);
      const randomModelIndex = Math.floor(Math.random() * carModels.length);
      const randomColorIndex = Math.floor(Math.random() * carColors.length);

      const name = `${carNames[randomNameIndex]} ${carModels[randomModelIndex]}`;
      const color = carColors[randomColorIndex];

      await createCar({ name, color });
    }
    await fetchTotalCountCars();
  };

  return (
    <Button type="primary" onClick={generateRandomCars}>
      GENERATE CARS
    </Button>
  );
};
