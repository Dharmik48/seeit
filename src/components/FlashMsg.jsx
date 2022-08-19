import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useContext} from "react";
import FlashContext from "../contexts/FlashContext.jsx";

export default function FlashMsg() {
    const {flashData, flash} = useContext(FlashContext);
    const bgColor = flashData.success ? "bg-brightGreen" : "bg-brightRed";

    return (
        <div
            className={`z-10 min-w-max flex items-center gap-10 justify-between text-primary fixed py-3 px-5 rounded-lg shadow-lg left-1/2 -translate-x-1/2 bottom-12 ${bgColor}`}
        >
            {flashData.msg}
            <FontAwesomeIcon
                icon={faTimes}
                className="cursor-pointer"
                onClick={() =>
                    flash({ show: false, msg: "", success: false })
                }
            />
        </div>
    );
}
