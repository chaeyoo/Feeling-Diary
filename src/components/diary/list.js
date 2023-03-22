import {useState} from "react";
import CustomButton from "../customButton";
import {useNavigate} from "react-router-dom";
import DiaryItem from "./item";

const DiaryList = (props) => {
    const navigate = useNavigate();
    const sortOptList = [
        {value: "latest", name: "최신순"},
        {value: "oldest", name: "오래된순"}
    ];

    const filterOptList = [
        {value: "all", name: "전부다"},
        {value: "good", name: "좋은 감정만"},
        {value: "bad", name: "나쁜 감정만"},
    ]
    const ControlMenu = (props) => {
         const { value, onChange, optionList } = props;
        return <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
            {optionList.map((el, idx) => <option key={idx} value={el.value}>{el.name}</option>)}
        </select>
    }
    const { diaryList } = props;
    const [sortType, setSortType] = useState("latest");
    const [filter, setFilter] = useState("all");
    const getProcessedDiaryList = () => {
        const filterCallback = (item) => {
            if (filter === "good") {
                return parseInt(item.emotion) <= 3;
            } else {
                return parseInt(item.emotion) > 3;
            }
        }
        const compare = (a,b) => {
            if (sortType === 'latest') {
                return parseInt(b.date) - parseInt(a.date);
            } else if (sortType === 'oldest') {
                return parseInt(a.date) - parseInt(b.date);
            }
        }
        const copiedList = JSON.parse(JSON.stringify(diaryList));
        const filteredList = filter === "all"
                            ? copiedList
                            : copiedList.filter((el) => filterCallback(el));
        const sortedList = filteredList.sort(compare);
        return sortedList;
    }
    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu
                        value={sortType}
                        onChange={setSortType}
                        optionList={sortOptList}/>
                    <ControlMenu
                        value={filter}
                        onChange={setFilter}
                        optionList={filterOptList}
                    />
                </div>
                <div className="right_col">
                    <CustomButton
                        btnNm={"새일기"}
                        type={"positive"}
                        onClick={() => navigate('/new')}
                    />
                </div>
            </div>


            {getProcessedDiaryList().map((el) => (
                // <div key={el.id}>{el.content} - {el.emotion}</div>
                <DiaryItem
                    key={el.id}
                    id={el.id}
                    emotion={el.emotion}
                    date={el.date}
                    content={el.content}
                />
            ))}
        </div>
    )
}

DiaryList.defaultProps = {
    diaryList: [],
}
export default DiaryList;