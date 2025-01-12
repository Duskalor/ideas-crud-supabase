import { deleteIdea } from '@/lib/actionsDB';
import { DeleteDialog } from './deleteDialog';

interface ButtonProps {
  row: { original: { id: string } };
}
export const ButtonActions = ({ row }: ButtonProps) => {
  const id = row.original.id;

  const handleDelete = () => {
    console.log('borrando');
    deleteIdea(id);
  };

  return (
    <section className='flex justify-center gap-5'>
      <button
        className='btn btn-circle btn-text btn-sm'
        aria-label='Action button'
      >
        <span className='icon-[tabler--pencil] size-5'></span>
      </button>
      <DeleteDialog deleteIdea={handleDelete} />
      <button
        className='btn btn-circle btn-text btn-sm'
        aria-label='Action button'
      >
        <span className='icon-[tabler--dots-vertical] size-5'></span>
      </button>
    </section>
  );
};
