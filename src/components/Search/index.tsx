import React, { useEffect, useState } from "react";
import SearchIcon from "../../assets/search-icon.svg";

type SearchProps = {
  placeHolder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
};

const Search = ({ placeHolder, value, onChange, onSearch }: SearchProps) => {
  const [text, setText] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleSearch = () => {
    onSearch && onSearch();
  };

  const handleChange = (event: React.ChangeEvent) => {
    setText((event.target as HTMLInputElement).value.trim());

    onChange && onChange((event.target as HTMLInputElement).value);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className={`flex h-[54px] bg-[#1f2123]  w-full rounded-2xl py-2 px-4 gap-2 shadow-[0px_1px_10px_0px_rgba(229,9,20,0.4)] border border-solid ${
        isFocused ? "border-[#e50914a3]" : "border-[#1f2123]"
      }`}
    >
      <input
        className={`flex-1 focus-visible:outline-none  text-white bg-transparent placeholder:text-[#cccccc87] `}
        placeholder={placeHolder || "Search..."}
        value={text}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <div
        className="flex items-center justify-center hover:cursor-pointer"
        onClick={handleSearch}
      >
        <img className="h-6" src={SearchIcon} />
      </div>
    </div>
  );
};

export default React.memo(Search);
