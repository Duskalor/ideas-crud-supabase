import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/authcontex';
import { addIdea } from '@/lib/actionsDB';
import { useState } from 'react';

export function DialogForm() {
  const [open, setopen] = useState(false);

  const { session } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newIdea = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await addIdea({
        idea: newIdea.idea.toString().trim(),
        userId: session.user.id,
      });
      setopen(false);
    } catch (error) {
      console.log(error);
      setError('Error al crear una nueva Idea, intente de nuevo');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
        <Button variant='outline'>New Idea</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <DialogHeader>
            <DialogTitle>Create a new idea</DialogTitle>
            <DialogDescription>
              here you can write your idea and save it to the database for later
              use and share it with your friends.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                New Idea
              </Label>
              <Input id='username' name='idea' className='col-span-3' />
            </div>
          </div>
          {error && <p className='text-red-500 mb-2'>{error}</p>}
          <DialogFooter>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
