import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import "echarts-liquidfill";

type Props = {
  value: number;
}

export default function LiquidGraph({ value }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    chart.setOption({
      series: [
        {
          type: "liquidFill",
          data: [value / 100],
          radius: "80%",
          color: ["#38bdf8"],
          label: {
            formatter: `${value}%`,
            color: "#fff",
          }
        }
      ]
    });

    return () => chart.dispose();
  }, [value]);

  return <div ref={chartRef} className="h-full w-full"></div>
}