/**
 * Unit tests for CSV utilities
 *
 * Проверяет парсинг, экспорт, валидацию и обработку ошибок.
 */

import { parseCSV, exportCSV, validateCSV, CSVRow } from '../utils/csvUtils';

const csvText = 'id,name\nu1,Alice\nu2,Bob';
const csvRows: CSVRow[] = [
  { id: 'u1', name: 'Alice' },
  { id: 'u2', name: 'Bob' },
];

describe('CSV Utils', () => {
  it('parses CSV text to array of objects', () => {
    const rows = parseCSV(csvText);
    expect(rows).toEqual(csvRows);
  });

  it('exports array of objects to CSV text', () => {
    const csv = exportCSV(csvRows);
    expect(csv).toContain('id,name');
    expect(csv).toContain('u1,Alice');
  });

  it('validates required fields', () => {
    expect(validateCSV(csvRows, ['id', 'name'])).toBe(true);
    expect(validateCSV(csvRows, ['id', 'email'])).toBe(false);
  });

  it('handles empty input', () => {
    expect(parseCSV('')).toEqual([]);
    expect(exportCSV([])).toBe('');
  });
}); 