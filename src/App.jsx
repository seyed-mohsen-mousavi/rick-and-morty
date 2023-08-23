import { useEffect, useState } from "react";
import "./App.css";
import CharecterDatalis from "./components/CharecterDatalis";
import CharecterList from "./components/CharecterList";
import Navbar, { Favarites, Search, SearchResult } from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
function App() {
  const [charecter, setcharecter] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourite, setFavourite] = useState([]);
  useEffect(() => {
    async function fethData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name= ${query}`
        );
        setcharecter(data.results.slice(0, 6));
        toast.success("Load Character!");
      } catch (error) {
        setcharecter([]);
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    fethData();
  }, [query]);

  const handleSelectitem = (id) => {
    setSelectedId((prevId) => (prevId == id ? null : id));
  };
  const handleAddFavourite = (c) => {
    setFavourite((preFav)=> [... preFav, c]);
  };

  const isAddfavourite  =favourite.map(fav => fav.id).includes(selectedId)
  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult searchResult={charecter.length} />
        <Favarites nomOfFavarites={favourite.length}   />
      </Navbar>
      <div className="main">
        <CharecterList
          selectedId={selectedId}
          Charecter={charecter}
          isloading={isloading}
          onSelectitem={handleSelectitem}
        />
        <CharecterDatalis
          selectedId={selectedId}
          onAddFavourite={handleAddFavourite}
          isAddfavourite={isAddfavourite}
        />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
