import { useEffect, useState, useRef } from 'react';
import { getData } from './getData';
import { Chip, Button } from '@mui/material';
import './App.scss';

function App() {
  const [tags, setTag] = useState([]);
  const [text, setText] = useState('');
  const [tagsToSend, setTagsToSend] = useState([]);
  const [overflow, setOverflow] = useState(false);
  const [tagCounter, setCounter] = useState(0);

  const divRef = useRef();
  const wrapperRef = useRef();

  const onChangeInput = (e) => {
    setText(e.target.value);
  };

  const resize = () => {
    const cheapsWidth = divRef.current.getBoundingClientRect().width;
    const wrapperWidth = wrapperRef.current.getBoundingClientRect().width;

    if (cheapsWidth / 0.6 > wrapperWidth) {
      setOverflow(true);
    } else {
      setOverflow(false);
      setCounter(tagsToSend.length);
    }
  };

  useEffect(() => {
    resize();
  });

  const loadData = () => {
    if (!tags.length) {
      getData().then((responce) => {
        setTag(
          [...responce.data].map((e, i) => {
            return { id: `${i}${e}`, text: e, isClicked: false };
          })
        );
      });
    }
  };

  const handleDelete = (id) => {
    setTagsToSend([...tagsToSend].filter((e) => id !== e.id));
    setTag(
      [...tags].map((e) => {
        if (id === e.id) {
          return { ...e, isClicked: false };
        }
        return e;
      })
    );
  };

  const onLiClick = (id) => {
    const res = tagsToSend;
    setTag(
      [...tags].map((e) => {
        if (id !== e.id) {
          return e;
        }
        if (!e.isClicked) {
          res.push({ ...e, isClicked: true, isOverflow: overflow });
          setTagsToSend(res);
        }
        return { ...e, isClicked: true };
      })
    );
  };

  const addTag = (e) => {
    const res = tagsToSend;
    if (e.key === 'Enter' && text.length) {
      res.push({
        id: `${res.length}${text}`,
        text: text,
        isClicked: true,
        isOverflow: overflow,
      });
      setTagsToSend(res);
      setText('');
    }
  };

  const sendData = () => {
    // data sending process =>
    setTagsToSend([]);
    setTag([]);
  };

  return (
    <>
      <div className="block1" onClick={loadData} ref={wrapperRef}>
        <div ref={divRef} className="cheapsWrapper">
          {tagsToSend.map((e, i) => {
            return i < tagCounter ? (
              <Chip
                key={e.id}
                label={e.text}
                onDelete={() => handleDelete(e.id)}
              />
            ) : null;
          })}
          {!!tagsToSend.length && overflow && (
            <Chip label={`+${tagsToSend.length}...`} />
          )}
        </div>

        <input
          type="text"
          name=""
          id="txt"
          placeholder={!tagsToSend.length ? 'Select categories' : null}
          onChange={(e) => onChangeInput(e)}
          className="myInput"
          onKeyUp={(e) => addTag(e)}
          value={text}
          autoComplete="off"
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
      {!!tagsToSend.length && (
        <div className="buttonWrapper">
          <Button variant="contained" onClick={sendData}>
            send to db
          </Button>
        </div>
      )}
    </>
  );
}

export default App;
