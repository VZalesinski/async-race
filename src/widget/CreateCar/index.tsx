import { useCreateCarMutation } from '../../api';
import { FormCar } from '../../ui/components';

export const CreateCar = () => {
  const [createCar] = useCreateCarMutation();

  const handleCreateCar = async (name: string, color: string) => {
    await createCar({ name, color });
  };
  return <FormCar type="create" text="Create" onCreate={handleCreateCar} />;
};
