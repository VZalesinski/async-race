import { useCreateCarMutation } from '@/api';
import { RootState, setCreateInputValue } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { FormCar } from '../FormCar';

export const CreateCar = () => {
  const createInputValue = useSelector(
    (state: RootState) => state.car.createInputValue
  );
  const [createCar] = useCreateCarMutation();
  const dispatch = useDispatch();

  const setName = (name: string) => {
    dispatch(setCreateInputValue(name));
  };

  const handleCreateCar = async (name: string, color: string) => {
    await createCar({ name, color });
  };
  return (
    <FormCar
      type="create"
      text="Create"
      onCreate={handleCreateCar}
      name={createInputValue}
      setName={setName}
    />
  );
};
