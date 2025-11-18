import { users } from "@/data/users";

export default function AuthorBox({ authorId }) {
  const author = users.find((u) => u.creatorId === authorId);

  if (!author) return null;

  return (
    <div className="bg-white shadow rounded-xl flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <img src={"/images/avatar.jpg"} alt={author.name} className="w-12 h-12 rounded-full" />
        <div>
          <p className="font-semibold">{author.name}</p>
          <p className="text-gray-500 text-sm">
            {author.followers} followers · {author.tutorials?.length || 0} tutorials
          </p>
        </div>
      </div>
      <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold">Follow</button>
    </div>
  );
}
  