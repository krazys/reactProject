import react from 'react';
import '../../styles/heroBanner.scss';
import {CgScrollV} from 'react-icons/cg';

const HeroBanner= ( )=>{

    return(
        <div className='OuterContainer'>
            <div className='backgroundOpacity'>
            <div className='centraltextSec'>
                <h1>
                    Browse through top trending Movies & Shows
                </h1>
                <p>Scroll down to view latest content</p>
            </div>

            <div className='signup'>
                
            </div>
            <div className='scrollDown'>
                <CgScrollV/>
            </div>
            </div>
        </div>
    )
}
export default HeroBanner;