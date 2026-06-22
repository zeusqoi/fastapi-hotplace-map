use kakao5;
CREATE TABLE Hotplace (
	id INT AUTO_INCREMENT PRIMARY KEY,
    place_name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    vibes VARCHAR(255),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    visit_date DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
select * from Hotplace;
INSERT INTO Hotplace (place_name, category, vibes, rating, visit_date) VALUES ('미스터초밥왕', '밥집', '힙함', 3, '2026-04-29'), ('햄버거는왜햄버거일까', '밥집', '힙함', 1, '2026-04-30'), ('말달리자', '카페', '감성적', 5, '2026-04-30'), ('교보몬', '서점', '차분함', 4, '2026-04-30'), ('랄랄라', '밥집', '아늑함', 5, '2026-05-04');