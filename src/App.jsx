import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const searchBooks = async () => {
    if (!query) return;

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`
    );

    const data = await response.json();
    setBooks(data.items || []);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6">
        📚 Book Library Search
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search for books..."
          className="border p-3 w-80 rounded-l"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={searchBooks}
          className="bg-blue-600 text-white px-4 rounded-r"
        >
          Search
        </button>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg"
            onClick={() => setSelectedBook(book)}
          >
            <img
              src={
                book.volumeInfo.imageLinks?.thumbnail ||
                "https://via.placeholder.com/150"
              }
              alt={book.volumeInfo.title}
              className="mb-3 w-full h-48 object-cover"
            />
            <h2 className="font-semibold">
              {book.volumeInfo.title}
            </h2>
            <p className="text-sm text-gray-600">
              {book.volumeInfo.authors?.join(", ")}
            </p>
          </div>
        ))}
      </div>

      {/* Book Details Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96 relative">
            <button
              className="absolute top-2 right-2 text-red-500"
              onClick={() => setSelectedBook(null)}
            >
              ✖
            </button>

            <h2 className="text-xl font-bold mb-2">
              {selectedBook.volumeInfo.title}
            </h2>

            <p className="text-sm mb-2">
              {selectedBook.volumeInfo.authors?.join(", ")}
            </p>

            <p className="text-sm mb-2">
              Published: {selectedBook.volumeInfo.publishedDate}
            </p>

            <p className="text-sm">
              {selectedBook.volumeInfo.description || "No description available."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
