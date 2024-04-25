import { useGetCarsQuery } from '@/api';
import { ItemCar } from '@/ui/components';
import { Alert, Pagination, Spin } from 'antd';
import { useState } from 'react';

export const ListItemsCar = () => {
  const [page, setPage] = useState(1);
  // const [startIndex, setStartIndex] = useState(0);
  const limit = 7;
  const { data = [], isLoading, isError } = useGetCarsQuery({ limit, page });
  console.log(data);

  const startIndex = (page - 1) * limit;

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
      {data.slice(startIndex, limit).map((item) => (
        <ItemCar
          key={item.id}
          title={item.name}
          color={item.color}
          id={item.id}
        />
      ))}

      <Pagination
        total={data.length}
        showSizeChanger={false}
        simple
        pageSize={limit}
        onChange={(page) => setPage(page)}
      />
    </>
  );
};
