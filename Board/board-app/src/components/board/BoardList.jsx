import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as format from '../../utils/format'
// import './css/BoardList.css'
import styles from './css/BoardList.module.css'
import noImage from '../../assets/react.svg'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const BoardList = ({ boardList, pagination }) => {

  // const boardList = [
  //   { no: 1, title: "게시글 제목1", writer: "작성자1", "createdAt" : "2024-12-30 12:45:50" },
  //   { no: 2, title: "게시글 제목2", writer: "작성자2", "createdAt" : "2024-12-30 12:45:50" },
  //   { no: 3, title: "게시글 제목3", writer: "작성자3", "createdAt" : "2024-12-30 12:45:50" },
  //   { no: 4, title: "게시글 제목4", writer: "작성자4", "createdAt" : "2024-12-30 12:45:50" },
  //   { no: 5, title: "게시글 제목5", writer: "작성자5", "createdAt" : "2024-12-30 12:45:50" },
  // ]

  // 💎 state
  const [pageList, setPageList] = useState([])

  // ?파라미터=값 가져오는 방법
  // const location = useLocation()
  // const query = new URLSearchParams(location.search)
  // const page = query.get("page")
  // const size = query.get("size")

  const createPageList = () => {
    let newPageList = []
    for (let i = pagination.start; i <= pagination.end; i++) {
      newPageList.push(i)
    }
    setPageList(newPageList)
  }

  useEffect(() => {
    createPageList()
  }, [pagination])
  

  return (
    <div className="container">
      <h1 className='title'>게시글 제목</h1>
      <Link to="/boards/insert" className='btn'>글쓰기</Link>
      <Link to="/" className='btn'>Home</Link>

      {/* <table border={1} className='table'> */}
      <table border={1} className={`${styles.table}`}>
        <thead>
          <tr>
            <th>번호</th>
            <th>이미지</th>
            <th>제목</th>
            <th>작성자</th>
            <th>등록일자</th>
          </tr>
        </thead>
        <tbody>
          {/* 화살표 함수 내용이 한 문장이면, {}, return 생략 */}
            {/* () => */}
            {/* () => () */}

          {/* { } 안에서 함수 내용 작성 */}
            {/* () => { return ? } */}
          {
            boardList.lenth == 0
            ?
              <tr>
                <td colSpan={4} align='center'>조회된 데이터가 없습니다.</td>
              </tr>
            :
            boardList.map((board) => {
            return (
                <tr key={board.no}>
                  <td align='center'>{ board.no }</td>
                  <td>
                    {
                      board.file == null
                      ?
                      <img src={noImage} />
                      :
                      <img src={`/api/files/img/${board.file.id}`} alt={board.file.originName} className='file-img' />
                    }
                  </td>
                  <td align='left'>
                    <Link to={`/boards/${board.id}`}>
                      {board.title}
                    </Link>
                  </td>
                  <td align='center'>{ board.writer }</td>
                  <td align='center'>{ format.formatDate(board.createdAt) }</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      {/* 페이지네이션 */}
      {
        ( pagination != null && pagination.total > 0 )
        &&
        (
          <div className="pagination">
            {/* <a href={`/boards?page=${pagination?.first}`} className='btn-page'>처음</a> */}
            {/* <a href={`/boards?page=${pagination?.prev}`} className='btn-page'>이전</a> */}
            <Link to={`/boards?page=${pagination.first}`} className='btn-page'>
              <KeyboardDoubleArrowLeftIcon />
            </Link>
            {
              ( pagination.page <= pagination.first )
              ||
              <Link to={`/boards?page=${pagination.prev}`} className='btn-page'>
                <KeyboardArrowLeftIcon />
              </Link>
            }
            {
              pageList.map( page => (
                // ✅ active 클래스 추가 (현재 페이지)
                // <a href={`boards?page=${page}`} className={page == pagination.page ? 'btn-page active' : 'btn-page'}>{page}</a>
                // <a href={`boards?page=${page}`} className={'btn-page' + (page == pagination?.page && 'active')}>{page}</a>
                <Link to={`/boards?page=${page}`} className={'btn-page ' + (page == pagination.page && 'active')}>{page}</Link>
              ))
            }
            {/* <a href={`/boards?page=${pagination?.next}`} className='btn-page'>다음</a> */}
            {/* <a href={`/boards?page=${pagination?.last}`} className='btn-page'>마지막</a> */}
            {
              (pagination.page >= pagination.last)
              ||
              <Link to={`/boards?page=${pagination.next}`} className='btn-page'>
                <KeyboardArrowRightIcon />
              </Link>
            }
            <Link to={`/boards?page=${pagination.last}`} className='btn-page'>
              <KeyboardDoubleArrowRightIcon />
            </Link>
          </div>
        )
      }
    </div>
  )
}

export default BoardList