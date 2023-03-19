import {useNavigate, useSearchParams} from "react-router-dom";

const Edit = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");
    const mode = searchParams.get("mode");
    console.log("id: " + id);
    console.log("mode: " + mode);
    return <div>
        <h1>Edit</h1>
        <p>이곳은 Edit</p>
        <button onClick={() => {
            navigate("/")
        }}>
            Home으로가기
        </button>
        <button onClick={() => {
            navigate(-1)
        }}>
            뒤로가기
        </button>
    </div>
}

export default Edit;