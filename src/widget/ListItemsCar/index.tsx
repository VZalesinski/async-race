import { useEffect } from 'react';
import {
  Alert,
  Divider,
  Empty,
  Flex,
  Pagination,
  Spin,
  Typography,
} from 'antd';
import { ItemCar } from '@/ui/components';
import { useGetCarsQuery } from '@/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setPage } from '@/store';
import { useTotalCars } from '@/hooks';

export const ListItemsCar = () => {
  const limit = 7;
  const page = useSelector((state: RootState) => state.car.page);
  const dispatch = useDispatch();
  const totalCount = useSelector(
    (state: RootState) => state.car.totalCountOfCars
  );
  const fetchTotalCountCars = useTotalCars();
  const { data = [], isLoading, isError } = useGetCarsQuery({ limit, page });

  useEffect(() => {
    fetchTotalCountCars();
  }, []);

  if (isLoading) return <Spin size="large" />;

  if (isError)
    return (
      <Alert
        message="Error"
        description="Something went wrong."
        type="error"
        showIcon
      />
    );

  return (
    <>
      {data.length === 0 ? (
        <Empty description={'No cars in garage. Create new one'} />
      ) : (
        <Flex vertical>
          <Flex justify="flex-end">
            <Typography.Title level={3}>Finish</Typography.Title>
          </Flex>
          <div>
            {data.map((item) => (
              <div key={item.id}>
                <ItemCar title={item.name} color={item.color} id={item.id} />
                <Divider />
              </div>
            ))}
          </div>
        </Flex>
      )}

      <Pagination
        total={totalCount ? totalCount : 0}
        showSizeChanger={false}
        simple
        current={page}
        pageSize={limit}
        onChange={(page) => dispatch(setPage(page))}
      />
    </>
  );
};
