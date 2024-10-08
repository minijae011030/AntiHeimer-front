import {useEffect, useState} from 'react';

import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';

import SignUpButton from '../Component/SignUpButton';
import Input from '../../../Utils/Component/Input';
import {ConfirmAlert} from '../../../Utils/Component/CustomAlert';
import {MainButtonBlack} from '../../../Utils/Component/MainButton';

import LoginFunction from '../Function/LoginFunction';
import {Storage} from '../../../Utils/Function/Storage';
import {HealthKitService} from '../../../Health/HealthkitService';

function LoginPage({navigation}) {
  const [userId, setUserId] = useState(null);
  const [password, setPassword] = useState(null);

  async function Login() {
    const result = await LoginFunction({id: userId, password: password});

    if (result.statusCode === '200') {
      setUserId(null);
      setPassword(null);

      Storage.setItem('userState', {
        jwtToken: result.jwtToken,
        uuid: result.memberUuid,
        isLoggedIn: true,
      });

      navigation.navigate('Main');
      return;
    }

    ConfirmAlert({
      title: '로그인 실패',
      message: '아이디 또는 비밀번호가 잘못되었습니다.',
      onPress: () => {},
    });
  }

  async function LoadLoginState() {
    const userState = await Storage.getItem('userState');
    if (userState == null) return;

    if (userState.isLoggedIn) navigation.navigate('Main');

    return;
  }

  useEffect(() => {
    HealthKitService.initialize();
    LoadLoginState();
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardview}>
        <Text style={styles.logo}>AntiHeimer</Text>
        <Input
          placeholder="아이디를 입력하세요"
          value={userId}
          onChange={setUserId}
          security={false}
        />
        <Input
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={setPassword}
          security={true}
        />
        <View style={styles.buttondiv}>
          <MainButtonBlack text="로그인" onPress={() => Login()} />
        </View>
        <SignUpButton
          navigation={navigation}
          setUserId={setUserId}
          setPassword={setPassword}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
  },
  keyboardview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 40,
    fontWeight: '900',
    marginBottom: 70,
    marginTop: -100,
  },
  buttondiv: {
    marginTop: 28,
  },
});
