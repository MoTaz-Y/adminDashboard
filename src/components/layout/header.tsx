import { Layout, Space } from 'antd';
import CurrentUser from './current-user';

const Header = () => {
  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '64px',
    padding: '0 24px',
    background: '#fff',
    borderBottom: '1px solid #f0f0f0',
    position: 'sticky',
    top: 0,
    zIndex: 999,
  };
  return (
    <Layout.Header style={headerStyle}>
      <Space align='center' size={'middle'}>
        <CurrentUser />
      </Space>
    </Layout.Header>
  );
};

export default Header;
