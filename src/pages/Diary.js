import { useParams,useNavigate } from 'react-router-dom';
import { useContext, useState,useEffect } from 'react';
import { DiaryStateContext,ThemeContext } from "../App";

import MyHeader from "../components/MyHeader";
import MyButton from '../components/MyButton';

import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';


const Diary = () => {
    const [showData,setShowData] = useState();
    const navigate = useNavigate();
    const {id} = useParams();
    const diaryList = useContext(DiaryStateContext); 
    const themeColor = useContext(ThemeContext);

    useEffect(()=>{
        if(diaryList.length >= 1) {
            const targetDiary = diaryList.find((it)=>parseInt(it.id) === parseInt(id));
            if (targetDiary){
                setShowData(targetDiary);
            } else {
                alert("존재하지 않는 일기입니다!")
                navigate('/',{replace:true});
            }
        };
    },[id,diaryList]);
    
    if(!showData) {
        return <div className='DiaryPage'>로딩중..</div>
    } else {
        const curEmotion = emotionList.find((it)=>parseInt(it.emotion_id) === parseInt(showData.emotion));
        return(
            <div className="DiaryPage">
                <MyHeader headText ={`${getStringDate(new Date(parseInt(showData.date)))} 기록`}
                 leftChild = {<MyButton text = {'< 뒤로가기'} onClick={()=>navigate(-1)}/>}
                 rightChild = {<MyButton text = {'수정하기'} onClick={()=>navigate(`/edit/${id}`)}/>}
                />
                <article>
                    <section>
                        <h4 id={themeColor.theme}>오늘의 감정</h4>
                        <div className={['diary_img_wrapper',`diary_img_wrapper_${showData.emotion}`].join(" ")}>
                            <img src = {curEmotion.emotion_img}/>
                            <div className='emotion_descript'>{curEmotion.emotion_descript}</div>
                        </div>
                    </section>
                    <section>
                        <h4 id={themeColor.theme}>오늘의 일기</h4>
                        <div className='diary_content_wrapper'>    
                            <p>{showData.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        );
    }

};
export default Diary;