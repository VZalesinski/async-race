import { useEffect, type FC } from 'react';
import { useGetWinnersQuery, useLazyGetCarQuery } from '@/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Divider, Empty, Flex, Pagination, Spin, Typography } from 'antd';
import { CarFilled } from '@ant-design/icons';
import { timeInSeconds } from '@/utils';
import { useTotalWinners } from '@/hooks';
import { setPage } from '@/store/winnersSlice';

export const TableWinners: FC = () => {
  const dispatch = useDispatch();

  const sort = useSelector((state: RootState) => state.winners.sort);
  const sortByOrder = useSelector(
    (state: RootState) => state.winners.sortByOrder
  );
  const totalCount = useSelector(
    (state: RootState) => state.winners.totalCountOfWinners
  );
  const page = useSelector((state: RootState) => state.winners.page);
  const limit = 10;
  const fetchTotalCountWinners = useTotalWinners();

  const { data: winnersData, isLoading } = useGetWinnersQuery({
    _page: page,
    _limit: limit,
    _sort: sort,
    _order: sortByOrder,
  });

  useEffect(() => {
    fetchTotalCountWinners();
  }, []);

  if (isLoading) return <Spin />;

  if (winnersData) {
    return (
      <Flex vertical>
        <Pagination
          total={totalCount ? totalCount : 0}
          showSizeChanger={false}
          simple
          current={page}
          pageSize={limit}
          onChange={(page) => dispatch(setPage(page))}
        />
        <Flex gap="small" justify="space-between" align="center">
          <Typography.Title level={5} style={{ maxWidth: '20px', margin: 0 }}>
            ID
          </Typography.Title>
          <Typography.Title level={5} style={{ width: '50px', margin: 0 }}>
            CAR
          </Typography.Title>
          <Typography.Title level={5} style={{ width: '70px', margin: 0 }}>
            NAME
          </Typography.Title>
          <Typography.Title level={5} style={{ width: '50px', margin: 0 }}>
            WINS
          </Typography.Title>
          <Typography.Title level={5} style={{ width: '50px', margin: 0 }}>
            BEST TIME
          </Typography.Title>
        </Flex>
        <Divider />
        {winnersData.length === 0 ? (
          <Empty />
        ) : (
          winnersData?.map((winner, index) => (
            <Item
              key={index}
              id={winner.id}
              wins={winner.wins}
              time={winner.time}
            />
          ))
        )}
      </Flex>
    );
  }
};

const Item = ({
  id,
  wins,
  time,
}: {
  id: number;
  wins: number;
  time: number;
}) => {
  const [fetchCar, { currentData, isLoading }] = useLazyGetCarQuery();
  useEffect(() => {
    fetchCar({ id });
  }, [id]);

  if (isLoading) return <Spin />;

  return (
    <>
      <Flex gap="small" justify="space-between" align="center">
        <Typography.Text style={{ width: '20px', margin: 0 }}>
          {currentData?.id}
        </Typography.Text>
        <Typography.Text style={{ width: '50px', margin: 0 }}>
          <CarFilled style={{ fontSize: 30, color: currentData?.color }} />
        </Typography.Text>
        <Typography.Text style={{ width: '70px', margin: 0 }}>
          {currentData?.name}
        </Typography.Text>
        <Typography.Text style={{ width: '50px', margin: 0 }}>
          {wins}
        </Typography.Text>
        <Typography.Text style={{ width: '50px', margin: 0 }}>
          {`${timeInSeconds(time)}s`}
        </Typography.Text>
      </Flex>
      <Divider />
    </>
  );
};
