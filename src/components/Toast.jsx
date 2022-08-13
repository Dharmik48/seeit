import React, { useEffect } from "react";
import { useToast } from "../contexts/ToastContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const Toast = () => {
    const { toast, setToast } = useToast();
    const bgColor =
        toast.type === "success"
            ? "bg-brightGreen"
            : toast.type === "error"
            ? "bg-brightRed"
            : toast.type === "warning"
            ? "bg-brightYellow"
            : "bg-lightBlue";
    useEffect(() => {
        let timeout;
        if (toast.show) {
            timeout = setTimeout(
                () => setToast({ show: false, msg: "", type: "success" }),
                5000
            );
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [toast.show, toast.msg, toast.type]);

    if (toast.show) {
        return (
            <div
                className={`min-w-max flex items-center gap-10 justify-between text-primary fixed py-3 px-5 rounded-lg shadow-lg right-3 -translate-x-1/2 top-20 ${bgColor} `}
            >
                {toast.msg}
                <FontAwesomeIcon
                    icon={faTimes}
                    className="cursor-pointer"
                    onClick={() => setToast({ show: false, msg: "" })}
                />
            </div>
        );
    }
    return <div></div>;
};

export default Toast;
