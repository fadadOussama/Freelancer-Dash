"use client";

import { donutChartType } from "@/type";
import { Card, Title, DonutChart, Subtitle } from "@tremor/react";

type Props = {
  donutChartArray: donutChartType;
};

export default function DonutChartComp({ donutChartArray }: Props) {
  return (
    <div className="md:pl-4 w-full md:basis-1/3 md:w-1/3">
      <Card>
        <Title className="lg:text-lg text-base">Clients Referral Source</Title>
        <Subtitle className="text-sm">Explore how your clients are distributed across different referral sources.</Subtitle>

        <DonutChart
          className="my-12 mx-auto lg:h-56 lg:w-56"
          variant={"pie"}
          data={donutChartArray}
          category="number"
          index="name"
          showAnimation={true}
          onValueChange={() => {}}
          noDataText="No clients data."
        />
      </Card>
    </div>
  );
}
