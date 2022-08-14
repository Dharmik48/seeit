import {useEffect, useState} from "react";

function useFlash() {
    const [flash, setFlash] = useState({
        show: false,
        msg: '',
        success: false,
    });

    const showFlash = (flashData) => {
        setFlash({...flashData})
    }

    useEffect(() => {
        let timeout;
        if (flash.show) {
            timeout = setTimeout(() => setFlash({ show: false, msg: '', success: false }), 5000);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [flash]);

    return [showFlash, flash]
}

export default useFlash;