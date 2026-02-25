"use client";
import React from 'react';
import { CRMProvider } from '../context/CRMContext';
import { Toaster } from 'sileo';

const Providers = ({ children }) => {
    return (
        <CRMProvider>
            <Toaster position="top-center" theme="dark" />
            {children}
        </CRMProvider>
    );
};

export default Providers;
