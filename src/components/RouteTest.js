import {Link} from "react-router-dom";

const RouteTest = () => {
    return<>
        <Link to={'/'}>홈</Link>
        <br/>
        <Link to={'/new'}>작성하기</Link>
        <br/>
        <Link to={'/diary'}>읽기</Link>
        <br/>
        <Link to={'/edit'}>편집기</Link>

    </>
}

export default RouteTest;