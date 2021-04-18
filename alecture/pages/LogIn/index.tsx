import useInput from '@hooks/useInput';
import { Form, Error, Label, Input, LinkContainer, Button, Header } from '@pages/SignUp/styles';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher'

// swr : 로그인 정보를 전역에서 사용. 보통 get 요청

const LogIn = () => {

  // fetcher : 주소를 어떻게 처리할 건지 정의

  // revalidate : 서버에 다시 요청
  // mutate : 서버에 요청 하지 않고 데이터 수정
  const { data, error, revalidate, mutate } = useSWR('/api/users', fetcher);

  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLogInError(false);
      axios
        .post(
          '/api/users/login',
          { email, password },
          {
            withCredentials: true,
          },
        )
        .then((response) => {
          revalidate();
          // mutate : 기존에 가지고 있던 데이터를 다시 넣음. 두번째 인자에 false를 넣어야 서버에 요청 x
          // revalidate : 로그인 성공시 fetcher 함수 실행
          // 로그인 성공시 data 값이 true로 바뀌고 내 정보 값으로 변경됨.

          // Optimistic UI : 일단 성공한다고 생각하고 그 다음에 실제 성공했는지 점검
          // 기본적으로는 Passimistic UI 

        })
        .catch((error) => {
          setLogInError(error.response?.data?.statusCode === 401);
        });
    },
    [email, password],
  );

  if(data === undefined) {
    return <div>로딩중...</div>;
  }

  // 로그인 성공 후 페이지 이동
  if (data) {
    // return <Redirect to="/channel" />;
    return <Redirect to="/workspace/channel" />;
  }
  
  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;