import React from 'react';
import type { CPU } from '../utils';

export type SortDirection = 'asc' | 'desc' | null;
export interface SortConfig {
  key: keyof CPU | 'socket';
  direction: SortDirection;
}

interface Column {
  key: keyof CPU | 'socket';
  label: string;
  numeric?: boolean;
}

const columns: Column[] = [
  { key: 'brand', label: 'Brand' },
  { key: 'model', label: 'Model' },
  { key: 'socket', label: 'Socket' },
];

interface Props {
  cpus: CPU[];
  sortConfig: SortConfig;
  onSortChange: (config: SortConfig) => void;
  onSelect: (cpu: CPU) => void;
}

export const CPUList: React.FC<Props> = ({ cpus, sortConfig, onSortChange, onSelect }) => {
  const handleHeaderClick = (column: Column) => {
    let direction: SortDirection = 'asc';
    if (sortConfig.key === column.key) {
      if (sortConfig.direction === 'asc') direction = 'desc';
      else if (sortConfig.direction === 'desc') direction = null;
    }
    onSortChange({ key: column.key, direction });
  };

  const sorted = React.useMemo(() => {
    if (!sortConfig.direction) return cpus;
    const sortedList = [...cpus].sort((a, b) => {
      let aValue: any = sortConfig.key === 'socket' ? a.socket.name : a[sortConfig.key];
      let bValue: any = sortConfig.key === 'socket' ? b.socket.name : b[sortConfig.key];
      if (typeof aValue === 'string') {
        return aValue.localeCompare(bValue);
      }
      return aValue - bValue;
    });
    return sortConfig.direction === 'asc' ? sortedList : sortedList.reverse();
  }, [cpus, sortConfig]);

  return (
    <table className="cpu-table">
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key as string} onClick={() => handleHeaderClick(col)} className={col.numeric ? 'numeric' : ''}>
              {col.label}
              {sortConfig.key === col.key && (
                <span> {sortConfig.direction === 'asc' ? '↑' : sortConfig.direction === 'desc' ? '↓' : ''}</span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map(cpu => (
          <tr key={cpu.id} onClick={() => onSelect(cpu)} className="clickable-row">
            <td>{cpu.brand}</td>
            <td>{cpu.model}</td>
            <td>{cpu.socket.name}</td>
            {/* only brand, model, socket visible; actions moved to modal */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};