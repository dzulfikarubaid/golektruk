import React, { useRef } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';

interface DataEntry {
  scope: string;
  count: number;
}

interface AllData {
  [date: string]: DataEntry[];
}

interface TableProps {
  data: AllData,

}
const Table = ({ data }: TableProps) => {
  const tableRef = useRef(null);

  if (data == null) {
    return null;
  }

  const uniqueDates = Object.keys(data).sort();

  const uniqueScopes = [...new Set(Object.values(data).flatMap(item => item.map(entry => entry.scope)))];
  const formatDay = (dateString: string) => {
    const date = new Date(dateString);
    return date.getDate();
  };

  return (
    <>
      <div className='flex justify-end'>
        <DownloadTableExcel
          filename="analytics"
          sheet="analytics"
          currentTableRef={tableRef.current}
        >
          <button className='rounded-xl p-2 px-3 bg-green-500 hover:bg-green-600 text-white mb-4'>Export</button>
        </DownloadTableExcel>
      </div>
      <div className="overflow-x-auto">
        <table ref={tableRef} className="table-auto min-w-full text-center ">
          <thead>
            <tr>
              <th className="border p-2 border-black bg-green-50">Scope</th>
              <th className="border border-black p-2 bg-green-50">Total</th>
              {uniqueDates.map(date => (
                <th key={date} className="border border-black p-2 bg-green-50">{formatDay(date)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {uniqueScopes.map(scope => (
              <tr key={scope}>
                <td className="border px-2 border-black">{scope}</td>
                <td className="border px-2 border-black">
                  {uniqueDates.reduce((total, date) => total + (data[date]?.find(item => item.scope === scope)?.count || 0), 0)}
                </td>
                {uniqueDates.map(date => (
                  <td key={date} className="border border-black px-2 ">
                    {(data[date]?.find(item => item.scope === scope)?.count) || 0}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;