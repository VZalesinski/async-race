import { Button, Flex, Typography } from 'antd';
import { FC } from 'react';
// import { deleteCar } from '../../../api/api';
import { useDeleteCarMutation } from '../../../api';

type TItemCar = {
  title: string;
  color: string;
  id: number;
};

export const ItemCar: FC<TItemCar> = ({ title, color, id }) => {
  const [deleteCar] = useDeleteCarMutation();
  return (
    <Flex vertical>
      <Typography.Title level={5} style={{ color: color }}>
        {title}
      </Typography.Title>

      <Flex gap="small">
        <Flex vertical gap="small">
          <Button size="small" type="primary">
            select
          </Button>
          <Button
            size="small"
            danger
            type="primary"
            onClick={() => deleteCar({ id })}
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
