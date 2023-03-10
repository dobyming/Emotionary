import MyButton from "./MyButton";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from "../App";


const DiaryItem = ({id,emotion,content,date}) => {
    const navigate = useNavigate(); //페이지 이동
    const themeColor = useContext(ThemeContext);
    const strDate = new Date(parseInt(date)).toLocaleDateString();

    const goDetail = () => {
        navigate(`/Diary/${id}`);
    };

    const goEdit = () => {
        navigate(`/Edit/${id}`);
    };
    
    return (
        <div className="DiaryItem">
         <div className={[
            "emotion_img",
            `emotion_img_${emotion}`].join(" ")}
            onClick = {goDetail}>
            <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}/>
         </div>
         <div className="info_wrapper" onClick = {goDetail}>
            <div className="diary_date" id={themeColor.theme}>{strDate}</div>
            <div className="diary_content_preview" id={themeColor.theme}>{content.slice(0,25)}</div>
         </div>
         <div className="edit_wrapper">
            <MyButton text={'수정하기'} onClick={goEdit}/>
         </div>
        </div>
    );
};

export default DiaryItem;