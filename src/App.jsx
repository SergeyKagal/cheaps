import { useEffect, useState } from 'react';
import { getData } from './getData';

function App() {
  const [tags, setTag] = useState([]);

  useEffect(() => {
    getData().then((responce) => {
      console.log([...responce.data]);
      setTag(
        [...responce.data].map((e, i) => {
          return { id: `${i}${e}`, text: e };
        })
      );
    });
  }, []);

  return (
    <>
      <ul>
        {tags.map((e) => {
          return <li key={e.id}>{e.text}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
