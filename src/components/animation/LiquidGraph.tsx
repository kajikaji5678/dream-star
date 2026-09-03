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
          data: [value / 100, (value / 100) * 0.8],
          radius: "90%",
          color: ["#38bdf8"],
          amplitude: 2.5,
          label: {
            formatter: `${value}%`,
            color: "#fff",
          },
          waveAnimation: true,
          outline: {
            show: false
          },
          animationDuration: 1200,
          animationDurationUpdate: 1200,
        }
      ]
    });

    return () => chart.dispose();
  }, [value]);

  return <div ref={chartRef} className="h-[150px] w-[150px] absolute top-3 left-3"></div>
}