import { Button, Flex, Typography } from 'antd';
import { FC } from 'react';
import { useDeleteCarMutation } from '@/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setCarId } from '@/store';
import { useTotalCars } from '@/hooks';

type TItemCar = {
  title: string;
  color: string;
  id: number;
};

export const ItemCar: FC<TItemCar> = ({ title, color, id }) => {
  const dispatch = useDispatch();
  const [deleteCar] = useDeleteCarMutation();
  const car = useSelector((state: RootState) => state.car.carId);
  const fetchTotalCountCars = useTotalCars();

  const selectCar = () => {
    dispatch(setCarId(id));
  };

  const handleDeleteCar = async () => {
    await deleteCar({ id });
    await fetchTotalCountCars();
  };

  return (
    <Flex vertical>
      <Typography.Title level={5} style={{ color: color }}>
        {title}
      </Typography.Title>

      <Flex gap="small">
        <Flex vertical gap="small">
          <Button
            size="small"
            type="primary"
            onClick={selectCar}
            disabled={car === id}
          >
            select
          </Button>
          <Button
            size="small"
            danger
            type="primary"
            onClick={() => handleDeleteCar()}
          >
            remove
          </Button>
        </Flex>

        <Flex vertical gap="small">
          <Button size="small" type="primary">
            A
          </Button>
          <Button size="small" danger type="primary">
            B
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
