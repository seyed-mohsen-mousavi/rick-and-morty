import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Loader from "./Loader";

function CharecterList({selectedId, Charecter, isloading,onSelectitem }) {
  if (isloading)
    return (
      <div className="characters-list">
        <Loader />
      </div>
    );

  return (
    <div className="characters-list">
      {Charecter.map((e,) => (
        <Charecteres selectedId={selectedId} key={e.id} e={e} onSelectitem={onSelectitem} />
      ))}
    </div>
  );
}

export default CharecterList;

function Charecteres({ e,onSelectitem,selectedId }) {
  return (
    <div className="list__item">
      {e.title}
      <img src={e.image} alt={e.name} />
      <CharecterName e={e} />
      <CharecterInfo e={e} />
      <button className="icon red " onClick={() => onSelectitem(e.id   )}>
        {selectedId == e.id ? <EyeSlashIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}

function CharecterName({ e }) {
  return (
    <h3 className="name">
      <span title="gender" className="gender">
        {e.gender == "Male" ? "Man" : "Girl"}
      </span>
      <span>{e.name}</span>
    </h3>
  );
}
function CharecterInfo({ e }) {
  return (
    <div className="list-item__info info">
      <span
        title="status"
        className={`status ${e.status == "Dead" ? "red" : ""}`}
      ></span>
      <span> {e.status}</span>
      <span> - {e.species}</span>
    </div>
  );
}
