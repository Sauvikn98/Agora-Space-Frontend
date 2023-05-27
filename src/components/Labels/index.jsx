import React from 'react';
import LabelInput from './LabelInput';
import LabelItem from './LabelItem';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../recoil/atoms/userAtoms';

function Labels({ labels, spaceId, spaceCreator, onLabelClick }) {
    const user = useRecoilValue(userAtom)
    return (
        <div className="rounded-b-lg bg-white ml-4 mr-4 mt-4 ">
            <div className='flex items-center ml-4 pt-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mr-2 w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
                </svg>
                <h2 className="text-lg font-bold">Labels</h2>
            </div>
            <div className='pt-10 pb-6 pl-3 flex flex-wrap'>
            {labels.map((label) => (
                <div key={label.id} onClick={() => onLabelClick(label.name)} className="w-full sm:w-auto cursor-pointer">
                    <LabelItem label={label}/>
                </div>
            ))}
            </div>
            {spaceCreator === user.userDetails?._id &&
                <div className='pb-4 pl-8'>
                    <LabelInput spaceId={spaceId} />
                </div>
            }
        </div>
    );
}

export default Labels;
