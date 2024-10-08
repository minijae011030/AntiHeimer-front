import {Storage} from '../../../Utils/Function/Storage';

export default async function GetRandomWordFunction() {
  const userState = await Storage.getItem('userState');
  const token = userState.jwtToken;

  const result = await fetch(`${process.env.API}/diagnosis/random-words`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await result.json();

  return res;
}
