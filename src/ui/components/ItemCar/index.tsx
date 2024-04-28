import { Button, Flex, Typography } from 'antd';
import { FC, useState } from 'react';
import { useDeleteCarMutation, useHandleEngineMutation } from '@/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setCarId } from '@/store';
import { useTotalCars } from '@/hooks';
import { CarFilled } from '@ant-design/icons';
import styles from './ItemCar.module.css';

type TItemCar = {
  title: string;
  color: string;
  id: number;
};

export const ItemCar: FC<TItemCar> = ({ title, color, id }) => {
  // const [handleEngineMode, setHandleEngineMode] = useState<
  //   'started' | 'stopped'
  // >('started');
  const [move, setMove] = useState(false);
  const dispatch = useDispatch();
  const [deleteCar] = useDeleteCarMutation();
  const car = useSelector((state: RootState) => state.car.carId);
  const fetchTotalCountCars = useTotalCars();
  const [handleEngine, { data }] = useHandleEngineMutation();

  const selectCar = () => {
    dispatch(setCarId(id));
  };

  const handleDeleteCar = async () => {
    await deleteCar({ id });
    await fetchTotalCountCars();
  };

  const handleControlEngine = async () => {
    try {
      await handleEngine({ id: id, status: 'started' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (data) {
    console.log(id, data);
  }

  return (
    <Flex justify="space-between" align="center">
      <Flex gap="small" align="center" style={{ width: '100%' }}>
        <Flex vertical>
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
              <Button size="small" type="primary" onClick={handleControlEngine}>
                A
              </Button>
              <Button size="small" danger type="primary">
                B
              </Button>
            </Flex>
          </Flex>
        </Flex>

        <Typography.Text strong style={{ maxWidth: '100px', width: '100%' }}>
          {title}
        </Typography.Text>

        <div className={styles.car_race_line}>
          <div
            className={
              move
                ? `${styles.car_position} ${styles.move}`
                : styles.car_position
            }
            onClick={() => setMove(!move)}
          >
            <CarFilled style={{ fontSize: 30, color: color }} />
          </div>
        </div>
      </Flex>

      <div className={styles.finish_line} />
    </Flex>
  );
};
