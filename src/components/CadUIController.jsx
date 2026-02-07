
import React, { useEffect, useState, useRef } from 'react';
import { cadSounds } from '../utils/cadSounds';

export default function CadUIController() {
    const [theme, setTheme] = useState('dark'); // 'dark', 'blueprint', 'paper'
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isHoveringProject, setIsHoveringProject] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);

    // 1. Theme Persistence & Injection
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.className = theme === 'paper' ? 'light' : 'dark';
        cadSounds.playSwoosh();
    }, [theme]);

    // 2. Custom Cursor Logic
    useEffect(() => {
        const handleThemeChange = (e) => {
            if (e.detail) setTheme(e.detail);
        };

        const handleMouseMove = (e) => {
            setCursorPos({ x: e.clientX, y: e.clientY });

            // Check if hovering a project card or interactive element
            const target = e.target;
            const isProject = target.closest('.project-card') || target.closest('a') || target.closest('button');
            setIsHoveringProject(!!isProject);
        };

        const handleMouseDown = () => {
            setIsMouseDown(true);
            cadSounds.playClick();
        };
        const handleMouseUp = () => {
            setIsMouseDown(false);
            cadSounds.playBlip();
        };

        window.addEventListener('themeChange', handleThemeChange);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('themeChange', handleThemeChange);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const toggleTheme = () => {
        const themes = ['dark', 'blueprint', 'paper'];
        const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
        setTheme(themes[nextIndex]);
    };

    return (
        <>
            {/* 1. Technical Crosshair/Cursor */}
            <div
                className={`fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out hidden md:block ${isHoveringProject ? 'scale-125' : 'scale-100'}`}
                style={{
                    left: cursorPos.x,
                    top: cursorPos.y,
                    transform: `translate(-50%, -50%)`,
                    width: '40px',
                    height: '40px'
                }}
            >
                {/* 
                   ROUND CIRCLE: 
                   Visible on Mouse Down OR Hovering Interactive Elements
                */}
                <div className={`absolute inset-0 border border-sky-400 rounded-full transition-all duration-200 m-2
                    ${(isMouseDown || isHoveringProject) ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                />

                {/* 
                   CAD CROSSHAIR: 
                   Visible ONLY when NOT clicking and NOT hovering
                */}
                <div className={`absolute inset-0 transition-all duration-200 ${(!isMouseDown && !isHoveringProject) ? 'opacity-100 scale-100' : 'opacity-0 scale-150'}`}>
                    <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-sky-400/80" />
                    <div className="absolute left-1/2 top-0 w-[1.5px] h-full bg-sky-400/80" />
                    {/* Tiny center intersection point */}
                    <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-sky-400 -translate-x-1/2 -translate-y-1/2 rotate-45" />
                </div>
            </div>

            {/* 2. Drafting Mode Toggle Button */}
            <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-2">
                <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 p-1 rounded-full shadow-2xl flex items-center gap-1 group transition-all duration-500 hover:pr-4">
                    <button
                        onClick={toggleTheme}
                        className="px-2 py-2 rounded-full flex items-center gap-0 overflow-hidden transition-all duration-500 group-hover:gap-2 group-active:gap-2"
                    >
                        <span className="w-8 h-8 rounded-full bg-sky-500/10 border border-sky-500/50 flex items-center justify-center shrink-0 group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors">
                            <div className="w-2 h-2 rounded-full bg-sky-500 group-hover:bg-slate-900 animate-pulse" />
                        </span>

                        <span className="max-w-0 opacity-0 whitespace-nowrap overflow-hidden transition-all duration-500 group-hover:max-w-xs group-hover:opacity-100 group-active:max-w-xs group-active:opacity-100 text-[10px] font-mono font-bold tracking-widest uppercase">
                            Drafting Mode: {theme}
                        </span>
                    </button>
                </div>
                <p className="text-[8px] font-mono text-slate-500 uppercase tracking-tighter mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          // Toggle Workspace Theme
                </p>
            </div>

            {/* 3. Global Styles to hide default cursor */}
            <style dangerouslySetInnerHTML={{
                __html: `
        * { cursor: none !important; }
        a, button, .cursor-pointer { cursor: none !important; }
        ::-webkit-scrollbar { display: none; } /* Hide scrollbar for cleaner CAD look if desired */
      `}} />
        </>
    );
}
