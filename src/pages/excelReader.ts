import * as XLSX from "xlsx";

export function getExcelData(
  filePath: string,
  sheetName: string,
  rowNumber: number,
  columnName: string,
): string {
  const workbook = XLSX.readFile(filePath);

  const worksheet = workbook.Sheets[sheetName];

  const data = XLSX.utils.sheet_to_json<any>(worksheet);

  const row = rowNumber - 1;

  const value = data[row][columnName];

  return String(value);
}
