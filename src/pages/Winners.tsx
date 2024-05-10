import { SortTable, TableWinners } from '@/widget';
import { Flex, Typography } from 'antd';

export const Winners = () => {
  return (
    <Flex vertical gap="large">
      <Typography.Title level={3}>Winners</Typography.Title>

      <SortTable />

      <TableWinners />
    </Flex>
  );
};
