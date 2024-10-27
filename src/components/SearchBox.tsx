import * as React from "react";
import { IoSearch } from "react-icons/io5";
import { useDebounce } from "../hook/useDebounce";
import WeatherApp from "./weater";

const SearchBox: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const debounce = useDebounce(search);

  return (
    <>
      <div className="flex justify-center">
        <div className="flex items-center focus-within:outline w-[600px] bg-white rounded-xl px-3">
          <input
            className="w-full py-2 px-3 outline-none rounded-xl"
            type="text"
            placeholder="Search for a city"
            value={search}
            defaultValue="iran"
            onChange={(e) => setSearch(e.target.value)}
          />
          <IoSearch className="size-7" />
        </div>
      </div>
      <div>
        <WeatherApp country={debounce} />
      </div>
    </>
  );
};
export default SearchBox;
