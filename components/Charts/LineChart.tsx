"use client";
import { ApexOptions } from "apexcharts";
import React, { use, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

export const LineChart = ({
  invoiceForLineChart,
}: {
  invoiceForLineChart: any;
}) => {
  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#80CAEE", "#3056D3"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },

      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#80CAEE", "#3056D3"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      title: {
        text: "Tháng",
        style: {
          fontSize: "12px",
        },
      },
      categories: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: true,
      },
    },
    yaxis: {
      title: {
        text: "Tổng tiền (VND)",

        style: {
          fontSize: "12px",
        },
      },
      // min: 0,
      // max: Math.max(invoiceForLineChart.total),
    },
  };

  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: "Tổng tiền hóa đơn",
        data: invoiceForLineChart[0]?.invoicesArr || [],
      },
      {
        name: "Tổng tiền chưa thanh toán",
        data: invoiceForLineChart[0]?.invoiceNotPaid || [],
      },
    ],
  });
  useEffect(() => {
    setState({
      series: [
        {
          name: "Tổng tiền hóa đơn",
          data: invoiceForLineChart[0]?.invoicesArr || [],
        },
        {
          name: "Tổng tiền chưa thanh toán",
          data: invoiceForLineChart[0]?.invoiceNotPaid || [],
        },
      ],
    });
  }, [invoiceForLineChart]);
  return (
    <div className="col-span-8 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full  bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Tổng tiền hóa đơn</p>
              <p className="text-sm font-medium">01.01.2024- 31.12.2024</p>
            </div>
          </div>
          <div className="flex min-w-60">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#3056D3] ">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#3056D3]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold  text-[#3056D3]">
                Tổng tiền chưa thanh toán
              </p>
              <p className="text-sm font-medium">01.01.2024- 31.12.2024</p>
            </div>
          </div>
        </div>
        {/* <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white px-3 py-1 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Ngày
            </button>
            <button className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Tuần
            </button>
            <button className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Tháng
            </button>
          </div>
        </div> */}
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};
