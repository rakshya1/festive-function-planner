
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, BarChart2, Banknote } from "lucide-react";

interface StatsOverviewProps {
  data: {
    totalEvents: number;
    activeEvents: number;
    totalAttendees: number;
    totalRevenue: number;
    eventsToday: number;
  };
}

const StatsOverview = ({ data }: StatsOverviewProps) => {
  const stats = [
    {
      title: "Total Events",
      value: data.totalEvents,
      change: "+12% from last month",
      icon: <Calendar className="h-5 w-5 text-event-primary" />,
    },
    {
      title: "Active Events",
      value: data.activeEvents,
      change: "+5% from last month",
      icon: <BarChart2 className="h-5 w-5 text-event-secondary" />,
    },
    {
      title: "Total Attendees",
      value: data.totalAttendees,
      change: "+18% from last month",
      icon: <Users className="h-5 w-5 text-event-accent" />,
    },
    {
      title: "Total Revenue",
      value: `$${data.totalRevenue.toLocaleString()}`,
      change: "+8% from last month",
      icon: <Banknote className="h-5 w-5 text-green-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="overflow-hidden border-l-4 border-l-event-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full p-2 bg-gray-100 dark:bg-gray-800">
                {stat.icon}
              </div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</h4>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;
