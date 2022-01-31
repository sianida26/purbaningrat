import React from 'react';
import Snackbar from '@mui/material/Snackbar';

import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { getUrl } from '../routes';

import { useAxios } from '../providers/AxiosProvider';



export default function Profile() {

	const inputRef = React.useRef<HTMLInputElement>(null);
	const navigate = useNavigate()
	const { axios } = useAxios()
	const { enqueueSnackbar } = useSnackbar()

	const [errorMsg, setErrorMsg] = React.useState('');
	const [photo, setPhoto] = React.useState('default.jpeg')
	const [name, setName] = React.useState('')
	const [location, setLocation] = React.useState('')
	const [bio, setBio] = React.useState('')

	React.useEffect(() => {
		getUserData()
	}, [])

	const getUserData = async () => {
		try {
			const response = await axios({
				method: 'GET',
				url: '/profil/getData',
			})
			setPhoto(response.data.photo)
			setName(response.data.name)
			setLocation(response.data.location)
			setBio(response.data.bio)
		} catch (e) {
			console.log(e)
		}
	}

	const handleChangePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {

		//TODO: buat loading
		if (e.target.files) {
			const file = e.target.files[0]
			const formData = new FormData()
			formData.append('file', file)
			try {
				const response = await axios({
					method: 'POST',
					url: '/profil/changePhoto',
					data: formData,
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})
				setPhoto(response.data.photo)
			} catch (e) {
				console.log(e)
			}
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			await axios({
				method: 'POST',
				url: '/profil/changeData',
				data: {
					name,
					location,
					bio,
				}
			})
			enqueueSnackbar('Data berhasil diubah', { variant: 'success' })
			navigate(getUrl('dashboard'))
		} catch (e) {
			setErrorMsg('terjadi kesalahan. Silakan coba lagi')
		}
	}

	return <div className="tw-w-full tw-bg-white tw-shadow-md tw-rounded-md tw-p-4 tw-flex tw-flex-col">
		<div className="tw-w-full tw-items-center tw-justify-center tw-flex tw-flex-col">
			<img className="tw-w-24 tw-h-24 tw-rounded-full tw-object-cover" src={`/storage/profiles/${photo}`} />
			<input type="file" className="tw-hidden" accept='image/*' ref={inputRef} onChange={handleChangePhoto} />
			<p className="tw-text-center tw-text-xs tw-text-gray-500 tw-mt-1 tw-underline" onClick={(e) => inputRef.current?.click()}>Ganti foto</p>
		</div>
		<form className="tw-w-full tw-flex tw-flex-col" onSubmit={handleSubmit}>
			{/* name */}
			<div className="tw-w-full tw-flex tw-flex-col">
				<span className="tw-text-sm tw-text-gray-600 tw-mt-4">Nama</span>
				<input 
					onChange={(e) => setName(e.target.value)}
					value={name}
					className="tw-border-b tw-py-2 focus:tw-outline-none focus:tw-border-b-2 focus:tw-border-sky-500" 
				/>
			</div>

		{/* lokasi */}
		<div className="tw-w-full tw-flex tw-flex-col">
			<span className="tw-text-sm tw-text-gray-600 tw-mt-4">Lokasi</span>
			<input 
				onChange={(e) => setLocation(e.target.value)}
				value={location}
				className="tw-border-b tw-py-2 focus:tw-outline-none focus:tw-border-b-2 focus:tw-border-sky-500" 
			/>
		</div>

		{/* bio */}
		<div className="tw-w-full tw-flex tw-flex-col">
			<span className="tw-text-sm tw-text-gray-600 tw-mt-4">Bio</span>
			<textarea
				onChange={(e) => setBio(e.target.value)}
				value={bio}
				className="tw-border-b tw-py-2 tw-break-words focus:tw-outline-none focus:tw-border-b-2 focus:tw-border-sky-500"
			/>
		</div>

		{/* submit */}
		<div className="tw-mt-4 tw-flex tw-justify-center">
			<button type="submit" className="tw-rounded-sm tw-shadow-sm tw-bg-green-600 tw-text-white tw-tracking-wide tw-px-3 tw-py-2 focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-green-600 focus:tw-outline-none">
			SIMPAN
			</button>
		</div>
		<p className="tw-text-red-500 tw-font-semibold tw-text-center">{errorMsg}</p>
		</form>
	</div>;
}