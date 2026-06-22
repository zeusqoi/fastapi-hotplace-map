### fastapi hotplace map
FastAPI와 React를 활용한 핫플레이스 관리 웹 애플리케이션 실습 프로젝트

### 프로젝트 소개
백엔드는 FastAPI를 사용하여 REST API 서버를 구축하고, 프론트엔드는 React(Vite)를 사용하여 사용자 인터페이스를 구현하였다. MySQL 데이터베이스와 SQLAlchemy ORM을 활용하여 카페, 맛집, 팝업 등 핫플레이스 정보를 등록·조회·수정·삭제할 수 있는 CRUD 기반 웹 애플리케이션이다.

### 기술 스택
#### Backend
- Python
- FastAPI
- SQLAlchemy
- PyMySQL
- MySQL
- Pydantic

#### Frontend
- React
- Vite
- JavaScript
- CSS
- Bootstrap 5

### 실행 방법
#### Backend
```bash
cd backend
uvicorn main:app --reload --port 8080
```
#### Frontend
```bash
cd frontend
npm run dev -- --port 3000
```

### 주요 기능
- 핫플레이스 전체 조회 (등록일 최신순 정렬)
- 가게 이름 · 카테고리 · 분위기 태그 키워드 검색
- 신규 장소 등록 (가게 이름, 카테고리, 분위기 태그, 별점, 방문 날짜)
- 장소 정보 수정 및 삭제
- REST API 기반 프론트엔드-백엔드 연동
- CORS를 활용한 크로스 오리진 통신

### 프로젝트 목적
- FastAPI를 활용한 REST API 개발
- SQLAlchemy ORM을 이용한 데이터베이스 연동
- React 기반 프론트엔드 구현
- CRUD 기능 구현 및 백엔드-프론트엔드 연동 학습
- Pydantic을 활용한 데이터 검증 학습
