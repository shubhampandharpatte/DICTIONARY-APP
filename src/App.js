import axios from "axios";
import { useState } from "react";
import ListDetails from "./components/ListDetails";
import "./App.css";

export default function App() {
  const [keyWord, setKeyWord] = useState("");
  const [result, setResult] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const api = "https://api.dictionaryapi.dev/api/v2/entries/en";

  async function handleSearch() {
    try {
      const res = await axios.get(`${api}/${keyWord}`);
      console.log(res, "res");
      setResult(res.data[0]);
    } catch (e) {
      console.log({ e });
    }
  }

  function handleClear() {
    setKeyWord("");
    setResult(null);
  }

  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  return (
    <div className={`App ${darkMode ? "dark-mode" : "light-mode"}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <h1 className="title">Dictionary App</h1>
      <div className="input-container">
        <input
          value={keyWord}
          onChange={(e) => setKeyWord(e.target.value)}
          placeholder="Enter a word"
        />
        <button className="button" type="submit" onClick={handleSearch}>
          Search
        </button>
        <button
          disabled={!result}
          className="button"
          type="submit"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>

      {result && <ListDetails {...{ result }} />}
    </div>
  );
}
