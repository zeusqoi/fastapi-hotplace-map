// App.jsx

import { useState } from 'react'
import './App.css'
import HotplaceSearch from './components/HotplaceSearch';
import HotplaceList from './components/HotplaceList';
import HotplaceModal from './components/HotplaceModal';

function App() {
  const [hotplace, setHotplace] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastKeyword, setLastKeyword] = useState('');
  const [showModal, setShowModal] = useState(false)
  const [selectedHotplace, setSelectedHotplace] = useState(null);

  const handleSearch = async (keyword) => {
    setLoading(true);
    setLastKeyword(keyword); 
    
    try {
      const response = await fetch(`http://localhost:8080/hotplace/search?keyword=${keyword}`);
      const result = await response.json();

      if (result.status === 'success') {
        setHotplace(result.data);
        setMessage(result.message);
      } else {
        setHotplace([]);
        setMessage(result.message || '검색 결과가 없습니다.');
      }

    } catch(error) {
      console.error("API 통신 에러:", error);
      setMessage('서버와 연결할 수 없습니다. FastAPI 백엔드 서버(포트 8080) 실행 상태를 확인해주세요.');
      setHotplace([]);
    } finally {
      setLoading(false);
    }
  }; 

  const handleOpenRegister = () => {
    setSelectedHotplace(null);
    setShowModal(true)
  }

  const handleOpenDetail = (hotplace) => {
    setSelectedHotplace(hotplace)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setSelectedHotplace(null);
    setShowModal(false);
  }

  const handleSaveHotplace = async (hotplaceData) => {
    const isEdit = !!hotplaceData.id;
    const url = isEdit ? `http://localhost:8080/hotplace/${hotplaceData.id}` : 'http://localhost:8080/hotplace';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          place_name: hotplaceData.place_name,
          category: hotplaceData.category,
          vibes: hotplaceData.vibes,
          rating: Number(hotplaceData.rating),
          visit_date: hotplaceData.visit_date,
          created_at: hotplaceData.created_at
        })
      });

      const result = await response.json();

      if (result.status === "success") {
        alert(isEdit ? '수정이 완료되었습니다.' : '등록이 완료되었습니다.');
        handleSearch(lastKeyword);
        handleCloseModal();
      } else {
        alert(result.message || "저장에 실패했습니다.");
      }

    } catch (error) {
      console.error("저장 중 에러:", error);
      alert("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteHotplace = async (id) => {
    if (!window.confirm("정말 이 장소를 삭제하시겠습니까?")) return;
    try {
      const response = await fetch(`http://localhost:8080/hotplace/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (result.status === "success") {
        alert(result.message);
        handleSearch(lastKeyword);
        handleCloseModal();
      }
    } catch (error) {
      console.log("삭제 중 에러:", error);
      alert("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-9 col-md-11">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-primary">핫플레이스 관리 시스템</h2>
          </div>
          
          <HotplaceSearch onSearch={handleSearch} onRegister={handleOpenRegister} />
          
          {message && !loading && (
            <div className={`alert mt-4 shadow-sm ${hotplace.length > 0 ? 'alert-success border-success' : 'alert-warning border-warning'}`} role="alert">
              <i className={`bi ${hotplace.length > 0 ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2`}></i>
              {message}
            </div>
          )}
          
          <HotplaceList hotplace={hotplace} onRowClick={handleOpenDetail} />
        </div>
      </div>

      <HotplaceModal
        show={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveHotplace}
        onDelete={handleDeleteHotplace}
        hotplace={selectedHotplace}
      />
    </div>
  );
}

export default App;