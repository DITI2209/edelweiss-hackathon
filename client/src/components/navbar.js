import React, { useEffect, useState } from "react";
import $ from "jquery";
import { FaApple, FaSearch, FaShoppingBasket, FaTimes } from "react-icons/fa";
import { TbBusinessplan } from "react-icons/tb";

import './NavBarDemo.css'
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../reducers/authReducer";

function Navbar() {

    const [isActive, setIsActive] = useState(false);
    const dispatch=useDispatch()
    const logged_in=useSelector((state)=>state.auth.login);
    const user=useSelector((state)=>state.auth.user);
    if(user) console.log(user.name)
    
    function handleSearchClick() {
        $(".menu-item").addClass("hide-item");
        $(".search-form").addClass("active");
        $(".close").addClass("active");
        $("#search").hide();
        setIsActive(true);
    }

    function handleCloseClick() {
        $(".menu-item").removeClass("hide-item");
        $(".search-form").removeClass("active");
        $(".close").removeClass("active");
        $("#search").show();
        setIsActive(false);
    }

    function logOut(){
        console.log('clicked')
        localStorage.clear();
        
        dispatch(authLogout());
    }

    return (
        <nav>
            <div className="menu">
                <ul>
                    <li>
                        <a href="/investments">
                            <TbBusinessplan />
                        </a>
                    </li>
                    <li>
                        <a href="/investments" className="menu-item">
                            Investments
                        </a>
                    </li>
                    <li>
                        <a href="/portfolio">
                            Portfolio
                        </a>
                    </li>
                    <li>
                        <a href="/blog" className="menu-item">
                           Blog
                        </a>
                    </li>
                    {/* <li>
                        <a href="#" className="menu-item">
                            place
                        </a>
                    </li>
                    <li>
                        <a href="#" className="menu-item">
                            place
                        </a>
                    </li>
                    <li>
                        <a href="#" className="menu-item">
                            place
                        </a>
                    </li>
                    <li>
                        <a href="#" className="menu-item">
                            place
                        </a>
                    </li> */}
                  
                    {/* <li>
                        <a href="#" id="search" onClick={handleSearchClick}>
                            <FaSearch />
                        </a>
                    </li> */}
                   

                    {logged_in?
                     <li>
                     <a href="/profile">
                        {user?user.name:''}
                     </a>
                 </li>:<></>
                    }
                      <li>

                        {!logged_in?<a href="/login" className="menu-item">
                            Login
                        </a>:
                        <a onClick={()=>{logOut()}}>
                            Logout
                            </a>}

                        </li>
                </ul>
                <div className={isActive ? "search-form active" : "search-form"}>
                    <form>
                        <input type="text" name="search" placeholder="Search apple.com" />
                    </form>
                </div>
                <a className={isActive ? "close active" : "close"} onClick={handleCloseClick}>
                    <FaTimes />
                </a>
            </div>
        </nav>
    );
}

export default Navbar;