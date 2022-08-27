import { useEffect, useState } from 'react';

const useDarkMode = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const root = window.document.documentElement;

    const colorTheme = theme === 'light' ? 'dark' : 'light';
    useEffect(() => {
        root.classList.add(theme);
        root.classList.remove(colorTheme);
        localStorage.setItem('theme', theme);
    }, [setTheme, colorTheme]);

    useEffect(() => {
        const mediaMatch = window.matchMedia('(prefers-color-scheme: dark)');
        mediaMatch.matches ? setTheme('dark') : setTheme('light');

        const colorSchemeChangeListener = (e) => {
            if (e.matches) {
                root.classList.add('dark');
                root.classList.remove('light');
                localStorage.setItem('theme', 'dark');
                setTheme('dark');
            } else {
                root.classList.add('light');
                root.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                setTheme('light');
            }
        };
        mediaMatch.addEventListener('change', colorSchemeChangeListener);

        return () => {
            mediaMatch.removeEventListener('change', colorSchemeChangeListener);
        };
    }, []);

    return [setTheme, colorTheme];
};

export default useDarkMode;
