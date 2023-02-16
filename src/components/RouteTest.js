import { Link } from "react-router-dom"; //SPA 방식 활용

const RouteTest = () => {
    return(
        <div>
            <Link to={'/'}>Home</Link>
            <br/>
            <Link to={'/diary'}>Diary</Link>
            <br/>
            <Link to={'/new'}>New</Link>
            <br/>
            <Link to={'/edit'}>Edit</Link>
        </div>
    );
};

export default RouteTest;