import { useContext,useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
    const [originData,setOriginData] = useState();
    const navigate = useNavigate();
    const {id} = useParams(); //:id에 해당하는 값
    const diaryList = useContext(DiaryStateContext);

    useEffect(()=>{
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `Emotionary - ${parseInt(id)+1}번 일기 수정`;
    },[]);

    useEffect(()=>{
        if(diaryList.length >= 1) {
            const targetDiary = diaryList.find((it)=>parseInt(it.id) === parseInt(id));
            if (targetDiary){
                setOriginData(targetDiary);
            } else {
                navigate('/',{replace:true});
            }
        };
        
    },[id,diaryList]); //id와 diaryList가 바뀔때(mount)시점에 수행

    return(
        <div>
            {originData && <DiaryEditor isEdit ={true} originData={originData}/>}
        </div>
    );
};
export default Edit;