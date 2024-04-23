import { createCar } from '../../api';
import { FormCar } from '../../ui/components';

export const CreateCar = () => {
  return <FormCar text="Create" onClick={createCar} />;
};
