import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import content from "../data/index";
import {
    HiOutlineHome,
    HiOutlineUser,
    HiOutlineBriefcase,
    HiOutlineFolder,
    HiOutlineChatBubbleLeftRight,
    HiOutlineSquares2X2,
    HiOutlineMoon,
    HiOutlineSun,
} from "react-icons/hi2";

const Navbar = () => {
    const { pathname } = useLocation();
    const { hero = {} } = content;

    const [showMore, setShowMore] = useState(false);
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") return "dark";
        return localStorage.getItem("theme") || "dark";
    });

    const moreMenuRef = useRef(null);
    const mobileNavRef = useRef(null);
    const audioRef = useRef(null);

    // prepare audio on mount
    useEffect(() => {
        try {
            audioRef.current = new Audio("/click.mp3"); // put click.mp3 in public/
            audioRef.current.volume = 0.3;
        } catch {
            audioRef.current = null;
        }
    }, []);

    // theme handling
    useEffect(() => {
        if (typeof document === "undefined") return;
        const root = document.documentElement;
        root.dataset.theme = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    // close drop-up when clicking / tapping outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!showMore) return;

            const menu = moreMenuRef.current;
            const nav = mobileNavRef.current;

            if (
                menu &&
                !menu.contains(e.target) &&
                nav &&
                !nav.contains(e.target)
            ) {
                setShowMore(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [showMore]);

    const toggleTheme = () => {
        const themes = ["dark", "blueprint", "paper"];
        const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
        const next = themes[nextIndex];
        setTheme(next);
        playFeedback();

        // Dispatch custom event to sync with CadUIController if needed
        window.dispatchEvent(new CustomEvent('themeChange', { detail: next }));
    };

    const getThemeIcon = () => {
        if (theme === "dark") return <HiOutlineMoon size={18} />;
        if (theme === "blueprint") return <HiOutlineSquares2X2 size={18} className="rotate-45" />;
        return <HiOutlineSun size={18} />;
    };

    const getThemeLabel = () => {
        if (theme === "dark") return "Dark";
        if (theme === "blueprint") return "Blueprint";
        return "Paper";
    };

    const playFeedback = () => {
        // haptics for mobile, if supported
        if (typeof window !== "undefined" && typeof navigator !== "undefined" && "vibrate" in navigator) {
            if (window.innerWidth < 768) {
                navigator.vibrate(20);
            }
        }
        // Use CAD sound if available
        try {
            import("../utils/cadSounds").then(({ cadSounds }) => cadSounds.playClick());
        } catch (e) { }

        // click sound
        if (audioRef.current) {
            try {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            } catch {
                // ignore autoplay block
            }
        }
    };

    const isActive = (path) =>
        pathname === path ? "text-sky-400 font-semibold" : "text-slate-300";

    const isMobileActive = (path) =>
        pathname === path ? "text-sky-400" : "text-slate-300";

    const mainMobileItems = [
        { path: "/", label: "Home", icon: HiOutlineHome },
        { path: "/about", label: "About", icon: HiOutlineUser },
        { path: "/experience", label: "Exp", icon: HiOutlineBriefcase },
        { path: "/projects", label: "Projects", icon: HiOutlineFolder },
        { path: "/contact", label: "Contact", icon: HiOutlineChatBubbleLeftRight },
    ];

    const extraItems = [
        { path: "/skills", label: "Skills" },
        { path: "/blog", label: "Blog" },
        { path: "/innovation", label: "Innovation" },
    ];

    // profile initials if no avatar
    const getInitials = () => {
        if (!hero.name) return "P";
        const parts = hero.name.trim().split(" ");
        if (parts.length === 1) return parts[0][0].toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    const handleNavClick = () => {
        playFeedback();
        setShowMore(false);
    };

    return (
        <>
            {/* TOP NAV */}
            <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
                <div className="flex items-center justify-center md:justify-between max-w-5xl mx-auto px-4 py-3">
                    {/* BRAND WITH AVATAR */}
                    <Link
                        to="/"
                        onClick={handleNavClick}
                        className="flex items-center gap-2 text-sm md:text-base font-semibold text-slate-100"
                    >
                        {hero.avatar ? (
                            <img
                                src={hero.avatar}
                                alt={hero.name || "Profile"}
                                className="h-8 w-8 rounded-full border border-slate-700 object-cover"
                            />
                        ) : (
                            <div className="h-8 w-8 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center text-xs font-semibold text-sky-300">
                                {getInitials()}
                            </div>
                        )}
                        <span>{hero.name || "PRADUL P"}</span>
                    </Link>

                    {/* RIGHT SIDE: DESKTOP NAV + THEME TOGGLE (hidden on mobile) */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* desktop nav with icons */}
                        <nav className="flex gap-5 text-sm">
                            <Link
                                className={`flex items-center gap-1.5 hover:text-sky-400 ${isActive("/")}`}
                                to="/"
                                onClick={handleNavClick}
                            >
                                <HiOutlineHome size={16} className="opacity-80" />
                                <span>Home</span>
                            </Link>
                            <Link
                                className={`flex items-center gap-1.5 hover:text-sky-400 ${isActive("/about")}`}
                                to="/about"
                                onClick={handleNavClick}
                            >
                                <HiOutlineUser size={16} className="opacity-80" />
                                <span>About</span>
                            </Link>
                            <Link
                                className={`flex items-center gap-1.5 hover:text-sky-400 ${isActive("/experience")}`}
                                to="/experience"
                                onClick={handleNavClick}
                            >
                                <HiOutlineBriefcase size={16} className="opacity-80" />
                                <span>Experience</span>
                            </Link>
                            <Link
                                className={`flex items-center gap-1.5 hover:text-sky-400 ${isActive("/projects")}`}
                                to="/projects"
                                onClick={handleNavClick}
                            >
                                <HiOutlineFolder size={16} className="opacity-80" />
                                <span>Projects</span>
                            </Link>
                            <Link
                                className={`flex items-center gap-1.5 hover:text-sky-400 ${isActive("/skills")}`}
                                to="/skills"
                                onClick={handleNavClick}
                            >
                                <HiOutlineSquares2X2 size={16} className="opacity-80" />
                                <span>Skills</span>
                            </Link>
                            <Link
                                className={`flex items-center gap-1.5 hover:text-sky-400 ${isActive("/blog")}`}
                                to="/blog"
                                onClick={handleNavClick}
                            >
                                <HiOutlineChatBubbleLeftRight size={16} className="opacity-80" />
                                <span>Blog</span>
                            </Link>
                            <Link
                                className={`flex items-center gap-1.5 hover:text-sky-400 ${isActive("/innovation")}`}
                                to="/innovation"
                                onClick={handleNavClick}
                            >
                                <HiOutlineSquares2X2 size={16} className="opacity-80" />
                                <span>Innovation</span>
                            </Link>
                            <Link
                                className={`flex items-center gap-1.5 hover:text-sky-400 ${isActive("/contact")}`}
                                to="/contact"
                                onClick={handleNavClick}
                            >
                                <HiOutlineChatBubbleLeftRight
                                    size={16}
                                    className="opacity-80"
                                />
                                <span>Contact</span>
                            </Link>
                        </nav>

                        {/* theme toggle */}
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="h-10 px-0 rounded-full flex items-center border border-slate-700 bg-slate-900/80 hover:border-sky-400 text-slate-300 hover:text-sky-300 transition-all duration-500 group overflow-hidden hover:px-3"
                            aria-label="Toggle theme"
                        >
                            <div className="w-10 h-10 shrink-0 flex items-center justify-center text-sky-400 transition-transform group-hover:rotate-12">
                                {getThemeIcon()}
                            </div>
                            <span className="max-w-0 opacity-0 whitespace-nowrap overflow-hidden transition-all duration-500 group-hover:max-w-xs group-hover:opacity-100 text-[10px] font-mono font-bold tracking-tighter uppercase">
                                {getThemeLabel()} Mode
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* BOTTOM NAV (Mobile) */}
            <div className="md:hidden fixed bottom-4 inset-x-0 z-50 flex justify-center pointer-events-none">
                {/* DROP-UP MENU */}
                {showMore && (
                    <div
                        ref={moreMenuRef}
                        className="pointer-events-auto absolute bottom-16 mx-4 w-full max-w-xs"
                    >
                        <div className="rounded-2xl border border-slate-700 bg-slate-950/95 backdrop-blur-xl shadow-lg p-3 text-xs text-slate-200">
                            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-2">
                                More sections
                            </p>
                            <div className="flex flex-col gap-1.5">
                                {extraItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={handleNavClick}
                                        className={`flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-800 ${pathname === item.path ? "text-sky-300" : "text-slate-200"
                                            }`}
                                    >
                                        <span>{item.label}</span>
                                        {pathname === item.path && (
                                            <span className="text-[10px] text-sky-300">●</span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* MAIN ISLAND NAV */}
                <nav
                    ref={mobileNavRef}
                    className="pointer-events-auto max-w-md w-full mx-4 rounded-full border border-slate-700 bg-slate-900/95 backdrop-blur-xl shadow-lg shadow-sky-500/20 px-3 py-2 flex items-center justify-between gap-2"
                >
                    {mainMobileItems.map(({ path, label, icon: Icon }) => (
                        <Link
                            key={path}
                            to={path}
                            onClick={handleNavClick}
                            className="flex-1 flex flex-col items-center gap-0.5 text-[10px]"
                        >
                            <Icon
                                size={20}
                                className={`transition-transform duration-150 ${pathname === path ? "scale-110 text-sky-400" : "opacity-80 text-slate-300"
                                    }`}
                            />
                            {/* glow dot */}
                            <div
                                className={`h-1 w-1 rounded-full mt-0.5 ${pathname === path ? "bg-sky-400" : "bg-transparent"
                                    }`}
                            />
                            <span className={`${isMobileActive(path)} leading-none`}>
                                {label}
                            </span>
                        </Link>
                    ))}

                    {/* MORE BUTTON */}
                    <button
                        type="button"
                        onClick={() => {
                            playFeedback();
                            setShowMore((prev) => !prev);
                        }}
                        className="flex flex-col items-center justify-center gap-0.5 text-[10px] px-2"
                    >
                        <HiOutlineSquares2X2
                            size={20}
                            className={`transition-transform duration-150 ${showMore ? "scale-110 text-sky-400" : "opacity-90 text-slate-300"
                                }`}
                        />
                        <div
                            className={`h-1 w-1 rounded-full mt-0.5 ${showMore ? "bg-sky-400" : "bg-transparent"
                                }`}
                        />
                        <span
                            className={`leading-none ${showMore ? "text-sky-400" : "text-slate-300"
                                }`}
                        >
                            More
                        </span>
                    </button>
                </nav>
            </div>
        </>
    );
};

export default Navbar;
