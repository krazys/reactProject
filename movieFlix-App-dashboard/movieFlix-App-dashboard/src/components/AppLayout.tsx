import React from 'react';

type Props = {
    children: React.ReactNode,
}
const AppLayout: React.FC<Props>= ({children} )=>{

    return(
        <div className='appLayoutWrapper'>
{children}
        </div>
    )

}

export default AppLayout;