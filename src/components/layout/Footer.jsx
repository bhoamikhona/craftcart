export default function Footer() {
  return (
    <footer className="w-full py-6 mt-16 border-t border-[var(--border-color)] bg-[var(--card-bg)]">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-gray-600">

        <p>© {new Date().getFullYear()} CraftCart</p>

        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-[var(--primary)]">About</a>
          <a href="#" className="hover:text-[var(--primary)]">Contact</a>
          <a href="#" className="hover:text-[var(--primary)]">Terms</a>
        </div>

      </div>
    </footer>
  );
}
