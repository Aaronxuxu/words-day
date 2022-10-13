import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { TooltipComponent, LegendComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { VisualMapComponent } from "echarts/components";

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  VisualMapComponent,
]);

function MyPercentChart(props) {
  const { item = [0, 100] } = props;

  const percent = parseFloat((item[0] / item[1]).toFixed(2)) * 100;

  const PercentChart = useRef();
  const option = {
    title: {
      text: `${percent}%`,
      left: "center",
      top: "middle",
      textStyle: {
        color: "#1890fe",
      },
    },
    visualMap: {
      show: false,
    },
    series: [
      {
        type: "pie",
        //环形显示饼状图，实际上显示的是50-80之间的部分
        //上限不建议设置为100，echarts自带动画效果，设置为100动画效果很丑
        radius: ["55%", "80%"],
        center: ["50%", "50%"],
        data: [
          //itemSyle是单项的背景颜色设置。
          { value: percent, itemStyle: { color: "#fff" } },
          { value: 100 - percent, itemStyle: { color: "#1890fe" } },
        ],
        label: {
          //将视觉引导图关闭
          show: false,
        },
        itemStyle: {
          //设置的是每项之间的留白
          borderWidth: 7,
          borderColor: "#f7f8fa",
        },
      },
    ],
  };

  useEffect(() => {
    let myChart = PercentChart.current;

    myChart = echarts.init(PercentChart.current);

    myChart.setOption(option, true);

    window.addEventListener("resize", () => {
      myChart && myChart.resize();
    });

    return () => {
      if (myChart) {
        myChart.dispose();
        myChart = undefined;
      }

      window.removeEventListener("resize", () => {
        myChart && myChart.resize();
      });
    };
  }, [item]);

  return <div className="w-echart" ref={PercentChart}></div>;
}

export default MyPercentChart;
