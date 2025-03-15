import { createFileRoute } from '@tanstack/react-router';
import CardBook from '.././components/card/index-book';

import { useQuery } from '@tanstack/react-query';

import { api } from '.././lib/services';

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
  const { isPending, error, data } = useQuery({
    queryKey: ['get-all-books'],
    queryFn: getAllBooks,
  });
  if (error) return 'An error: ' + error.message;

  return (
    <>
      <main className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 p-4 mt-10 mx-3'>
        {isPending
          ? 'loading...'
          : data?.books.map((item) => (
              <CardBook
                name={item.name}
                description={item.description}
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
