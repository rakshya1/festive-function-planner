
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface EventsByCategoryProps {
  data: {
    [key: string]: number;
  };
}

// Array of colors for the pie chart segments
const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA', '#8B5CF6', '#D946EF'];

const EventsByCategory = ({ data }: EventsByCategoryProps) => {
  const chartData = Object.keys(data).map((key) => ({
    name: key,
    value: data[key],
  }));

  // Create config object for the chart
  const chartConfig = chartData.reduce((acc, item, index) => {
    acc[item.name] = { 
      label: item.name,
      theme: {
        light: COLORS[index % COLORS.length],
        dark: COLORS[index % COLORS.length]
      }
    };
    return acc;
  }, {} as Record<string, any>);

  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {chartData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={`var(--color-${entry.name})`} 
            />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltipContent />} />
        <Legend layout="vertical" verticalAlign="middle" align="right" />
      </PieChart>
    </ChartContainer>
  );
};

export default EventsByCategory;
