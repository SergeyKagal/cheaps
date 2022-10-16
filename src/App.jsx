import { useEffect, useState, useRef } from 'react';
import { getData } from './getData';
import { Chip } from '@mui/material';
import './App.scss';

function App() {
  const [tags, setTag] = useState([]);
  const [text, setText] = useState('');
  const [tagsToSend, setTagsToSend] = useState([]);

  const inputRef = useRef();
  const divRef = useRef();
  // const ulRef = useRef();

  // const [ulWidth, setUlWidth] = useState(0);
  const [inputWidth, setInputWidth] = useState(0);
  const [divWidth, setDivWidth] = useState(0);

  const onChangeInput = (e) => {
    setText(e.target.value);
  };

  const resize = () => {
    setDivWidth(divRef.current.getBoundingClientRect().width);
    setInputWidth(inputRef.current.getBoundingClientRect().width);
  };

  useEffect(() => {
    resize();
    console.log(divWidth, inputWidth);
  });

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
    const res = tagsToSend;
    setTag(
      [...tags].map((e) => {
        if (id !== e.id) {
          return e;
        }
        res.push({ ...e, isClicked: true });
        setTagsToSend(res);
        return { ...e, isClicked: true };
      })
    );
  };

  const addTag = (e) => {
    const res = tagsToSend;
    if (e.key === 'Enter' && text.length) {
      console.log(text);
      res.push({ id: `${res.length}${text}`, text: text, isClicked: true });
      setTagsToSend(res);
      setText('');
    }
  };

  return (
    <>
      <div className="block1">
        <div ref={divRef}>
          {tagsToSend.map((e) => {
            return e.isClicked ? (
              <Chip key={e.id} label={e.text} onDelete={handleDelete} />
            ) : null;
          })}
        </div>

        <input
          type="text"
          name=""
          id="txt"
          placeholder="Press enter to add tag"
          onChange={(e) => onChangeInput(e)}
          className="myInput"
          onKeyUp={(e) => addTag(e)}
          value={text}
          ref={inputRef}
        />
      </div>
      <ul>
        {tags.map((e) => {
          return (
            <li
              key={e.id}
              onClick={() => onLiClick(e.id)}
              className={e.isClicked ? 'clicked' : null}
            >
              {e.text}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
