"use client";

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === 'authenticated') {
      fetch('http://localhost:8051/test', {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        }
      }).then((data) => data.json())
        .then((data) => setWeather(data))
    }
  }, [session, status]);

  return (
    <div>
      My Weather {weather}
    </div>
  );
}
