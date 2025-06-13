import { useEffect, useState, useRef } from "react";
import "../styles/SearchBox.css";
import { searchLocation } from "../context/map";

const SearchBox = ({ onLocationSelect, placeholder, value, disabled }) => {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (val.length > 2) {
      debounceRef.current = setTimeout(() => {
        searchLocation(val, setSuggestions, setLoading);
      }, 500); // 500ms debounce
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const location = {
      lat: parseFloat(suggestion.lat),
      lng: parseFloat(suggestion.lon),
      name: suggestion.name,
    };
    setQuery(suggestion.name);
    setSuggestions([]);
    onLocationSelect(location);
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    onLocationSelect(null);
  };

  return (
    <div className="search-box">
      <div className="search-input-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          className="search-input"
        />
        {query && (
          <button onClick={clearSearch} className="clear-button" title="Clear">
            ×
          </button>
        )}
      </div>

      {loading && <div className="search-loading">Searching...</div>}

      {suggestions.length > 0 && (
        <div className="suggestions-container">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="suggestion-name">
                {suggestion.name.split(",")[0]}
              </div>
              <div className="suggestion-address">{suggestion.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
