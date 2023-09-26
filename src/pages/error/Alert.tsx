import React from "react";

interface AlertProps {
    type: string;
    message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
    const alertClasses =
        type === "danger"
            ? "bg-red-50 text-red-800 dark:bg-gray-800 dark:text-red-400"
            : "bg-green-50 text-green-800 dark:bg-gray-800 dark:text-green-400";

    const iconClasses = type === "danger" ? "text-red-800" : "text-green-800";

    return (
        <div className="z-10 fixed flex justify-center w-full mt-2">
            <div className={`flex items-center p-4 mb-4 text-sm rounded-lg ${alertClasses}`} role="alert">
                <svg className={`flex-shrink-0 inline w-4 h-4 mr-3 ${iconClasses}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">
                        {type === "danger" ? "Error!" : "Success!"}
                    </span>{" "}
                    {message}
                </div>
            </div>
        </div>
    );
};

export default Alert;
