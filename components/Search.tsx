import { useState } from "react";
import { useSearchContext } from "../lib/contexts/SearchContext";

const Search = (props:any) => {
  const [showSearch, setShowSearch] = useState(false);
  const { setSearch } = useSearchContext();

  const handleSubmit = (event:any) => {
    if (event.key === 'Enter') {
      setSearch(event.target.value);
      setShowSearch(false);
    }
  }

  return <>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={showSearch ? "#0052FF" : "currentColor"} className="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
    {showSearch ?
      <>
        <input
        type="text"
        placeholder="Search by contract name or address..."
        className="font-thin pl-w py-1 px-2 text-[#0052FF] w-80 text-sm"
        onSubmit={handleSubmit}
        onKeyDown={handleSubmit}
      />
        <button onClick={() => setShowSearch(false)} className="text-gray-500">x</button>
      </> :
      <div onClick={() => {setShowSearch(true)}} className="pl-2 cursor-pointer hover:text-gray-500">
        {props.nav ? <>
          <p className="sm:text-xl font-thin">Contract</p>
          <p className="sm:text-lg text-sm font-thin">Search</p>
        </> :
          <p className="sm:text-xl font-thin">Contract Search</p>
        }
      </div>
    }
  </>
}

export default Search;