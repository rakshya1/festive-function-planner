
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DataItem {
  name: string;
  count: number;
}

interface EventsChartProps {
  data: DataItem[];
}

const EventsChart = ({ data }: EventsChartProps) => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip 
            formatter={(value) => [value, 'Events']} 
            contentStyle={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: '8px', padding: '8px' }}
          />
          <Bar 
            dataKey="count" 
            fill="#9b87f5" 
            radius={[4, 4, 0, 0]} 
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EventsChart;
