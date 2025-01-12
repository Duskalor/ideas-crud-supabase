import { deleteIdea } from '@/lib/actionsDB';

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
    <>
      <button
        className='btn btn-circle btn-text btn-sm'
        aria-label='Action button'
      >
        <span className='icon-[tabler--pencil] size-5'></span>
      </button>
      <button
        onClick={handleDelete}
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
    </>
  );
};
