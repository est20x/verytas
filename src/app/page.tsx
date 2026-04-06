import Head from 'next/head';

import { Quiz } from '@/components/Quiz';

export default function Home() {
  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="" />
      </Head>

      <div className=" mx-auto px-auto overflow-x-hidden">
        <Quiz />
      </div>
    </>
  );
}
