import '@/locales';
import AppRouter from '@/router';
import { ConfigProvider } from 'antd';

const antdConfig = {
  theme: {
    cssVar: true,
    token: {
      fontFamily: 'Inter, AlibabaSans, system-ui, -apple-system, sans-serif',
      colorPrimary: '#202D3F',
      colorInfo: '#1E293B',
      colorLink: '#334155',
      colorLinkHover: '#475569',
      colorLinkActive: '#1E293B',
      borderRadius: 6,
    },
  },
};

function App() {
  return (
    <ConfigProvider theme={antdConfig.theme}>
      <AppRouter />
    </ConfigProvider>
  );
}

export default App;