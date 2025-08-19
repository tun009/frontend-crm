import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from 'antd';
import { useTranslation } from 'react-i18next';

export interface ChartDataPoint {
  time: string;
  [key: string]: string | number;
}

export interface MultiLineChartProps {
  data: ChartDataPoint[];
  title?: string;
  height?: number;
  colors?: string[];
  loading?: boolean;
  className?: string;
  showLegend?: boolean;
  smooth?: boolean;
  yAxisLabel?: string;
  xAxisLabel?: string;
  lines: string[]; 
}

const MultiLineChart = ({
  data,
  title,
  height = 400,
  colors = ['#1890ff', '#52c41a', '#faad14'],
  loading = false,
  className = '',
  showLegend = true,
  smooth = true,
  yAxisLabel,
  xAxisLabel,
  lines
}: MultiLineChartProps) => {
  const { t } = useTranslation('dashboard');

  if (loading) {
    return (
      <Card
        title={title}
        className={className}
        loading={true}
        style={{ height: height + 100 }}
      >
        <div style={{ height }} />
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card title={title} className={className}>
        <div
          style={{
            height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999',
            fontSize: 14
          }}
        >
          {t('chart.noData')}
        </div>
      </Card>
    );
  }

  return (
    <Card
      title={title}
      className={className}
      styles={{ body: { padding: '20px' } }}
    >
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 12, fill: '#666' }}
            axisLine={{ stroke: '#d9d9d9' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#666' }}
            axisLine={{ stroke: '#d9d9d9' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          />
          {showLegend && <Legend />}

          {lines.map((lineKey, index) => (
            <Line
              key={lineKey}
              type="monotone"
              dataKey={lineKey}
              stroke={colors[index % colors.length]}
              strokeWidth={3}
              dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              connectNulls={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default MultiLineChart;
