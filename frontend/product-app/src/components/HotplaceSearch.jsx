// HotplaceSearch.jsx

import React, { useState } from 'react';

function HotplaceSearch({ onSearch, onRegister }) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <div className="card shadow-sm border-0 bg-white p-4 rounded-4">
      <form onSubmit={handleSubmit}>
        <div className="d-flex gap-2">
          <div className="flex-grow-1">
            <input
              type="text"
              className="form-control form-control-lg bg-light border-0"
              placeholder="검색할 장소를 입력하세요 (전체조회는 빈 칸)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary btn-lg px-4 fw-semibold" type="submit">
            조회
          </button>
          <button 
            type="button" 
            className="btn btn-success btn-lg px-4 fw-semibold" 
            onClick={onRegister}
          >
            신규 등록
          </button>
        </div>
      </form>
    </div>
  );
}

export default HotplaceSearch;