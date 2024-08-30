import React, { useMemo } from "react";
import Card from "components/card";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import data from '../../../rtl/default/variables/top_repos (1).json';

const CheckTable = () => {
  const columnsData = useMemo(() => [
    {
      Header: "1-day",
      accessor: (_, index) => index + 1
    },
    {
      Header: "Rank",
      accessor: "name"
    },
    {
      Header: "Stars",
      accessor: "stars"
    },
    {
      Header: "Stars 28 days",
      accessor: "stars_last_28_days"
    },
    {
      Header: "Stars 7 days",
      accessor: "stars_last_7_days"
    },
    {
      Header: "1 day",
      accessor: () => 46
    }
  ], []);

  const tableData = useMemo(() => data, [data]);

  const tableInstance = useTable(
    {
      columns: columnsData,
      data: tableData,
    },
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Top Repositories
        </div>
      </header>

      <div className="my-6 overflow-x-scroll xl:overflow-x-hidden text-left">
        <table
          {...getTableProps()}
          className="w-full"
          variant="simple"
          color="gray-500"
          mb="24px"
        >
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="border-b border-gray-200 px-4 pb-[10px] text-start dark:!border-navy-700"
                    key={index}
                  >
                    <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = (
                      <p
                        className={`text-sm font-bold ${
                          ["stars", "stars_last_28_days", "stars_last_7_days"].includes(cell.column.id)
                            ? "text-green-500"
                            : "text-navy-700 dark:text-white"
                        }`}
                      >
                        {cell.value}
                      </p>
                    );
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={index}
                        className="pt-[14px] pb-[16px] px-4 text-left sm:text-[14px]"
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CheckTable;
