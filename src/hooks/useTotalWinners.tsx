import { fetchWinnersData } from '@/api';
import { setTotalCountOfWinners } from '@/store/winnersSlice';
import { useDispatch } from 'react-redux';

export const useTotalWinners = () => {
  const dispatch = useDispatch();
  const fetchTotalWinnersCount = async () => {
    const data = await fetchWinnersData();
    if (data) dispatch(setTotalCountOfWinners(data));
  };
  return fetchTotalWinnersCount;
};
