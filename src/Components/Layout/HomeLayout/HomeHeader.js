import React, { useState } from 'react';

const HomeHeader = ({ onSearch }) => {
  /* Router */
  /* State */
  const [searchKeyword, setSearchKeyword] = useState('');
  /* Functions */
  const handleSearch = () => {
    onSearch(searchKeyword);
  };
  /* Hooks */
  /* Render */
  return (
    <div className="header">
      <div className="logo">
        <img src="/logo.png" alt="logo" />
      </div>
      <div className="search">
        <div className="search-box">
          <div className="type-select">Search</div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Search Keyword"
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
            />
            <div className="search-btn" onClick={handleSearch}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.9172 4.33332C7.729 4.33332 4.33382 7.7285 4.33382 11.9167C4.33382 16.1048 7.729 19.5 11.9172 19.5C16.1053 19.5 19.5005 16.1048 19.5005 11.9167C19.5005 7.7285 16.1053 4.33332 11.9172 4.33332ZM2.16716 11.9167C2.16716 6.53188 6.53238 2.16666 11.9172 2.16666C17.3019 2.16666 21.6672 6.53188 21.6672 11.9167C21.6672 17.3014 17.3019 21.6667 11.9172 21.6667C6.53238 21.6667 2.16716 17.3014 2.16716 11.9167Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.272 17.2715C17.695 16.8484 18.381 16.8484 18.804 17.2715L23.5165 21.984C23.9396 22.407 23.9396 23.093 23.5165 23.516C23.0935 23.9391 22.4075 23.9391 21.9845 23.516L17.272 18.8035C16.8489 18.3805 16.8489 17.6945 17.272 17.2715Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="user">Jon Doe</div>
    </div>
  );
};

export default HomeHeader;
