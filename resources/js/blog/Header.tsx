import React from 'react';
import { render } from 'react-dom';

render(
    <React.StrictMode>
        <Header />
    </React.StrictMode>,
    document.getElementById('header')
)

function Header(){

    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [dropdownIndex, setDropdownIndex] = React.useState(-1)

    const MENUS = [
        {
            name: 'Interval',
            submenus: [
                //Primer, Kilatan, Mata Angin, Macapat, Elemen, Tegese Tembung, Catur, Bilik, Jangka, Astronomi, Mayapada, Metafisika
                {name: 'Primer', id: 'primer'},
                {name: 'Kilatan', id: 'kilatan'},
                {name: 'Mata Angin', id: 'mata-angin'},
                {name: 'Macapat', id: 'macapat'},
                {name: 'Elemen', id: 'elemen'},
                {name: 'Tegese Tembung', id: 'tegese-tembung'},
                {name: 'Catur', id: 'catur'},
                {name: 'Bilik', id: 'bilik'},
                {name: 'Jangka', id: 'jangka'},
                {name: 'Astronomi', id: 'astronomi'},
                {name: 'Mayapada', id: 'mayapada'},
                {name: 'Metafisika', id: 'metafisika'},
            ]
        },
        {
            name: 'Filsafat',
            submenus: [
                //Gerakan Literasi, Eksperimen Pikiran, Penulis Obskur
                {name: 'Gerakan Literasi', id: 'gerakan-literasi'},
                {name: 'Eksperimen Pikiran', id: 'eksperimen-pikiran'},
                {name: 'Penulis Obskur', id: 'penulis-obskur'},
            ]
        },
        {
            name: 'Teras Sejarah',
            submenus: [
                //Tanah Jawa, Nusantara, Kronologi, Wayang Kulit
                {name: 'Tanah Jawa', id: 'tanah-jawa'},
                {name: 'Nusantara', id: 'nusantara'},
                {name: 'Kronologi', id: 'kronologi'},
                {name: 'Wayang Kulit', id: 'wayang-kulit'},
            ]
        },
        {
            name: 'Merchandise',
            submenus: [],
            link: '/merchandise',
        },
        {
            name: 'Seni & Sastra',
            submenus: [
                //Puisi, Lukisan, Sketsa
                {name: 'Puisi', id: 'puisi'},
                {name: 'Lukisan', id: 'lukisan'},
                {name: 'Sketsa', id: 'sketsa'},
            ]
        }
    ]

    return (
        <div className="tw-w-screen tw-relative tw-min-h-[4rem]" id="header">

            {/* mobile header */}
            <div className="tw-w-screen tw-shadow-md tw-flex tw-justify-between tw-h-12 tw-px-4 lg:tw-px-8 tw-top-0 tw-fixed tw-bg-white tw-transition-all tw-duration-200 tw-ease-in-out tw-items-center lg:tw-hidden" id="header-mobile">
                <span>
                    <img className="tw-w-36" src="/storage/logos/logo.svg" />
                </span>
                <span className="tw-text-2xl"  onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {
                        isMenuOpen ? <i className="bi bi-x" />
                        : <i className="bi bi-list" />
                    }
                    {/* <span id="icon-drawer" className="bi bi-list tw-text-2xl"></span>  */}
                </span>
            </div>

            {/* mobile menu */}
            <div className={`tw-w-screen ${isMenuOpen ? 'tw-h-screen' : 'tw-h-0'} tw-fixed tw-top-12 tw-left-0 tw-px-4 tw-bg-white tw-flex tw-flex-col tw-overflow-hidden lg:tw-hidden tw-transition-all tw-duration-300 tw-ease-in-out`}>
                
                {/* search */}
                <form onSubmit={(e) => {e.preventDefault()}} className="tw-w-full tw-relative">
                    <input 
                        className="tw-rounded-md tw-border tw-border-gray-500 focus:tw-outline-none tw-my-4 tw-pl-8 tw-py-2 tw-pr-3 tw-w-full" 
                        placeholder='Cari...'
                    />
                    <i className="tw-absolute tw-text-gray-500 tw-left-2 tw-top-6 bi bi-search"></i>
                    <input type="submit" className="tw-hidden" />
                </form>

                {/* menus */}
                <div className="tw-overflow-y-scroll">
                    {
                        MENUS.map((menu, index) => (
                            <div className="" key={index}>
                                {
                                    menu.submenus.length > 0 ? <>
                                        <div className={`tw-flex tw-items-center tw-justify-between tw-h-12 tw-border-gray-500 ${index === dropdownIndex ? 'tw-border-b-2' : 'tw-border-b' }`} onClick={() => setDropdownIndex(dropdownIndex === index ? -1 : index)}>
                                            <span className={index === dropdownIndex ? 'tw-font-semibold' : ''}>{menu.name}</span>
                                            {
                                                //show chevron when item has submenus
                                                menu.submenus.length > 0 && <i className={`bi tw-p-3 tw-transition-all tw-duration-200 tw-ease-in-out tw-transform tw-rotate-0 bi-chevron-down ${index === dropdownIndex && 'tw-rotate-180'}`} />
                                            }
                                        </div>
                                        {
                                            index === dropdownIndex && menu.submenus.length > 0 && <div className="tw-flex-col tw-flex tw-pt-2 tw-pb-8">
                                                {
                                                    menu.submenus.map((submenu, index) => (
                                                        <a key={index} href={`/kategori/${submenu.id}`} className="tw-w-full tw-py-2 tw-border-b tw-border-gray-300 tw-pl-2 tw-text-sm">{submenu.name}</a>
                                                    ))
                                                }
                                            </div>
                                        }
                                    </>
                                    : <a className={`tw-flex tw-items-center tw-justify-between tw-h-12 tw-border-gray-500 tw-border-b`} href={menu.link}>{menu.name}</a>
                                }
                                
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* tablet and on */}
            <div className="tw-w-full tw-flex-col tw-bg-white tw-shadow-lg tw-hidden lg:tw-block">
                <div className="tw-flex tw-py-4 tw-border-b tw-border-gray-500">
                    <div className="tw-px-12">
                        <img className="tw-w-36" src="/storage/logos/logo.svg" />
                    </div>
                </div>
                {/* navs */}
                <div className="tw-w-full tw-px-12 tw-flex tw-gap-4 tw-py-2">
                    {
                        MENUS.map((menu, index) => (
                            <span key={index}>
                                {
                                    menu.submenus.length > 0 ? <span className="tw-relative">
                                        <span
                                            className={`tw-text-sm tw-select-none tw-cursor-pointer tw-text-black ${dropdownIndex === index ? 'tw-font-semibold' : 'tw-font-medium'}`} 
                                            onClick={() => dropdownIndex !== index ? setDropdownIndex(index) : null}
                                        >
                                            {menu.name.toUpperCase()}
                                        </span>
                                        <Dropdown 
                                            open={dropdownIndex === index}
                                            submenus={menu.submenus}
                                            onClose={() => setDropdownIndex(-1)}
                                        />
                                    </span>
                                    : <a href={menu.link} className="tw-font-medium tw-text-sm tw-text-black">{menu.name.toUpperCase()}</a>
                                }
                            </span>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

interface DropdownProps {
    open: boolean,
    onClose: () => void,
    submenus: {name: string, id: string}[]
}

function Dropdown(props: DropdownProps){

    const ref = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        
        function handleClickOutside(e: MouseEvent){
            if(ref.current && !ref.current?.parentElement?.contains(e.target as Node) && props.open){
                // console.log('clicked outside')
                e.stopPropagation()
                props.onClose();
            }
        }

        //bind
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            //unbind
            document.removeEventListener('mousedown', handleClickOutside);
        }

    }, [props.open])
    
    return <span ref={ref} className={`tw-absolute tw-top-7 tw-left-0 tw-bg-white tw-shadow-md tw-border tw-border-gray-200 tw-flex tw-flex-row tw-flex-wrap tw-justify-between tw-w-[23rem] ${!props.open && 'tw-hidden'}`}>
        {
            props.submenus.map((submenu, index) => (
                <a key={index} href={`/kategori/${submenu.id}`} className="tw-w-44 tw-py-2 tw-px-2 tw-inline hover:tw-bg-gray-200 tw-font-light tw-text-sm">{submenu.name}</a>
            ))
        }
    </span>
}