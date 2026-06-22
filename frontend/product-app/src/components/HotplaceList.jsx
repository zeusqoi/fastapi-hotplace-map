// HotplaceList.jsx

import React from 'react';

const getCategoryClass = (category) => {
  if (category === '밥집') return 'category-food';
  if (category === '카페') return 'category-cafe';
  if (category === '서점') return 'category-book';
  if (category === '쇼핑') return 'category-shop';
  return 'category-default';
};

const getVibesClass = (vibes) => {
  if (vibes === '힙함')     return 'vibes-hip';
  if (vibes === '감성적')   return 'vibes-emotional';
  if (vibes === '차분함')   return 'vibes-calm';
  if (vibes === '아늑함')   return 'vibes-cozy';
  if (vibes === '고급스러움') return 'vibes-luxury';
  if (vibes === '빈티지함') return 'vibes-vintage';
  if (vibes === '레트로함') return 'vibes-retro';
  return 'vibes-default';
};

const getRatingStars = (rating) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
};

function HotplaceList({ hotplace, onRowClick }) {
  if (!hotplace || hotplace.length === 0) return null;

  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            <th style={{width:'8%'}}>ID</th>
            <th style={{width:'25%'}}>가게 이름</th>
            <th style={{width:'15%'}}>카테고리</th>
            <th style={{width:'14%'}}>분위기 태그</th>
            <th style={{width:'14%'}}>별점</th>
            <th style={{width:'24%'}}>방문 날짜</th>
            <th style={{width:'24%'}}>등록 날짜</th>
          </tr>
        </thead>
        <tbody>
          {hotplace.map((hotplace) => (
            <tr key={hotplace.id} onClick={() => onRowClick(hotplace)} title="클릭하여 상세 보기 및 수정">
              <td style={{color:'#aaa'}}>{hotplace.id}</td>
              <td style={{textAlign:'left', fontWeight:'500'}}>{hotplace.place_name}</td>
              <td>
                <span className={getCategoryClass(hotplace.category)}>{hotplace.category}</span>
              </td>
              <td>
                <span className={getVibesClass(hotplace.vibes)}>{hotplace.vibes}</span>
              </td>
              <td style={{color:'#FFB800', letterSpacing:'1px'}}>{getRatingStars(hotplace.rating)}</td>
              <td style={{textAlign:'left', color:'#888'}}>{hotplace.visit_date}</td>
              <td style={{textAlign:'left', color:'#888'}}>{hotplace.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-footer">
        💡 테이블의 행을 클릭하면 상세 내용을 확인하고 수정/삭제할 수 있습니다.
      </div>
    </div>
  );
}

export default HotplaceList;