import React,{ useState, useCallback } from 'react';
import './App.css';

function App() {
  const [suggestions, setSuggestions] = useState("");

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };
  const handleChange = (value) => {
    fetch(`https://demo.dataverse.org/api/search?q=${value}`)
      .then((res) => res.json())
      .then((json) => setSuggestions(json.data.items));
  };

  
  const optimizedFn = useCallback(debounce(handleChange), []);
  return (
    <div>
    
    <h2 style={{textAlign:"center"}}>Debouncing in React</h2>
    <input
    type="text"
    className="search"
    placeholder="Enter something here..."
    onChange={(e) => optimizedFn(e.target.value)}
  />
  {suggestions.length > 0 && (
    <div className="autocomplete">
      {suggestions.map((el, i) => (
        <div key={i} className="autocompleteItems">
          <span>{el.name}</span>
        </div>
      ))}
    </div>
  )}
    </div>
    
  );
}

export default App;
