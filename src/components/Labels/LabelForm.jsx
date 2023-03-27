import React, { useState } from 'react'
import { API_SPACES_CREATE_LABEL } from '../../api/api';
import axios from 'axios';

const COLORS = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-purple-400",
];

function LabelForm({ onSubmit, spaceId }) {
    const [name, setName] = useState("");
    const [color, setColor] = useState(COLORS[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newLabel = {
            name,
            color,
        };
        try {
            const res = await axios.post(API_SPACES_CREATE_LABEL(spaceId), newLabel);
            onSubmit(res.data);
            setName("");
            setColor(COLORS[0]);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center mb-2 ml-4">
                <input
                    type="text"
                    placeholder="New label"
                    className="rounded-full py-1 px-3 mr-2 text-sm font-medium w-32 border-none text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <select
                    className="rounded-full py-1 px-3 mr-2 text-sm font-medium w-24 border-none text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                >
                    {COLORS.map((color) => (
                        <option key={color} value={color}>
                            {color.replace("bg-", "").replace("-400", "")}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    Add
                </button>
            </div>
        </form>
    );
}

export default LabelForm