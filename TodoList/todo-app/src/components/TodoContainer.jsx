import React, { useEffect, useState } from 'react'
import TodoHeader from './TodoHeader'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import TodoFooter from './TodoFooter'

const TodoContainer = () => {

  // ⭐ state
  const [todoList, setTodoList] = useState([])
  const [input, setInput] = useState('')

  // ⭐ 이벤트 함수
  // 🤟 체크박스 토글 함수
  const onToggle = async (todo) => {

    // 클라이언트에서 status 변경
    // const newTodoList = todoList.map((item) => {
    //   return item.id == todo.id ? { ...item, status : !item.status } : item
    // })

    // // 클라이언트에서 sort( 정렬 )
    // newTodoList.sort((a, b) => {
    //   return a.status == b.status ? a.seq - b.seq : (a.status ? 1 : -1)
    // })

    // 상태 수정 요청
    const data = {
      ...todo,
      status: !todo.status
    }
    const option = {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    }

    try{
      const url = 'http://localhost:8080/todos'
      const response = await fetch(url, option)
      console.log(response.text());
      loadTodoList()
    } catch (error) {
      console.log(error);
    }

  }

  // 전체 수정
  const allDone = async () => {
    // 상태 수정 요청
    console.log("수정")
    const data = {}
    const option = {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    }

    try{
      const url = 'http://localhost:8080/todos'
      const response = await fetch(url, option)
      console.log(response.text());
      loadTodoList()
    } catch (error) {
      console.log(error);
    }

  }

  // 삭제
  const onRemove = async (id) => {
    const option = {
      method: "DELETE",
    }
    try {
      const response = await fetch(`http://localhost:8080/todos/${id}`, option )
      if ( response.ok ){
        loadTodoList()
      }

    } catch (error) {
      
    }
  }
  // 전체 삭제
  const allRemove = async () => {
    const option = {
      method: "DELETE",
    }
    try {
      const response = await fetch(`http://localhost:8080/todos`, option )
      if ( response.ok ){
        loadTodoList()
      }

    } catch (error) {
      
    }
  }
  const loadTodoList = () => {
    // 할일 목록 요청
    fetch('http://localhost:8080/todos')
      .then(response => response.json())
      .then(data => {
        // data.list       : 할일 목록
        // data.pagination : 페이지 정보
        setTodoList( data.list )
        console.log(todoList);
        
      })
      .catch(error => {console.error(error)})
  }

  // 할 일 입력 변경 이벤트 함수
  const onChange = (e) => {
    console.log(e.target.value);
    setInput(e.target.value)
  }

  useEffect(() => {
    loadTodoList()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()  // 기본 이벤트 동작 방지
    if( input == '' ) setInput('제목없음')
    
    // 데이터 등록 요청
    const data = {
      name: input,
      seq: 1
    }
    const option = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    }
    try {
      const url = 'http://localhost:8080/todos'
      const response = await fetch(url, option)
      const msg = await response.text()
      console.log(msg);
    } catch (error) {
      console.log(error);
    }
    loadTodoList()
    setInput('')
  }

  return (
    <div className="container">
        <TodoHeader />
        <TodoInput input={input} onChange={onChange} onSubmit={onSubmit} />
        <TodoList todoList = { todoList } onToggle={onToggle} onRemove={onRemove} />
        <TodoFooter allDone={allDone} allRemove={allRemove} />
    </div>
  )
}

export default TodoContainer