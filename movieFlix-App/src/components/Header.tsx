import React, {useState} from 'react';
import '../../styles/Header.scss';

const Header = () => {
    const [ isNavExpanded, setIsNavExpanded] = useState(false);


    const handleNavigation= ( )=>{
        setIsNavExpanded(!isNavExpanded);
    }

    return (

        <div className='outerContainer'>
            {/* <div className='innerContainer'>
            <div className='logo'>
                <img src="../../static/movie-board.png" alt="MovieFlix logo" />
            </div>
            <div className='rightLoginSection'>
                <div className='buttonWrapper'>
                    <button className='signIn'>Sign In</button>
                    <button className='login'>Login</button>
                </div>
            </div>
            </div> */}
            <nav className='navigation'>
                <div className='logo'>
                    <a href="/"><img src="../../static/movie-board.png" alt="MovieFlix logo" /></a>
                </div>
                <button className='hamBurger' onClick={handleNavigation}>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="white"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <div className={`nav-menu ${isNavExpanded ? "expanded" : ""}` }>
                    <ul className='buttonWrapper'>
                        <li>
                        <button className='signIn'>Sign In</button> 
                        </li>
                        <li>
                        <button className='login'>Login</button>
                        </li>
                    </ul>


                </div>
            </nav>
        </div>
    )


}

export default Header;