import React, { useMemo } from 'react';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import Card from 'components/card';
import tableData from "../../../rtl/default/variables/top_repos (1).json";

const ComplexTable = () => {
  const columns = useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id'
    },
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Description',
      accessor: 'description'
    },
    {
      Header: 'Tags',
      accessor: 'tags',
      Cell: ({ cell: { value } }) => value.join(', ')
    },
    {
      Header: 'Traction Score',
      accessor: 'traction_score'
    },
    {
      Header: 'Year of Creation',
      accessor: 'year_of_creation'
    },
    {
      Header: 'Main Language',
      accessor: 'main_language'
    },
    {
      Header: 'Stars',
      accessor: 'stars'
    },
    {
      Header: 'Contributors',
      accessor: 'contributors'
    }
  ], []);

  const data = useMemo(() => tableData, []);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;

  initialState.pageSize = 5;

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Table of Repositories
        </div>
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table {...getTableProps()} className="w-full" variant="simple" color="gray-500" mb="24px">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 px-4 pb-[10px] text-left dark:!border-navy-700"
                  >
                    <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                      {column.render('Header')}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = '';
                    if (cell.column.Header === 'Tags') {
                      data = (
                        <div className="flex flex-wrap gap-2">
                          {cell.value.slice(0, 4).map((tag, i) => (
                            <span
                              key={i}
                              className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-xs font-semibold"
                            >
                              {tag}
                            </span>
                          ))}
                          {cell.value.length > 4 && (
                            <span className="text-xs font-semibold text-gray-500">+{cell.value.length - 4} more</span>
                          )}
                        </div>
                      );
                    } else {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value || 'NA'}
                        </p>
                      );
                    }
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

export default ComplexTable;
