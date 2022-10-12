import SimpleBar from 'components/third-party/SimpleBar';
import React, { useState } from 'react';
import NewNav from '../../../../NewNav';
// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
    <SimpleBar
        sx={{
            '& .simplebar-content': {
                display: 'flex',
                flexDirection: 'column'
            }
        }}
    >
        <NewNav />
    </SimpleBar>
);

export default DrawerContent;

/*
// project import
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
    <SimpleBar
        sx={{
            '& .simplebar-content': {
                display: 'flex',
                flexDirection: 'column'
            }
        }}
    >
        <Navigation />
    </SimpleBar>
);

export default DrawerContent;
*/
