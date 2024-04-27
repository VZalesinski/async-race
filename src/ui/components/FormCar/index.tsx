import { Flex, Input, Button, Modal, Tooltip } from 'antd';
import { FC, useState } from 'react';
import { Hue, Saturation, useColor } from 'react-color-palette';
import 'react-color-palette/css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setCarId } from '@/store';
import { useTotalCars } from '@/hooks';

type TFormCar = {
  type: 'create' | 'update';
  text: string;
  onCreate?: (name: string, color: string) => void;
  onUpdate?: (name: string, color: string, id: number) => void;
};

export const FormCar: FC<TFormCar> = ({ type, text, onCreate, onUpdate }) => {
  const fetchTotalCountCars = useTotalCars();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [color, setColor] = useColor('#561ecb');
  const car = useSelector((state: RootState) => state.car.carId);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClick = async () => {
    if (onCreate && type === 'create') {
      await onCreate(name, color.hex);
      await fetchTotalCountCars();
    }
    if (onUpdate && type === 'update' && car) {
      await onUpdate(name, color.hex, car);
      dispatch(setCarId(null));
    }
    setName('');
    handleCancel();
  };
  return (
    <>
      <Tooltip title={type === 'update' ? 'You need to select car' : ''}>
        <Button
          type="primary"
          onClick={showModal}
          disabled={!car && type === 'update'}
        >
          {text}
        </Button>
      </Tooltip>
      <Modal
        centered
        title={`${text} car`}
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Flex vertical gap={8}>
          <Flex align="center" gap={8} wrap="wrap">
            <Input
              placeholder="Type car brand"
              value={name}
              onChange={(value) => setName(value.target.value)}
            />
            <Input
              value={`color: ${color.hex}`}
              disabled
              variant="borderless"
            />
          </Flex>
          <div className="custom-layout">
            <Saturation height={100} color={color} onChange={setColor} />
            <Hue color={color} onChange={setColor} />
          </div>
          <Button type="primary" block onClick={handleClick} disabled={!name}>
            {text}
          </Button>
        </Flex>
      </Modal>
    </>
  );
};
