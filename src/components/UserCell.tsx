import { Idea } from '@/inteface/idea.interface';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { getFallBackName } from '@/lib/getFallBackName';

export const UserCell = ({ row }: { row: { original: Idea } }) => {
  const userData = row.original;
  const name = userData.user.full_name;
  const FallbackName = getFallBackName(name);
  return (
    <span className='flex gap-5 text-center'>
      <Avatar>
        <AvatarImage src={userData.user.picture} />
        <AvatarFallback>{FallbackName}</AvatarFallback>
      </Avatar>
      <span className='flex items-center text-tableFont'>
        {/* {name.length > 15 ? name.slice(0, 15) + '...' : name} */}
        {name}
      </span>
    </span>
  );
};
