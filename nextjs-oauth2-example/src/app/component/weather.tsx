"use client";

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

type Weather = {
  temperatureC: number;
}

export default function Weather() {
  const [weather, setWeather] = useState<Weather[]>([]);
  const { data: session, status } = useSession();
  useEffect(() => {
    console.log(`Weather Is Authenticated: ${status}`)
    if (status === 'authenticated') {
      console.log(`Weather Session: ${session.access_token}`)
      fetch('http://localhost:8051/test', {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        }
      }).then((data) => data.json())
        .then((data) => setWeather(data))
    }
  }, [session, status]);

  return (
    <div>
      <span>My Weather</span>
      {weather?.map( (value) => (
      <div key={value.temperatureC}>Temperature: {value.temperatureC}</div>
      ))}
    </div>
  );
}
