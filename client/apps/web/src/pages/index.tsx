import Head from "next/head";
import { Button } from "ui";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Docs - Turborepo Example</title>
      </Head>

      <main className="w-auto px-4 pt-16 pb-8 mx-auto sm:pt-24 lg:px-8">
        <h1 className="mx-auto text-6xl font-extrabold tracking-tight text-center text-white sm:text-7xl lg:text-8xl xl:text-8xl">
          Docs
          <span className="block px-2 text-transparent bg-gradient-to-r from-brandred to-brandblue bg-clip-text">
            Turborepo Example
          </span>
        </h1>
        <div className="max-w-xl mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
          <Button />
        </div>
      </main>
    </div>
  );
}
