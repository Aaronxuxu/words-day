import React, { useRef, useEffect } from "react";

import * as echarts from "echarts/core";
import { GaugeChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([GaugeChart, CanvasRenderer]);

const option = {
  series: [
    {
      name: "hour",
      type: "gauge",
      startAngle: 90,
      endAngle: -270,
      min: 0,
      max: 12,
      splitNumber: 12,
      clockwise: true,
      radius: "100%",
      axisLine: {
        lineStyle: {
          width: 0,
        },
      },

      axisLabel: {
        fontSize: 0,
        distance: "1",
        formatter: function (value) {
          if (value === 0) {
            return "";
          }
          return value + "";
        },
      },
      pointer: {
        icon: "path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z",
        width: "5%",
        length: "55%",
        offsetCenter: [0, "8%"],
        itemStyle: {
          color: "#C0911F",
          shadowColor: "rgba(0, 0, 0, 0.3)",
          shadowBlur: 8,
          shadowOffsetX: 2,
          shadowOffsetY: 4,
        },
      },
      detail: {
        show: false,
      },
      title: {
        offsetCenter: [0, "30%"],
      },
      data: [
        {
          value: 0,
        },
      ],
    },
    {
      name: "minute",
      type: "gauge",
      startAngle: 90,
      endAngle: -270,
      min: 0,
      max: 60,
      clockwise: true,

      radius: "100%",
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      pointer: {
        icon: "path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z",
        width: 8,
        length: "50%",
        offsetCenter: [0, "8%"],
        itemStyle: {
          color: "#C0911F",
          shadowColor: "rgba(0, 0, 0, 0.3)",
          shadowBlur: 8,
          shadowOffsetX: 2,
          shadowOffsetY: 4,
        },
      },
      detail: {
        show: false,
      },
      title: {
        offsetCenter: ["0%", "-40%"],
      },
      data: [
        {
          value: 0,
        },
      ],
    },
    {
      name: "second",
      type: "gauge",
      startAngle: 90,
      endAngle: -270,
      min: 0,
      max: 60,
      radius: "100%",
      animationEasingUpdate: "bounceOut",
      clockwise: true,
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      pointer: {
        icon: "path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z",
        width: 4,
        length: "85%",
        offsetCenter: [0, "8%"],
        itemStyle: {
          color: "#C0911F",
          shadowColor: "rgba(0, 0, 0, 0.3)",
          shadowBlur: 8,
          shadowOffsetX: 2,
          shadowOffsetY: 4,
        },
      },
      anchor: {
        show: true,
        size: 15,
        showAbove: true,
        itemStyle: {
          color: "#C0911F",
          shadowColor: "rgba(0, 0, 0, 0.3)",
          shadowBlur: 8,
          shadowOffsetX: 2,
          shadowOffsetY: 4,
        },
      },
      detail: {
        show: false,
      },
      title: {
        offsetCenter: ["0%", "-40%"],
      },
      data: [
        {
          value: 0,
        },
      ],
    },
  ],
};

function MyGaugeChart() {
  const GaugeRef = useRef();

  useEffect(() => {
    let ref = GaugeRef.current;
    let myChart = echarts.init(ref);
    myChart.setOption(option);
    return () => {
      myChart.dispose();
    };
  }, []);

  return <div style={{ width: "100%", height: "100px" }} ref={GaugeRef}></div>;
}

export default MyGaugeChart;
