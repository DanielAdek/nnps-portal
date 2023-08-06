import * as XLSX from 'xlsx';

export const convertXlsToJson = (content, isBinaryString) => {
  const workbook = XLSX.read(content, { type: isBinaryString ? "binary" : "array" })

  const sheet_name_list = workbook.SheetNames[0];

  const jsonFromExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list], { header:1 });

  const [headers, ...dataRows] = jsonFromExcel;

  const formattedData = dataRows
    .filter((row) => row.some((cell) => cell !== null && cell !== '')) // remove empty cells
    .map((row) =>
      headers.reduce((rowData, header, index) => {
        rowData[header] = row[index];
        return rowData;
      }, {})
    );

  return formattedData;
}
