import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { cadSounds } from '../utils/cadSounds';

/**
 * AutoCAD-style Command Line Interface (CLI)
 * Positioned at the bottom, allows navigation and theme changes via text commands.
 */
export default function AutoCADCommandLine() {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState(['Type /HELP for availability commands...']);
    const [isOpen, setIsOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const COMMAND_LIST = [
        '/HELP', '/CLEAR', '/EXIT',
        '/GOTO HOME', '/GOTO PROJECTS', '/GOTO ABOUT', '/GOTO SKILLS', '/GOTO EXPERIENCE', '/GOTO BLOG', '/GOTO INNOVATION', '/GOTO CONTACT',
        '/THEME DARK', '/THEME BLUEPRINT', '/THEME PAPER'
    ];

    // Handle keyboard shortcut (ESC or /) AND Custom Event from Navbar
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsOpen(prev => !prev);
            }
            if (e.key === '/' && !isOpen) {
                e.preventDefault();
                setIsOpen(true);
                setTimeout(() => inputRef.current?.focus(), 100);
            }
        };

        const handleOpenTerminal = () => {
            setIsOpen(true);
            setTimeout(() => inputRef.current?.focus(), 100);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('openTerminal', handleOpenTerminal);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('openTerminal', handleOpenTerminal);
        };
    }, [isOpen]);

    // Update suggestions based on input
    useEffect(() => {
        if (input.startsWith('/')) {
            const filtered = COMMAND_LIST.filter(cmd =>
                cmd.toLowerCase().startsWith(input.toLowerCase())
            ).slice(0, 5);
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }, [input]);

    const processCommand = (cmd) => {
        const cleanCmd = cmd.trim().toLowerCase();
        const args = cleanCmd.split(' ');
        const primary = args[0];

        addToHistory(`> ${cmd}`);

        switch (primary) {
            case '/help':
                addToHistory('AVAILABLE COMMANDS:');
                addToHistory('/GOTO [home|projects|about|skills|contact]');
                addToHistory('/THEME [dark|blueprint|paper]');
                addToHistory('/CLEAR - Wipe command history');
                addToHistory('/EXIT - Close terminal');
                break;

            case '/goto':
                const page = args[1];
                if (['home', 'projects', 'about', 'skills', 'contact', 'blog', 'experience', 'innovation'].includes(page)) {
                    addToHistory(`NAVIGATING TO: ${page.toUpperCase()}...`);
                    navigate(page === 'home' ? '/' : `/${page}`);
                    cadSounds.playBlip();
                } else {
                    addToHistory('ERROR: UNKNOWN DESTINATION');
                }
                break;

            case '/theme':
                const theme = args[1];
                if (['dark', 'blueprint', 'paper'].includes(theme)) {
                    addToHistory(`SETTING WORKSPACE THEME: ${theme.toUpperCase()}...`);
                    window.dispatchEvent(new CustomEvent('themeChange', { detail: theme }));
                    cadSounds.playSwoosh();
                } else {
                    addToHistory('ERROR: INVALID THEME');
                }
                break;

            case '/clear':
                setHistory(['History cleared. Type /HELP for info.']);
                break;

            case '/exit':
                setIsOpen(false);
                break;

            default:
                addToHistory(`UNKNOWN COMMAND: "${primary}". TYPE /HELP FOR LIST.`);
        }
    };

    const addToHistory = (text) => {
        setHistory(prev => [...prev.slice(-4), text]); // Keep last 5 lines
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input) {
            processCommand(input);
            setInput('');
            setSuggestions([]);
            cadSounds.playClick();
        }
    };

    // CLOSED STATE: Hidden on mobile
    if (!isOpen) {
        return (
            <div
                onClick={() => setIsOpen(true)}
                className="fixed bottom-0 left-0 right-0 h-8 bg-slate-900/90 border-t border-slate-700 backdrop-blur-md items-center px-4 cursor-pointer group hover:bg-slate-800 transition-all z-[1001] hidden md:flex"
            >
                <div className="text-[10px] font-mono text-slate-500 flex items-center gap-2">
                    <span className="text-sky-500 animate-pulse font-bold">MODE: COMMAND</span>
                    <span className="opacity-50">| PRESS [ESC] OR [/] TO OPEN TERMINAL</span>
                </div>
            </div>
        );
    }

    // OPEN STATE: Visible on mobile (with higher z-index and padding adjustments)
    return (
        <div className="fixed bottom-0 left-0 right-0 z-[2000] md:z-[1001]">
            {/* Backdrop for mobile to click out */}
            <div
                className="fixed inset-0 bg-black/50 md:hidden"
                onClick={() => setIsOpen(false)}
            />

            <div className="relative bg-slate-950/95 border-t border-sky-900/50 backdrop-blur-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                {/* History Display */}
                <div className="p-3 pb-0 max-h-32 overflow-hidden flex flex-col gap-1">
                    {history.map((line, i) => (
                        <div key={i} className="text-[10px] font-mono text-slate-400 opacity-80 uppercase tracking-wider">
                            {line}
                        </div>
                    ))}
                </div>

                {/* Suggestions Bar (New) */}
                {suggestions.length > 0 && (
                    <div className="px-3 pt-2 flex flex-wrap gap-2">
                        {suggestions.map((s, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => {
                                    setInput(s);
                                    inputRef.current?.focus();
                                }}
                                className="text-[9px] font-mono px-2 py-0.5 rounded border border-sky-900/50 bg-sky-950/30 text-sky-400 hover:bg-sky-500 hover:text-slate-950 transition-colors"
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                )}

                {/* Command Input Area */}
                <form onSubmit={handleSubmit} className="p-3 pt-2 flex items-center gap-3">
                    <div className="text-sky-400 font-mono font-bold text-sm tracking-widest flex items-center gap-2">
                        <span className="text-[10px] text-slate-500">AUTOCAD</span>
                        <span className="hidden md:inline">COMMAND:</span>
                        <span className="md:hidden">CMD:</span>
                    </div>
                    <input
                        ref={inputRef}
                        autoFocus
                        type="text"
                        className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm uppercase tracking-[0.2em] placeholder:text-slate-700 min-w-0"
                        placeholder="TYPE..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="text-[10px] font-mono text-slate-500 hover:text-white transition-colors"
                    >
                        [X]
                    </button>
                </form>
            </div>

            {/* Visual Scanline Effect on terminal */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] opacity-20" />
        </div>
    );
}
