import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FileText,
  PlusCircle,
  Menu,
  X,
  LogOut,
  Image as ImageIcon,
  Star,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Code,
  Quote,
  Strikethrough,
  Heading1,
  Heading2,
  Undo,
  Redo,
} from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
})

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })

// Rich Text Editor Component
const RichTextEditor = ({ value, onChange }: { value: string; onChange: (content: string) => void }) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const isInternalUpdate = useRef(false)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const savedRangeRef = useRef<Range | null>(null)
  const [showYoutubeInput, setShowYoutubeInput] = useState(false)
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [showTablePicker, setShowTablePicker] = useState(false)
  const [tableHover, setTableHover] = useState({ r: 0, c: 0 })

  useEffect(() => {
    const el = editorRef.current
    if (!el) return
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false
      return
    }
    if (el.innerHTML !== value) el.innerHTML = value || ''
  }, [value])

  const exec = (command: string, _val: string | null = null) => {
    editorRef.current?.focus()
    document.execCommand(command, false)
    emitChange()
  }

  const emitChange = () => {
    isInternalUpdate.current = true
    onChange(editorRef.current?.innerHTML || '')
  }

  const handleInput = () => {
    isInternalUpdate.current = true
    onChange(editorRef.current?.innerHTML || '')
  }

  const saveRange = () => {
    const sel = window.getSelection()
    if (sel && sel.rangeCount > 0) savedRangeRef.current = sel.getRangeAt(0).cloneRange()
  }

  const restoreRange = () => {
    const sel = window.getSelection()
    if (sel && savedRangeRef.current) {
      sel.removeAllRanges()
      sel.addRange(savedRangeRef.current)
    }
  }

  const insertAtCursor = (html: string) => {
    editorRef.current?.focus()
    restoreRange()
    document.execCommand('insertHTML', false, html)
    emitChange()
  }

  const handleImageInsert = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5MB')
      return
    }
    const base64 = await fileToBase64(file)
    editorRef.current?.focus()
    restoreRange()
    document.execCommand('insertImage', false, base64)
    emitChange()
    e.target.value = ''
  }

  const handleVideoInsert = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 50 * 1024 * 1024) {
      alert('Video must be under 50MB')
      return
    }
    const base64 = await fileToBase64(file)
    const mime = file.type || 'video/mp4'
    insertAtCursor(
      `<div class="video-wrapper" contenteditable="false">
        <video controls style="max-width:100%;border-radius:8px;margin:8px 0;">
          <source src="${base64}" type="${mime}" />
          Your browser does not support the video tag.
        </video>
      </div><p><br></p>`
    )
    e.target.value = ''
  }

  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|v=|\/embed\/)([A-Za-z0-9_-]{11})/)
    return match ? match[1] : null
  }

  const insertYoutube = () => {
    const id = getYoutubeId(youtubeUrl)
    if (!id) {
      alert('Invalid YouTube URL')
      return
    }
    insertAtCursor(
      `<div class="video-wrapper" contenteditable="false" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;margin:8px 0;">
        <iframe src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen
          style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:8px;">
        </iframe>
      </div><p><br></p>`
    )
    setYoutubeUrl('')
    setShowYoutubeInput(false)
  }

  const insertLink = () => {
    const url = prompt('Enter URL:')
    if (url) exec('createLink', url)
  }

  const insertTable = (rows: number, cols: number) => {
    let html = `<table border="1" style="border-collapse:collapse;width:100%;margin:8px 0;">`
    for (let r = 0; r < rows; r++) {
      html += '<tr>'
      for (let c = 0; c < cols; c++) {
        html += r === 0
          ? `<th style="border:1px solid #d1d5db;padding:8px;background:#f3f4f6;font-weight:600;">Header</th>`
          : `<td style="border:1px solid #d1d5db;padding:8px;">Cell</td>`
      }
      html += '</tr>'
    }
    html += '</table><p><br></p>'
    insertAtCursor(html)
    setShowTablePicker(false)
  }

  const insertHR = () => {
    insertAtCursor(`<hr style="border:none;border-top:2px solid #e5e7eb;margin:16px 0;" /><p><br></p>`)
  }

  const ToolbarBtn = ({ onClick, title, children, active = false }: any) => (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => {
        e.preventDefault()
        onClick()
      }}
      className={`p-1.5 rounded transition-colors text-gray-700 ${
        active ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  )

  const Divider = () => <div className="w-px h-5 bg-gray-300 mx-1 self-center shrink-0 hidden sm:block" />

  const ToolbarRow = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-wrap items-center gap-0.5 px-2 py-1 border-b bg-gray-50 last:border-b-0">
      {children}
    </div>
  )

  return (
    <div className="border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
      {/* ROW 1: History + Headings + Text format */}
      <ToolbarRow>
        <ToolbarBtn onClick={() => exec('undo')} title="Undo">
          <Undo size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec('redo')} title="Redo">
          <Redo size={14} />
        </ToolbarBtn>
        <Divider />
        <select
          title="Font Family"
          onMouseDown={saveRange}
          onChange={(e) => {
            restoreRange()
            exec('fontName', e.target.value)
            e.target.value = ''
          }}
          className="text-xs border rounded px-1 py-1 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          <option value="">Font</option>
          {['Arial', 'Georgia', 'Verdana', 'Times New Roman', 'Courier New', 'Trebuchet MS', 'Impact'].map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <select
          title="Font Size"
          onMouseDown={saveRange}
          onChange={(e) => {
            restoreRange()
            exec('fontSize', e.target.value)
            e.target.value = ''
          }}
          className="text-xs border rounded px-1 py-1 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400 w-14"
        >
          <option value="">Size</option>
          {[
            ['1', '10px'],
            ['2', '13px'],
            ['3', '16px'],
            ['4', '18px'],
            ['5', '24px'],
            ['6', '32px'],
            ['7', '48px'],
          ].map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
        <Divider />
        <ToolbarBtn onClick={() => exec('formatBlock', 'h1')} title="Heading 1">
          <Heading1 size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec('formatBlock', 'h2')} title="Heading 2">
          <Heading2 size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec('formatBlock', 'p')} title="Paragraph">
          <span className="text-xs font-semibold px-0.5">P</span>
        </ToolbarBtn>
        <Divider />
        <ToolbarBtn onClick={() => exec('bold')} title="Bold">
          <Bold size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec('italic')} title="Italic">
          <Italic size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec('underline')} title="Underline">
          <Underline size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec('strikeThrough')} title="Strikethrough">
          <Strikethrough size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec('superscript')} title="Superscript">
          <span className="text-xs font-bold">
            x<sup>2</sup>
          </span>
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec('subscript')} title="Subscript">
          <span className="text-xs font-bold">
            x<sub>2</sub>
          </span>
        </ToolbarBtn>
        <Divider />
        <label
          title="Text Color"
          onMouseDown={saveRange}
          className="cursor-pointer p-1.5 rounded hover:bg-gray-200 flex items-center gap-0.5 text-xs text-gray-700"
        >
          <span className="font-bold text-sm">A</span>
          <input
            type="color"
            className="w-3.5 h-3.5 cursor-pointer border-none bg-transparent p-0"
            onMouseDown={saveRange}
            onChange={(e) => {
              restoreRange()
              exec('foreColor', e.target.value)
            }}
          />
        </label>
        <label
          title="Highlight Color"
          onMouseDown={saveRange}
          className="cursor-pointer p-1.5 rounded hover:bg-gray-200 flex items-center gap-0.5 text-xs text-gray-700"
        >
          <span className="font-bold text-sm underline decoration-yellow-400 decoration-2">H</span>
          <input
            type="color"
            className="w-3.5 h-3.5 cursor-pointer border-none bg-transparent p-0"
            onMouseDown={saveRange}
            onChange={(e) => {
              restoreRange()
              exec('hiliteColor', e.target.value)
            }}
          />
        </label>
        <ToolbarBtn onClick={() => exec('removeFormat')} title="Clear Formatting">
          <span className="text-xs font-bold line-through">Tx</span>
        </ToolbarBtn>
      </ToolbarRow>

      {/* ROW 2: Alignment + Lists + Indent + Insert */}
      <ToolbarRow>
        <ToolbarBtn onClick={() => exec('justifyLeft')} title="Align Left">
          <AlignLeft size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec('justifyCenter')} title="Align Center">
          <AlignCenter size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec('justifyRight')} title="Align Right">
          <AlignRight size={14} />
        </ToolbarBtn>
        <Divider />
        <ToolbarBtn onClick={() => exec('insertUnorderedList')} title="Bullet List">
          <List size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec('insertOrderedList')} title="Numbered List">
          <ListOrdered size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec('outdent')} title="Outdent">
          <span className="text-xs font-bold">⇤</span>
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec('indent')} title="Indent">
          <span className="text-xs font-bold">⇥</span>
        </ToolbarBtn>
        <Divider />
        <ToolbarBtn onClick={() => exec('formatBlock', 'blockquote')} title="Blockquote">
          <Quote size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec('formatBlock', 'pre')} title="Code Block">
          <Code size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={insertLink} title="Insert Link">
          <Link size={14} />
        </ToolbarBtn>
        <ToolbarBtn onClick={insertHR} title="Horizontal Rule">
          <span className="text-xs font-bold">─</span>
        </ToolbarBtn>
        <Divider />

        <label
          title="Insert Image"
          onMouseDown={saveRange}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer flex items-center gap-1 text-xs font-medium"
        >
          <ImageIcon size={14} />
          <span className="hidden sm:inline">Image</span>
          <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageInsert} />
        </label>

        <Divider />

        <label
          title="Upload Video"
          onMouseDown={saveRange}
          className="p-1.5 rounded hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer flex items-center gap-1 text-xs font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
          <span className="hidden sm:inline">Video</span>
          <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={handleVideoInsert} />
        </label>

        <div className="relative">
          <ToolbarBtn
            title="Embed YouTube"
            onClick={() => {
              saveRange()
              setShowYoutubeInput((v) => !v)
              setShowTablePicker(false)
            }}
          >
            <span className="flex items-center gap-1 text-xs font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.75 15.5V8.5l6.5 3.5-6.5 3.5z" />
              </svg>
              <span className="hidden sm:inline">YouTube</span>
            </span>
          </ToolbarBtn>
          {showYoutubeInput && (
            <div className="absolute top-8 left-0 z-50 bg-white border rounded-lg shadow-lg p-3 flex gap-2 w-80">
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="Paste YouTube URL..."
                className="flex-1 text-xs border rounded px-2 py-1.5 outline-none focus:ring-1 focus:ring-blue-400"
                onKeyDown={(e) => e.key === 'Enter' && insertYoutube()}
              />
              <button type="button" onClick={insertYoutube} className="text-xs bg-red-500 text-white px-2.5 py-1.5 rounded hover:bg-red-600">
                Embed
              </button>
              <button type="button" onClick={() => setShowYoutubeInput(false)} className="text-xs bg-gray-200 px-2 py-1.5 rounded hover:bg-gray-300">
                ✕
              </button>
            </div>
          )}
        </div>

        <Divider />

        <div className="relative">
          <ToolbarBtn
            title="Insert Table"
            onClick={() => {
              saveRange()
              setShowTablePicker((v) => !v)
              setShowYoutubeInput(false)
            }}
          >
            <span className="flex items-center gap-1 text-xs font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="3" y1="15" x2="21" y2="15" />
                <line x1="9" y1="3" x2="9" y2="21" />
                <line x1="15" y1="3" x2="15" y2="21" />
              </svg>
              <span className="hidden sm:inline">Table</span>
            </span>
          </ToolbarBtn>
          {showTablePicker && (
            <div className="absolute top-8 left-0 z-50 bg-white border rounded-lg shadow-lg p-3">
              <p className="text-xs text-gray-500 mb-2">
                {tableHover.r > 0 ? `${tableHover.r} × ${tableHover.c} table` : 'Hover to select size'}
              </p>
              <div className="grid gap-0.5" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
                {Array.from({ length: 36 }, (_, i) => {
                  const r = Math.floor(i / 6) + 1
                  const c = (i % 6) + 1
                  return (
                    <div
                      key={i}
                      onMouseEnter={() => setTableHover({ r, c })}
                      onMouseLeave={() => setTableHover({ r: 0, c: 0 })}
                      onClick={() => insertTable(r, c)}
                      className={`w-5 h-5 border rounded-sm cursor-pointer transition-colors ${
                        r <= tableHover.r && c <= tableHover.c ? 'bg-blue-400 border-blue-500' : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                      }`}
                    />
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </ToolbarRow>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleInput}
        onClick={() => {
          setShowYoutubeInput(false)
          setShowTablePicker(false)
        }}
        data-placeholder="Start writing your blog content..."
        className="min-h-[360px] p-4 outline-none text-gray-800 text-sm leading-relaxed"
      />

      <style>{`
        [contenteditable] h1 { font-size: 1.75rem; font-weight: 700; margin: 0.75rem 0; line-height: 1.2; }
        [contenteditable] h2 { font-size: 1.35rem; font-weight: 600; margin: 0.65rem 0; line-height: 1.3; }
        [contenteditable] blockquote { border-left: 3px solid #3b82f6; padding-left: 1rem; color: #6b7280; font-style: italic; margin: 0.75rem 0; }
        [contenteditable] pre { background: #f3f4f6; border-radius: 0.375rem; padding: 0.75rem 1rem; font-family: monospace; font-size: 0.875rem; overflow-x: auto; }
        [contenteditable] ul { list-style-type: disc; padding-left: 1.5rem; margin: 0.5rem 0; }
        [contenteditable] ol { list-style-type: decimal; padding-left: 1.5rem; margin: 0.5rem 0; }
        [contenteditable] a { color: #3b82f6; text-decoration: underline; }
        [contenteditable] img { max-width: 100%; height: auto; border-radius: 0.375rem; margin: 0.5rem 0; display: block; }
        [contenteditable] video { max-width: 100%; border-radius: 0.5rem; margin: 0.5rem 0; display: block; }
        [contenteditable] iframe { max-width: 100%; }
        [contenteditable] table { border-collapse: collapse; width: 100%; margin: 0.75rem 0; }
        [contenteditable] td, [contenteditable] th { border: 1px solid #d1d5db; padding: 8px 12px; }
        [contenteditable] th { background: #f3f4f6; font-weight: 600; }
        [contenteditable] hr { border: none; border-top: 2px solid #e5e7eb; margin: 1rem 0; }
        [contenteditable]:empty:before { content: attr(data-placeholder); color: #9ca3af; }
        .video-wrapper { margin: 8px 0; }
      `}</style>
    </div>
  )
}


function AdminDashboard() {
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [activeTab, setActiveTab] = useState<'blogs' | 'testimonials'>('blogs')
  const [blogs, setBlogs] = useState<any[]>([])
  const [testimonials, setTestimonials] = useState<any[]>([])
  
  // Blog states
  const [showBlogForm, setShowBlogForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState<any>(null)
  const [blogForm, setBlogForm] = useState({
    title: '',
    category: '',
    content: '',
    image: '',
    tags: '',
    author: '',
    status: 'Published'
  })
  const [blogContent, setBlogContent] = useState('')
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)

  // Testimonial states
  const [showTestimonialForm, setShowTestimonialForm] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null)
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    role: '',
    quote: '',
    rating: 5,
    avatarImage: ''
  })
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null)

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      navigate('/admin/login')
      return
    }
    loadBlogs()
    loadTestimonials()
  }, [navigate])

  // Close sidebar on window resize above md breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const loadBlogs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/blogs`)
      const data = await res.json()
      setBlogs(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error loading blogs:', error)
      setBlogs([])
    }
  }

  const loadTestimonials = async () => {
    try {
      const res = await fetch(`${API_URL}/api/testimonials`, { headers: getAuthHeaders() })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setTestimonials(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error loading testimonials:', error)
      setTestimonials([])
    }
  }

  // Blog CRUD (unchanged)
  const handleAddBlog = async () => {
    if (!blogForm.title || !blogContent || !blogForm.category) {
      alert('Please fill in all required fields')
      return
    }

    let imageBase64: string | null = null
    if (selectedImageFile) imageBase64 = await fileToBase64(selectedImageFile)

    const payload: any = {
      title: blogForm.title,
      category: blogForm.category,
      content: blogContent,
      tags: blogForm.tags,
      author: blogForm.author || localStorage.getItem('admin_email') || 'Admin',
      status: blogForm.status,
    }
    if (imageBase64) payload.image = imageBase64

    const url = editingBlog ? `${API_URL}/api/blogs/${editingBlog._id}` : `${API_URL}/api/blogs/create`
    await fetch(url, {
      method: editingBlog ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    await loadBlogs()
    resetBlogForm()
  }

  const handleEditBlog = (blog: any) => {
    setEditingBlog(blog)
    setBlogForm({
      title: blog.title,
      category: blog.category,
      content: blog.content,
      image: blog.image,
      tags: blog.tags?.join(', ') || '',
      author: blog.author,
      status: blog.status,
    })
    setBlogContent(blog.content)
    setShowBlogForm(true)
  }

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return
    await fetch(`${API_URL}/api/blogs/${id}`, { method: 'DELETE', headers: getAuthHeaders() })
    await loadBlogs()
  }

  const resetBlogForm = () => {
    setBlogForm({ title: '', category: '', content: '', image: '', tags: '', author: '', status: 'Published' })
    setBlogContent('')
    setEditingBlog(null)
    setShowBlogForm(false)
    setSelectedImageFile(null)
  }

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be under 2MB')
      return
    }
    setSelectedImageFile(file)
    setBlogForm((s) => ({ ...s, image: URL.createObjectURL(file) }))
  }

  // Testimonial CRUD (unchanged)
  const handleAddTestimonial = async () => {
    if (!testimonialForm.name || !testimonialForm.quote || !testimonialForm.role) {
      alert('Please fill in all required fields')
      return
    }

    let avatarBase64: string | null = null
    if (selectedAvatarFile) avatarBase64 = await fileToBase64(selectedAvatarFile)

    const payload: any = {
      name: testimonialForm.name,
      role: testimonialForm.role,
      quote: testimonialForm.quote,
      rating: Number(testimonialForm.rating),
    }
    if (avatarBase64) payload.avatarImage = avatarBase64

    const url = editingTestimonial ? `${API_URL}/api/testimonials/${editingTestimonial._id}` : `${API_URL}/api/testimonials`
    await fetch(url, {
      method: editingTestimonial ? 'PUT' : 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    })
    await loadTestimonials()
    resetTestimonialForm()
  }

  const handleEditTestimonial = (testimonial: any) => {
    setEditingTestimonial(testimonial)
    setTestimonialForm({
      name: testimonial.name,
      role: testimonial.role,
      quote: testimonial.quote,
      rating: testimonial.rating,
      avatarImage: testimonial.avatarImage || '',
    })
    setShowTestimonialForm(true)
  }

  const handleDeleteTestimonial = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return
    await fetch(`${API_URL}/api/testimonials/${id}`, { method: 'DELETE', headers: getAuthHeaders() })
    await loadTestimonials()
  }

  const resetTestimonialForm = () => {
    setTestimonialForm({ name: '', role: '', quote: '', rating: 5, avatarImage: '' })
    setEditingTestimonial(null)
    setShowTestimonialForm(false)
    setSelectedAvatarFile(null)
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be under 2MB')
      return
    }
    setSelectedAvatarFile(file)
    setTestimonialForm((s) => ({ ...s, avatarImage: URL.createObjectURL(file) }))
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/admin/login')
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-lg z-30">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <div className="bg-blue-600 px-4 py-2 rounded-lg">
              <h1 className="text-lg font-bold text-white">Admin</h1>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed on all screens, slides in/out on mobile, always visible on desktop */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-4 bg-blue-600 md:justify-center">
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-white hover:text-gray-200 md:hidden"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Logged in as:</p>
              <p className="font-semibold text-gray-800 break-words">
                {localStorage.getItem('admin_email') || 'Admin'}
              </p>
            </div>
            
            <nav className="space-y-2">
              <button
                onClick={() => {
                  setActiveTab('blogs')
                  setIsSidebarOpen(false)
                }}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  activeTab === 'blogs'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FileText className="w-5 h-5 mr-3" />
                Blogs
              </button>
              
              <button
                onClick={() => {
                  setActiveTab('testimonials')
                  setIsSidebarOpen(false)
                }}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  activeTab === 'testimonials'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Star className="w-5 h-5 mr-3" />
                Testimonials
              </button>
            </nav>
          </div>
          
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - with left margin on desktop to sit beside the fixed sidebar */}
      <div className="md:ml-72 pt-16 md:pt-0">
        <div className="p-4 md:p-8">
          {/* Blogs Tab */}
          {activeTab === 'blogs' && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Manage Blogs</h2>
                <button
                  onClick={() => setShowBlogForm(!showBlogForm)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center w-full sm:w-auto justify-center"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Add New Blog
                </button>
              </div>

              {/* Blog Form */}
              {showBlogForm && (
                <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {editingBlog ? 'Edit Blog' : 'Create New Blog'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Blog Title *</label>
                      <input
                        type="text"
                        placeholder="Enter blog title"
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                      <input
                        type="text"
                        placeholder="Enter category"
                        value={blogForm.category}
                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                      <input
                        type="text"
                        placeholder="react, javascript, webdev"
                        value={blogForm.tags}
                        onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
                      <input
                        type="text"
                        placeholder="Author name"
                        value={blogForm.author}
                        onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                      <input type="file" onChange={handleThumbnailUpload} accept="image/*" className="w-full" />
                      {blogForm.image && <img src={blogForm.image} className="w-32 h-32 object-cover rounded-lg mt-2" alt="preview" />}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Blog Content *</label>
                      <RichTextEditor value={blogContent} onChange={setBlogContent} />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                      <button
                        onClick={handleAddBlog}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        {editingBlog ? 'Update Blog' : 'Save Blog'}
                      </button>
                      <button
                        onClick={resetBlogForm}
                        className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Blogs List */}
              <div className="grid gap-6">
                {blogs.map((blog) => (
                  <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div className="flex-1 w-full">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
                          <p className="text-sm text-gray-500 mb-2">
                            By {blog.author} | {new Date(blog.createdAt).toLocaleDateString()} | {blog.category}
                          </p>
                          <div className="text-gray-600 mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: blog.content?.substring(0, 150) + '...' }} />
                        </div>
                        <div className="flex space-x-2 w-full md:w-auto">
                          <button
                            onClick={() => handleEditBlog(blog)}
                            className="flex-1 md:flex-none px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blog._id)}
                            className="flex-1 md:flex-none px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {blogs.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg">
                    <p className="text-gray-500">No blogs yet. Click "Add New Blog" to create one.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Manage Testimonials</h2>
                <button
                  onClick={() => setShowTestimonialForm(!showTestimonialForm)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center w-full sm:w-auto justify-center"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Add New Testimonial
                </button>
              </div>

              {/* Testimonial Form */}
              {showTestimonialForm && (
                <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {editingTestimonial ? 'Edit Testimonial' : 'Create New Testimonial'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Client Name *</label>
                      <input
                        type="text"
                        placeholder="Enter client name"
                        value={testimonialForm.name}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Position/Company *</label>
                      <input
                        type="text"
                        placeholder="CEO, Company Name"
                        value={testimonialForm.role}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Testimonial Content *</label>
                      <textarea
                        placeholder="What they say about your service..."
                        rows={3}
                        value={testimonialForm.quote}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setTestimonialForm({ ...testimonialForm, rating: star })}
                            className="focus:outline-none"
                          >
                            <svg className={`w-8 h-8 ${star <= testimonialForm.rating ? 'text-yellow-400' : 'text-gray-300'} hover:scale-110 transition-transform duration-200`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Avatar Image</label>
                      <input type="file" onChange={handleAvatarUpload} accept="image/*" className="w-full" />
                      {testimonialForm.avatarImage && (
                        <img src={testimonialForm.avatarImage} className="w-16 h-16 rounded-full object-cover mt-2" alt="avatar preview" />
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                      <button
                        onClick={handleAddTestimonial}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        {editingTestimonial ? 'Update Testimonial' : 'Save Testimonial'}
                      </button>
                      <button
                        onClick={resetTestimonialForm}
                        className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Testimonials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((testimonial) => (
                  <div key={testimonial._id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                      {testimonial.avatarImage ? (
                        <img src={testimonial.avatarImage} className="w-16 h-16 rounded-full object-cover" alt={testimonial.name} />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                          {testimonial.name?.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1 w-full">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div>
                            <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                          </div>
                          <div className="flex space-x-2 w-full sm:w-auto">
                            <button
                              onClick={() => handleEditTestimonial(testimonial)}
                              className="flex-1 sm:flex-none px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTestimonial(testimonial._id)}
                              className="flex-1 sm:flex-none px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="flex mt-2 mb-2">{renderStars(testimonial.rating)}</div>
                        <p className="text-gray-600 mt-2 italic text-sm">"{testimonial.quote}"</p>
                      </div>
                    </div>
                  </div>
                ))}
                {testimonials.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg col-span-1 md:col-span-2">
                    <p className="text-gray-500">No testimonials yet. Click "Add New Testimonial" to create one.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard