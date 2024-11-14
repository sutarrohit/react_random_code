import Link from "next/link";

export default function Home() {
  const links = [
    { name: "Random Gift", link: "/randomGifts" },
    { name: "Pagination", link: "/pagination" },
    { name: "Websocket", link: "/websocket" },
  ];

  return (
    <div className="w-full border border-pink-500 min-h-screen">
      <div className="border w-full mt-10 text-center text-4xl font-bold text-slate-800">
        Coding Tasks
      </div>

      <div className="border border-yellow-500  h-full p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full">
        {links.map((link, index) => {
          return (
            <Link
              href={link.link}
              key={index}
              target="_blank"
              className="border-2 border-gray-500 px-1 py-2  hover:bg-gray-800 hover:text-white rounded-lg text-lg font-medium flex justify-center items-center"
            >
              <button>{link.name}</button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
