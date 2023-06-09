import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import React, {useEffect, useReducer, useRef} from "react";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT' : {
      return action.data;
    }
    case 'CREATE': {
      newState = [ action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((el) => el.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((el) =>
        el.id === action.data.id ? { ...action.data } : el
      );
      break;
    }
    default: {
      return state;
    }
  }
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;

}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

// const dummyData = [
//   {
//     id: 1,
//     emotion: 1,
//     content: "오늘의 일기 1번",
//     date: 1679309664352,
//   },
//   {
//     id: 2,
//     emotion: 2,
//     content: "오늘의 일기 2번",
//     date: 1679309664353,
//   },
//   {
//     id: 3,
//     emotion: 3,
//     content: "오늘의 일기 3번",
//     date: 1679309664354,
//   },
//   {
//     id: 4,
//     emotion: 4,
//     content: "오늘의 일기 4번",
//     date: 1679309664355,
//   },
//   {
//     id: 5,
//     emotion: 5,
//     content: "오늘의 일기 5번",
//     date: 1679309664356,
//   },
// ]
function App() {
  const [data, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    const localData = localStorage.getItem("diary");
    console.log(localData, 'loacac')
    if (localData) {
      const diaryList = JSON.parse(localData).sort((a,b) => parseInt(b.id) - parseInt(a.id));
      dataId.current = parseInt(diaryList[0].id) + 1;
      console.log(diaryList)
      console.log(dataId)
      dispatch({type: "INIT", data: diaryList})
    }

  }, [])
  console.log(new Date().getTime());
  const dataId = useRef(6);

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({type: "CREATE", data: {
      id: dataId.current,
      date: new Date(date).getTime(),
      content,
      emotion
      },
    });
    dataId.current += 1;
  }
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", targetId})
  }
  //EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    })
  }
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{
        onCreate, onRemove, onEdit
      }}>
        <BrowserRouter>
          <div className="App">

            <Routes>
              <Route path='/' element={<Home/> }/>
              <Route path='/new' element={<New/> }/>
              <Route path='/diary/:id' element={<Diary/> }/>
              <Route path='/edit/:id' element={<Edit/> }/>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
