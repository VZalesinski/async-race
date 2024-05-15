import { Button, Flex, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import {
  useDeleteCarMutation,
  useDeleteWinnerMutation,
  useHandleEngineMutation,
} from '@/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, addCarInRaceArray, setCarId } from '@/store';
import { useTotalCars } from '@/hooks';
import { CarFilled } from '@ant-design/icons';
import styles from './ItemCar.module.css';
import { API_URL } from '@/utils';

type TItemCar = {
  title: string;
  color: string;
  id: number;
};

export const ItemCar: FC<TItemCar> = ({ title, color, id }) => {
  const [engineMode, setEngineMode] = useState<'started' | 'stopped' | 'drive'>(
    'started'
  );
  const dispatch = useDispatch();
  const [deleteCar] = useDeleteCarMutation();
  const [deleteWinner] = useDeleteWinnerMutation();
  const car = useSelector((state: RootState) => state.car.carId);
  const isRace = useSelector((state: RootState) => state.car.isRace);
  const fetchTotalCountCars = useTotalCars();
  const [handleEngine, { data: engineData }] = useHandleEngineMutation();

  useEffect(() => {
    if (isRace) onStartClick();
    else resetCar(`car-${id}`);
  }, [isRace]);

  useEffect(() => {
    if (engineMode === 'drive') {
      driveAnimation(id);
    }
  }, [engineData]);

  const selectCar = () => {
    dispatch(setCarId(id));
  };

  const handleDeleteCar = async () => {
    await deleteCar({ id });
    await deleteWinner(id);
    await fetchTotalCountCars();
  };

  const handleControlEngine = async () => {
    try {
      await handleEngine({ id: id, status: 'started' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const driveAnimation = async (id: number) => {
    if (engineData) {
      const time = engineData?.distance / engineData?.velocity;
      const car = document.getElementById(`car-${id}`);
      if (car) {
        car.style.backgroundColor = 'none';
        car.style.position = 'relative';
        car.style.transition = `all ${time}ms linear`;
        car.style.transform = 'translate(99%, 0)';

        if (engineMode === 'drive') {
          const response = await fetch(
            `${API_URL}/engine?id=${id}&status=drive`,
            {
              method: 'PATCH',
            }
          );

          if (!response.ok) {
            if (response.status === 500) {
              car.style.transform = 'translate(0, 0)';
              car.style.transitionDuration = '9999s';
            }
          } else if (isRace) {
            dispatch(addCarInRaceArray({ id, name: title, time }));
          }
        }
      }
    }
  };
  const resetCar = (id: string) => {
    const car = document.getElementById(id);
    if (car) {
      car.style.transition = '';
      car.style.transform = 'translate(0, 0)';
    }
    setEngineMode('started');
  };

  const onStartClick = () => {
    handleControlEngine();
    setEngineMode('drive');
  };

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
              <Button
                size="small"
                type="primary"
                onClick={onStartClick}
                disabled={engineMode !== 'started'}
              >
                A
              </Button>

              <Button
                size="small"
                danger
                type="primary"
                onClick={() => resetCar(`car-${id}`)}
                disabled={engineMode === 'started'}
              >
                B
              </Button>
            </Flex>
          </Flex>
        </Flex>

        <Typography.Text strong style={{ maxWidth: '100px', width: '100%' }}>
          {title}
        </Typography.Text>

        <div className={styles.car_race_line}>
          <div id={`car-${String(id)}`}>
            <CarFilled style={{ fontSize: 30, color: color }} />
          </div>
        </div>
      </Flex>

      <div className={styles.finish_line} />
    </Flex>
  );
};
