import { useEffect, useState } from 'react'
import { User } from './User';

export function FetchUser({ id }) {
  const
    [user, setUser] = useState(null),
    [error, setError] = useState(null);
  useEffect(() => {
    setUser(null);
    go();
    async function go() {
      try {
        const
          response = await fetch('https://jsonplaceholder.typicode.com/users/' + id + '?' + Math.random());
        if (!response.ok)
          throw new Error(response.status + response.statusText);
        const
          user = await response.json();
        setUser(user);
        setError(null);
      } catch (err) {
        setError(err);
      }
    };

  }, [id]);
  if (error)// if (user instanceof Error) 
    return <div class="error">Error:{String(error)}</div>;
  if (user)
    return <User user={user} />;
  return <div className="spinner">...loading</div>
}