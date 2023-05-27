import React, { useState } from 'react'
import { createLabel } from '../../utils/spaceUtils';

export const COLORS = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
];

function LabelInput({ spaceId }) {
    const [name, setName] = useState("");
    const [color, setColor] = useState(COLORS[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newLabel = {
            name,
            color,
        };
        createLabel(spaceId, newLabel, setName, setColor);
    };
    return (
        <form>
            <div className="flex items-center mb-2 ml-4">
                <input
                    type="text"
                    placeholder="Create New label"
                    className="rounded-full py-1 px-3 mr-2 text-sm font-medium w-36 border-none text-gray-700 leading-tight focus:outline-none ring-2 ring-blue-600"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <select
                    className="rounded-full py-1 px-3 mr-2 text-sm font-medium w-24 border-none text-gray-700 leading-tight focus:outline-none ring-2 ring-blue-600"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                >
                    {COLORS.map((color) => (
                        <option key={color} value={color}>
                            {color.replace("bg-", "").replace("-500", "")}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    Add
                </button>
            </div>
        </form>
    );
}

export default LabelInput