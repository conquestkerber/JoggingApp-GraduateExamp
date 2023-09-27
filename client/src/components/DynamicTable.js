import React, { useState } from "react";

const DynamicTable = () => {
  const [tableData, setTableData] = useState([]);
  const numRows = 5; // Set the number of rows (you can change this)
  const numCols = 12; // Set the maximum number of columns (you can change this)

  console.log(tableData)

  // Initialize the table data with empty values
  if (tableData.length === 0) {
    const initialData = [];
    for (let i = 0; i < numRows; i++) {
      const rowData = Array(numCols).fill("");
      initialData.push(rowData);
    }
    setTableData(initialData);
  }

  const handleCellClick = (rowIndex, colIndex) => {
    const newValue = prompt("Enter data:");
    if (newValue !== null) {
      const updatedData = [...tableData];
      updatedData[rowIndex][colIndex] = newValue;
      setTableData(updatedData);
    }
  };

  return (
    <div>
      <table>
        <tbody>
          {tableData.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {rowData.map((cellData, colIndex) => (
                <td key={colIndex} onClick={() => handleCellClick(rowIndex, colIndex)}>
                  {cellData}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <pre>{JSON.stringify(tableData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default DynamicTable;
            