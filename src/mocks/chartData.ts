// Mock data for dashboard charts - Recharts format
export interface RechartsDataPoint {
  time: string;
  [key: string]: string | number;
}

// Smooth multi-line chart data (3 lines only)
export const weeklyActivityData: RechartsDataPoint[] = [
  {
    time: 'Feb 10, 2013',
    Workout: 5,
    'Call parents': 5,
    'Eat breakfast': 3,
  },
  {
    time: 'Feb 17, 2013',
    Workout: 3,
    'Call parents': 3,
    'Eat breakfast': 2,
  },
  {
    time: 'Feb 24, 2013',
    Workout: 3,
    'Call parents': 2,
    'Eat breakfast': 1,
  },
  {
    time: 'Mar 3, 2013',
    Workout: 1,
    'Call parents': 0,
    'Eat breakfast': 0,
  },
  {
    time: 'Mar 10, 2013',
    Workout: 4,
    'Call parents': 2,
    'Eat breakfast': 2,
  },
  {
    time: 'Mar 17, 2013',
    Workout: 3,
    'Call parents': 1,
    'Eat breakfast': 2,
  },
  {
    time: 'Mar 24, 2013',
    Workout: 2,
    'Call parents': 1,
    'Eat breakfast': 3,
  },
  {
    time: 'Mar 31, 2013',
    Workout: 3,
    'Call parents': 0,
    'Eat breakfast': 0,
  },
];
