import SubTrendsBarChart from "views/admin/default/components/SubTrendsBarChart";
import Trends from "views/admin/default/components/Trends";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import Repo from "../../../assets/dashboard/repo.png";
import Isssue from "../../../assets/dashboard/issue.png";
import Fork from "../../../assets/dashboard/forks.png";
import Star from "../../../assets/dashboard/stars.png";
import Owner from "../../../assets/dashboard/owner.png";
import Org from "../../../assets/dashboard/organization.png";
import SubTheme from "./components/SubTheme";

const Dashboard = () => {
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 3xl:grid-cols-6">
        <Widget
          icon={<img src={Repo} alt="repo" className="h-10 w-10" />}
          title={"Repositories"}
          subtitle={"10"}
        />
        <Widget
          icon={<img src={Isssue} alt="repo" className="h-10 w-10" />}
          title={"Issues"}
          subtitle={"123"}
        />
        <Widget
          icon={<img src={Fork} alt="repo" className="h-10 w-10" />}
          title={"Forks"}
          subtitle={"456"}
        />
        <Widget
          icon={<img src={Star} alt="repo" className="h-10 w-10" />}
          title={"Stars"}
          subtitle={"765"}
        />
        <Widget
          icon={<img src={Owner} alt="repo" className="h-10 w-10" />}
          title={"Repo Owners"}
          subtitle={"10"}
        />
        <Widget
          icon={<img src={Org} alt="repo" className="h-10 w-10" />}
          title={"Organizations"}
          subtitle={"20"}
        />
      </div>

      {/* Charts */}
      <div className="mt-5 grid grid-cols-1">
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5">
        <Trends />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1">
        <div>
          <SubTheme />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1">
        <div>
          <SubTrendsBarChart />
        </div>
      </div>
      <div className="gird mt-5 grid-cols-1">
        <div>
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={tableDataComplex}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
