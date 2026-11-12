import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <head>
                <title>Karaoke Queue</title>
            </head>
            {children}
        </html>
    );
}