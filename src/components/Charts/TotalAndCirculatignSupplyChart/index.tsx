import { memo } from "react";
import ReactApexcharts from "../apex-charts";
import { ApexOptions } from "apexcharts";
import moment from "moment";

type ChartProps = {
  data: {
    color: string;
    data: {
      x: string;
      y: number;
    }[];
    name: string;
  }[];
  locale?: any;
};

export const TotalAndCirculatingSupplyChart = memo((props: ChartProps) => {
  const { data, locale } = props;
  const textColor = "rgb(102, 102, 102)";

  const options: ApexOptions = {
    chart: {
      type: "line",
      parentHeightOffset: 0,
      background: "transparent !important",
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    legend: {
      show: false,
    },
    colors: data.map((i) => i.color),
    xaxis: {
      tickAmount: 8,
      offsetY: 8,
      type: "datetime",
      labels: {
        rotate: 0,
        style: {
          colors: "#ddd",
        },
        formatter: (value) => {
          return moment(value).format("DD/MM/YYYY");
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        color: textColor,
      },
      title: {
        text: locale?.date,
        style: { color: "#ddd" },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#ddd",
        },
        formatter: (value) => {
          return value.toLocaleString();
        },
      },
      tickAmount: 5,
      title: { text: locale.supply, style: { color: "#ddd" } },
      axisBorder: { show: true, color: textColor },
    },
    stroke: {
      curve: "straight",
      width: 3,
    },
    grid: {
      show: false,
    },
    tooltip: {
      marker: {
        show: false,
      },
      theme: "dark",
    },
    responsive: [
      {
        breakpoint: 1120,
        options: {
          xaxis: {
            tickAmount: 3,
            labels: {
              rotate: -45, // Reset rotation for wider screens
            },
            title: {
              text: undefined,
            },
          },
          yaxis: {
            title: { text: undefined },
            labels: {
              style: { colors: "#ddd" },
              formatter: (value: string) => {
                return value.toLocaleString();
              },
            },
            axisBorder: { show: true, color: textColor },
          },
        },
      },
      {
        breakpoint: 400,
        options: {
          xaxis: {
            tickAmount: 4,
            labels: {
              rotate: -45,
            },
          },
        },
      },
    ],
  };

  return (
    <ReactApexcharts
      options={options}
      series={data?.map((i) => ({
        name: i.name,
        data: i.data,
      }))}
      type="line"
      height={550}
      width={"100%"}
    />
  );
});

export default TotalAndCirculatingSupplyChart;

TotalAndCirculatingSupplyChart.displayName = "TotalAndCirculatingSupplyChart";
