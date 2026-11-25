import { useState } from "react";
import SmallSubmitButton from "../main-components/SmallSubmitButton";
import "./SearchInput.scss";

const SearchInput = ({ initialValue = "", onSearch }) => {
  const [typedValue, setTypedValue] = useState(initialValue);

  const submit = () => onSearch(typedValue.trim());

  return (
    <div className="search__input-wrapper">
      <input
        value={typedValue}
        onChange={(e) => setTypedValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Search..."
        type="text"
        className="search__input"
      />
      <SmallSubmitButton onClick={submit} text="Search" />
    </div>
  );
};

export default SearchInput;
