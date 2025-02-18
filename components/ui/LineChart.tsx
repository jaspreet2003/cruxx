"use client"
import React from "react";
import { Line } from "react-chartjs-2";
import { ChartOptions, Tick } from "chart.js";
import "chart.js/auto";

interface ChartDataItem {
  [key: string]: number | string;
}

interface LineChartProps {
  data: ChartDataItem[];
  index: string;
  categories: string[];
  valueFormatter: (tickValue: string | number, index: number, ticks: Tick[]) => string | number | string[] | number[] | null | undefined;
  yAxisWidth: number;
  startEndOnly: boolean;
  connectNulls: boolean;
  showLegend: boolean;
  showTooltip: boolean;
  xAxisLabel: string;
  livePrice?: number | null;
  
}



const LineChart: React.FC<LineChartProps> = ({
  data,
  index,
  categories,
  valueFormatter,
  yAxisWidth,
  startEndOnly,
  connectNulls,
  showLegend,
  showTooltip,
  xAxisLabel,
}) => {
  const chartData = {
    labels: data.map((item: ChartDataItem) => item[index]),
    datasets: categories.map((category: string) => ({
      label: category,
      data: data.map((item: ChartDataItem) => item[category]),
      fill: false,
      borderColor: "rgba(75,192,192,1)",
      tension: 0.1,
    })),
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
      },
      tooltip: {
        enabled: showTooltip,
      },
    },
    scales: {
      x: {
        title: {
          display: !!xAxisLabel,
          text: xAxisLabel,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Price (USD)",
        },
        ticks: {
          callback: valueFormatter,
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export { LineChart, type LineChartProps };
