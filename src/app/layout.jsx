import React from 'react';
import '../index.css';
import Providers from '../components/Providers';

export const metadata = {
    title: 'Click & Go - Landing Page',
    description: 'Desarrollo de landing pages y CRM premium.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
