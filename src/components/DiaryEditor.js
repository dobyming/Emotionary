import { useNavigate } from "react-router-dom";
import { useState } from 'react';

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";

const getStringDate = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
  
    if (month < 10) {
      month = `0${month}`;
    }
  
    if (day < 10) {
      day = `0${day}`;
    }
  
    return `${year}-${month}-${day}`;
};

const DiaryEditor = () => {
    const navigate = useNavigate();
    //datepicker에 오늘날짜 세팅하기
    const [date,setDate] = useState(getStringDate(new Date()));

    return(
        <div className="DiaryEditor">
            <MyHeader 
            headText ={'새로운 일기 쓰기'}
            leftChild = {<MyButton text = {'< 뒤로가기'} onClick={()=>navigate(-1)}/>}
            />
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box">
                        <input 
                        className="input_date"
                        type="date" value={date} onChange={(e)=>setDate(e.target.value)}/>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiaryEditor;