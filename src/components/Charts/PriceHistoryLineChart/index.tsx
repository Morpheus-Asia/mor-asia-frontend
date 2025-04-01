import { memo } from "react";
import ReactApexcharts from "../apex-charts";
import { ChartProps } from "../props";
import { ApexOptions } from "apexcharts";
import moment from "moment";
import { TabMapping } from "morpheus-asia/containers/MetricsPriceHistory/props";

type PriceHistoryLineChartProps = ChartProps & {
  type?: TabMapping;
};

export const PriceHistoryLineChart = memo(
  (props: PriceHistoryLineChartProps) => {
    const { data, type } = props;
    const textColor = "rgb(102, 102, 102)";
    const options: ApexOptions = {
      chart: {
        type: "line",
        background: "transparent",
        zoom: { enabled: false },
        toolbar: { show: false },
      },
      colors: ["#00DC8D"],
      stroke: { curve: "straight", width: 2 },
      markers: { size: 0 },
      grid: {
        show: false,
      },
      xaxis: {
        tickAmount: type === "day" ? 8 : 10,
        type: "category",
        labels: {
          rotate: 0,
          show: true,
          style: { colors: "#ddd" },
          formatter: function (value) {
            if (type === "week") {
              return moment(value, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY");
            }
            if (type === "day") {
              return moment(value, "DD/MM/YYYY hh:mm A").format("hh:mm A");
            }
            return value;
          },
        },
        title: {
          text: type === "day" ? "Time" : "Date",
          style: { color: "#ddd" },
        },
        axisBorder: { show: true, color: textColor },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: { style: { colors: "#ddd" } },
        title: { text: "Price (USD)", style: { color: "#ddd" } },
        axisBorder: { show: true, color: textColor },
      },
      tooltip: {
        marker: {
          show: false,
        },
        theme: "dark",
        x: {
          formatter: function (value, { w }) {
            if (type === "week") {
              return moment(data?.series?.[value - 1][0]).format(
                "DD/MM/YYYY HH:mm"
              );
            }
            if (type === "day") {
              return moment(data?.series?.[value - 1][0]).format(
                "DD/MM/YYYY hh:mm A"
              );
            }
            return w.globals.categoryLabels[value - 1];
          },
        },
        y: {
          formatter: (val) => {
            return `$${val}`;
          },
          title: {
            formatter: () => {
              return "Price (USD)";
            },
          },
        },
      },
      responsive: [
        {
          breakpoint: 1120,
          options: {
            xaxis: {
              labels: {
                rotate: -45,
              },
              title: {
                text: undefined,
              },
            },
            yaxis: {
              title: { text: undefined },
              labels: { style: { colors: "#ddd" } },
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

    const seriesData = data?.series?.map(([timestamp, value]) => {
      let formattedX;

      if (type === "day") {
        formattedX = moment(timestamp).format("DD/MM/YYYY hh:mm A"); // Show hour only
      } else if (type === "week") {
        formattedX = moment(timestamp).format("DD/MM/YYYY HH:mm"); // Show day + hour
      } else {
        formattedX = timestamp;
      }

      return {
        x: formattedX,
        y: parseFloat(value),
      };
    });

    return (
      <ReactApexcharts
        options={options}
        series={[{ data: seriesData ?? [] }]}
        type="line"
        height={550}
        width={"100%"}
      />
    );
  }
);

PriceHistoryLineChart.displayName = "PriceHistoryLineChart";
