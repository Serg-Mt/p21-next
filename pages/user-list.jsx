import { useState } from 'react';
import { FetchUser } from '../components/jsph/fetch-user';

export default function UserListPage() {
  const [userId, setUserId] = useState(5);
  return <>
    <input
      type="number"
      value={userId}
      onInput={event=>setUserId(event.target.value)}
    />
    <FetchUser id={userId} />
    <FetchUser id="1" />
    <FetchUser id={2} />
  </>
}