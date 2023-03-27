import React from 'react';
import Label from './Label';

function LabelList({ labels, onUpdate, onDelete }) {
    return (
        <div className="flex flex-wrap ml-6">
            {labels.map((label) => (
                <div key={label.id} className="w-full">
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
