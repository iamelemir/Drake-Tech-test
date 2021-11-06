import { useEffect } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store';

import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

export default function App({ session, logout }) {
  let navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    if (!session.user) {
      navigate('/login');
    } else {
      if (location.pathname === '/') {
        navigate('home');
      }
    }
  }, [session, navigate, location]);

  function handleLogoutClick() {
    logout();
  }
  return (
    <Layout style={{ height: '100%' }}>
      <Header className="header">
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to={`/home`}>Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={`/todo`}>Todo</Link>
          </Menu.Item>
          <Menu.Item key="3" onClick={handleLogoutClick}>
            logout
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Content style={{ padding: '24px', minHeight: 280 }}>
          <Outlet />
        </Content>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Elemir Romero ©2021</Footer>
    </Layout>
  );
}

export const ConnectedApp = connect((state) => state, { logout })(App);
