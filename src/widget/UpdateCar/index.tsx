import { FormCar } from '@/ui/components';
import { useUpdateCarMutation } from '@/api';

export const UpdateCar = () => {
  const [updateCar] = useUpdateCarMutation();
  const handleUpdateCar = async (name: string, color: string, id: number) => {
    await updateCar({ name, color, id });
  };
  return <FormCar type="update" text="Update" onUpdate={handleUpdateCar} />;
};
