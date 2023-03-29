import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import PageHeader from "../pageHeader";
import CustomButton from "../customButton";
import EmotionItem from "../emotion/item";
import {DiaryDispatchContext} from "../../App";
import {getStringDate} from "../../util/date";
import {emotionList} from "../../util/emotion";

const DiaryEditor = (props) => {
    const {isEdit, originData} = props;
    const navigate = useNavigate();
    const contentRef = useRef();
    const [date, setDate] = useState(getStringDate(new Date()));
    const [emotion, setEmotion] = useState(3);
    const [content, setContent] = useState("")
    const handleClickEmotion = useCallback((emtion) => {
        setEmotion(emtion)
    }, []);
    const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }

        if (window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "일기를 저장하시겠습니까?")) {
            if (!isEdit) {
                onCreate(date, content, emotion);
                navigate('/', {replace: true});
            } else {
                console.log(originData, '!!')
                onEdit(originData.id, date, content, emotion);
            }
        }

    }

    const handleRemove = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            onRemove(originData.id);
            navigate("/", {replace: true});
        }
    }
    useEffect(() => {
        if(isEdit) {
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    }, [isEdit, originData])
    return <div className="DiaryEditor">
        <PageHeader headerText={isEdit ? "일기 수정" : "새 일기"}
                    leftChild={<CustomButton
                        btnNm={"< 뒤로가기"}
                        onClick={() => navigate(-1)}
                    />}
                    rightChild={<CustomButton
                        btnNm={"삭제하기"}
                        type={"negative"}
                        onClick={handleRemove}
                    />}
        />
        <section>
            <h4>오늘 날짜는?</h4>
            <div className="input_box">
                <input
                    className="input_date"
                    type="date" value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
        </section>
        <section>
            <h4>오늘의 감정</h4>
            <div className="input_box emotion_list_wrapper">
                {emotionList.map((el) => (
                    <EmotionItem
                        key={el.emotion_id}
                        {...el}
                        onClick={handleClickEmotion}
                        isSelected={el.emotion_id === emotion}
                    />
                ))}
            </div>
        </section>

        <section>
            <h4>오늘의 일기</h4>
            <div className="input_box text_wrapper">
                <textarea
                    placeholder="오늘은 어땠나요?"
                    ref={contentRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
        </section>

        <section>
            <div className="control_box">
                <CustomButton btnNm={'취소하기'} onClick={() => navigate(-1)}/>
                <CustomButton btnNm={"작성완료"} type={"positive"} onClick={handleSubmit}/>
            </div>
        </section>
    </div>
}

export default DiaryEditor;