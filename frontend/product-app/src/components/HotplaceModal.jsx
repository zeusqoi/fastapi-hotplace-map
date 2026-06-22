// HotplaceModal.jsx

import React, { useState, useEffect } from 'react';

function HotplaceModal({ show, onClose, onSave, onDelete, hotplace }) {
  const [formData, setFormData] = useState({
    place_name: '',
    category: '',
    vibes: '',
    rating: 1,
    visit_date: ''
  });

  const isEdit = !!hotplace?.id;

  useEffect(() => {
    if (hotplace) {
      setFormData({
        place_name: hotplace.place_name || '',
        category:   hotplace.category || '',
        vibes:      hotplace.vibes || '',
        rating:     hotplace.rating || 1,
        visit_date: hotplace.visit_date || ''
      });
    } else {
      setFormData({ place_name: '', category: '', vibes: '', rating: 1, visit_date: '' });
    }
  }, [hotplace]);

  if (!show) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const data = isEdit ? { ...formData, id: hotplace.id } : formData;
    onSave(data);
  };

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEdit ? '장소 수정' : '신규 등록'}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">가게 이름</label>
              <input className="form-control" name="place_name" value={formData.place_name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">카테고리</label>
              <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
                <option value="">선택</option>
                <option value="밥집">밥집</option>
                <option value="카페">카페</option>
                <option value="서점">서점</option>
                <option value="쇼핑">쇼핑</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">분위기 태그</label>
              <select className="form-select" name="vibes" value={formData.vibes} onChange={handleChange}>
                <option value="">선택</option>
                <option value="힙함">힙함</option>
                <option value="감성적">감성적</option>
                <option value="차분함">차분함</option>
                <option value="아늑함">아늑함</option>
                <option value="고급스러움">고급스러움</option>
                <option value="빈티지함">빈티지함</option>
                <option value="레트로함">레트로함</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">별점 (1~5)</label>
              <input className="form-control" name="rating" type="number" min="1" max="5" value={formData.rating} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">방문 날짜</label>
              <input className="form-control" name="visit_date" type="date" value={formData.visit_date} onChange={handleChange} />
            </div>
          </div>
          <div className="modal-footer">
            {isEdit && (
              <button className="btn btn-danger me-auto" onClick={() => onDelete(hotplace.id)}>삭제</button>
            )}
            <button className="btn btn-secondary" onClick={onClose}>취소</button>
            <button className="btn btn-primary" onClick={handleSave}>{isEdit ? '수정' : '등록'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotplaceModal;