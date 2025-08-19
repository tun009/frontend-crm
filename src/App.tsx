import '@/locales';
import AppRouter from '@/router';
import { ConfigProvider } from 'antd';

const antdConfig = {
  theme: {
    cssVar: true,
    token: {
      fontFamily: 'Inter, AlibabaSans, system-ui, -apple-system, sans-serif',
      colorPrimary: '#3b82f6',
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