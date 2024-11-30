import { ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";

interface RadialStackedProps {
  percentage: number;
  title: string;
}

export function RadialStacked({ percentage, title }: RadialStackedProps) {
  const data = [
    {
      name: title,
      value: percentage,
      fill: "hsl(var(--primary))",
    },
  ];

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="80%"
          barSize={10}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar
            background
            dataKey="value"
            cornerRadius={30}
            fill="hsl(var(--primary))"
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center text-sm font-medium">
        {percentage}%
      </div>
    </div>
  );
}