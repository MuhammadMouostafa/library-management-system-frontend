export default function Navbar() {
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Left */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-blue-700">
            📚 EgyLibrary
          </h1>

          <a
            href="/admin/categories"
            className="hidden sm:inline-block text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            Categories
          </a>
        </div>

        {/* Middle - Search (UI only) */}
        <div className="flex-1 hidden md:flex justify-center">
          <input
            type="text"
            placeholder="Search for books..."
            className="w-full max-w-md px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Right */}
        <div className="text-sm font-medium text-gray-600 cursor-pointer hover:text-blue-600">
          Login
        </div>
      </div>
    </nav>
  );
}
