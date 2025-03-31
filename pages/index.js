import Head from "next/head";
import { useEffect, useState } from "react";
import { Moon, Sun } from "react-feather";
import Weather from "../components/weather/Weather";
import axios from "axios";
import Preloader from "../components/Preloader";
import LinkGrid from "../components/links/LinkGrid";
import Footer from "../components/Footer";

export default function Home() {
  const [dark, setDark] = useState(true);
  const [days, setDays] = useState([undefined, undefined, undefined, undefined, undefined]);
  const [compliment, setCompliment] = useState("");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setDark(window.localStorage.getItem("theme") === "dark");
    axios.get("/api/compliment").then((res) => {
      setCompliment(res.data.compliment);
    });
    axios.get(`/api/weather`).then((res) => {
      setDays(res.data.days);
    });
  }, []);

  const fetchSuggestions = async (q) => {
    if (!q) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(
        `https://suggestqueries.google.com/complete/search?client=firefox&q=${q}`
      );
      setSuggestions(res.data[1]);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200); 
  };

  if (compliment.length === 0) {
    return <Preloader dark={dark} />;
  }

  return (
    <div className={`container ${dark ? "dark" : ""}`}>
      <Head>
        <title>Hey Cutie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Hii Baby 👸🏻!!</h1>
        <p className="description">Hope you're having a great day!</p>

        <div className="toggle-container">
          {dark ? (
            <Sun
              onClick={() => {
                window.localStorage.setItem("theme", "light");
                setDark(false);
              }}
            />
          ) : (
            <Moon
              onClick={() => {
                window.localStorage.setItem("theme", "dark");
                setDark(true);
              }}
            />
          )}
        </div>

        {/* Search Bar with Animation */}
        <div className="search-container fade-in">
          <form action="https://www.google.com/search" method="GET" target="_blank">
            <input
              type="text"
              name="q"
              placeholder="Search Google..."
              value={query}
              onChange={handleInputChange}
              onBlur={handleBlur}
              autoComplete="off"
            />
            <button type="submit">Search</button>
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((s, index) => (
                <li key={index} onClick={() => handleSuggestionClick(s)}>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <code className={`${dark ? "dark-code" : ""} compliment`}>
          Always Remember: {compliment}
        </code>

        <Weather days={days} dark={dark} />
        <LinkGrid dark={dark} />
      </main>

      <Footer dark={dark} />

      <style jsx>{`
        .dark {
          background: #212121;
          color: white;
        }

        .dark-code {
          color: black;
        }

        code:hover,
        code:active,
        code:focus {
          color: #F687B3;
          border-color: #F687B3;
        }

        .dark-code:hover,
        .dark-code:active,
        .dark-code:focus {
          background: #ED64A6;
          border-color: #ED64A6;
          color: black;
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .compliment {
          cursor: pointer;
        }

        .toggle-container {
          padding-bottom: 25px;
        }

        .search-container {
          position: relative;
          margin: 30px 0;  /* Added margin for separation */
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fadeIn 1s ease-in-out; /* Added animation */
        }

        .search-container form {
          display: flex;
          gap: 10px;
        }

        .search-container input {
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
          width: 300px;
          transition: box-shadow 0.3s ease;
        }

        .search-container input:focus {
          box-shadow: 0 0 10px #0070f3;
        }

        .search-container button {
          padding: 12px 20px;
          border: none;
          background-color: #0070f3;
          color: white;
          cursor: pointer;
          border-radius: 8px;
          font-size: 16px;
          transition: background 0.3s;
        }

        .search-container button:hover {
          background-color: #005bb5;
        }

        .suggestions {
          position: absolute;
          top: 55px;
          left: 0;
          width: 320px;
          background: white;
          border: 1px solid #ccc;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 10;
          list-style: none;
          padding: 0;
          margin: 0;
          max-height: 200px;
          overflow-y: auto;
        }

        .suggestions li {
          padding: 12px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .suggestions li:hover {
          background: #f0f0f0;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        main {
          padding: 2.5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html, body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}
      </style>
    </div>
  );
}
