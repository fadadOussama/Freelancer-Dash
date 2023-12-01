"use client";

import { barChartType } from "@/type";
import { Card, Title, BarChart, Subtitle } from "@tremor/react";

type Props = {
  barChartProjects: barChartType;
};

export default function BarChartComp({ barChartProjects }: Props) {
  return (
    <div className="md:pr-4 w-full md:basis-2/3 md:w-2/3">
      <Card className="h-full">
        <Title className="lg:text-lg text-base">Project Types Distribution</Title>
        <Subtitle className="text-sm">Explore a detailed breakdown of how many projects you have for each specific project type.</Subtitle>
        <BarChart
          className="mt-6"
          data={barChartProjects}
          showAnimation={true}
          index="name"
          categories={["Project type count"]}
          colors={["red"]}
          noDataText="No project data."
        />
      </Card>
    </div>
  );
}
