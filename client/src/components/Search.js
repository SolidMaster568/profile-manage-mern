import React from 'react';
import { Input } from 'semantic-ui-react';

const Search = ({ search, setSearch }) => {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="search-card">
      <Input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search for contact name or profile links"
        icon={{ name: 'search', circular: true }}
        iconPosition="left"
        fluid
      />
    </div>
  );
};

export default Search;
