import React, { createContext, useReducer,useRef,useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import New from './pages/New';
import { useEffect } from 'react';

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
  localStorage.setItem('diary',JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();


function App() {
  const [data, dispatch] = useReducer(reducer, []); // 상태관리

  useEffect(()=>{
    const localData = localStorage.getItem('diary');
    if (localData) {
      const diaryList = JSON.parse(localData).sort((a,b) => parseInt(b.id) - parseInt(a.id));
      dataId.current = parseInt(diaryList[0].id) + 1;
      dispatch({type:'INIT',data:diaryList});
    }
  },[]);

  const dataId = useRef(0);
  const [theme,setTheme] = useState("light");

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
