import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {DiaryStateContext} from "../App";
import PageHeader from "../components/pageHeader";
import {getStringDate} from "../util/date";
import CustomButton from "../components/customButton";
import {emotionList} from "../util/emotion";

const Diary = () => {
    const { id } = useParams();
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const [data, setData] = useState();
    useEffect(() => {
        const trgtDiary = diaryList.find((el) => parseInt(el.id) === parseInt(id));
        console.log(trgtDiary);
        if (trgtDiary) {
            setData(trgtDiary);
        } else {
            alert("없는 일기입니다.");
            navigate('/', {replace: true})
        }
    }, [id, diaryList]);

    if (!data) {
        return <div className="DiaryPage">로딩중...</div>
    } else {
        const currentEmotionData = emotionList.find((el) => parseInt(el.emotion_id) === parseInt(data.emotion))
        return <div className="DiaryPage">

            <PageHeader
                headerText={`${getStringDate(new Date(data.date))} 일기`}
                leftChild={
                    <CustomButton
                        btnNm={"< 뒤로가기"}
                        onClick={() => navigate(-1)}
                    />
                }
                rightChild={
                    <CustomButton
                        btnNm={"수정하기"}
                        onClick={() => navigate(`/edit/${data.id}`)}
                    />
                }
            />

            <article>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
                        <img src={currentEmotionData.emotion_img} alt=""/>
                        <div className="emotion_description">
                            {currentEmotionData.emotion_description}
                        </div>
                    </div>
                </section>

                <section>
                    <h4>오늘의 일기</h4>
                    <div className="diary_content_wrapper">
                        <p>{data.content}</p>
                    </div>
                </section>
            </article>

        </div>
    }

}

export default Diary;