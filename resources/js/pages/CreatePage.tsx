import React from 'react'
import { useNavigate } from 'react-router-dom'

import idLocale from 'date-fns/locale/id'
import { format } from 'date-fns'

import { Editor } from '@tinymce/tinymce-react';
import { Editor as EditorRef } from 'tinymce/tinymce'

import { BsFillEyeFill } from 'react-icons/bs';
// import { RiSendPlaneFill } from 'react-icons/ri';

import Spinner from '../components/Spinner';
import { useAxios } from '../providers/AxiosProvider'
import { useConfig } from '../providers/ConfigProvider';

interface Category {
    id: number;
    name: string;
}

enum StatusType {
    LOADING,
    SAVING,
    SAVED,
    ERROR,
    READY,
}

export default function CreatePage() {

    const editorRef = React.useRef<EditorRef | null>()
    const isEdit = location.pathname.split('/').pop() === 'edit'
    const navigate = useNavigate()

    const { axios } = useAxios()
    const { config, setConfig } = useConfig()


    const [addCategoryError, setAddCategoryError] = React.useState('')
    const [categories, setCategories] = React.useState<Category[]>([])
    const [content, setContent] = React.useState('')
    const [inputCategory, setInputCategory] = React.useState('')
    const [inputTag, setInputTag] = React.useState('')
    const [isAddingCategory, setAddingCategory] = React.useState(false)
    const [isAddingTag, setAddingTag] = React.useState(false)
    const [isDirty, setDirty] = React.useState(false)
    const [isReady, setReady] = React.useState(false)
    const [isLoading, setLoading] = React.useState(false)
    const [isSubmittingCategory, setSubmittingCategory] = React.useState(false)
    const [postId, setPostId] = React.useState(0)
    const [selectedCategories, setSelectedCategories] = React.useState<number[]>([])
    const [slug, setSlug] = React.useState('')
    const [statusMsg, setStatusMsg] = React.useState('')
    const [statusType, setStatusType] = React.useState(StatusType.LOADING)
    const [tags, setTags] = React.useState<string[]>([])
    const [title, setTitle] = React.useState('')
    const [updatedAt, setUpdatedAt] = React.useState(new Date())
    const [visibility, setVisibility] = React.useState(false)
    
    //Initalize page
    React.useEffect(() => {
        if (isEdit) {
            //go back if id is 0
            if (config.editPostID === 0) {
                navigate(-1)
                return
            }
            setPostId(config.editPostID)
        }
        fetchMetaData()
    }, [])

    //watch on changes
    React.useEffect(() => {

        //check if any empty
        if (title === '' || slug === '' || content === '') return
        
        if(isDirty) {

            const timer = setTimeout(() => {
                sendAutosave()
            }, 1000)

            return () => clearTimeout(timer)
        } else {
            //FIXME
            const timer = setTimeout(() => {
                setDirty(true)
            }, 1000)

            return () => clearTimeout(timer)
        }
    }, [content, slug, title, selectedCategories, tags, visibility])

    //Fetch uid, title, content, etc for initial data
    const fetchMetaData = async () => {
        setLoading(true)
        try {
            /**
             * schema:
             * {
             *  id: number,
             *  title: string,
             *  content: string,
             *  slug: string,
             *  tags: string[],
             *  categories: {
             *    id: number,
             *    name: string
             *  }[],
             *  selected_categories: number[],
             *  updated_at: string
             * }
             */
            const response = await axios.post('/post/getData', {postId: isEdit ? config.editPostID : postId})
            setSlug(response.data.slug)
            setTags(response.data.tags)
            setCategories(response.data.categories)
            setSelectedCategories(response.data.selected_categories)
            setPostId(response.data.id)
            setTitle(response.data.title)
            setContent(response.data.content)
            setUpdatedAt(new Date(response.data.updated_at))
            setVisibility(response.data.visibility)
            editorRef.current?.setContent(response.data.content)
            setReady(true)
            setStatusType(StatusType.READY)
        } 
        catch (e) {
            setStatusType(StatusType.ERROR)
        } 
        finally {
            setLoading(false)

        }
    }

    const handleAddCategory = () => {
        // setAddingCategory(false)
        setSubmittingCategory(true)
        axios({
            url: '/category/create',
            method: 'POST',
            data: {
                name: inputCategory,
            }
        })
        .then(response => {
            /**
             * schema: 
             * id: number
             */
            setCategories([
                ...categories,
                {
                    id: response.data.id,
                    name: inputCategory
                }
            ])
            setInputCategory('')
            setAddingCategory(false)
            setAddCategoryError('')
        })
        .catch(error => {
            if (error.response){
                setAddCategoryError(error.response.data.message)
            }
            else {
                setAddCategoryError('Terjadi kesalahan')
            }
        })
        .finally(() => {
            setSubmittingCategory(false)
        })
    }

    const handleAddTag = () => {
        setAddingTag(false)
        setTags([
            ...tags,
            inputTag
        ])
        setInputTag('')
    }

    const handleCategoryChange = (checked: boolean, id: number) => {
        if (checked){
            setSelectedCategories([
                ...selectedCategories,
                id
            ])
        }
        else {
            setSelectedCategories(selectedCategories.filter(categoryId => categoryId !== id))
        }
    }

    const handleEditorChange = (content: string) => {
        setContent(content)
    }

    const sendAutosave = async () => {
        setStatusType(StatusType.SAVING)
        try {
            /**
             * schema:
             * {
             *   updated_at : string
             * }
             */
            const response = await axios.post('/post/autosave', {
                id: postId,
                title,
                content,
                slug,
                visibility,
                tags,
                categories: selectedCategories,
            })
            setStatusType(StatusType.SAVED)
            setUpdatedAt(new Date(response.data.updated_at))
        }
        catch (e) {
            setStatusType(StatusType.ERROR)
        }
    }

    return (
        <div className="tw-w-full tw-px-4 tw-flex-grow">
            {/* title */}
            <h1 className="tw-text-3xl tw-font-semibold">{isEdit ? 'Edit Halaman' : 'Buat Halaman Baru'}</h1>

            <div className="tw-flex tw-gap-2 tw-mt-4">
                {/* card */}
                <div className="tw-w-full tw-rounded-md tw-shadow-lg tw-py-4 tw-px-4 tw-bg-white">

                    {/* title */}
                    <div className=" tw-mb-4">
                        <input 
                            className="tw-w-full tw-py-2 tw-px-3 tw-rounded-md tw-shadow-md tw-border tw-font-semibold focus:tw-outline-none focus:tw-ring focus:tw-caret-sky-500 focus:tw-ring-sky-500 focus:tw-ring-opacity-50 placeholder:tw-font-normal disabled:tw-opacity-50" 
                            disabled={isLoading}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Judul"
                            value={title}
                        />
                    </div>

                    {/* editor */}
                    <Editor
                        initialValue=''
                        disabled={isLoading}
                        apiKey="lek1nfw6iogrsq1n56zxjao00dtcsii6bz58tiwwxvd785rc"
                        init={{
                            plugins: 'print preview paste importcss searchreplace autolink save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                            imagetools_cors_hosts: ['picsum.photos'],
                            menubar: 'file edit view insert format tools table help',
                            toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                            toolbar_sticky: true,
                            autosave_ask_before_unload: true,
                            autosave_interval: '30s',
                            autosave_prefix: '{path}{query}-{id}-',
                            autosave_restore_when_empty: false,
                            autosave_retention: '2m',
                            image_advtab: true,
                            link_list: [
                                { title: 'My page 1', value: 'https://www.tiny.cloud' },
                                { title: 'My page 2', value: 'http://www.moxiecode.com' }
                            ],
                            image_list: [
                                { title: 'My page 1', value: 'https://www.tiny.cloud' },
                                { title: 'My page 2', value: 'http://www.moxiecode.com' }
                            ],
                            image_class_list: [
                                { title: 'None', value: '' },
                                { title: 'Some class', value: 'class-name' }
                            ],
                            importcss_append: true,
                            file_picker_callback: function (callback, value, meta) {
                                /* Provide file and text for the link dialog */
                                if (meta.filetype === 'file') {
                                callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
                                }

                                /* Provide image and alt text for the image dialog */
                                if (meta.filetype === 'image') {
                                callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
                                }

                                /* Provide alternative source and posted for the media dialog */
                                if (meta.filetype === 'media') {
                                callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
                                }
                            },
                            templates: [
                                { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
                                { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
                                { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
                            ],
                            template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                            template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
                            height: 600,
                            image_caption: true,
                            quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                            noneditable_noneditable_class: 'mceNonEditable',
                            toolbar_mode: 'sliding',
                            contextmenu: 'link image imagetools table',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onChange={(e) => handleEditorChange(e.target.getContent())}
                        onInit={(e, editor) => {editorRef.current = editor; content ? editor.setContent(content) : null}}
                    />

                </div>

                {/* right panel */}
                <div className="tw-w-64 tw-flex-none tw-flex tw-flex-col tw-gap-2">

                    {/* action buttons */}
                    <div className="tw-rounded-md tw-shadow-lg tw-py-4 tw-px-4 tw-bg-white tw-flex tw-flex-col tw-gap-2">

                        <div className='tw-flex tw-gap-2 tw-justify-center tw-items-center tw-w-full'>

                            {/* preview */}
                            <button 
                                className="tw-py-2 tw-px-3 tw-rounded-md tw-shadow-md tw-flex tw-items-center tw-text-white tw-bg-stone-500 focus:tw-outline-none focus:tw-ring focus:tw-ring-offset-1 focus:tw-ring-stone-500 focus:tw-ring-opacity-50 disabled:tw-opacity-50"
                                disabled={isLoading}
                            >
                                <BsFillEyeFill className='tw-text-lg tw-mr-2' />
                                Preview
                            </button>

                            {/* publish */}
                            {/* <button 
                                className="tw-py-2 tw-px-3 tw-rounded-md tw-shadow-md tw-flex tw-items-center tw-text-white tw-bg-sky-600 focus:tw-outline-none focus:tw-ring focus:tw-ring-offset-1 focus:tw-ring-sky-600 focus:tw-ring-opacity-50 disabled:tw-opacity-50"
                                disabled={isLoading}
                            >
                                <RiSendPlaneFill className='tw-text-lg tw-mr-2' />
                                Publish!
                            </button> */}
                        </div>

                        {/* status */}
                        {
                            statusType === StatusType.LOADING ? <p className="tw-text-gray-800 tw-text-sm">Loading...</p>
                            : statusType === StatusType.ERROR ? <p className="tw-text-red-500 tw-text-sm">Terjadi kesalahan</p>
                            : statusType === StatusType.SAVED ? <p className="tw-text-gray-800 tw-text-sm">Terakhir diedit pada {format(updatedAt, 'dd MMM yyyy; HH:mm:ss', {locale: idLocale})}</p>
                            : statusType === StatusType.SAVING ? <p className="tw-text-gray-800 tw-text-sm">Sedang disimpan...</p>
                            : null
                        }
                    </div>

                    {/* settings */}
                    <div className="tw-rounded-md tw-shadow-lg tw-py-4 tw-px-4 tw-bg-white tw-flex tw-gap-2 tw-justify-center tw-flex-col">

                        <h2 className="tw-font-semibold tw-text-md tw-text-left">Pengaturan</h2>

                        {/* slug */}
                        <div className="tw-flex tw-flex-col tw-w-full">
                            <span className="tw-text-sm">Alamat URL</span>
                            <input 
                                className="tw-w-full tw-border-b tw-border-gray-500 focus:tw-caret-sky-500 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-border-b-2 disabled:tw-opacity-50" 
                                disabled={isLoading}
                                onChange={(e) => setSlug(e.target.value)}
                                value={slug}
                            />
                            <span className="tw-text-xs tw-break-all tw-text-gray-700 tw-mt-1">https://&lt;domain-anda.com&gt;/blog/{slug}</span>
                        </div>

                        {/* visibility */}
                        <div className={`tw-mt-2 tw-w-full ${isLoading && 'tw-opacity-50'}`}>
                            <input 
                                checked={visibility}
                                disabled={isLoading}
                                id="visibility"
                                onChange={(e) => setVisibility(e.target.checked)}
                                type="checkbox"
                            />
                            <label htmlFor="visibility" className="tw-my-auto tw-select-none tw-ml-2">Diakses publik</label>
                        </div>
                    </div>

                    {/* categories */}
                    <div className="tw-rounded-md tw-shadow-lg tw-py-4 tw-px-4 tw-bg-white tw-flex tw-gap-2 tw-justify-center tw-flex-col tw-text-sm">
                        <h2 className="tw-font-semibold tw-text-md tw-text-left">Kategori</h2>
                        <div className={`tw-max-h-32 tw-overflow-y-auto ${isLoading && 'tw-opacity-50'}`}>
                            {
                                categories.map((category, index) => (<div key={index} className="">
                                    <input 
                                        checked={selectedCategories.findIndex(c => c === category.id) !== -1}
                                        disabled={isLoading}
                                        id={`category-${index}`}
                                        onChange={(e) => handleCategoryChange(e.target.checked, category.id)}
                                        type="checkbox"
                                        value={category.id}
                                    />
                                    <label htmlFor={`category-${index}`} className="tw-my-auto tw-select-none tw-ml-2">{category.name}</label>
                                </div>))
                            }
                        </div>

                        {/* add category */}
                        {
                            isAddingCategory ? <form onSubmit={(e) => {e.preventDefault(); handleAddCategory()}} className="tw-mt-2 tw-relative"> 
                                <input 
                                    autoFocus 
                                    className="tw-border-b tw-border-sky-500 tw-w-full tw-peer focus:tw-outline-none focus:tw-caret-sky-500 disabled:tw-opacity-50" 
                                    disabled={isSubmittingCategory || isLoading}
                                    onBlur={() => !inputCategory && setAddingCategory(false)}
                                    onChange={(e) => setInputCategory(e.target.value)}
                                    placeholder="Natural"
                                    value={inputCategory}
                                />
                                {
                                    addCategoryError && <span className="tw-font-medium tw-text-red-500">{addCategoryError}</span>
                                }
                                {
                                    isSubmittingCategory && <Spinner className="tw-w-5 tw-h-5 tw-absolute tw-right-2 tw-top-0 tw-text-gray-500" />
                                }
                                <input type="submit" className="tw-hidden" />
                            </form>
                            : <span onClick={() => setAddingCategory(true)} className="tw-text-blue-500 tw-font-medium tw-underline tw-select-none">+ Tambah kategori</span>
                        }
                    </div>

                    {/* tags */}
                    <div className="tw-rounded-md tw-shadow-lg tw-py-4 tw-px-4 tw-bg-white tw-flex tw-gap-2 tw-justify-center tw-flex-col tw-text-sm">
                        <h2 className="tw-font-semibold tw-text-md tw-text-left">Tag</h2>
                        <div className="tw-max-h-32 tw-overflow-y-auto">
                            {
                                tags.map((tag, index) => <p key={index} className="">#{tag}</p>)
                            }
                        </div>

                        {/* tags */}
                        {
                            isAddingTag ? <form onSubmit={(e) => {e.preventDefault(); handleAddTag()}} className="tw-mt-2 tw-relative"> 
                                <input 
                                    autoFocus 
                                    className="tw-border-b tw-border-sky-500 tw-w-full tw-peer focus:tw-outline-none focus:tw-caret-sky-500 disabled:tw-opacity-50" 
                                    disabled={isLoading}
                                    onBlur={() => !inputTag && setAddingTag(false)}
                                    onChange={(e) => setInputTag(e.target.value)}
                                    placeholder="Tambah tag"
                                    value={inputTag}
                                />
                                <input type="submit" className="tw-hidden" />
                            </form>
                            : <span onClick={() => setAddingTag(true)} className="tw-text-blue-500 tw-font-medium tw-underline tw-select-none">+ Tambah tag</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
