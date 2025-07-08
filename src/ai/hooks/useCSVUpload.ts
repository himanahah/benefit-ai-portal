/**
 * useCSVUpload React Hook
 *
 * Позволяет загружать и обрабатывать CSV-файлы через UI.
 * Готово для интеграции с реальным API.
 */

import { useState } from 'react';
import { parseCSV, CSVRow } from '../utils/csvUtils';

export function useCSVUpload() {
  const [data, setData] = useState<CSVRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = parseCSV(text);
        setData(parsed);
        setError(null);
      } catch (err) {
        setError('Ошибка парсинга CSV');
      }
    };
    reader.readAsText(file);
  }

  return { data, error, handleFile };
} 