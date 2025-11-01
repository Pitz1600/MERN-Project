// PieChartStats.jsx

export const categoryResults = [
  {
    label: 'Reviewable',
    value: 35,
    color: '#FFFF00',
  },
  {
    label: 'Biased',
    value: 45,
    color: '#FF7F7F',
  },
  {
    label: 'Neutral',
    value: 25,
    color: '#00FF00',
  },
];

export const valueFormatter = (item) => `${item.value}%`;
