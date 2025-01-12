import { Idea } from '@/inteface/idea.interface';

export const CompletedCell = ({ row }: { row: { original: Idea } }) => {
  const ideaData = row.original;
  const completed = ideaData.completed;
  return (
    <span className='flex justify-center'>
      {completed ? (
        <span className='badge badge-soft badge-success text-xs'>Done</span>
      ) : (
        <span className='badge badge-soft badge-error text-xs'>Not Done</span>
      )}
    </span>
  );
};
