import { Flex, Typography } from 'antd';
import {
  CreateCar,
  GenerateCars,
  ListItemsCar,
  RaceControls,
  UpdateCar,
} from '@/widget';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { removeAllCarsRaceArray, setIsRace } from '@/store';

export const Garage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsRace(false));
    dispatch(removeAllCarsRaceArray());
  }, []);

  return (
    <Flex vertical gap="large">
      <Typography.Title level={3}>Garage</Typography.Title>
      <Flex justify="space-between" align="center" wrap="wrap" gap={8}>
        <RaceControls />

        <GenerateCars />
      </Flex>

      <Flex gap="middle" wrap="wrap" justify="flex-end">
        <CreateCar />

        <UpdateCar />
      </Flex>

      <Flex vertical gap="middle">
        <ListItemsCar />
      </Flex>
    </Flex>
  );
};
