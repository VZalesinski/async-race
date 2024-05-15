import { useUpdateCarMutation } from '@/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setUpdateInputValue } from '@/store';
import { FormCar } from '../FormCar';

export const UpdateCar = () => {
  const updateInputValue = useSelector(
    (state: RootState) => state.car.updateInputValue
  );
  const [updateCar] = useUpdateCarMutation();
  const dispatch = useDispatch();

  const setName = (name: string) => {
    dispatch(setUpdateInputValue(name));
  };
  const handleUpdateCar = async (name: string, color: string, id: number) => {
    await updateCar({ name, color, id });
  };
  return (
    <FormCar
      type="update"
      text="Update"
      onUpdate={handleUpdateCar}
      name={updateInputValue}
      setName={setName}
    />
  );
};
