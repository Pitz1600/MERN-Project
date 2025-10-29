// PieChartElement.jsx
import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { categoryResults, valueFormatter } from './PieChartStats';

export default function PieArcLabel() {
  return (
    <PieChart
      series={[
        {
          data: categoryResults,
          arcLabel: (item) => `${item.label}\n${item.value}%`,
          arcLabelMinAngle: 20,
          arcLabelRadius: '60%',
          valueFormatter,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fontWeight: 'bold',
          fontSize: 12,
          textAlign: 'center',
        },
      }}
      width={300}
      height={300}
    />
  );
}
