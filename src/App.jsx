import { useEffect, useState } from 'react';
import { getData } from './getData';
import { Chip } from '@mui/material';
import './App.css';

function App() {
  const [tags, setTag] = useState([]);
  const [text, setText] = useState('');

  const onChangeInput = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    getData().then((responce) => {
      console.log([...responce.data]);
      setTag(
        [...responce.data].map((e, i) => {
          return { id: `${i}${e}`, text: e, isClicked: false };
        })
      );
    });
  }, []);

  const handleDelete = () => {};

  const onLiClick = (id) => {
    setTag(
      [...tags].map((e) => {
        if (id !== e.id) {
          return e;
        }
        return { ...e, isClicked: true };
      })
    );
  };

  const addTag = (e) => {
    const res = tags;
    if (e.key === 'Enter' && text.length) {
      console.log(text);
      res.push({ id: `${res.length}${text}`, text: text, isClicked: true });
      setTag(res);
      setText('');
    }
  };

  return (
    <>
      <h2>hello</h2>

      <div className="block1">
        {tags.map((e) => {
          return e.isClicked ? (
            <Chip key={e.id} label={e.text} onDelete={handleDelete} />
          ) : null;
        })}

        <input
          type="text"
          name=""
          id="txt"
          placeholder="Press enter to add tag"
          onChange={(e) => onChangeInput(e)}
          className="myInput"
          onKeyUp={(e) => addTag(e)}
          value={text}
        />
      </div>
      <ul>
        {tags.map((e) => {
          return (
            <li key={e.id} onClick={() => onLiClick(e.id)}>
              {e.text}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
