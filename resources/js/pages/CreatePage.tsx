import React from 'react'

export default function CreatePage() {

    return (
        <div className="tw-w-full tw-px-4 tw-flex-grow">
            {/* title */}
            <h1 className="tw-text-3xl tw-font-semibold">Buat Halaman Baru</h1>

            <div className="tw-flex tw-gap-2">
                {/* card */}
                <div className="tw-w-full tw-rounded-md tw-shadow-lg tw-py-4 tw-px-4 tw-bg-white tw-mt-4">

                    {/* title */}
                    <div className="">
                        <input 

                            className="tw-w-full tw-py-2 tw-px-3 tw-rounded-md tw-shadow-md tw-border tw-font-semibold focus:tw-outline-none focus:tw-ring focus:tw-ring-sky-500 focus:tw-ring-opacity-50 placeholder:tw-font-normal" 
                            placeholder="Judul"
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}
