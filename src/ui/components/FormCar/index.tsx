import { Flex, Input, Button, Modal } from 'antd';
import { FC, useState } from 'react';
import { Hue, Saturation, useColor } from 'react-color-palette';
import 'react-color-palette/css';

type TFormCar = {
  type: 'create' | 'update';
  text: string;
  onCreate?: (name: string, color: string) => void;
  onUpdate?: (name: string, color: string, id: number) => void;
};

export const FormCar: FC<TFormCar> = ({ type, text, onCreate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [color, setColor] = useColor('#561ecb');

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClick = async () => {
    if (onCreate && type === 'create') await onCreate(name, color.hex);
    // if (onUpdate && type === 'update') onUpdate(name, color.hex, id);
    setName('');
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        {text}
      </Button>
      <Modal
        centered
        title={`${text} car`}
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Flex vertical gap={8}>
          <Flex align="center" gap={8} wrap="wrap">
            <Input
              placeholder="Type car brand"
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
