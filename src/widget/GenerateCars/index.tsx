import { useCreateCarMutation } from '@/api';
import { carColors, carModels, carNames } from '@/utils';
import { Button } from 'antd';

export const GenerateCars = () => {
  const [createCar] = useCreateCarMutation();

  const generateRandomCars = async () => {
    for (let i = 0; i < 100; i++) {
      const randomNameIndex = Math.floor(Math.random() * carNames.length);
      const randomModelIndex = Math.floor(Math.random() * carModels.length);
      const randomColorIndex = Math.floor(Math.random() * carColors.length);

      const name = `${carNames[randomNameIndex]} ${carModels[randomModelIndex]}`;
      const color = carColors[randomColorIndex];

      await createCar({ name, color });
    }
  };

  return (
    <Button type="primary" onClick={generateRandomCars}>
      GENERATE CARS
    </Button>
  );
};
