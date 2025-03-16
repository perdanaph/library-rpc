import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useForm } from '@tanstack/react-form';
import { api } from '@/lib/services';

export const Route = createFileRoute('/add-book')({
  component: CreateBook,
});

export default function CreateBook() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      name: '',
      category: '',
      publisher: '',
      isbn: '',
      issn: '',
      author: '',
      year: '',
      price: '',
      description: '',
    },
    onSubmit: async ({ value }) => {
      try {
        await api.books.$post({ json: value });
        toast.success('Buku Berhasil Ditambahkan');
        navigate({ to: '/' });
      } catch (error) {
        toast.error('Gagal menambahkan buku');
        console.error('Error:', error);
      }
    },
  });

  return (
    <section className='p-2 mt-5'>
      <h2 className='text-2xl font-bold mb-4 flex justify-center items-center'>
        Tambah Buku Baru
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
        className='flex flex-col gap-y-4 max-w-xl m-auto'
      >
        {/* Field: Nama Buku */}
        <form.Field
          name='name'
          children={(field) => (
            <div>
              <Label
                htmlFor={field.name}
                className='mb-3'
              >
                Nama Buku
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />

        {/* Field: Kategori */}
        <form.Field
          name='category'
          children={(field) => (
            <div>
              <Label
                htmlFor={field.name}
                className='mb-3'
              >
                Kategori
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />

        {/* Field: Penerbit */}
        <form.Field
          name='publisher'
          children={(field) => (
            <div>
              <Label
                htmlFor={field.name}
                className='mb-3'
              >
                Penerbit
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />

        {/* Field: ISBN */}
        <form.Field
          name='isbn'
          children={(field) => (
            <div>
              <Label
                htmlFor={field.name}
                className='mb-3'
              >
                ISBN
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />

        {/* Field: ISSN */}
        <form.Field
          name='issn'
          children={(field) => (
            <div>
              <Label
                htmlFor={field.name}
                className='mb-3'
              >
                ISSN
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />

        {/* Field: Pembuat */}
        <form.Field
          name='author'
          children={(field) => (
            <div>
              <Label
                htmlFor={field.name}
                className='mb-3'
              >
                Pembuat
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />

        {/* Field: Tahun */}
        <form.Field
          name='year'
          children={(field) => (
            <div>
              <Label
                htmlFor={field.name}
                className='mb-3'
              >
                Tahun
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />

        {/* Field: Harga */}
        <form.Field
          name='price'
          children={(field) => (
            <div>
              <Label
                htmlFor={field.name}
                className='mb-3'
              >
                Harga
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type='number'
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />

        {/* Field: Keterangan */}
        <form.Field
          name='description'
          children={(field) => (
            <div>
              <Label
                htmlFor={field.name}
                className='mb-3'
              >
                Keterangan
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />

        {/* Submit Button */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              className='mt-4'
              type='submit'
              disabled={!canSubmit}
            >
              {isSubmitting ? 'Menyimpan...' : 'Tambah Buku'}
            </Button>
          )}
        />
      </form>
    </section>
  );
}
