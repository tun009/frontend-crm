import MultiLineChart from '@/components/common/MultiLineChart';
import { weeklyActivityData } from '@/mocks/chartData';

const CO2EmissionsChart = () => {
  const colors = [
    '#1890ff', // Blue for Workout
    '#52c41a', // Green for Call parents
    '#722ed1', // Purple for Eat breakfast
  ];

  const lines = ['Workout', 'Call parents', 'Eat breakfast'];

  return (
    <MultiLineChart
      data={weeklyActivityData}
      title="Weekly Activity Tracking"
      height={450}
      colors={colors}
      showLegend={true}
      smooth={true}
      yAxisLabel="Frequency"
      xAxisLabel="Week"
      className="mb-6"
      lines={lines}
    />
  );
};

export default CO2EmissionsChart;
