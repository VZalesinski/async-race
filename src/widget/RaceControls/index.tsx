import { useEffect, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Flex, Tooltip, notification } from 'antd';
import { PlayCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { RootState, removeAllCarsRaceArray, setIsRace } from '@/store';
import { timeInSeconds } from '@/utils';
import {
  useAddWinnerMutation,
  useLazyGetWinnerByIdQuery,
  useUpdateWinnerMutation,
} from '@/api';

export const RaceControls: FC = () => {
  const isRace = useSelector((state: RootState) => state.car.isRace);
  const dispatch = useDispatch();
  const raceArray = useSelector((state: RootState) => state.car.raceArray);
  const [addWinner] = useAddWinnerMutation();
  const [api, contextHolder] = notification.useNotification();
  const [getWinnerById, { data: winnerCurrentData }] =
    useLazyGetWinnerByIdQuery();
  const [updateWinner] = useUpdateWinnerMutation();

  useEffect(() => {
    async function showWinner() {
      const winner = raceArray.reduce((prev, current) => {
        return prev.time < current.time ? prev : current;
      });
      api['success']({
        message: `Winner: ${winner.name}`,
        description: `Time: ${timeInSeconds(winner.time)}s`,
        placement: 'top',
      });
    }

    if (isRace && raceArray.length === 1) {
      showWinner();
    }
  }, [isRace, raceArray]);

  useEffect(() => {
    if (isRace && raceArray.length === 1) {
      const winner = raceArray.reduce((prev, current) => {
        return prev.time < current.time ? prev : current;
      });
      getWinnerById({ id: winner.id });
      if (winnerCurrentData?.id === winner.id) {
        updateWinner({
          id: winner.id,
          time:
            winnerCurrentData.time > winner.time
              ? winner.time
              : winnerCurrentData.time,
          wins: winnerCurrentData.wins + 1,
        });
      } else addWinner({ id: winner.id, time: winner.time, wins: 1 });
    }
  }, [raceArray, winnerCurrentData]);

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
