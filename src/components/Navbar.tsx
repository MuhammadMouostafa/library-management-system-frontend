interface Props {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function Navbar({ search, onSearchChange }: Props) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg" />
          <span className="text-xl font-bold">EgyLibrary</span>
        </div>

        {/* Search */}
        <div className="hidden md:block w-[420px]">
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, author, ISBN..."
            className="
              w-full px-4 py-2 rounded-full border
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
          />
        </div>

        {/* Login */}
        <span className="text-sm font-medium hover:text-indigo-600 cursor-pointer">
          Login
        </span>
      </div>
    </header>
  );
}
