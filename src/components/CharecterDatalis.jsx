import { useEffect, useState } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { Toaster, toast } from "react-hot-toast";

import axios from "axios";
function CharecterDatalis({ selectedId, onAddFavourite, isAddfavourite }) {
  const [character, setcharacter] = useState(null);
  const [episodes, setepisodes] = useState([]);

  useEffect(() => {
    async function fethData() {
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character/${selectedId}`
      );
      setcharacter(data);
      const episodesId = data.episode.map((i) => i.split("/").at(-1));
      const { data: episodeData } = await axios.get(
        `https://rickandmortyapi.com/api/episode/${episodesId}`
      );
      setepisodes(episodeData.slice(0, 7));
    }
    if (selectedId) fethData();
  }, [selectedId]);
  if (!character || !selectedId)
    return (
      <h1 style={{ flex: 0.7 }} className="name">
        Please Select a Character
      </h1>
    );

  return (
    <div style={{ flex: 1 }}>
      <div className="character-detail">
        <img
          src={character.image}
          alt={character.name}
          className="character-detail__img"
        />
        <div className="character-detail__info">
          <h3 className="name">
            <span className="gender" style={{ margin: 0 }}>
              {character.gender == "Male" ? "Man" : "Girl"}
            </span>
            <span> {character.name}</span>
          </h3>
          <div className="info">
            <span
              className={`status ${character.status == "Dead" ? "red" : ""}`}
            ></span>
            <span> {character.status}</span>
            <span> - {character.species}</span>
          </div>
          <div className="location">
            <p>Last Known Location:</p>
            <p>{character.location.name}</p>
          </div>
          <div className="actions">
            {isAddfavourite ? (
              <p>Already Added To Favourites</p>
            ) : (
              <button
                className="btn btn--primary"
                onClick={() => onAddFavourite(character) }
              >
                Add to Favourite
              </button>
              
        )}
          </div>
        </div>
      </div>
      <div className="character-episodes">
        <div className="title">
          <h2>List of Episodes:</h2>
          <button>
            <ArrowUpCircleIcon className="icon" />

          </button>
        </div>
        <ul>
          {episodes.map((e, i) => (
            <li key={e.id}>
              <div>
                {String(i + 1).padStart(2, "0")} - {e.episode} :{" "}
                <strong>{e.name}</strong>
              </div>
              <div className="badge badge--secondary">{e.air_date}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CharecterDatalis;
