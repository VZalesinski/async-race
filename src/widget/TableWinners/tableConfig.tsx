import { CarFilled } from '@ant-design/icons';
import type { TableProps } from 'antd';

export interface DataType {
  key: string;
  id: number;
  carColor: string;
  name: string;
  wins: number;
  bestTime: number;
}

export const columns: TableProps<DataType>['columns'] = [
  {
    title: '№',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Car',
    dataIndex: 'carColor',
    key: 'carColor',
    render: (text: string) => (
      <CarFilled style={{ fontSize: 30, color: text }} />
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Wins',
    dataIndex: 'wins',
    key: 'wins',
  },
  {
    title: 'Best Time(seconds)',
    dataIndex: 'bestTime',
    key: 'bestTime',
  },
];
