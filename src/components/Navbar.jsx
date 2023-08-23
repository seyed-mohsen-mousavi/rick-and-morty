import { HeartIcon } from "@heroicons/react/24/outline";

function Navbar({ children }) {
  return (
    <nav className="navbar">
      <Logo />
      {children}
    </nav>
  );
}

export default Navbar;
function Logo() {
  return (
    <div className="navbar__logo">
      <a
        href="https://github.com/seyed-mohsen-mousavi"
        target="_blank"
        data-tooltip="GitHub "
        data-tooltip-location="right"
      >
        <img
          width={40}
          src="https://cdn-icons-png.flaticon.com/128/8787/8787688.png"
          alt=""
        />
      </a>
    </div>
  );
}
export function Search({ query, setQuery }) {
  return (
    <input
      type="text"
      className="text-field"
      placeholder="search... "
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  );
}
export function SearchResult({ searchResult }) {
  return <div className="navbar__result">Found {searchResult} characters</div>;
}
export function Favarites({nomOfFavarites}) {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge">{nomOfFavarites}</span>
    </button>
  );
}
