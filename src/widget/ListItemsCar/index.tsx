import { useEffect, useState } from 'react';
import { Alert, Empty, Pagination, Spin } from 'antd';
import { ItemCar } from '@/ui/components';
import { useGetCarsQuery } from '@/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useTotalCars } from '@/hooks';

export const ListItemsCar = () => {
  const limit = 7;
  const [page, setPage] = useState(1);
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
        data.map((item) => (
          <ItemCar
            key={item.id}
            title={item.name}
            color={item.color}
            id={item.id}
          />
        ))
      )}

      <Pagination
        total={totalCount ? totalCount : 0}
        showSizeChanger={false}
        simple
        pageSize={limit}
        onChange={(page) => setPage(page)}
      />
    </>
  );
};
