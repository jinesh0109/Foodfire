import Logo from "../assests/images/logo.png";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { useSelector } from "react-redux";

export const Title = ()=>{
    return(
        <div className="left-side-header">
            <a href="/" >
                <img className="logo"  alt="logo" src={Logo}/>
            </a>
            <h1 id="title">Food Fire</h1>
        </div>
    )
}
const Header = ()=>{
    const isOnline = useOnline();
     
    const cartItems = useSelector((store)=>store.cart.items);

    return(
        <div className="header">
            <Title/>
            <div className="nav-items">
                <ul>
                    <li>
                        {isOnline?"✅":"🔴"}
                    </li>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/">Cart {cartItems.length} items</Link>
                    </li>
                    <li>
                        <Link to="/instamart">Instamart</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
    
}
export default Header;