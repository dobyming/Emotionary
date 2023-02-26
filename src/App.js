import React, { createContext, useReducer,useRef,useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import New from './pages/New';

export const ThemeContext = createContext(null);

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) => (it.id === action.data.id ? { ...action.data } : it));
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id:1,
    emotion:1,
    content: '오늘의 일기 1번',
    date : 1676960500416
  },
  {
    id:2,
    emotion:2,
    content: '오늘의 일기 2번',
    date : 1676960500417
  },
  {
    id:3,
    emotion:3,
    content: '오늘의 일기 3번',
    date : 1676960500418
  },
  {
    id:4,
    emotion:4,
    content: '오늘의 일기 4번',
    date : 1676960500419
  },
  {
    id:5,
    emotion:5,
    content: '오늘의 일기 5번',
    date : 1676960500420
  },
]

function App() {
  const dataId = useRef(0);
  const [data, dispatch] = useReducer(reducer, dummyData); // 상태관리
  const [theme,setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((cur) => (cur === "light" ? "dark" : "light"));
  };


  // CREATE
  const onCreate = (date,content,emotion) => {
    dispatch({
      type:'CREATE',
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    });
    dataId.current += 1;
  };

  // REMOVE 
  const onRemove = (targetId) => {
    dispatch({type:'REMOVE', targetId});
  };

  // EDIT
  const onEdit = (targetId,date,content,emotion) => {
    dispatch({
      type:'EDIT',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    });
  };

  return (
    <ThemeContext.Provider value = {{theme,toggleTheme}}>
      <DiaryStateContext.Provider value = {data}>
        <DiaryDispatchContext.Provider value={{onCreate,onEdit,onRemove}}>
          <BrowserRouter>
            <div className="App" id={theme}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new" element={<New />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/diary/:id" element={<Diary />} 
                />
              </Routes>
              <div className='switch-wrapper'>
                <label className="switch">
                  <input type="checkbox" onChange={toggleTheme} checked={theme==="dark"}/>
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </BrowserRouter>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </ThemeContext.Provider>

  );
}

export default App;
