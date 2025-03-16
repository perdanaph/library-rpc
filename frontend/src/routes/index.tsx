import { createFileRoute } from '@tanstack/react-router';
import CardBook from '.././components/card/index-book';
import { useQuery } from '@tanstack/react-query';
import { api } from '.././lib/services';
import Search from '@/components/input-search';
import { useState } from 'react';

export const Route = createFileRoute('/')({
  component: Home,
});

async function getAllBooks() {
  const res = await api.books.$get();
  if (!res.ok) {
    throw new Error('server error');
  }

  const data = await res.json();
  return data;
}

function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { isPending, error, data } = useQuery({
    queryKey: ['get-all-books'],
    queryFn: getAllBooks,
  });

  const filteredBooks = data?.books.filter(
    (book) =>
      book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) return 'An error: ' + error.message;

  return (
    <>
      <Search
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 p-4 mt-6 mx-3'>
        {isPending
          ? 'loading...'
          : filteredBooks?.map((item) => (
              <CardBook
                name={item.name}
                description={item.description || undefined}
                category={item.category}
                publisher={item.publisher}
                author={item.author}
                isbn={item.isbn}
                issn={item.issn}
                key={item.id}
                year={item.year}
                price={item.price}
                id={item.id}
              />
            ))}
      </main>
    </>
  );
}

export default Home;
