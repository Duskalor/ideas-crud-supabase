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
import { useGetIdeas } from '@/hooks/useGetIdeas';
import { useState } from 'react';

export function DialogForm() {
  const [open, setopen] = useState(false);
  const { addIdea } = useGetIdeas();
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
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a new idea</DialogTitle>
            <DialogDescription>
              This is a description of the dialog. You can put anything you want
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            {/* <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
              <Input
                id='name'
                // defaultValue='Pedro Duarte'
                className='col-span-3'
              />
            </div> */}
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                New Idea
              </Label>
              <Input
                id='username'
                name='idea'
                // defaultValue='@peduarte'
                className='col-span-3'
              />
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
