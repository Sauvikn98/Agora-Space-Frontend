import { useState } from "react";
import classNames from "classnames";

const LabelItem = ({ label }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(label.name);
    const [color, setColor] = useState(label.color);

    const handleSave = () => {
        const updatedLabel = {
            ...label,
            name,
            color,
        };
        setIsEditing(false);
        onUpdate(updatedLabel);
    };

    return (
        <div
            className={classNames(
                `rounded-full inline-flex items-center py-1 px-3 mr-2 mb-2 text-sm font-medium hover:bg-gray-500`,
                color,
            )}
        >
            {isEditing ? (
                <>
                    <input
                        type="text"
                        className="rounded-l-full rounded-r-none w-32 px-2 py-1 mr-0 ml-0 border-none text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="relative inline-flex">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-r-full border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                            onClick={handleSave}
                        >
                            <svg
                                className="w-4 h-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-l-none border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                            onClick={() => setIsEditing(false)}
                        >
                            <svg
                                className="w-4 h-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <span className="text-white">{name}</span>

                </>
            )}
        </div>
    );
};

export default LabelItem
