import React from "react";  

const SearchBars = (props) => {

    const handleSearchChange = (e) => {
        props.setSearch(e.target.value);
      };
    
      const tagSearchChange = (e) => {
        props.setTagSearch(e.target.value);
      };

    return (
      <div className="searchbars">
        <input
          className="input"
          name="search"
          type="text"
          placeholder="Search by Name"
          value={props.search}
          onChange={handleSearchChange}
        />
        <input
          className="input"
          name="tags"
          type="text"
          placeholder="Search by Tag"
          value={props.tagSearch}
          onChange={tagSearchChange}
        />
      </div>
    );

}

export default SearchBars