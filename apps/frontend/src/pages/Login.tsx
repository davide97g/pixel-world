import { useNavigate } from 'react-router-dom';
import { AUTH } from '../services/auth';

import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { session } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleWithMailAndPassword = async () => {
    AUTH.login({ email, password }).then((result) => {
      console.log({ result });

      if (result) navigate('/');
    });
  };

  useEffect(() => {
    if (session) navigate('/me');
  }, [session, navigate]);

  return (
    <div className="pt-28 md:pt-20 flex flex-col gap-10 items-center">
      <h1 className="text-2xl">Pixel World Login</h1>
      <p className="text-center text-sm px-10">
        Welcome to Pixel World! Please login to continue.
        <br />
        By logging in you will be able to record stats from your games and
        participate in the ranking.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleWithMailAndPassword();
        }}
      >
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
