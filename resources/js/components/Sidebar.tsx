import React from 'react'

import zIndexes from '../zIndexes'       

import { BsFileText } from 'react-icons/bs'

interface Props{
    open: boolean,
    onClose: () => void
}

export default function Sidebar({open, onClose}: Props) {
    return (
        <div className="tw-relative">
            {/* sidebar */}
            <div className={`tw-fixed tw-w-72 tw--left-72 tw-bg-white tw-shadow-md tw-h-screen tw-flex tw-flex-col tw-py-4 tw-border-r tw-border-gray-700 tw-transition-transform tw-ease-in-out tw-duration-500 tw-transform ${open && 'tw-translate-x-72'}`} style={{zIndex: zIndexes.sidebar}}>
                {/* logo */}
                <div className="tw-flex tw-justify-between tw-items-center tw-mb-3">
                    Logo
                </div>

                {/* List blog */}
                <div className="tw-flex tw-flex-col tw-mb-3 tw-divide-x">

                    {/* blog list */}
                    <div className="tw-flex tw-items-center tw-py-3 tw-border-y tw-border-gray-100 hover:tw-bg-gray-200 tw-px-4">
                        <BsFileText className="tw-mr-2 tw-text-2xl" />
                        <span>Halaman</span>
                    </div>
                </div>
            </div>

            {/* backdrop */}
            <div className={`tw-backdrop-filter tw-transition tw-duration-500 tw-ease-in-out ${open ? 'tw-fixed tw-backdrop-brightness-50' : 'tw-hidden tw-backdrop-brightness-100'} tw-w-screen tw-h-screen`} style={{zIndex: zIndexes.sidebarBackdrop}} onClick={onClose} />
        </div>
    )
}
