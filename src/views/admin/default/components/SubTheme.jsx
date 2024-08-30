import Card from "components/card";
import React from "react";
import SingleLineChart from "components/charts/SingleLineChart";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";

function SubTheme() {
  return (
    <Card extra="!p-[20px]">
      <div className="text-xl font-bold text-navy-700 dark:text-white">
        Sub-Theme Trends Over Time
      </div>
      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="h-full w-full">
          <SingleLineChart
            options={lineChartOptionsTotalSpent}
            series={lineChartDataTotalSpent}
          />
        </div>
      </div>
    </Card>
  );
}

export default SubTheme;
