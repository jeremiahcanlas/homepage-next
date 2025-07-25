import { useEffect, useRef, useState } from "react";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedEngine, setSelectedEngine] = useState<"g" | "d">("g");
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("defaultSearch");
    setSelectedEngine(stored === "d" ? "d" : "g");
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    controllerRef.current?.abort(); // cancel previous
    controllerRef.current = controller;

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`/api/suggestions?q=${query}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error(err);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const baseUrl =
      selectedEngine === "g"
        ? "https://www.google.com/search"
        : "https://duckduckgo.com/";

    window.location.href = `${baseUrl}?q=${encodeURIComponent(query)}`;
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    const baseUrl =
      selectedEngine === "g"
        ? "https://www.google.com/search"
        : "https://duckduckgo.com/";
    window.location.href = `${baseUrl}?q=${encodeURIComponent(suggestion)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-md">
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            selectedEngine === "g"
              ? "Search Google..."
              : "Search without being tracked"
          }
          className="w-full border px-4 py-2 rounded-l"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gray-600 text-white rounded-r hover:bg-gray-700"
        >
          Search
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white dark:bg-background-dark-secondary border mt-1 rounded shadow">
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              onClick={() => handleSuggestionClick(s)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
