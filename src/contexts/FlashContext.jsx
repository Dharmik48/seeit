import {useState, useEffect, createContext} from "react";

const FlashContext = createContext();

export function FlashProvider({children}) {
    const [flashData, setFlashData] = useState({
        show: false,
        msg: "",
        success: false,
    });

    const flash = (flashData) => {
        setFlashData({ ...flashData });
    };

    useEffect(() => {
        let timeout;
        if (flashData.show) {
            timeout = setTimeout(
                () => setFlashData({ show: false, msg: "", success: false }),
                5000
            );
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [flashData]);

    return (
        <FlashContext.Provider value={{flashData, flash}}>
            {children}
        </FlashContext.Provider>
    )
}

export default FlashContext;
