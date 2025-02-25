import EncryptFunction from '../../../Utils/Function/EncryptFunction';
import {Storage} from '../../../Utils/Function/Storage';

export default async function PostGeolocationFunction({location}) {
  const userState = await Storage.getItem('userState');
  const uuid = userState.uuid;

  location.memberUuid = uuid;
  console.log(location);

  const encryptedLocation = EncryptFunction({data: JSON.stringify(location)});

  const result = await fetch(`${process.env.API}/location/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      auth: process.env.AUTH_KEY,
    },
    body: encryptedLocation,
  });

  const res = await result.json();

  return res;
}
