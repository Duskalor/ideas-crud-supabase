import { useGetIdeas } from '@/hooks/useGetIdeas';
import { Idea } from '@/inteface/idea.interface';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { UserCell } from './UserCell';
import { CompletedCell } from './CompletedCell';
import { ButtonActions } from './ButtonActions.';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Input } from './ui/input';

const columns: ColumnDef<Idea>[] = [
  {
    accessorKey: 'user.full_name',
    header: 'Name',
    cell: UserCell,
  },
  {
    accessorKey: 'idea',
    header: 'Idea',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: ({ getValue }: any) => (
      <span className='text-tableFont'>{getValue()}</span>
    ),
  },
  {
    accessorKey: 'completed',
    header: () => <span className=' flex justify-center'>Status</span>,
    cell: CompletedCell,
  },
  {
    accessorKey: 'created_at',
    header: () => {
      return <span className=' flex justify-center'>Date</span>;
    },
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      return (
        <span className='flex justify-center text-tableFont'>
          {dayjs(date).format('DD MMMM YYYY HH:mm')}
        </span>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: () => <span className=' flex justify-center'>Actions</span>,
    cell: ButtonActions,
  },
];

export const DataTable = () => {
  const { ideas } = useGetIdeas();
  const [filtered, setfiltered] = useState('');
  const table = useReactTable({
    data: ideas,
    columns,
    state: {
      globalFilter: filtered,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setfiltered,
  });
  return (
    <div className='p-5 w-full overflow-x-auto'>
      <Input
        placeholder='Search'
        value={filtered}
        onChange={(e) => setfiltered(e.target.value)}
      />
      <table className='table mx-auto' style={{ width: table.getTotalSize() }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ width: cell.column.getSize() }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
