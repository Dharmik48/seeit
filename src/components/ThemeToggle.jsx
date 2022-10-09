import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import useDarkMode from "../hooks/useDarkMode.js";

export default function ThemeToggle() {
    const [setTheme, colorTheme] = useDarkMode();

    return (
        <div className='max-w-fit ml-auto mr-2'>
            <label
                className='relative py-1 px-1.5 w-14 grid items-center h-7 bg-primary rounded-full cursor-pointer'
                htmlFor='themeCheckbox'
                onClick={() => setTheme(colorTheme)}
            >
                <FontAwesomeIcon
                    icon={colorTheme === 'light' ? faMoon : faSun}
                    className={`h-5 aspect-square rounded-full transition-transform ${
                        colorTheme === 'light' ? 'translate-x-0.5' : 'translate-x-6'
                    }`}
                />
            </label>
            <input
                type='checkbox'
                id='themeCheckbox'
                className='opacity-0 absolute'
            />
        </div>
    )
}