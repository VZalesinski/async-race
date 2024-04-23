import { useNavigate, Outlet } from 'react-router-dom';
import { Button, Flex, Layout as ANTDLayout } from 'antd';

const { Header, Content } = ANTDLayout;

export const Layout = () => {
  const navigate = useNavigate();

  return (
    <ANTDLayout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Flex gap="middle" align="center">
          <Button size="large" onClick={() => navigate('/')}>
            Garage
          </Button>
          <Button size="large" onClick={() => navigate('/winners')}>
            Winners
          </Button>
        </Flex>
      </Header>

      <Content style={{ padding: '0 48px' }}>
        <Outlet />
      </Content>
    </ANTDLayout>
  );
};
