import React, { useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"; 

const Search = ({searchTerm , setSearchTerm}) => {
 
  const inputRef = useRef(null);

  const handleIconClick = () => {
    // Focus the input when the icon is clicked
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className='container'>
      <div className='search-section w-full p-3 flex items-center'> {/* Added flex class */}
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search by name, email, and id'
          className='w-full border border-gray-300 px-4 py-2 rounded-md search-class' 
          ref={inputRef}
        />
        <span onClick={handleIconClick} > {/* Added margin for icon spacing */}
          <FontAwesomeIcon icon={faSearch}  size="1.5x" /> 
        </span>
      </div>
    </div>
  );
};

export default Search;
