import { useState } from 'react';
import { BsSearchHeartFill } from 'react-icons/bs';

const Searchbar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(searchName);
    resetForm();
  };

  const handleInputChange = e => {
    setSearchName(e.currentTarget.value);
  };

  const resetForm = () => {
    setSearchName('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <BsSearchHeartFill className="SearchForm-button-label" />
        </button>

        <input
          className="SearchForm-input"
          type="text"
          name="searchName"
          value={searchName}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;
