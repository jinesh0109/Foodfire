import {Link, useRouteError} from "react-router-dom";

const Error = ()=>{
    const error = useRouteError();
    return(
        <>
        <h1>Oops! The Page you are looking for is not present!!</h1>
        <h3>{error.status} {error.data}</h3>
        <h3> <Link to="/"> Back Home </Link></h3>
        </>
    )
}
export default Error;