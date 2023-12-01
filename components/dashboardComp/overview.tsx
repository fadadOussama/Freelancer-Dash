import React from "react";
import BarChartComp from "./overviewComp/barChart";
import DonutChartComp from "./overviewComp/donutChart";
import { barChartType, donutChartType } from "@/type";

type Props = {
  barChartProjects: barChartType;
  donutChartArray: donutChartType;
};

export default function Overview({ barChartProjects, donutChartArray }: Props) {
  return (
    <div className="flex flex-wrap gap-y-8 my-10">
      <BarChartComp barChartProjects={barChartProjects} />
      <DonutChartComp donutChartArray={donutChartArray} />
    </div>
  );
}
