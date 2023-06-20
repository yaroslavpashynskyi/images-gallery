import 'bootswatch/dist/minty/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import { useState } from 'react';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_API;

function App() {
  
  const [query, setQuery] = useState('');


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(query);
    fetch(`https://api.unsplash.com/photos/random/?query=${query}&client_id=${UNSPLASH_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className="App">
      <Header title="Images Gallery"/>
      <Search query={query} setQuery={setQuery} handleSubmit={handleSearchSubmit}/>
    </div>
  );
}

export default App;
