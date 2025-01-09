import React, { useEffect, useState } from 'react'
import Card from './Card'

const CardList = () => {

  // ⭐ state 선언
  // 😁 productList
  const [productList, setProductList] = useState([])

  // 🤟 데이터 요청 함수

  // - async/await
  const getProductList = async() => {
    const response = await fetch('http://localhost:8080/products')
    const productList = await response.json()
    setProductList(productList)
  }
  // ❔ useEffect() 훅 사용
	// "렌더링 시 호출 되는 함수"
	// : 함수형 컴포넌트에서 마운트, 업데이트, 언마운트 생명주기 작업을 
	//   처리할 수 있도록 해주는 훅
  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div>
        <h1>떡잎 마을 방범대</h1>
        <div style={{
          display:"grid",
          gridTemplateColumns: "repeat(4, auto)",
          rowGap: "40px"
        }}>
        {
            productList.map(( card, index ) => {
                // return <Card key={card.no} title={card.title} content={card.content} />
                // 카드 객체가 가지고 있는 모든 내용을 넘겨줌
                // return <Card key={card.no} {...card} />
                return <Card key={card.no} card={card}/>
            })
        }
        </div>
    </div>
  )
}

export default CardList