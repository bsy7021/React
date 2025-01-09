-- Active: 1731384164792@@127.0.0.1@3306@aloha
DROP TABLE IF EXISTS `boards`;

CREATE TABLE `boards` (
	`no`	BIGINT	NOT NULL AUTO_INCREMENT PRIMARY KEY	COMMENT 'PK',
	`id`	VARCHAR(64)	NOT NULL	COMMENT 'UK',
	`title`	VARCHAR(100)	NOT NULL	COMMENT '제목',
	`writer`	VARCHAR(100)	NOT NULL	COMMENT '작성자',
	`content`	TEXT	NULL	COMMENT '내용',
	`created_at`	TIMESTAMP	NOT NULL	DEFAULT CURRENT_TIMESTAMP	COMMENT '등록일자',
	`updated_at`	TIMESTAMP	NOT NULL	DEFAULT CURRENT_TIMESTAMP	COMMENT '수정일자'
) COMMENT '게시판';

-- 샘플 데이터
INSERT INTO boards ( id, title, writer, content )
VALUES 
    ( UUID(), '제목1', '작성자1', '내용1' ),
    ( UUID(), '제목2', '작성자2', '내용2' ),
    ( UUID(), '제목3', '작성자3', '내용3' ),
    ( UUID(), '제목4', '작성자4', '내용4' ),
    ( UUID(), '제목5', '작성자5', '내용5' ),
    ( UUID(), '제목6', '작성자6', '내용6' ),
    ( UUID(), '제목7', '작성자7', '내용7' ),
    ( UUID(), '제목8', '작성자8', '내용8' ),
    ( UUID(), '제목9', '작성자9', '내용9' ),
    ( UUID(), '제목10', '작성자10', '내용10' )
;

-- 서브쿼리
SELECT *
    ,(SELECT id FROM files WHERE p_no = b.no AND `type` = 'MAIN') main_file_id
FROM boards b
;

-- 조인
SELECT b.*, f.id
FROM boards b LEFT JOIN files f
              ON f.p_no = b.no AND `type` = 'MAIN'
;