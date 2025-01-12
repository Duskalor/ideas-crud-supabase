import { useGetIdeas } from '@/hooks/useGetIdeas';
import { Idea } from '@/inteface/idea.interface';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { UserCell } from './UserCell';
import { CompletedCell } from './CompletedCell';
import { ButtonActions } from './ButtonActions.';
import dayjs from 'dayjs';

const columns: ColumnDef<Idea>[] = [
  {
    accessorKey: 'user.full_name',
    header: 'Name',
    cell: UserCell,
    size: 20,
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
    header: 'Status',
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
    header: 'Actions',
    cell: ButtonActions,
  },
];

export const DataTable = () => {
  const { ideas } = useGetIdeas();
  const table = useReactTable({
    data: ideas,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  // console.log(table.getTotalSize());
  return (
    <div
      className='w-full overflow-x-auto'
      // style={{ width: table.getTotalSize() }}
    >
      <table className='table'>
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

          {/* <tr>
            <td className='text-nowrap'>John Doe</td>
            <td>johndoe@example.com</td>
            <td>
              <span className='badge badge-soft badge-success text-xs'>
                Professional
              </span>
            </td>
            <td className='text-nowrap'>March 1, 2024</td>
            <td>
              <button
                className='btn btn-circle btn-text btn-sm'
                aria-label='Action button'
              >
                <span className='icon-[tabler--pencil] size-5'></span>
              </button>
              <button
                className='btn btn-circle btn-text btn-sm'
                aria-label='Action button'
              >
                <span className='icon-[tabler--trash] size-5'></span>
              </button>
              <button
                className='btn btn-circle btn-text btn-sm'
                aria-label='Action button'
              >
                <span className='icon-[tabler--dots-vertical] size-5'></span>
              </button>
            </td>
          </tr>
          <tr>
            <td className='text-nowrap'>Jane Smith</td>
            <td>janesmith@example.com</td>
            <td>
              <span className='badge badge-soft badge-error text-xs'>
                Rejected
              </span>
            </td>
            <td className='text-nowrap'>March 2, 2024</td>
            <td>
              <button
                className='btn btn-circle btn-text btn-sm'
                aria-label='Action button'
              >
                <span className='icon-[tabler--pencil] size-5'></span>
              </button>
              <button
                className='btn btn-circle btn-text btn-sm'
                aria-label='Action button'
              >
                <span className='icon-[tabler--trash] size-5'></span>
              </button>
              <button
                className='btn btn-circle btn-text btn-sm'
                aria-label='Action button'
              >
                <span className='icon-[tabler--dots-vertical] size-5'></span>
              </button>
            </td>
          </tr>
          <tr>
            <td className='text-nowrap'>Alice Johnson</td>
            <td>alicejohnson@example.com</td>
            <td>
              <span className='badge badge-soft badge-info text-xs'>
                Applied
              </span>
            </td>
            <td className='text-nowrap'>March 3, 2024</td>
            <td>
              <button
                className='btn btn-circle btn-text btn-sm'
                aria-label='Action button'
              >
                <span className='icon-[tabler--pencil] size-5'></span>
              </button>
              <button
                className='btn btn-circle btn-text btn-sm'
                aria-label='Action button'
              >
                <span className='icon-[tabler--trash] size-5'></span>
              </button>
              <button
                className='btn btn-circle btn-text btn-sm'
                aria-label='Action button'
              >
                <span className='icon-[tabler--dots-vertical] size-5'></span>
              </button>
            </td>
          </tr>
          <tr>
            <td className='text-nowrap'>Bob Brown</td>
            <td>bobrown@example.com</td>
            <td>
              <span className='badge badge-soft badge-primary text-xs'>
                Current
              </span>
            </td>
            <td className='text-nowrap'>March 4, 2024</td>
            <td>
              <button
                className='btn btn-circle btn-text btn-sm'
                aria-label='Action button'
              >
                <span className='icon-[tabler--pencil] size-5'></span>
              </button>
              <button
                className='btn btn-circle btn-text btn-sm'
                aria-label='Action button'
              >
                <span className='icon-[tabler--trash] size-5'></span>
              </button>
              <button
                className='btn btn-circle btn-text btn-sm'
                aria-label='Action button'
              >
                <span className='icon-[tabler--dots-vertical] size-5'></span>
              </button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};
