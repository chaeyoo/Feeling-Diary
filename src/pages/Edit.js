import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {DiaryStateContext} from "../App";
import DiaryEditor from "../components/editor";

const Edit = () => {
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const {id} = useParams();
    const [originData, setOriginData] = useState();
    console.log(diaryList);
    console.log(id);

    useEffect(() => {
        if (diaryList.length > 0) {
            const trgtDiary = diaryList.find((el) => parseInt(el.id) === parseInt(id))
            console.log(trgtDiary);
            if (trgtDiary) {
                setOriginData(trgtDiary);
            } else {
                navigate('/', {replace: true});
            }
        }
    }, [id, diaryList]);
    return <div>
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData} />}
        </div>
    </div>
}

export default Edit;