import { useNavigate, Outlet } from 'react-router-dom';
import { Button, Flex, Layout as ANTDLayout } from 'antd';

const { Header, Content } = ANTDLayout;

export const Layout = () => {
  const navigate = useNavigate();

  return (
    <ANTDLayout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Flex gap="middle" align="center">
          <Button
            size="large"
            type="primary"
            onClick={() => navigate('/async-race')}
          >
            Garage
          </Button>
          <Button
            size="large"
            type="primary"
            onClick={() => navigate('/async-race/winners')}
          >
            Winners
          </Button>
        </Flex>
      </Header>

      <Content style={{ padding: '50px', backgroundColor: '#fff' }}>
        <Outlet />
      </Content>
    </ANTDLayout>
  );
};
