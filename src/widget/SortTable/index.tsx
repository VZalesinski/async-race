import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Select, Typography } from 'antd';
import { RootState } from '@/store';
import { handleSort, handleSortByOrder } from '@/store/winnersSlice';

export const SortTable: FC = () => {
  const sortByOrder = useSelector(
    (state: RootState) => state.winners.sortByOrder
  );
  const sort = useSelector((state: RootState) => state.winners.sort);
  const dispatch = useDispatch();

  return (
    <Flex gap="large" wrap="wrap">
      <Flex gap="small" align="center">
        <Typography.Text>Sort by order:</Typography.Text>
        <Select
          value={sortByOrder}
          options={[
            { value: 'ASC', label: 'ASC' },
            { value: 'DESC', label: 'DESC' },
          ]}
          style={{ width: 120 }}
          size="small"
          onChange={(value) => dispatch(handleSortByOrder(value))}
        />
      </Flex>

      <Flex gap="small" align="center">
        <Typography.Text>Sort:</Typography.Text>
        <Select
          value={sort}
          size="small"
          style={{ width: 120 }}
          onChange={(value) => dispatch(handleSort(value))}
          options={[
            { value: 'id', label: '№' },
            { value: 'wins', label: 'Wins' },
            { value: 'time', label: 'Time' },
          ]}
        />
      </Flex>
    </Flex>
  );
};
