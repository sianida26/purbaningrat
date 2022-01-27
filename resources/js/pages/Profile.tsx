import React from 'react';

import { useAxios } from '../providers/AxiosProvider';

export default function Profile() {

  const { axios } = useAxios();

  React.useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
	  try {
		  const response = await axios({
			method: 'GET',
			url: '/profil/getData',
		  })
		  console.log(response)
	  } catch (e) {
		  console.log(e)
	  }
  }

  return <div className="tw-w-full tw-bg-white tw-shadow-md tw-rounded-md tw-p-4 tw-flex tw-flex-col">
    <div className="tw-w-full tw-items-center tw-justify-center tw-flex tw-flex-col">
      <span className="tw-w-24 tw-h-24 tw-rounded-full tw-object-cover tw-bg-red-500" />
      <p className="tw-text-center tw-text-xs tw-text-gray-500 tw-mt-1 tw-underline">Ganti foto</p>
    </div>
    <form className="tw-w-full tw-flex tw-flex-col" onSubmit={() => {}}>
      {/* name */}
      <div className="tw-w-full tw-flex tw-flex-col">
        <span className="tw-text-sm tw-text-gray-600 tw-mt-4">Nama</span>
        <input className="tw-border-b tw-py-2 focus:tw-outline-none focus:tw-border-b-2 focus:tw-border-sky-500" />
      </div>

      {/* lokasi */}
      <div className="tw-w-full tw-flex tw-flex-col">
        <span className="tw-text-sm tw-text-gray-600 tw-mt-4">Lokasi</span>
        <input className="tw-border-b tw-py-2 focus:tw-outline-none focus:tw-border-b-2 focus:tw-border-sky-500" />
      </div>

      {/* bio */}
      <div className="tw-w-full tw-flex tw-flex-col">
        <span className="tw-text-sm tw-text-gray-600 tw-mt-4">Bio</span>
        <textarea className="tw-border-b tw-py-2 tw-break-words focus:tw-outline-none focus:tw-border-b-2 focus:tw-border-sky-500" />
      </div>

      {/* submit */}
      <div className="tw-mt-4 tw-flex tw-justify-center">
        <button type="submit" className="tw-rounded-sm tw-shadow-sm tw-bg-green-600 tw-text-white tw-tracking-wide tw-px-3 tw-py-2 focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-green-600 focus:tw-outline-none">
          SIMPAN
        </button>
      </div>
    </form>
  </div>;
}
