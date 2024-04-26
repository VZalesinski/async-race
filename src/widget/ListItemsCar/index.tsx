import { useEffect, useState } from 'react';
import { Alert, Pagination, Spin } from 'antd';
import { ItemCar } from '@/ui/components';
import { fetchCarsData, useGetCarsQuery } from '@/api';

export const ListItemsCar = () => {
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState(1);
  const limit = 7;
  const { data = [], isLoading, isError } = useGetCarsQuery({ limit, page });

  useEffect(() => {
    const fetchTotalCountCars = async () => {
      const data = await fetchCarsData();
      if (data) setTotalCount(data);
    };
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
      {data.map((item) => (
        <ItemCar
          key={item.id}
          title={item.name}
          color={item.color}
          id={item.id}
        />
      ))}

      <Pagination
        total={totalCount}
        showSizeChanger={false}
        simple
        pageSize={limit}
        onChange={(page) => setPage(page)}
      />
    </>
  );
};
