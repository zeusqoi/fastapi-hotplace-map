# main.py

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import or_

from sqlalchemy import create_engine, text, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from sqlalchemy import Column, Integer, String, Date, DateTime
from datetime import date, datetime, timezone

SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:비밀번호@localhost/kakao5"
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def check_db_connection(db: Session = Depends(get_db)):

    try:
        print("")
        db.execute(text("SELECT 1"))
        return {
            "status":"success",
            "message":"데이터베이스(kakao5) 연결이 정상적으로 완료되었습니다."
        }
    
    except Exception as e:
        return {
            "status":"error",
            "message":"데이터베이스(kakao5) 연결이 실패했습니다.",
            "detail":str(e)
        }

class Hotplace(Base):
    __tablename__ = "Hotplace"
    id         = Column(Integer, primary_key=True, autoincrement=True)
    place_name = Column(String(255), nullable=False)
    category   = Column(String(255), nullable=False)
    vibes      = Column(String(255))
    rating     = Column(Integer)
    visit_date = Column(Date)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class HotplaceSchema(BaseModel):
    place_name: str
    category:   str
    vibes:      str | None = None
    rating:     int
    visit_date: date

@app.get("/hotplace")
def get_all_hotplace(db: Session = Depends(get_db)):

    try:
        result = (
            db.query(Hotplace)
            .order_by(Hotplace.created_at.desc())
            .all()
        )
        if not result:
            return {"status": "failure", "message": "등록된 장소가 없습니다.", "data": []}
        data = [{"id":h.id, "place_name": h.place_name, "category": h.category, "vibes": h.vibes,
                 "rating": h.rating, "visit_date": h.visit_date, "created_at": h.created_at} for h in result]
        return {"status": "success", "message": f"총 {len(data)}곳의 장소가 있습니다.", "data": data}
    except Exception as e:
        return {"status": "error", "message": "조회 오류", "detail": str(e)}

@app.get("/hotplace/search")
def search_hotplace(keyword: str = "", db: Session = Depends(get_db)):
    try:
        query = db.query(Hotplace)
        
        if keyword:
            query = query.filter(
                or_(
                    Hotplace.place_name.like(f"%{keyword}%"),
                    Hotplace.category.like(f"%{keyword}%"),
                    Hotplace.vibes.like(f"%{keyword}%")
                )
            )
        
        result = (
            query
            .order_by(Hotplace.created_at.desc())
            .all()
        )
        
        if not result:
            return {"status": "failure", "message": "검색 결과가 없습니다.", "data": []}
        
        data = [{"id":h.id, "place_name": h.place_name, "category": h.category, "vibes": h.vibes,
                 "rating": h.rating, "visit_date": h.visit_date, "created_at": h.created_at} for h in result]
        return {"status": "success", "message": f"{len(data)}곳 검색되었습니다.", "data": data}
    
    except Exception as e:
        return {"status": "error", "message": "검색 오류", "detail": str(e)}
    
class HotplaceCreate(BaseModel):
    place_name: str
    category:   str
    vibes:      str | None = None
    rating:     int
    visit_date: date

@app.post("/hotplace")
def put_new_hotplace(hotplace: HotplaceSchema, db: Session = Depends(get_db)): 
    try:
        print("장소 등록 처리")
        hotplace = Hotplace(
            place_name=hotplace.place_name,
            category=hotplace.category,
            vibes=hotplace.vibes,
            rating=hotplace.rating,
            visit_date=hotplace.visit_date
        )
        db.add(hotplace)
        db.commit()
        db.refresh(hotplace)
        return {"status": "success", "message": "장소가 성공적으로 등록되었습니다."}
    except Exception as e:
        db.rollback()
        print("장소 등록시 예외 발생")
        return {"status": "error", "message": "장소 등록 실패", "detail": str(e)}
    
class HotplaceUpdate(BaseModel):
    place_name: str
    category:   str
    vibes:      str | None = None
    rating:     int
    visit_date: date
    
@app.put("/hotplace/{hotplace_id}")
def update_hotplace(hotplace_id: int, hotplace: HotplaceSchema, db: Session = Depends(get_db)):
    try:
        db_hotplace = db.query(Hotplace).filter(Hotplace.id == hotplace_id).first()
        if not db_hotplace:
            return {"status": "failure", "message": "해당 장소 정보가 존재하지 않습니다."}
        db_hotplace.place_name = hotplace.place_name
        db_hotplace.category = hotplace.category
        db_hotplace.vibes = hotplace.vibes
        db_hotplace.rating = hotplace.rating
        db_hotplace.visit_date = hotplace.visit_date
        db.commit()
        return {"status": "success", "message": "장소 정보가 수정되었습니다."}
    except Exception as e:
        db.rollback()
        return {"status": "error", "message": "장소 수정 실패", "detail": str(e)}
    
class HotplaceResponse(BaseModel):
    place_name: str
    category:   str
    vibes:      str | None = None
    rating:     int
    visit_date: date

@app.delete("/hotplace/{hotplace_id}")
def delete_hotplace(hotplace_id: int, db: Session = Depends(get_db)):
    try:
        db_hotplace = db.query(Hotplace).filter(Hotplace.id == hotplace_id).first()
        if not db_hotplace:
            return {"status": "failure", "message": "해당 장소 정보가 존재하지 않습니다."}
        db.delete(db_hotplace)
        db.commit()
        return {"status": "success", "message": "장소가 삭제되었습니다."}
    except Exception as e:
        db.rollback()
        return {"status": "error", "message": "장소 삭제 실패", "detail": str(e)}