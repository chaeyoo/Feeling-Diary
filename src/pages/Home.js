import PageHeader from "../components/pageHeader";
import {useContext, useEffect, useState} from "react";
import CustomButton from "../components/customButton";
import {DiaryStateContext} from "../App";
import DiaryList from "../components/diary/list";

const Home = () => {
    const diaryList = useContext(DiaryStateContext);
    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    console.log(curDate);

    useEffect(() => {
        if (diaryList.length >= 1) {
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();

            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                0,
                23,
                59,
                59
            ).getTime();

            setData(diaryList.filter((el) => firstDay <= el.date && el.date <= lastDay));
        }
    }, [diaryList, curDate]);

    useEffect(() => {
        console.log(data, 'data')
    }, [data])
    const increaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
        );
    }

    const decreaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
        )
    }
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`
    return (
        <div>
            <PageHeader
                headerText={headText}
                leftChild={<CustomButton btnNm={"<"} onClick={decreaseMonth} />}
                rightChild={<CustomButton btnNm={">"} onClick={increaseMonth} />}
            />

            <DiaryList diaryList={data}/>
        </div>
    )
}

export default Home;