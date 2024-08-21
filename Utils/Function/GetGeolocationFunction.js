import Geolocation from 'react-native-geolocation-service';

export default async function GetGeoLocationFunction() {
  // 위치 권한 요청
  const permission = await Geolocation.requestAuthorization('always');

  // 권한이 부여된 경우 위치를 가져옴
  if (permission === 'granted') {
    return await new Promise((res, rej) => {
      // 현재 위치를 가져옴
      Geolocation.getCurrentPosition(
        position => {
          // 위치 정보에서 위도와 경도 및 타임스탬프를 추출
          const {latitude, longitude} = position.coords;
          const timestamp = position.timestamp;

          // 타임스탬프를 Date 객체로 변환
          const date = new Date(timestamp);

          // Date 객체를 'YYYY-MM-DD HH:MM:SS' 형식으로 포맷팅
          const formattedDate = `${date.getFullYear()}-${String(
            date.getMonth() + 1,
          ).padStart(2, '0')}-${String(date.getDate()).padStart(
            2,
            '0',
          )} ${String(date.getHours()).padStart(2, '0')}:${String(
            date.getMinutes(),
          ).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

          // 위치와 포맷된 날짜를 포함하는 객체를 생성
          const location = {latitude, longitude};
          const locationData = {location, formattedDate};

          // Promise를 성공으로 처리
          res(locationData);
        },
        error => {
          // 위치를 가져오는 중 오류가 발생한 경우
          console.log(error);
          rej(error); // Promise를 실패로 처리
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}, // 위치 요청 옵션
      );
    });
  } else {
    // 위치 권한이 부여되지 않은 경우 오류를 발생
    throw new Error('Location permission not granted');
  }
}
