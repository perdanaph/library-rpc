import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { api } from '@/lib/services';
import { useQuery } from '@tanstack/react-query';
import { useForm } from '@tanstack/react-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const Route = createFileRoute('/edit-book/$bookId')({
  component: UpdateBook,
});

async function getBookById({ id }: { id: string }) {
  const res = await api.books[':id{[0-9]+}'].$get({
    param: { id: id.toString() },
  });
  if (!res.ok) {
    throw new Error('server error');
  }

  const data = await res.json();
  return data;
}

function UpdateBook() {
  const { bookId } = Route.useParams();
  const navigate = useNavigate();
  const { error, data } = useQuery({
    queryKey: ['get-books', bookId],
    queryFn: () => getBookById({ id: bookId }),
  });

  const form = useForm({
    defaultValues: {
      name: data?.book[0].name || '',
      category: data?.book[0].category || '',
      publisher: data?.book[0].publisher || '',
      isbn: data?.book[0].isbn || '',
      issn: data?.book[0].issn || '',
      author: data?.book[0].author || '',
      year: data?.book[0].year || '',
      price: data?.book[0].price || '',
      description: data?.book[0].description || '',
    },
    onSubmit: async ({ value }) => {
      try {
        await api.books[':id{[0-9]+}'].$put({
          json: value,
          param: { id: bookId },
        });

        toast('Buku Berhasil Diperbarui', {
          description: `Buku berhasil diperbarui.`,
        });

        navigate({ to: '/' });
      } catch (error) {
        toast('Error', {
          description: 'Gagal memperbarui buku.',
        });
      }
    },
  });
  if (error) return 'An error: ' + error.message;

  return (
    <section className='p-2 mt-5'>
      <h2 className='text-2xl font-bold mb-4 flex justify-center items-center'>
        Edit Buku
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
                type='number'
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
              {isSubmitting ? 'Merubah...' : 'Ubah Buku'}
            </Button>
          )}
        />
      </form>
    </section>
  );
}
