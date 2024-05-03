import { Flex, Typography } from 'antd';
import {
  CreateCar,
  GenerateCars,
  ListItemsCar,
  RaceControls,
  UpdateCar,
} from '@/widget';

export const Garage = () => {
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
