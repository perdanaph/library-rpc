import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Link } from '@tanstack/react-router';
import { api } from '@/lib/services';
import { toast } from 'sonner';

type Book = {
  id: number;
  name: string;
  category: string;
  publisher: string;
  isbn: string;
  issn: string;
  author: string;
  year: string;
  price: string;
  description?: string;
};
type BooksResponse = {
  books: Book[];
};

const deleteBook = async (id: string) => {
  const res = await api.books[':id{[0-9]+}'].$delete({
    param: { id: id.toString() },
  });

  if (!res.ok) {
    throw new Error('Gagal menghapus buku');
  }

  return await res.json();
};

export default function CardBook({
  id,
  name,
  category,
  publisher,
  isbn,
  issn,
  author,
  year,
  price,
  description,
}: Book) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteBook,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['get-all-books'] });

      const previousBooks = queryClient.getQueryData<BooksResponse>([
        'get-all-books',
      ]);

      if (!previousBooks || !Array.isArray(previousBooks.books)) {
        return;
      }

      queryClient.setQueryData(['get-all-books'], (old: { books: Book[] }) => ({
        books: old.books.filter((book) => book.id !== parseInt(id)),
      }));

      return { previousBooks };
    },
    onError: (error, id, context) => {
      if (context?.previousBooks) {
        queryClient.setQueryData(['get-all-books'], context.previousBooks);
      }
      toast.error('Gagal menghapus buku');
    },
    onSuccess: () => {
      toast.success('Buku berhasil dihapus');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['get-all-books'] });
    },
  });

  const handleDelete = () => {
    toast('Apakah Anda yakin ingin menghapus buku ini?', {
      action: {
        label: 'Hapus',
        onClick: () => mutate(id.toString()),
      },
      cancel: {
        label: 'Batal',
        onClick: () => {},
      },
    });
  };
  return (
    <React.Fragment>
      <Card className='m-4'>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <Badge variant={'outline'}>{category}</Badge>
        </CardHeader>
        <CardContent className='text-sm space-y-2'>
          <ul>
            <li>Publisher: {publisher}</li>
            <li>ISBN: {isbn}</li>
            <li>ISSN: {issn}</li>
            <li>Penulis: {author}</li>
            <li>Tahun: {year}</li>
          </ul>
          <h2 className='text-end'>RP {price}</h2>
        </CardContent>
        <CardFooter className='flex justify-end space-x-2'>
          <Link
            to='/edit-book/$bookId'
            params={{ bookId: id.toString() }}
          >
            <Button
              size='sm'
              className='bg-amber-400'
            >
              Edit
            </Button>
          </Link>
          <Button
            size='sm'
            className='bg-red-400'
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? '...' : 'Delete'}
          </Button>
        </CardFooter>
      </Card>
    </React.Fragment>
  );
}
