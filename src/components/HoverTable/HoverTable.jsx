import React from 'react';

const HoverTable = () => {
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-lg dark:bg-[#1a1a46]">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700 dark:bg-[#293357] dark:text-white">
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Total Amount</th>
            <th className="p-2 text-left">Last Deposit</th>
          </tr>
        </thead>
        <tbody className="max-h-[150px] overflow-y-auto">
          <tr>
            <td className="p-2">Cash</td>
            <td className="p-2">$1,76,002</td>
            <td className="p-2">Jan 4, 2022</td>
          </tr>
          <tr className="bg-[#70D2C2] text-white">
            <td className="p-2">Time Deposits</td>
            <td className="p-2">$1,623,677</td>
            <td className="p-2">Jan 4, 2022</td>
          </tr>
          <tr>
            <td className="p-2">Marketable Securities</td>
            <td className="p-2">$1,76,002</td>
            <td className="p-2">Jan 2, 2022</td>
          </tr>
          <tr>
            <td className="p-2">Total Accts/Rec-Net</td>
            <td className="p-2">$1,76,002</td>
            <td className="p-2">Jan 6, 2022</td>
          </tr>
          <tr>
            <td className="p-2">Bad Debt Reserve</td>
            <td className="p-2">$1,76,002</td>
            <td className="p-2">Jan 8, 2022</td>
          </tr>
          <tr>
            <td className="p-2">Loans to Related Co - CP</td>
            <td className="p-2">$1,76,002</td>
            <td className="p-2">Jan 6, 2022</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HoverTable;
