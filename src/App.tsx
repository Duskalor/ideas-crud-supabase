import { DataTable } from './components/DataTable';
import { DialogForm } from './components/dialog-form';
import { DropdownMenuApp } from './components/Dropdown';

function App() {
  return (
    <section className='container mx-auto min-h-dvh p-5'>
      <nav className='flex justify-between items-center'>
        <DialogForm />
        <DropdownMenuApp />
      </nav>
      <DataTable />
    </section>
  );
}

export default App;
