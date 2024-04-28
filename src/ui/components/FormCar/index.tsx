import { Flex, Input, Button, Tooltip, ColorPicker, Drawer } from 'antd';
import { FC, useState } from 'react';
// import { Hue, Saturation, useColor } from 'react-color-palette';
import 'react-color-palette/css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setCarId, setColor } from '@/store';
import { useTotalCars } from '@/hooks';

type TFormCar = {
  type: 'create' | 'update';
  text: string;
  name: string;
  setName: (arg: string) => void;
  onCreate?: (name: string, color: string) => void;
  onUpdate?: (name: string, color: string, id: number) => void;
};

export const FormCar: FC<TFormCar> = ({
  type,
  text,
  onCreate,
  onUpdate,
  name,
  setName,
}) => {
  const fetchTotalCountCars = useTotalCars();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [color, setColor] = useColor('#561ecb');
  const color = useSelector((state: RootState) => state.car.color);
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
      await onCreate(name, color);
      await fetchTotalCountCars();
    }
    if (onUpdate && type === 'update' && car) {
      await onUpdate(name, color, car);
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
      <Drawer
        title={`${text} car`}
        footer={null}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Flex vertical gap={8}>
          <Flex align="center" gap={8} wrap="wrap">
            <div>
              <Input
                placeholder="Type car brand"
                value={name}
                onChange={(value) => setName(value.target.value)}
              />
            </div>
            {/* <Input
              value={`color: ${color.hex}`}
              disabled
              variant="borderless"
            /> */}
            <ColorPicker
              defaultValue="#1677ff"
              value={color}
              onChange={(value) => dispatch(setColor(value.toHexString()))}
              showText
            />
          </Flex>
          <Button type="primary" block onClick={handleClick} disabled={!name}>
            {text}
          </Button>
        </Flex>
      </Drawer>
    </>
  );
};
