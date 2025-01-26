import "./SearchInput.scss";
import SmalSubmitButton from "../main-components/SmallSubmitButton";
import { useState } from "react";

const SearchInput = ({ setQuery, setSearch }) => {
  const [typedValue, setTypedValue] = useState("");
  const handleSearchButton = () => {
    setSearch(true);
    setQuery(typedValue);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchButton();
    }
  };
  return (
    <div className="search__input-wrapper">
      <input
        value={typedValue}
        onChange={(e) => setTypedValue(e.target.value)}
        placeholder="Search..."
        type="text"
        className="search__input"
        onKeyDown={handleKeyDown}
      />
      <SmalSubmitButton onClick={handleSearchButton} text="Search" />
    </div>
  );
};

export default SearchInput;
