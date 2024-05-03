import { RootState, setIsRace } from '@/store';
import { PlayCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';
import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const RaceControls: FC = () => {
  const isRace = useSelector((state: RootState) => state.car.isRace);

  const dispatch = useDispatch();

  const handleStartRace = () => {
    dispatch(setIsRace(true));
  };

  const handleResetRace = () => {
    dispatch(setIsRace(false));
  };

  return (
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
  );
};
