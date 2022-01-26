import React from 'react'
import { Link } from 'react-router-dom'

import { BsPersonCircle, BsPersonFill } from 'react-icons/bs'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { FaPersonBooth } from 'react-icons/fa'

import zIndexes from '../zIndexes'

import { getUrl } from '../routes'
import { useAuth } from '../providers/AuthProvider'

interface Props {
    toggleSidebar: () => void
}

export default function Header(props: Props) {

    const { auth } = useAuth()

    return (
        <div className='tw-h-12 tw-w-full tw-border-b tw-shadow-md tw-px-8 tw-flex tw-justify-between tw-items-center' style={{zIndex: zIndexes.header}}>
            <div className='tw-flex tw-items-center tw-justify-start'>
                <HiOutlineMenuAlt2 className='tw-text-2xl tw-mr-2' onClick={props.toggleSidebar} />
            </div>
            <div className="tw-flex tw-items-center tw-justify-end tw-relative tw-group tw-h-full">
                <span>{auth.name}</span> 
                <BsPersonCircle className='tw-text-2xl tw-ml-3' />

                {/* tooltip */}
                <div className="tw-absolute tw-top-10 tw-right-0 tw-w-36 tw-py-2 tw-border tw-rounded-md tw-shadow-md tw-hidden group-hover:tw-flex tw-flex-col tw-bg-white tw-text-sm" style={{zIndex: zIndexes.headerTooltip}}>
                    {/* logout */}
                    <Link to={getUrl('profile')} className="tw-flex tw-px-4 tw-py-2 tw-items-center hover:tw-bg-gray-300">
                        <BsPersonFill className="tw-mr-2" />
                        Profil
                    </Link>

                    {/* logout */}
                    <Link to={getUrl('logout')} className="tw-flex tw-px-4 tw-py-2 tw-items-center hover:tw-bg-gray-300">
                        <FaPersonBooth className="tw-mr-2" />
                        Keluar
                    </Link>
                </div>
            </div>
        </div>
    )
}
