import React from 'react';
import AppLayout from './AppLayout';

interface Props{
    children:any,
}

const AppLayoutContextWrapper: React.FC<Props> =({children} ) => {

    return(
        <div>
            <AppLayout>
                {children}
                </AppLayout>
        </div>
    )
}
export default AppLayoutContextWrapper;