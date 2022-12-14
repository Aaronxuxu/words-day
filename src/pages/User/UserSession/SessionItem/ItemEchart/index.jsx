import React, { useRef, useEffect } from "react";
import * as echarts from "echarts/core";
import { TitleComponent, TooltipComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  TooltipComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

const obj = {
  words: "单词",
  phrases: "常见短语",
  fixedcol: "固定搭配",
  examplesentence: "真题例句",
};

function ItemEchart(props) {
  const { pickPer } = props;
  const data = Object.keys(pickPer)
    .map((e) => ({
      value: pickPer[e].number,
      name: obj[e],
    }))
    .sort((a, b) => b.value - a.value);

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    series: {
      name: "词汇数据占比",
      type: "pie",
      radius: "70%",
      roseType: "radius",
      center: ["50%", "50%"],
      itemStyle: {
        borderRadius: 5,
      },
      label: {
        show: false,
      },
      data: data,
    },
  };

  const ItemEchartRef = useRef();

  useEffect(() => {
    const cur = ItemEchartRef.current;
    let myChart = echarts.init(cur);
    myChart.setOption(option);
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
  }, []);

  return <div className="w-echart" ref={ItemEchartRef} />;
}

export default ItemEchart;
