import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';
import DiaryList from "../components/DiaryList";

const Home = () => {
    const diaryList = useContext(DiaryStateContext); //일기 Data 담김
    
    const [data,setData] = useState([]);
    const [curDate,setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth()+1}월`
    
    //월초~월말 사이에 있는지 validate
    useEffect(()=>{
        if (diaryList.length >=1){
            const initDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime(); //월초
            
            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth()+1,
                0
            ).getTime(); //월말

            setData(diaryList.filter((it)=> initDay <= it.date && it.date <= lastDay));
        }
    },[diaryList,curDate]);

    // header 날짜 show 
    const increaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth()+1 , curDate.getDate())
        );
    }

    const decreaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth()-1 , curDate.getDate())
        );
    }

    return(
        <div>
            <MyHeader headText={headText}
            leftChild = {<MyButton text = {'<'} onClick={()=>decreaseMonth()}/>}
            rightChild = {<MyButton text = {'>'} onClick={()=>increaseMonth()}/>}
            />
            <DiaryList diaryList={data}/>
        </div>
    );
};
export default Home;