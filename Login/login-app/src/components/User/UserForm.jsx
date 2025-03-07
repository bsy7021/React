import React from 'react'

const UserForm = ({ userInfo, updateUser, deleteUser }) => {

  // 정보 수정
  const onUpdate = (e) => {
    e.preventDefault()

    const form = e.target
    const username = form.username.value
    const password = form.password.value
    const name = form.name.value
    const email = form.email.value
    console.log(username, password, name, email);
    

    updateUser( { username, password, name, email } )
  }

  return (
    <div className="form">
        <h2 className="login-title">회원 정보</h2>

        <form className='login-form' onSubmit={ (e) => onUpdate(e) }>
            <div>
                <label htmlFor="username">username</label>
                <input type="text"
                       id='username'
                       placeholder='username'
                       name='username'
                       autoComplete='username'
                       required
                       readOnly
                       defaultValue={ userInfo?.username } />
            </div>

            <div>
                <label htmlFor="password">password</label>
                <input type="password"
                       id='password'
                       placeholder='password'
                       name='password'
                       autoComplete='password'
                       required />
            </div>

            <div>
                <label htmlFor="name">name</label>
                <input type="text"
                       id='name'
                       placeholder='name'
                       name='name'
                       autoComplete='name'
                       required
                       defaultValue={ userInfo?.name } />
            </div>

            <div>
                <label htmlFor="email">email</label>
                <input type="text"
                       id='email'
                       placeholder='email'
                       name='email'
                       autoComplete='email'
                       required
                       defaultValue={ userInfo?.email } />
            </div>

            <button type="submit" className="btn btn--form btn-login">
                정보 수정
            </button>
            <button type="submit" className="btn btn--form btn-login" onClick={ () => deleteUser( userInfo.username )}>
                회원 탈퇴
            </button>
        </form>
    </div>
  )
}

export default UserForm