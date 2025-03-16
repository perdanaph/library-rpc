import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Navbar } from '.././components/navbar';
import { Toaster } from '@/components/ui/sonner';

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className='my-2.5 flex justify-evenly px-3 items-center'>
        <h2 className='font-medium text-2xl'>Library App</h2>
        <Navbar />
      </nav>
      <Outlet />
      <Toaster />
    </>
  ),
});
