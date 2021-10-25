import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export function ThankYou() {
  let data = useRef();

  useEffect(() => {
    const params = new URL(document.location).searchParams;
    data.current = params.get('data');
    data.current = JSON.parse(data.current);
  }, []);

  const convertDataToArr = data => {
    let res = [];
    for (const key in data) {
      res.push({ [key]: data[key] });
    }
    return res;
  };

  return (
    <main>
      <h1>Thank You!</h1>
      <p>Your information has been submitted in our system.</p>
      <p>
        {convertDataToArr(data.current).map(field => (
          <p style={{ margin: '10px 0' }}>
            <span style={{ fontWeight: '500' }}>{Object.keys(field)[0]}:</span> {Object.values(field)[0]}{' '}
          </p>
        ))}
      </p>
      <p style={{ marginTop: '10px' }}>
        <Link to="/">Back to home page</Link>
      </p>
    </main>
  );
}
