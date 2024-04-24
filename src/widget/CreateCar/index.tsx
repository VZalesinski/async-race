import { useCreateCarMutation } from '../../api';
import { FormCar } from '../../ui/components';

export const CreateCar = () => {
  const [createCar] = useCreateCarMutation();

  const handleCreateCar = (name: string, color: string) => {
    createCar({ name, color });
  };
  return <FormCar type="create" text="Create" onCreate={handleCreateCar} />;
};
