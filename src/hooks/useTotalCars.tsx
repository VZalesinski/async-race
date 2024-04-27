import { fetchCarsData } from '@/api';
import { setTotalCountOfCars } from '@/store';
import { useDispatch } from 'react-redux';

export const useTotalCars = () => {
  const dispatch = useDispatch();

  const fetchTotalCountCars = async () => {
    const data = await fetchCarsData();
    if (data) dispatch(setTotalCountOfCars(data));
  };
  return fetchTotalCountCars;
};
