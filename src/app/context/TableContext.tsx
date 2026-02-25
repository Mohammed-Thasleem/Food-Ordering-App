import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Table } from '../types';

interface TableContextType {
  table: Table | null;
  setTable: (table: Table) => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [table, setTable] = useState<Table | null>(null);

  return (
    <TableContext.Provider value={{ table, setTable }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTable must be used within a TableProvider');
  }
  return context;
};
