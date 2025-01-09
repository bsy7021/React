import React from 'react'

const TodoFooter = ({allDone, allRemove}) => {
  return (
    <div className="footer">
        <div className="item">
            <button className="btn" onClick={() => allRemove()}>전체삭제</button>
        </div>
        <div className="item">
            <button className="btn" onClick={() => allDone()}>전체완료</button>
        </div>
    </div>
  )
}

export default TodoFooter