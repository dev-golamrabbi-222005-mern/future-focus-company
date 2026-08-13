'use client';

import * as React from 'react';

export default function MovingGridBg() {
    const [mouse, setMouse] = React.useState<{ x: number; y: number } | null>(null);

    const handleMouseMove = React.useCallback((e: MouseEvent) => {
        setMouse({ x: e.clientX, y: e.clientY });
    }, []);

    const handleMouseLeave = React.useCallback(() => {
        setMouse(null);
    }, []);

    React.useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [handleMouseMove, handleMouseLeave]);

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-background transition-colors duration-500">
            {/* Base moving grid */}
            <div className="absolute inset-0 bg-grid-pattern animate-grid-move" />

            {/* Mouse spotlight — highlights grid cells near the cursor */}
            {mouse && (
                <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                        backgroundImage: `radial-gradient(circle 120px at ${mouse.x}px ${mouse.y}px, var(--grid-highlight) 0%, transparent 100%)`,
                    }}
                />
            )}
        </div>
    );
}
