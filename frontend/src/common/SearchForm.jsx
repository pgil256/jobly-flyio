import { useState } from "react";

const SearchForm = ({ searchFor }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{ position: 'absolute', top: '45px', right: '10px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
        <input
          name="searchTerm"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={handleChange}
          style={{ fontSize: '14px', padding: '5px', marginRight: '10px', width: '150px' }}
        />
        <button style={{ padding: '5px 10px', fontSize: '14px' }}>Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
