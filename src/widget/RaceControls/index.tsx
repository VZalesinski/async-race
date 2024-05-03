import { useEffect, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Flex, Tooltip, notification } from 'antd';
import { PlayCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { RootState, removeAllCarsRaceArray, setIsRace } from '@/store';

export const RaceControls: FC = () => {
  const isRace = useSelector((state: RootState) => state.car.isRace);
  const dispatch = useDispatch();
  const raceArray = useSelector((state: RootState) => state.car.raceArray);

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    async function showWinner() {
      const winner = raceArray.reduce((prev, current) => {
        return prev.time < current.time ? prev : current;
      });
      api['success']({
        message: `Winner: ${winner.name}`,
        description: `Time: ${winner.time}`,
        placement: 'top',
      });
    }

    if (isRace && raceArray.length === 1) {
      showWinner();
    }
  }, [isRace, raceArray]);

  const handleStartRace = async () => {
    dispatch(removeAllCarsRaceArray());
    dispatch(setIsRace(true));
  };

  const handleResetRace = () => {
    dispatch(removeAllCarsRaceArray());
    dispatch(setIsRace(false));
  };

  return (
    <>
      {contextHolder}
      <Flex gap={8} align="center">
        <Tooltip title={isRace ? 'You must to RESET' : ''}>
          <Button type="primary" onClick={handleStartRace} disabled={isRace}>
            RACE
            <PlayCircleOutlined />
          </Button>
        </Tooltip>

        <Tooltip title={isRace ? '' : 'You must to RACE'}>
          <Button type="primary" onClick={handleResetRace} disabled={!isRace}>
            RESET
            <ReloadOutlined />
          </Button>
        </Tooltip>
      </Flex>
    </>
  );
};
