import { HomePage } from "./components/pages/HomePage";

export default function Home({ searchParams }: any) {

  const { url } = searchParams;

  if(!url) {
    return (
      <main className="flex min-h-screen p-8 pt-24 gap-4 relative items-center justify-center">
        <h4 className="font-semibold text-gray-500 text-2xl">Enter some url</h4>
      </main>
    )
  }

  return (
    <HomePage url={url}/>
  );
}
