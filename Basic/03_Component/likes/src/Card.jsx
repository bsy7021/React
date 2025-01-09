import { Favorite, FavoriteBorder } from "@mui/icons-material"
import React, { useState } from 'react'

// const Card = (props) => {

// 구조분해할당으로 필요한 데이터만 가져옴 (이게 짱인듯?)
// const Card = ({title, content}) => {

const Card = ({ card }) => {
  // card 객체로 가져오기 때문에 card 컨텐츠를 구조분해할당으로 꺼내야함
  console.log(card);
  
  const { no, title, content, img, likes } = card
  // ⭐ state 선언
  const [like, setLike] = useState(false)
  const [likeCount, setCount] = useState(likes)

  // ⭐ 이벤트 핸들러
  const handleLike = () => {
    setLike( !like )

    !like
    ?
    setCount ( likeCount + 1 )
    :
    setCount ( likeCount - 1 )

    console.log(`like : ${like}`);
  }

  return (
    <div style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        overflow: "hideen",
        boxShadow: "0 5px 10px rgba(0,0,0,0.2)",
        margin: "0 20px",
    }}>
        {/* 상품 이미지 */}
        <img src={ img } alt="상품이미지" style={{ width: "250px", height: "150px", objectFit: "cover" }}/>
        {/* 컨텐츠 */}
        <div style={{ padding: "10px"}}>
            <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>
                {/* {props.title} */}
                {title}
            </h3>
            <p style={{ color: "#ff6767", fontSize: "14px" }}>
                {/* {props.content} */}
                {content}
            </p>
            <button
                style={{
                    border: "none",
                    backgroundColor: "transparent",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onClick={ handleLike }
                >
                    {
                        like
                        ?
                        <Favorite style={{ color: "red", fontSize: "40px" }} />
                        :
                        <FavoriteBorder style={{ color: "red", fontSize: "40px" }} />
                    }
                <span style={{ marginLeft: "5px", fontSize: "25px" }}>{ likes }</span>
            </button>
        </div>
    </div>
  )
}

export default Card