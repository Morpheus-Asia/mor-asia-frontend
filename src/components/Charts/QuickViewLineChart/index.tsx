import React, { memo } from "react";
import { ApexOptions } from "apexcharts";

import { ChartProps } from "../props";
import ReactApexcharts from "../apex-charts";

export const QuickView24HrLineChart = memo(function LineChart(
  props: ChartProps
) {
  const { colors, data } = props;
  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      background: "transparent !important",
      type: "line",
      zoom: { enabled: false },
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    colors: colors,
    stroke: { show: true, curve: "monotoneCubic", width: 2 },
    dataLabels: { enabled: false },
    markers: {
      size: 1,
      strokeWidth: 0,
      strokeOpacity: 0,
      colors: ["#00DC8D"],
      strokeColors: colors,
    },
    tooltip: {
      enabled: false,
    },

    yaxis: {
      show: false,
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 120,
          },
        },
      },
    ],
  };
  return (
    <ReactApexcharts
      type="line"
      options={options}
      series={[{ data: data?.series ?? [] }]}
      height={"100px"}
      width={"100%"}
    />
  );
});

export default QuickView24HrLineChart;
