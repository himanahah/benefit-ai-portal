/**
 * CSV Utilities for AI/ML
 *
 * Provides functions for parsing, exporting, and validating CSV files.
 * All logic is ready for real backend/API integration.
 *
 * Используется для загрузки пользователей, льгот, истории покупок и т.д.
 */

// Типы для CSV-данных
export interface CSVRow {
  [key: string]: string | number;
}

/**
 * Парсинг CSV-строки в массив объектов
 * @param csvText - CSV string
 * @returns Массив объектов
 */
export function parseCSV(csvText: string): CSVRow[] {
  // TODO: Использовать реальную библиотеку (например, PapaParse)
  const [headerLine, ...lines] = csvText.trim().split('\n');
  const headers = headerLine.split(',');
  return lines.map(line => {
    const values = line.split(',');
    const row: CSVRow = {};
    headers.forEach((h, i) => {
      row[h.trim()] = values[i]?.trim() ?? '';
    });
    return row;
  });
}

/**
 * Экспорт массива объектов в CSV-строку
 * @param rows - Массив объектов
 * @returns CSV string
 */
export function exportCSV(rows: CSVRow[]): string {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const csv = [headers.join(',')];
  for (const row of rows) {
    csv.push(headers.map(h => String(row[h] ?? '')).join(','));
  }
  return csv.join('\n');
}

/**
 * Валидация структуры CSV
 * @param rows - Массив объектов
 * @param requiredFields - Список обязательных полей
 * @returns true/false
 */
export function validateCSV(rows: CSVRow[], requiredFields: string[]): boolean {
  return rows.every(row => requiredFields.every(f => f in row));
}

// TODO: Добавить интеграцию с бекендом для массового импорта/экспорта 