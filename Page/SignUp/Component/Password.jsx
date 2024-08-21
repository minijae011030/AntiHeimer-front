import {useEffect} from 'react';
import InputBox from './InputBox';

function Password({
  password,
  password2,
  setPassword,
  setPassword2,
  isPasswordCorrect,
  setIsPasswordCorrect,
}) {
  /*
  password -> string: 현재 입력된 비밀번호 값
  password2 -> string: 현재 입력된 비밀번호 확인 값
  setPassword -> function: 비밀번호 입력 필드 업데이트 함수
  setPassword -> function: 비밀번호 확인 입력 필드 업데이트 함수
  isPasswordCorrect -> boolean: 비밀번호 입력 필드 값과 비밀번호 확인 입력 필드 값이 같은지
  setIsPasswordCorrect -> function: isPasswordCorrect 상태 변경 함수 (boolean -> void)
  */
  useEffect(() => {
    // password, password2 input 칸 상태에따라 isPasswordCorrect 값 변경
    if (
      password2 == null ||
      password2 == '' ||
      password != password2 ||
      password.length < 12 ||
      password.length > 24
    ) {
      setIsPasswordCorrect(false);
    } else {
      setIsPasswordCorrect(true);
    }
  }, [password, password2]);

  return (
    <>
      <InputBox
        title="비밀번호"
        placeholder="비밀번호 입력해주세요"
        value={password}
        onChange={setPassword}
        security={true}
        comment="영어, 숫자 포함 12~24자리를 입력해주세요."
      />
      <InputBox
        title="비밀번호 확인"
        placeholder="한번 더 비밀번호 입력해주세요"
        value={password2}
        onChange={setPassword2}
        security={true}
        comment={isPasswordCorrect ? '' : '비밀번호가 일치하지 않습니다.'}
      />
    </>
  );
}

export default Password;
