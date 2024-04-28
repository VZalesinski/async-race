import { Button, Flex, Typography } from 'antd';
import { PlayCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { CreateCar, GenerateCars, ListItemsCar, UpdateCar } from '@/widget';

export const Garage = () => {
  return (
    <Flex vertical gap="large">
      <Typography.Title level={3}>Garage</Typography.Title>
      <Flex justify="space-between" align="center" wrap="wrap" gap={8}>
        <Flex gap={8} align="center">
          <Button type="primary">
            RACE
            <PlayCircleOutlined />
          </Button>

          <Button type="primary">
            RESET
            <ReloadOutlined />
          </Button>
        </Flex>

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
