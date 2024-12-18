import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  MainMediumButtonBlack,
  MainMediumButtonGray,
} from '../../../Utils/Component/MainButton';
import {CancelAlert, ConfirmAlert} from '../../../Utils/Component/CustomAlert';

import Diagnosis1Component from './Diagnosis1Component';
import Diagnosis2Component from './Diagnosis2Component';
import Diagnosis3Component from './Diagnosis3Component';

import GetDiagnosisSheet from '../Function/GetDiagnosisSheet';
import GetRandomWordFunction from '../Function/GetRandomWordFunction';
import PostDiagnosisAnswer from '../Function/PostDiagnosisAnswer';
import Diagnosis4Component from './Diagnosis4Component';

function DiagnosisPage({navigation}) {
  const [diagnosisSheet, setDiagnosisSheet] = useState(null);
  const [randomWords, setRandomWords] = useState(null);
  const [isRandomWordsLoaded, setIsRandomWordsLoaded] = useState(false);
  const [num, setNum] = useState(1);
  const [diagnosisAnswer, setDianosisAnswer] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
  });

  async function getDiagnosisSheet() {
    const result = await GetDiagnosisSheet({num: num});
    if (result.statusCode === '200') {
      setDiagnosisSheet(result.diagnosisSheet);
      return;
    }

    ConfirmAlert({
      title: '진단지 로드 실패',
      message: '진단지 로드에 실패하였습니다.',
      onPress: () => {},
    });

    return;
  }

  async function getRandomWords() {
    const result = await GetRandomWordFunction();

    if (result.statusCode === '200') {
      setRandomWords(result.randomWords);
      setIsRandomWordsLoaded(true);
      return;
    }

    ConfirmAlert({
      title: '단어 로드 실패',
      message: '단어 로드에 실패하였습니다.',
      onPress: () => {},
    });

    return;
  }

  function getPrevDiagnosisSheet() {
    if (num >= 2) {
      setNum(prev => prev - 1);
    }
  }

  async function getNextDiagnosisSheet() {
    if (num < 11) {
      setNum(prev => prev + 1);
    } else {
      CancelAlert({
        title: '진단지 제출',
        message: '진단지를 제출하시겠습니까?',
        onPressConfirm: async () => {
          const result = await PostDiagnosisAnswer({
            diagnosisAnswer: diagnosisAnswer,
          });

          if (result.statusCode === '200') {
            navigation.navigate('Diagnosis Result', {result});
            setNum(1);
            return;
          }

          if (result.statusCode === '400') {
            ConfirmAlert({
              title: '치매 진단 실패',
              message: '진단 결과 저장 및 치매 진단에 실패하였습니다.',
              onPress: () => {},
            });
          }

          if (result.statusCode === '426') {
            ConfirmAlert({
              title: '유효하지 않은 점수',
              message: '점수가 유효하지 않습니다.',
              onPress: () => {},
            });
          }
        },

        onPressCancel: () => {},
      });
    }
  }

  function handleScoreUpdate(num, score) {
    setDianosisAnswer(prev => ({...prev, [num]: score}));
  }

  useEffect(() => {
    if (!isRandomWordsLoaded) {
      getRandomWords();
    }
  }, []);

  useEffect(() => {
    getDiagnosisSheet();
  }, [num]);

  if (diagnosisSheet && randomWords) {
    return (
      <>
        {num == 2 ? (
          <View style={styles.keyboardView}>
            <View style={styles.container}>
              <Diagnosis2Component
                num={num}
                diagnosisSheet={diagnosisSheet}
                setScore={score => handleScoreUpdate(num, score)}
                setDianosisAnswer={setDianosisAnswer}
              />
              <View style={styles.buttonDiv}>
                <MainMediumButtonGray
                  text="이전"
                  onPress={() => getPrevDiagnosisSheet()}
                />
                <MainMediumButtonBlack
                  text={num == 11 ? '제출하기' : '다음'}
                  onPress={() => getNextDiagnosisSheet()}
                />
              </View>
            </View>
          </View>
        ) : (
          <KeyboardAwareScrollView
            style={styles.keyboardView}
            KeyboardAwareScrollView
            extraScrollHeight={20}
            enableOnAndroid={true}
            nestedScrollEnabled={true}>
            <View style={styles.container}>
              {num == 4 ? (
                <Diagnosis3Component
                  num={num}
                  diagnosisSheet={diagnosisSheet}
                  setScore={score => handleScoreUpdate(num, score)}
                  setDianosisAnswer={setDianosisAnswer}
                />
              ) : num == 7 ? (
                <Diagnosis4Component
                  num={num}
                  diagnosisSheet={diagnosisSheet}
                  setScore={score => handleScoreUpdate(num, score)}
                  score={diagnosisAnswer[num]}
                />
              ) : (
                <Diagnosis1Component
                  diagnosisSheet={diagnosisSheet}
                  randomWords={randomWords}
                  setScore={score => handleScoreUpdate(num, score)}
                  score={diagnosisAnswer[num]}
                  num={num}
                />
              )}

              <View style={styles.buttonDiv}>
                <MainMediumButtonGray
                  text="이전"
                  onPress={() => getPrevDiagnosisSheet()}
                />
                <MainMediumButtonBlack
                  text={num == 11 ? '제출하기' : '다음'}
                  onPress={() => getNextDiagnosisSheet()}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        )}
      </>
    );
  }
}

export default DiagnosisPage;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  buttonDiv: {
    width: 330,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
