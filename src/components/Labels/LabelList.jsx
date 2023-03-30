import React from 'react';
import Label from './Label';

function LabelList({ labels, onUpdate, onDelete }) {
    return (
        <div className="pt-10 pb-10 pl-3 rounded-b-lg  bg-white ml-4 mr-4 mt-4 flex flex-wrap">
            {labels.map((label) => (
                <div key={label.id} className="w-full sm:w-auto">
                    <Label
                        label={label}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        className="my-2"
                    />
                </div>
            ))}
        </div>
    );
}

export default LabelList;
