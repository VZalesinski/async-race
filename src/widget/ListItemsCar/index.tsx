import { useGetCarsQuery } from '../../api';
import { ItemCar } from '../../ui/components';
import { Alert, Spin } from 'antd';

export const ListItemsCar = () => {
  const { data = [], isLoading, isError } = useGetCarsQuery(8);

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

  return data.map((item) => (
    <ItemCar key={item.id} title={item.name} color={item.color} id={item.id} />
  ));
};
