import { useState, useEffect } from "react";

const Typewriter = ({ text, delay = 0, speed = 50, onComplete, className = "" }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStarted(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (!started || completed) return;

        let i = 0;
        const interval = setInterval(() => {
            if (i <= text.length) {
                setDisplayedText(text.slice(0, i));
                i++;
            } else {
                clearInterval(interval);
                setCompleted(true);
                if (onComplete) onComplete();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, started, completed, onComplete]);

    return <span className={className}>{displayedText}</span>;
};

export default Typewriter;
