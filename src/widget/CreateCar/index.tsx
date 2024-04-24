import { createCar } from '../../api';
import { FormCar } from '../../ui/components';

export const CreateCar = () => {
  return <FormCar type="create" text="Create" onClick={createCar} />;
};
