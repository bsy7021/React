import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Swal from '../apis/alert';
import * as auth from '../apis/auth';
import api from '../apis/api'

export const LoginContext = React.createContext();
LoginContext.displayName = 'LoginContextName'

const LoginContextProvider = ({ children }) => {
  
  // 로그인 여부
  const [isLogin, setIsLogin] = useState(false)
  // 사용자 정보
  const [userInfo, setUserInfo] = useState(null)
  // 권한 정보
  const [roles, setRoles] = useState( { isUser : false, isAdmin : false } )

  // 페이지 이동
  const navigate = useNavigate()

  // 로그인 함수
  const login = async(username, password) => {
    console.log(`username : ${username}`);
    console.log(`password : ${password}`);
    
    try {
      const response = await auth.login(username, password)
      const data = response.data
      const status = response.status
      const headers = response.headers
      const authorization = headers.authorization
      const jwt = authorization.replace("Bearer ", "")
      
      console.log(`data : ${data}`);
      console.dir(data)
      console.log(`status : ${status}`);
      console.log(`headers : ${headers}`);
      console.log(`authorization : ${authorization}`);
      console.log(`jwt : ${jwt}`);
      
      // 로그인 성공
      if( status == 200 ){
        
        // JWT 를 쿠키에 등록
        Cookies.set("jwt", jwt, { expires: 5} ) // 5일 후 만료
        
        // 로그인 세팅 - loginSetting(authorization, data)
        loginSetting(authorization, data)
        
        // 로그인 성공 alert
        Swal.alert('로그인 성공', '메인 화면으로 이동합니다.', 'success',
          () => navigate("/")
        )
      }

    } catch (error) {
      // 로그인 실패 alert
      Swal.alert('로그인 실패', '아이디 또는 비밀번호가 일치하지 않습니다', 'error')
    }
  }

  // 로그아웃 함수
  const logout = (force=false) => {
    // 강제 로그아웃
    if( force ) {
      // 로그아웃 세팅
      logoutSetting()
      // 페이지 이동 → "/" (메인)
      navigate("/")
      return
    }

    // 로그아웃 확인
    Swal.confirm("로그아웃하시겠습니까?", "로그아웃을 진행합니다", "warning",
      (result) => {
        if( result.isConfirmed ){
          Swal.alert("로그아웃 성공", "로그아웃 되었습니다", "success")
          // 로그아웃 세팅
          logoutSetting()
          // 페이지 이동 → "/" (메인)
          navigate("/")
          return
        }
      }
    )

    // 로그아웃 세팅
    const logoutSetting = () => {
      // Authorization 헤더 초기화
      api.defaults.headers.common.Authorization = undefined

      // 로그인 여부 : false
      setIsLogin(false)

      // 유저 정보 초기화
      setUserInfo(null)

      // 권한 정보 초기화
      setRoles(null)

      // 쿠키 제거
      Cookies.remove("jwt")
    }
  }

  // 자동 로그인 함수
  // 쿠키에 저장된 JWT를 읽어와서 로그인 처리
  const autoLogin = async() => {
    // 쿠키에서 jwt 가져오기
    const jwt = Cookies.get("jwt")
    

    // jwt가 쿠키에 없을때
    if( !jwt ){
      // TODO : 로그아웃 세팅
      return
    }

    // jwt가 쿠키에 있을때
    console.log(`jwt : ${jwt}`);
    const authorization = `Bearer ${jwt}`

    // JWT 를 Authorization 헤더에 등록
    api.defaults.headers.common.Authorization = authorization

    // 사용자 정보 요청
    let response
    let data

    try {
      response = await auth.info()
    } catch (error) {
      console.error(`error : ${error}`);
      console.log(`status : ${response.status}`);
      return
    }
    
    // 인증 실패
    if( response.data == 'UNAUTHORIZED' || response.status == 401 ){
      console.error(`jwt가 만료되었거나 인증에 실패하였습니다.`);
      return
    }

    // 인증 성공
    console.log(`jwt로 자동 로그인 성공`);

    data = response.data

    // 로그인 세팅 - loginSetting(authorization, data)
    loginSetting(authorization, data)

  }

  /**
   * 로그인 세팅
   * @param {*} authorization : Bearer {jwt}
   * @param {*} data : { user }
   */
  const loginSetting = (authorization, data) => {
    // JWT 를 Authorization 헤더에 등록
    api.defaults.headers.common.Authorization = authorization
    // 로그인 여부
    setIsLogin(true)
    // 사용자 정보
    setUserInfo(data)
    // 권한 정보
    const updatedRoles = { isUser : false, isAdmin : false }
    data.authList.forEach( (obj) => {
      if( obj.auth == 'ROLE_USER' ) updatedRoles.isUser = true
      if( obj.auth == 'ROLE_ADMIN' ) updatedRoles.isAdmin = true
    } )
    setRoles(updatedRoles)
  }

  useEffect( () => {
    // 자동 로그인
    // 1️⃣ 쿠키에서 jwt 가져오기
    // 2️⃣ jwt 있으면 사용자 정보 요청
    // 3️⃣ 로그인 세팅 ( 로그인 여부, 사용자 정보, 권한 )
    autoLogin()
  }, [])

  return (
    // 컨텍스트 값 지정 → value={ ?, ? }
    <LoginContext.Provider value={ { isLogin, logout, login, userInfo, roles } }>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;