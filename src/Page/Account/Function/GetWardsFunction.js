import EncryptFunction from '../../../Utils/Function/EncryptFunction';
import {Storage} from '../../../Utils/Function/Storage';

export default async function GetWardsFunction() {
  const userState = await Storage.getItem('userState');
  const uuid = userState.uuid;
  const token = userState.jwtToken;

  const encryptedUuid = EncryptFunction({data: uuid});
  const encodedUuid = encodeURIComponent({encryptedUuid});

  const result = await fetch(
    `${process.env.API}/info-relation/ward/${encodedUuid}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const res = await result.json();
  console.log(res);

  return res;
}
