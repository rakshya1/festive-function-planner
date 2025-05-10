
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface DataItem {
  name: string;
  count: number;
}

interface EventsChartProps {
  data: DataItem[];
}

const EventsChart = ({ data }: EventsChartProps) => {
  // Define chart config for better theming
  const chartConfig = {
    events: {
      label: "Events",
      theme: {
        light: "#9b87f5",
        dark: "#9b87f5"
      },
    }
  };

  return (
    <ChartContainer config={chartConfig} className="w-full h-[300px]">
      <BarChart
        data={data}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <Tooltip content={<ChartTooltipContent />} />
        <Bar 
          dataKey="count" 
          name="events"
          fill="var(--color-events)" 
          radius={[4, 4, 0, 0]} 
          barSize={30}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default EventsChart;
