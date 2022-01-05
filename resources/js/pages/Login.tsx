import React from 'react'

import axios from 'axios'

import {BsPersonFill, BsEyeSlash, BsEye} from 'react-icons/bs'
import {BiFingerprint} from 'react-icons/bi'

import { useNavigate } from 'react-router-dom'

import DB from '../DB'
import config from '../config'
import {getUrl} from '../routes'

import { useAuth } from '../providers/AuthProvider'

export default function Login() {

    const { setAuthState } = useAuth()
    const navigate = useNavigate()

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passwordVisible, setPasswordVisible] = React.useState(false)
    const [isLoading, setLoading] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!(username && password)) {
            setErrorMsg('Username dan password harus diisi')
            return
        }
        setLoading(true)
        axios({
            url: `${config.rootApiUrl}/login`,
            method: 'POST',
            data: {
                username, password
            }
        })
        .then(res => {
            console.log(res)
            let data = res.data
            //set login data to Auth Context
            setAuthState({
                name: data.name,
                username: data.username,
                token: data.token
            })

            //save to indexed DB
            let db = new DB()
            db.auth.put({key: 'auth_token', value: data.token})
            db.auth.put({key: 'name', value: data.name})
            db.auth.put({key: 'username', value: data.username})
            navigate(getUrl('dashboard'))
        })
        .catch(err => {
            if (err.response){
                setErrorMsg(err.response.data.message)
            } else {
                setErrorMsg('Koneksi gagal')
            }
        })
        .finally(() => {
            setLoading(false)
        })
    }


    return (
        <div className='tw-w-screen tw-h-screen tw-relative tw-flex tw-justify-center tw-items-center tw-px-4'>
            {/* image background */}
            <img src='/storage/assets/login-cover.jpg' className="tw-w-full tw-h-full tw-object-cover tw-absolute tw-z-0" />
            {/* backdrop */}
            <div className="tw-absolute tw-bg-black tw-w-full tw-h-full tw-bg-opacity-50 tw-z-[1]"></div>
            
            {/* login card */}
            <form className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-8 tw-px-12 tw-max-w-md tw-w-full tw-rounded-xl tw-bg-white tw-z-[2] tw-bg-opacity-70" onSubmit={handleSubmit}>

                <h1 className="tw-text-center tw-text-2xl tw-font-semibold tw-tracking-wide">MASUK</h1>

                <p className="tw-text-center tw-text-red-500 tw-font-medium tw-mt-4">{errorMsg}</p>

                {/* username */}
                <div className={`tw-relative tw-w-full tw-group ${isLoading && 'tw-opacity-50'}`}>
                    <input 
                        disabled={isLoading}
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder='Username' 
                        className="tw-peer tw-w-full tw-border-neutral-500 tw-mt-8 focus:tw-outline-none tw-pl-8 tw-py-2 tw-pr-4 tw-border tw-rounded-md focus:tw-ring-2 focus:tw-ring-sky-600 focus:tw-border-sky-600 tw-bg-opacity-70 tw-bg-white tw-shadow-md" 
                    />
                    <i className="tw-text-neutral-500 tw-absolute tw-left-2 tw-text-xl tw-bottom-3 peer-focus:tw-text-sky-600"><BsPersonFill /></i>
                </div>

                {/* password */}
                <div className={`tw-relative tw-w-full tw-group ${isLoading && 'tw-opacity-50'}`}>
                    <input 
                        value={password} 
                        disabled={isLoading}
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder='Password' 
                        type={passwordVisible ? 'text' : 'password'} 
                        className="tw-peer tw-w-full tw-border-neutral-500 tw-mt-8 focus:tw-outline-none tw-pl-8 tw-py-2 tw-pr-4 tw-border tw-rounded-md focus:tw-ring-2 focus:tw-ring-sky-600 focus:tw-border-sky-600 tw-bg-opacity-70 tw-bg-white tw-shadow-md" 
                    />
                    <i className="peer-focus:tw-text-sky-600 tw-text-neutral-500 tw-absolute tw-left-2 tw-text-xl tw-bottom-3"><BiFingerprint /></i>
                    {/* visibility */}
                    <i 
                        className="tw-absolute tw-right-2 tw-bottom-3 tw-text-xl tw-text-neutral-500" 
                        onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                        {passwordVisible ? <BsEye /> : <BsEyeSlash />}
                    </i>
                </div>

                <div className="tw-w-full tw-flex tw-justify-end tw-mt-8">

                    {/* submit */}
                    <button 
                        type="submit" 
                        className={`tw-px-4 tw-py-2 tw-text-white tw-text-sm tw-font-semibold tw-rounded-lg tw-bg-sky-600 tw-transition-all tw-cursor-pointer tw-shadow-md hover:tw-bg-sky-700 focus:tw-outline-none focus:tw-ring-sky-700 focus:tw-ring-2 tw-ring-offset-1 tw-tracking-wide ${isLoading && 'tw-opacity-50'}`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "MASUK"}
                    </button>
                </div>
            </form>
        </div>
    )
}
