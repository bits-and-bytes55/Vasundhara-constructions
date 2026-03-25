import { useEffect, useState, type ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchHomeContent, updateHomeContent } from '../api/content'
import { uploadProjectImage } from '../api/media'
import '../admin-panel.css'
import { defaultHomeContent } from '../data/defaultHomeContent'
import type { AdminUser } from '../types/auth'
import type { HomeContent, HomeContentNewsItem, HomeContentProject } from '../types/homeContent'
import { clearAdminSession, getAdminToken, getStoredAdminUser } from '../utils/adminAuthStorage'

type AdminPanelView = 'cms' | 'project-add' | 'project-list' | 'news-add' | 'news-list'
type EditorTextField = Exclude<keyof EditorState, 'projectsItems' | 'newsItems'>

type EditorState = {
  heroEyebrow: string
  heroTitleLineOne: string
  heroTitleLineTwo: string
  heroTypedWords: string
  heroSubtitle: string
  heroPrimaryCtaLabel: string
  heroSecondaryCtaLabel: string
  heroPills: string
  heroStats: string
  servicesEyebrow: string
  servicesTitleStart: string
  servicesTitleHighlight: string
  servicesCards: string
  processEyebrow: string
  processTitleStart: string
  processTitleHighlight: string
  processSubtitle: string
  processSteps: string
  ceoEyebrow: string
  ceoTitleStart: string
  ceoTitleHighlight: string
  ceoName: string
  ceoRole: string
  ceoIntro: string
  ceoMessage: string
  ceoButtonLabel: string
  ctaTitle: string
  ctaSubtitle: string
  ctaButtonLabel: string
  ctaPerks: string
  projectsEyebrow: string
  projectsTitleStart: string
  projectsTitleHighlight: string
  projectsSubtitle: string
  projectsItems: HomeContentProject[]
  newsEyebrow: string
  newsTitleStart: string
  newsTitleHighlight: string
  newsSubtitle: string
  newsItems: HomeContentNewsItem[]
}

type FieldConfig = {
  key: EditorTextField
  label: string
  inputType?: 'input' | 'textarea'
  rows?: number
  full?: boolean
}

type SectionConfig = {
  id: string
  title: string
  description: string
  chip: string
  fields: FieldConfig[]
}

const editorSections: SectionConfig[] = [
  {
    id: 'hero-section',
    title: 'Hero Section',
    description: 'Typing headline, CTA labels, pills, aur stats yahin se control honge.',
    chip: '9 fields',
    fields: [
      { key: 'heroEyebrow', label: 'Eyebrow' },
      { key: 'heroTitleLineOne', label: 'Title Line One' },
      { key: 'heroTitleLineTwo', label: 'Title Line Two' },
      { key: 'heroTypedWords', label: 'Typed Words', inputType: 'textarea', rows: 5, full: true },
      { key: 'heroSubtitle', label: 'Subtitle', inputType: 'textarea', rows: 3, full: true },
      { key: 'heroPrimaryCtaLabel', label: 'Primary CTA' },
      { key: 'heroSecondaryCtaLabel', label: 'Secondary CTA' },
      { key: 'heroPills', label: 'Hero Pills', inputType: 'textarea', rows: 5, full: true },
      { key: 'heroStats', label: 'Hero Stats', inputType: 'textarea', rows: 5, full: true },
    ],
  },
  {
    id: 'services-section',
    title: 'Services Section',
    description: 'Service cards ko `Title | Description` format me line by line update karo.',
    chip: '4 fields',
    fields: [
      { key: 'servicesEyebrow', label: 'Eyebrow' },
      { key: 'servicesTitleStart', label: 'Title Start' },
      { key: 'servicesTitleHighlight', label: 'Highlighted Word' },
      { key: 'servicesCards', label: 'Service Cards', inputType: 'textarea', rows: 8, full: true },
    ],
  },
  {
    id: 'process-section',
    title: 'Process Section',
    description: 'Homepage process block ke title, subtitle, aur all steps ko manage karo.',
    chip: '5 fields',
    fields: [
      { key: 'processEyebrow', label: 'Eyebrow' },
      { key: 'processTitleStart', label: 'Title Start' },
      { key: 'processTitleHighlight', label: 'Highlighted Word' },
      { key: 'processSubtitle', label: 'Subtitle', inputType: 'textarea', rows: 3, full: true },
      { key: 'processSteps', label: 'Process Steps', inputType: 'textarea', rows: 10, full: true },
    ],
  },
  {
    id: 'ceo-section',
    title: 'CEO Section',
    description: 'Founder note aur CTA label editable hain. Image abhi static hi rahegi.',
    chip: '8 fields',
    fields: [
      { key: 'ceoEyebrow', label: 'Eyebrow' },
      { key: 'ceoTitleStart', label: 'Title Start' },
      { key: 'ceoTitleHighlight', label: 'Highlighted Word' },
      { key: 'ceoName', label: 'Name' },
      { key: 'ceoRole', label: 'Role' },
      { key: 'ceoButtonLabel', label: 'Button Label' },
      { key: 'ceoIntro', label: 'Intro', inputType: 'textarea', rows: 4, full: true },
      { key: 'ceoMessage', label: 'Quote / Message', inputType: 'textarea', rows: 4, full: true },
    ],
  },
  {
    id: 'cta-section',
    title: 'Bottom CTA Section',
    description: 'Footer CTA band ke title, subtitle, button aur perk list ko yahan se update karo.',
    chip: '4 fields',
    fields: [
      { key: 'ctaTitle', label: 'CTA Title', full: true },
      { key: 'ctaSubtitle', label: 'CTA Subtitle', inputType: 'textarea', rows: 3, full: true },
      { key: 'ctaButtonLabel', label: 'CTA Button Label' },
      { key: 'ctaPerks', label: 'CTA Perks', inputType: 'textarea', rows: 5, full: true },
    ],
  },
]

const listToLines = (items: string[]) => items.join('\n')

const statsToLines = (items: HomeContent['hero']['stats']) =>
  items.map((item) => `${item.value} | ${item.label}`).join('\n')

const cardsToLines = (items: Array<{ title: string; description: string }>) =>
  items.map((item) => `${item.title} | ${item.description}`).join('\n')

const parseLines = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

const parseStatsLines = (value: string) =>
  parseLines(value)
    .map((line) => {
      const [statValue, ...labelParts] = line.split('|')

      return {
        value: statValue?.trim() ?? '',
        label: labelParts.join('|').trim(),
      }
    })
    .filter((item) => item.value && item.label)

const parseCardLines = (value: string) =>
  parseLines(value)
    .map((line) => {
      const [title, ...descriptionParts] = line.split('|')

      return {
        title: title?.trim() ?? '',
        description: descriptionParts.join('|').trim(),
      }
    })
    .filter((item) => item.title && item.description)

const createEmptyProject = (): HomeContentProject => ({
  title: '',
  location: '',
  area: '',
  tag: '',
  description: '',
  images: ['', '', ''],
})

const createEmptyNewsItem = (): HomeContentNewsItem => ({
  title: '',
  category: '',
  publishedOn: '',
  source: '',
  excerpt: '',
  image: '',
})

const withImageSlots = (project: HomeContentProject): HomeContentProject => ({
  ...project,
  images: [project.images[0] ?? '', project.images[1] ?? '', project.images[2] ?? ''],
})

const sanitizeProject = (project: HomeContentProject): HomeContentProject => {
  const images = project.images.map((image) => image.trim()).filter(Boolean)

  return {
    title: project.title.trim(),
    location: project.location.trim(),
    area: project.area.trim(),
    tag: project.tag.trim(),
    description: project.description.trim(),
    images: images.length > 0 ? images : ['/images/luxury-villa.jpg'],
  }
}

const sanitizeNewsItem = (item: HomeContentNewsItem): HomeContentNewsItem => ({
  title: item.title.trim(),
  category: item.category.trim(),
  publishedOn: item.publishedOn.trim(),
  source: item.source.trim(),
  excerpt: item.excerpt.trim(),
  image: item.image.trim() || '/images/luxury-villa.jpg',
})

const createEditorState = (content: HomeContent): EditorState => ({
  heroEyebrow: content.hero.eyebrow,
  heroTitleLineOne: content.hero.titleLineOne,
  heroTitleLineTwo: content.hero.titleLineTwo,
  heroTypedWords: listToLines(content.hero.typedWords),
  heroSubtitle: content.hero.subtitle,
  heroPrimaryCtaLabel: content.hero.primaryCtaLabel,
  heroSecondaryCtaLabel: content.hero.secondaryCtaLabel,
  heroPills: listToLines(content.hero.pills),
  heroStats: statsToLines(content.hero.stats),
  servicesEyebrow: content.services.eyebrow,
  servicesTitleStart: content.services.titleStart,
  servicesTitleHighlight: content.services.titleHighlight,
  servicesCards: cardsToLines(content.services.cards),
  processEyebrow: content.process.eyebrow,
  processTitleStart: content.process.titleStart,
  processTitleHighlight: content.process.titleHighlight,
  processSubtitle: content.process.subtitle,
  processSteps: cardsToLines(content.process.steps),
  ceoEyebrow: content.ceo.eyebrow,
  ceoTitleStart: content.ceo.titleStart,
  ceoTitleHighlight: content.ceo.titleHighlight,
  ceoName: content.ceo.name,
  ceoRole: content.ceo.role,
  ceoIntro: content.ceo.intro,
  ceoMessage: content.ceo.message,
  ceoButtonLabel: content.ceo.buttonLabel,
  ctaTitle: content.cta.title,
  ctaSubtitle: content.cta.subtitle,
  ctaButtonLabel: content.cta.buttonLabel,
  ctaPerks: listToLines(content.cta.perks),
  projectsEyebrow: content.projects.eyebrow,
  projectsTitleStart: content.projects.titleStart,
  projectsTitleHighlight: content.projects.titleHighlight,
  projectsSubtitle: content.projects.subtitle,
  projectsItems: content.projects.items.map(withImageSlots),
  newsEyebrow: content.newsMedia.eyebrow,
  newsTitleStart: content.newsMedia.titleStart,
  newsTitleHighlight: content.newsMedia.titleHighlight,
  newsSubtitle: content.newsMedia.subtitle,
  newsItems: content.newsMedia.items.map((item) => ({ ...item })),
})

const toHomeContent = (editor: EditorState): HomeContent => ({
  hero: {
    eyebrow: editor.heroEyebrow.trim(),
    titleLineOne: editor.heroTitleLineOne.trim(),
    titleLineTwo: editor.heroTitleLineTwo.trim(),
    typedWords: parseLines(editor.heroTypedWords),
    subtitle: editor.heroSubtitle.trim(),
    primaryCtaLabel: editor.heroPrimaryCtaLabel.trim(),
    secondaryCtaLabel: editor.heroSecondaryCtaLabel.trim(),
    pills: parseLines(editor.heroPills),
    stats: parseStatsLines(editor.heroStats),
  },
  services: {
    eyebrow: editor.servicesEyebrow.trim(),
    titleStart: editor.servicesTitleStart.trim(),
    titleHighlight: editor.servicesTitleHighlight.trim(),
    cards: parseCardLines(editor.servicesCards),
  },
  process: {
    eyebrow: editor.processEyebrow.trim(),
    titleStart: editor.processTitleStart.trim(),
    titleHighlight: editor.processTitleHighlight.trim(),
    subtitle: editor.processSubtitle.trim(),
    steps: parseCardLines(editor.processSteps),
  },
  ceo: {
    eyebrow: editor.ceoEyebrow.trim(),
    titleStart: editor.ceoTitleStart.trim(),
    titleHighlight: editor.ceoTitleHighlight.trim(),
    name: editor.ceoName.trim(),
    role: editor.ceoRole.trim(),
    intro: editor.ceoIntro.trim(),
    message: editor.ceoMessage.trim(),
    buttonLabel: editor.ceoButtonLabel.trim(),
  },
  cta: {
    title: editor.ctaTitle.trim(),
    subtitle: editor.ctaSubtitle.trim(),
    buttonLabel: editor.ctaButtonLabel.trim(),
    perks: parseLines(editor.ctaPerks),
  },
  projects: {
    eyebrow: editor.projectsEyebrow.trim(),
    titleStart: editor.projectsTitleStart.trim(),
    titleHighlight: editor.projectsTitleHighlight.trim(),
    subtitle: editor.projectsSubtitle.trim(),
    items: editor.projectsItems
      .map(sanitizeProject)
      .filter((project) => project.title && project.location && project.area && project.tag && project.description),
  },
  newsMedia: {
    eyebrow: editor.newsEyebrow.trim(),
    titleStart: editor.newsTitleStart.trim(),
    titleHighlight: editor.newsTitleHighlight.trim(),
    subtitle: editor.newsSubtitle.trim(),
    items: editor.newsItems
      .map(sanitizeNewsItem)
      .filter((item) => item.title && item.category && item.publishedOn && item.source && item.excerpt),
  },
})

function AdminPage() {
  const navigate = useNavigate()
  const [activePanel, setActivePanel] = useState<AdminPanelView>('cms')
  const [projectMenuOpen, setProjectMenuOpen] = useState(true)
  const [newsMenuOpen, setNewsMenuOpen] = useState(false)
  const [editor, setEditor] = useState<EditorState>(() => createEditorState(defaultHomeContent))
  const [newProject, setNewProject] = useState<HomeContentProject>(() => createEmptyProject())
  const [newNewsItem, setNewNewsItem] = useState<HomeContentNewsItem>(() => createEmptyNewsItem())
  const [adminUser] = useState<AdminUser | null>(() => getStoredAdminUser())
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState('Loading current CMS, project, and newsroom content...')
  const [error, setError] = useState('')
  const [uploadingTarget, setUploadingTarget] = useState<string | null>(null)

  const loadContent = async () => {
    setLoading(true)
    setError('')

    try {
      const content = await fetchHomeContent()
      setEditor(createEditorState(content))
      setNewProject(createEmptyProject())
      setNewNewsItem(createEmptyNewsItem())
      setStatus('Homepage, project, and newsroom content loaded from API.')
    } catch {
      setEditor(createEditorState(defaultHomeContent))
      setNewProject(createEmptyProject())
      setNewNewsItem(createEmptyNewsItem())
      setStatus('API unavailable, fallback content loaded locally.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadContent()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setError('')

    try {
      const token = getAdminToken()

      if (!token) {
        throw new Error('Your admin session has expired. Please login again.')
      }

      const nextContent = toHomeContent(editor)
      await updateHomeContent({
        token,
        content: nextContent,
      })
      setStatus('Homepage, project, and newsroom content saved successfully.')
    } catch (saveError) {
      const message = saveError instanceof Error ? saveError.message : 'Failed to save content.'
      setError(message)

      if (message.toLowerCase().includes('auth') || message.toLowerCase().includes('token')) {
        clearAdminSession()
        navigate('/admin/login', { replace: true })
      }
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    clearAdminSession()
    navigate('/admin/login', { replace: true })
  }

  const updateField = (field: EditorTextField, value: string) => {
    setEditor((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const updateExistingProjectField = (
    projectIndex: number,
    field: keyof Omit<HomeContentProject, 'images'>,
    value: string,
  ) => {
    setEditor((current) => ({
      ...current,
      projectsItems: current.projectsItems.map((project, index) =>
        index === projectIndex
          ? {
              ...project,
              [field]: value,
            }
          : project,
      ),
    }))
  }

  const updateExistingProjectImage = (projectIndex: number, imageIndex: number, value: string) => {
    setEditor((current) => ({
      ...current,
      projectsItems: current.projectsItems.map((project, index) =>
        index === projectIndex
          ? {
              ...project,
              images: project.images.map((image, currentImageIndex) =>
                currentImageIndex === imageIndex ? value : image,
              ),
            }
          : project,
      ),
    }))
  }

  const updateNewProjectField = (field: keyof Omit<HomeContentProject, 'images'>, value: string) => {
    setNewProject((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const updateNewProjectImage = (imageIndex: number, value: string) => {
    setNewProject((current) => ({
      ...current,
      images: current.images.map((image, currentImageIndex) => (currentImageIndex === imageIndex ? value : image)),
    }))
  }

  const updateExistingNewsField = (newsIndex: number, field: keyof Omit<HomeContentNewsItem, 'image'>, value: string) => {
    setEditor((current) => ({
      ...current,
      newsItems: current.newsItems.map((item, index) =>
        index === newsIndex
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    }))
  }

  const updateExistingNewsImage = (newsIndex: number, value: string) => {
    setEditor((current) => ({
      ...current,
      newsItems: current.newsItems.map((item, index) =>
        index === newsIndex
          ? {
              ...item,
              image: value,
            }
          : item,
      ),
    }))
  }

  const updateNewNewsField = (field: keyof Omit<HomeContentNewsItem, 'image'>, value: string) => {
    setNewNewsItem((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const updateNewNewsImage = (value: string) => {
    setNewNewsItem((current) => ({
      ...current,
      image: value,
    }))
  }

  const uploadImage = async (
    file: File,
    targetKey: string,
    onUploaded: (url: string) => void,
  ) => {
    setError('')
    setUploadingTarget(targetKey)

    try {
      const token = getAdminToken()

      if (!token) {
        throw new Error('Your admin session has expired. Please login again.')
      }

      const uploadedUrl = await uploadProjectImage(token, file)
      onUploaded(uploadedUrl)
      setStatus('Image uploaded. Save changes to publish it.')
    } catch (uploadError) {
      const message = uploadError instanceof Error ? uploadError.message : 'Unable to upload image.'
      setError(message)
    } finally {
      setUploadingTarget(null)
    }
  }

  const handleNewProjectUpload = async (imageIndex: number, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    await uploadImage(file, `new-${imageIndex}`, (url) => {
      updateNewProjectImage(imageIndex, url)
    })

    event.target.value = ''
  }

  const handleExistingProjectUpload = async (
    projectIndex: number,
    imageIndex: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    await uploadImage(file, `existing-${projectIndex}-${imageIndex}`, (url) => {
      updateExistingProjectImage(projectIndex, imageIndex, url)
    })

    event.target.value = ''
  }

  const handleNewNewsUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    await uploadImage(file, 'news-new', (url) => {
      updateNewNewsImage(url)
    })

    event.target.value = ''
  }

  const handleExistingNewsUpload = async (newsIndex: number, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    await uploadImage(file, `news-existing-${newsIndex}`, (url) => {
      updateExistingNewsImage(newsIndex, url)
    })

    event.target.value = ''
  }

  const addProjectToDraft = () => {
    const candidate = sanitizeProject(newProject)

    if (!candidate.title || !candidate.location || !candidate.area || !candidate.tag || !candidate.description) {
      setError('Please complete all project details before adding the project.')
      return
    }

    setEditor((current) => ({
      ...current,
      projectsItems: [withImageSlots(candidate), ...current.projectsItems],
    }))
    setNewProject(createEmptyProject())
    setError('')
    setStatus('Project added to the draft list. Click Save Changes to publish it.')
    setActivePanel('project-list')
  }

  const removeProject = (projectIndex: number) => {
    setEditor((current) => ({
      ...current,
      projectsItems: current.projectsItems.filter((_, index) => index !== projectIndex),
    }))
    setStatus('Project removed from the draft list. Save changes to sync the site.')
  }

  const addNewsToDraft = () => {
    const candidate = sanitizeNewsItem(newNewsItem)

    if (!candidate.title || !candidate.category || !candidate.publishedOn || !candidate.source || !candidate.excerpt) {
      setError('Please complete all news details before adding the story.')
      return
    }

    setEditor((current) => ({
      ...current,
      newsItems: [candidate, ...current.newsItems],
    }))
    setNewNewsItem(createEmptyNewsItem())
    setError('')
    setStatus('News story added to the draft list. Click Save Changes to publish it.')
    setActivePanel('news-list')
  }

  const removeNewsItem = (newsIndex: number) => {
    setEditor((current) => ({
      ...current,
      newsItems: current.newsItems.filter((_, index) => index !== newsIndex),
    }))
    setStatus('News story removed from the draft list. Save changes to sync the site.')
  }

  const quickStats = [
    { label: 'CMS Sections', value: String(editorSections.length) },
    { label: 'Live Projects', value: String(editor.projectsItems.length) },
    { label: 'News Stories', value: String(editor.newsItems.length) },
    { label: 'Typed Words', value: String(parseLines(editor.heroTypedWords).length) },
    { label: 'Process Steps', value: String(parseCardLines(editor.processSteps).length) },
  ]

  const bannerClass = error ? 'admin-banner admin-banner--danger' : 'admin-banner admin-banner--success'
  const bannerTitle = error
    ? 'Save failed'
    : saving
      ? 'Saving your changes'
      : loading
        ? 'Refreshing content'
        : 'Editor is ready'
  const bannerMessage = error || status

  return (
    <div className="admin-shell admin-shell--dashboard">
      <div className="admin-dashboard">
        <aside className="admin-sidebar">
          <button
            className={`admin-sidebar__single-button ${activePanel === 'cms' ? 'is-active' : ''}`.trim()}
            onClick={() => setActivePanel('cms')}
            type="button"
          >
            CMS Management
          </button>

          <div className="admin-sidebar__group">
            <button
              className={`admin-sidebar__single-button ${['project-add', 'project-list'].includes(activePanel) ? 'is-active' : ''}`.trim()}
              onClick={() => setProjectMenuOpen((current) => !current)}
              type="button"
            >
              Project Management
            </button>

            {projectMenuOpen ? (
              <div className="admin-sidebar__submenu">
                <button
                  className={`admin-sidebar__subbutton ${activePanel === 'project-add' ? 'is-active' : ''}`.trim()}
                  onClick={() => setActivePanel('project-add')}
                  type="button"
                >
                  Add Project
                </button>
                <button
                  className={`admin-sidebar__subbutton ${activePanel === 'project-list' ? 'is-active' : ''}`.trim()}
                  onClick={() => setActivePanel('project-list')}
                  type="button"
                >
                  All Projects
                </button>
              </div>
            ) : null}
          </div>

          <div className="admin-sidebar__group">
            <button
              className={`admin-sidebar__single-button ${['news-add', 'news-list'].includes(activePanel) ? 'is-active' : ''}`.trim()}
              onClick={() => setNewsMenuOpen((current) => !current)}
              type="button"
            >
              News & Media Management
            </button>

            {newsMenuOpen ? (
              <div className="admin-sidebar__submenu">
                <button
                  className={`admin-sidebar__subbutton ${activePanel === 'news-add' ? 'is-active' : ''}`.trim()}
                  onClick={() => setActivePanel('news-add')}
                  type="button"
                >
                  Add News
                </button>
                <button
                  className={`admin-sidebar__subbutton ${activePanel === 'news-list' ? 'is-active' : ''}`.trim()}
                  onClick={() => setActivePanel('news-list')}
                  type="button"
                >
                  All News
                </button>
              </div>
            ) : null}
          </div>
        </aside>

        <main className="admin-main">
          <header className="admin-header">
            <div className="admin-header__identity">
              <span>Admin</span>
              <strong>{adminUser?.name || 'Authenticated Admin'}</strong>
            </div>

            <div className="admin-header__actions">
              <Link className="admin-button admin-button--ghost" rel="noreferrer" target="_blank" to="/">
                View Live Site
              </Link>
              <button
                className="admin-button admin-button--ghost"
                disabled={loading || saving}
                onClick={() => void loadContent()}
                type="button"
              >
                {loading ? 'Loading...' : 'Reload'}
              </button>
              <button className="admin-button" disabled={saving || loading} onClick={() => void handleSave()} type="button">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button className="admin-button admin-button--ghost" onClick={handleLogout} type="button">
                Logout
              </button>
            </div>
          </header>

          <section className="admin-overview">
            {quickStats.map((item) => (
              <article className="admin-overview-card" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </section>

          <section className={bannerClass}>
            <strong>{bannerTitle}</strong>
            <p>{bannerMessage}</p>
          </section>

          {activePanel === 'cms' ? (
            <div className="admin-section-stack" id="cms-management">
              {editorSections.map((section) => (
                <section className="admin-card admin-card--editor" id={section.id} key={section.id}>
                  <div className="admin-card__head admin-card__head--row">
                    <div>
                      <h2>{section.title}</h2>
                      <p>{section.description}</p>
                    </div>
                    <span className="admin-chip">{section.chip}</span>
                  </div>

                  <div className="admin-form-grid">
                    {section.fields.map((field) => {
                      const isTextarea = field.inputType === 'textarea'

                      return (
                        <label
                          className={`admin-field ${field.full ? 'admin-field--full' : ''}`.trim()}
                          key={field.key}
                        >
                          <span>{field.label}</span>
                          {isTextarea ? (
                            <textarea
                              className="admin-input admin-textarea"
                              onChange={(event) => updateField(field.key, event.target.value)}
                              rows={field.rows ?? 4}
                              value={editor[field.key]}
                            />
                          ) : (
                            <input
                              className="admin-input"
                              onChange={(event) => updateField(field.key, event.target.value)}
                              value={editor[field.key]}
                            />
                          )}
                        </label>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>
          ) : null}

          {activePanel === 'project-add' ? (
            <div className="admin-section-stack" id="project-add">
              <section className="admin-card admin-card--editor">
                <div className="admin-card__head admin-card__head--row">
                  <div>
                    <h2>Project Section Settings</h2>
                    <p>Home page aur Projects page ke project heading content ko yahan se control karo.</p>
                  </div>
                  <span className="admin-chip">Project Meta</span>
                </div>

                <div className="admin-form-grid">
                  <label className="admin-field">
                    <span>Eyebrow</span>
                    <input className="admin-input" onChange={(event) => updateField('projectsEyebrow', event.target.value)} value={editor.projectsEyebrow} />
                  </label>
                  <label className="admin-field">
                    <span>Title Start</span>
                    <input className="admin-input" onChange={(event) => updateField('projectsTitleStart', event.target.value)} value={editor.projectsTitleStart} />
                  </label>
                  <label className="admin-field">
                    <span>Highlighted Word</span>
                    <input className="admin-input" onChange={(event) => updateField('projectsTitleHighlight', event.target.value)} value={editor.projectsTitleHighlight} />
                  </label>
                  <label className="admin-field admin-field--full">
                    <span>Subtitle</span>
                    <textarea className="admin-input admin-textarea" onChange={(event) => updateField('projectsSubtitle', event.target.value)} rows={3} value={editor.projectsSubtitle} />
                  </label>
                </div>
              </section>

              <section className="admin-card admin-card--editor">
                <div className="admin-card__head admin-card__head--row">
                  <div>
                    <h2>Add New Project</h2>
                    <p>Jo project yahan add karoge, save ke baad Home page aur Projects page dono par same card style me dikhega.</p>
                  </div>
                  <button className="admin-button admin-button--small" onClick={addProjectToDraft} type="button">
                    Add Project
                  </button>
                </div>

                <div className="admin-project-layout">
                  <div className="admin-project-editor">
                    <div className="admin-project-grid">
                      <label className="admin-field">
                        <span>Project Title</span>
                        <input className="admin-input" onChange={(event) => updateNewProjectField('title', event.target.value)} value={newProject.title} />
                      </label>
                      <label className="admin-field">
                        <span>Location</span>
                        <input className="admin-input" onChange={(event) => updateNewProjectField('location', event.target.value)} value={newProject.location} />
                      </label>
                      <label className="admin-field">
                        <span>Area</span>
                        <input className="admin-input" onChange={(event) => updateNewProjectField('area', event.target.value)} value={newProject.area} />
                      </label>
                      <label className="admin-field">
                        <span>Tag</span>
                        <input className="admin-input" onChange={(event) => updateNewProjectField('tag', event.target.value)} value={newProject.tag} />
                      </label>
                      <label className="admin-field admin-field--full">
                        <span>Description</span>
                        <textarea className="admin-input admin-textarea" onChange={(event) => updateNewProjectField('description', event.target.value)} rows={4} value={newProject.description} />
                      </label>
                    </div>

                    <div className="admin-image-grid">
                      {newProject.images.map((image, imageIndex) => (
                        <div className="admin-image-card" key={`new-image-${imageIndex}`}>
                          <div
                            className="admin-image-card__preview"
                            style={{
                              backgroundImage: image
                                ? `linear-gradient(180deg, rgba(21, 17, 14, 0.08), rgba(21, 17, 14, 0.58)), url('${image}')`
                                : undefined,
                            }}
                          >
                            {!image ? <span>No image selected</span> : null}
                          </div>
                          <div className="admin-image-card__controls">
                            <label className="admin-field">
                              <span>Image URL {imageIndex + 1}</span>
                              <input
                                className="admin-input"
                                onChange={(event) => updateNewProjectImage(imageIndex, event.target.value)}
                                value={image}
                              />
                            </label>
                            <label className="admin-upload-button">
                              {uploadingTarget === `new-${imageIndex}` ? 'Uploading...' : `Upload Image ${imageIndex + 1}`}
                              <input accept="image/*" onChange={(event) => void handleNewProjectUpload(imageIndex, event)} type="file" />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="admin-project-preview">
                    <div
                      className="admin-project-preview__media"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(23, 18, 14, 0.08), rgba(23, 18, 14, 0.72)), url('${newProject.images[0] || '/images/luxury-villa.jpg'}')`,
                      }}
                    >
                      <div className="admin-project-preview__tag">{newProject.tag || 'Project Tag'}</div>
                      <div className="admin-project-preview__copy">
                        <h3>{newProject.title || 'Project Title'}</h3>
                        <p>{newProject.area || 'Area'} | {newProject.location || 'Location'}</p>
                        <p>{newProject.description || 'Project description preview will appear here.'}</p>
                      </div>
                    </div>
                    <p className="admin-project-preview__note">
                      Ye preview admin ke andar hai. Final card Home page aur Projects page ke current visual language ke saath render hoga.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          ) : null}

          {activePanel === 'project-list' ? (
            <section className="admin-card admin-card--editor" id="project-list">
              <div className="admin-card__head admin-card__head--row">
                <div>
                  <h2>All Projects</h2>
                  <p>Yahin se saare saved draft projects dekho, details edit karo, image upload karo, ya delete karo.</p>
                </div>
                <div className="admin-card__tools">
                  <span className="admin-chip">{editor.projectsItems.length} items</span>
                  <button className="admin-button admin-button--ghost admin-button--small" onClick={() => setActivePanel('project-add')} type="button">
                    Add Another
                  </button>
                </div>
              </div>

              {editor.projectsItems.length === 0 ? (
                <div className="admin-projects-empty">
                  <p>Abhi koi project available nahi hai.</p>
                  <button className="admin-button admin-button--ghost admin-button--small" onClick={() => setActivePanel('project-add')} type="button">
                    Go To Add Project
                  </button>
                </div>
              ) : (
                <div className="admin-projects-stack">
                  {editor.projectsItems.map((project, projectIndex) => (
                    <article className="admin-project-card" key={`${project.title}-${projectIndex}`}>
                      <div className="admin-project-card__head">
                        <div className="admin-project-card__title">
                          <strong>{project.title || `Project ${projectIndex + 1}`}</strong>
                          <span>Ye card admin ke list view me hai aur isi data se public pages update honge.</span>
                        </div>

                        <button
                          className="admin-button admin-button--ghost admin-button--small"
                          onClick={() => removeProject(projectIndex)}
                          type="button"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="admin-project-layout">
                        <div className="admin-project-preview">
                          <div
                            className="admin-project-preview__media"
                            style={{
                              backgroundImage: `linear-gradient(180deg, rgba(23, 18, 14, 0.08), rgba(23, 18, 14, 0.72)), url('${project.images[0] || '/images/luxury-villa.jpg'}')`,
                            }}
                          >
                            <div className="admin-project-preview__tag">{project.tag || 'Project Tag'}</div>
                            <div className="admin-project-preview__copy">
                              <h3>{project.title || 'Project Title'}</h3>
                              <p>{project.area || 'Area'} | {project.location || 'Location'}</p>
                              <p>{project.description || 'Project description preview will appear here.'}</p>
                            </div>
                          </div>
                        </div>

                        <div className="admin-project-editor">
                          <div className="admin-project-grid">
                            <label className="admin-field">
                              <span>Project Title</span>
                              <input className="admin-input" onChange={(event) => updateExistingProjectField(projectIndex, 'title', event.target.value)} value={project.title} />
                            </label>
                            <label className="admin-field">
                              <span>Location</span>
                              <input className="admin-input" onChange={(event) => updateExistingProjectField(projectIndex, 'location', event.target.value)} value={project.location} />
                            </label>
                            <label className="admin-field">
                              <span>Area</span>
                              <input className="admin-input" onChange={(event) => updateExistingProjectField(projectIndex, 'area', event.target.value)} value={project.area} />
                            </label>
                            <label className="admin-field">
                              <span>Tag</span>
                              <input className="admin-input" onChange={(event) => updateExistingProjectField(projectIndex, 'tag', event.target.value)} value={project.tag} />
                            </label>
                            <label className="admin-field admin-field--full">
                              <span>Description</span>
                              <textarea className="admin-input admin-textarea" onChange={(event) => updateExistingProjectField(projectIndex, 'description', event.target.value)} rows={4} value={project.description} />
                            </label>
                          </div>

                          <div className="admin-image-grid">
                            {project.images.map((image, imageIndex) => (
                              <div className="admin-image-card" key={`existing-${projectIndex}-image-${imageIndex}`}>
                                <div
                                  className="admin-image-card__preview"
                                  style={{
                                    backgroundImage: image
                                      ? `linear-gradient(180deg, rgba(21, 17, 14, 0.08), rgba(21, 17, 14, 0.58)), url('${image}')`
                                      : undefined,
                                  }}
                                >
                                  {!image ? <span>No image selected</span> : null}
                                </div>
                                <div className="admin-image-card__controls">
                                  <label className="admin-field">
                                    <span>Image URL {imageIndex + 1}</span>
                                    <input
                                      className="admin-input"
                                      onChange={(event) => updateExistingProjectImage(projectIndex, imageIndex, event.target.value)}
                                      value={image}
                                    />
                                  </label>
                                  <label className="admin-upload-button">
                                    {uploadingTarget === `existing-${projectIndex}-${imageIndex}` ? 'Uploading...' : `Upload Image ${imageIndex + 1}`}
                                    <input accept="image/*" onChange={(event) => void handleExistingProjectUpload(projectIndex, imageIndex, event)} type="file" />
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          ) : null}

          {activePanel === 'news-add' ? (
            <div className="admin-section-stack" id="news-add">
              <section className="admin-card admin-card--editor">
                <div className="admin-card__head admin-card__head--row">
                  <div>
                    <h2>News &amp; Media Section Settings</h2>
                    <p>Newsroom page ke heading content ko yahan se control karo.</p>
                  </div>
                  <span className="admin-chip">News Meta</span>
                </div>

                <div className="admin-form-grid">
                  <label className="admin-field">
                    <span>Eyebrow</span>
                    <input className="admin-input" onChange={(event) => updateField('newsEyebrow', event.target.value)} value={editor.newsEyebrow} />
                  </label>
                  <label className="admin-field">
                    <span>Title Start</span>
                    <input className="admin-input" onChange={(event) => updateField('newsTitleStart', event.target.value)} value={editor.newsTitleStart} />
                  </label>
                  <label className="admin-field">
                    <span>Highlighted Word</span>
                    <input className="admin-input" onChange={(event) => updateField('newsTitleHighlight', event.target.value)} value={editor.newsTitleHighlight} />
                  </label>
                  <label className="admin-field admin-field--full">
                    <span>Subtitle</span>
                    <textarea className="admin-input admin-textarea" onChange={(event) => updateField('newsSubtitle', event.target.value)} rows={3} value={editor.newsSubtitle} />
                  </label>
                </div>
              </section>

              <section className="admin-card admin-card--editor">
                <div className="admin-card__head admin-card__head--row">
                  <div>
                    <h2>Add News Story</h2>
                    <p>Jo story yahan add karoge, save ke baad `/news-media` page par newsroom cards ke saath dikhegi.</p>
                  </div>
                  <button className="admin-button admin-button--small" onClick={addNewsToDraft} type="button">
                    Add News
                  </button>
                </div>

                <div className="admin-project-layout">
                  <div className="admin-project-editor">
                    <div className="admin-project-grid">
                      <label className="admin-field">
                        <span>Headline</span>
                        <input className="admin-input" onChange={(event) => updateNewNewsField('title', event.target.value)} value={newNewsItem.title} />
                      </label>
                      <label className="admin-field">
                        <span>Category</span>
                        <input className="admin-input" onChange={(event) => updateNewNewsField('category', event.target.value)} value={newNewsItem.category} />
                      </label>
                      <label className="admin-field">
                        <span>Published On</span>
                        <input className="admin-input" onChange={(event) => updateNewNewsField('publishedOn', event.target.value)} value={newNewsItem.publishedOn} />
                      </label>
                      <label className="admin-field">
                        <span>Source</span>
                        <input className="admin-input" onChange={(event) => updateNewNewsField('source', event.target.value)} value={newNewsItem.source} />
                      </label>
                      <label className="admin-field admin-field--full">
                        <span>Excerpt</span>
                        <textarea className="admin-input admin-textarea" onChange={(event) => updateNewNewsField('excerpt', event.target.value)} rows={4} value={newNewsItem.excerpt} />
                      </label>
                    </div>

                    <div className="admin-image-grid admin-image-grid--single">
                      <div className="admin-image-card">
                        <div
                          className="admin-image-card__preview"
                          style={{
                            backgroundImage: newNewsItem.image
                              ? `linear-gradient(180deg, rgba(21, 17, 14, 0.08), rgba(21, 17, 14, 0.58)), url('${newNewsItem.image}')`
                              : undefined,
                          }}
                        >
                          {!newNewsItem.image ? <span>No image selected</span> : null}
                        </div>
                        <div className="admin-image-card__controls">
                          <label className="admin-field">
                            <span>Cover Image URL</span>
                            <input className="admin-input" onChange={(event) => updateNewNewsImage(event.target.value)} value={newNewsItem.image} />
                          </label>
                          <label className="admin-upload-button">
                            {uploadingTarget === 'news-new' ? 'Uploading...' : 'Upload Cover Image'}
                            <input accept="image/*" onChange={(event) => void handleNewNewsUpload(event)} type="file" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="admin-project-preview">
                    <div
                      className="admin-project-preview__media"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(23, 18, 14, 0.08), rgba(23, 18, 14, 0.72)), url('${newNewsItem.image || '/images/luxury-villa.jpg'}')`,
                      }}
                    >
                      <div className="admin-project-preview__tag">{newNewsItem.category || 'News Category'}</div>
                      <div className="admin-project-preview__copy">
                        <h3>{newNewsItem.title || 'News Headline'}</h3>
                        <p>{newNewsItem.publishedOn || 'Publish date'} | {newNewsItem.source || 'Source'}</p>
                        <p>{newNewsItem.excerpt || 'News excerpt preview will appear here.'}</p>
                      </div>
                    </div>
                    <p className="admin-project-preview__note">
                      Ye newsroom preview admin ke andar hai. Final story cards public `News &amp; Media` page par reflect hongi.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          ) : null}

          {activePanel === 'news-list' ? (
            <section className="admin-card admin-card--editor" id="news-list">
              <div className="admin-card__head admin-card__head--row">
                <div>
                  <h2>All News Stories</h2>
                  <p>Yahin se saari newsroom entries dekho, details update karo, cover image upload karo, ya delete karo.</p>
                </div>
                <div className="admin-card__tools">
                  <span className="admin-chip">{editor.newsItems.length} items</span>
                  <button className="admin-button admin-button--ghost admin-button--small" onClick={() => setActivePanel('news-add')} type="button">
                    Add Another
                  </button>
                </div>
              </div>

              {editor.newsItems.length === 0 ? (
                <div className="admin-projects-empty">
                  <p>Abhi koi news story available nahi hai.</p>
                  <button className="admin-button admin-button--ghost admin-button--small" onClick={() => setActivePanel('news-add')} type="button">
                    Go To Add News
                  </button>
                </div>
              ) : (
                <div className="admin-projects-stack">
                  {editor.newsItems.map((item, newsIndex) => (
                    <article className="admin-project-card" key={`${item.title}-${newsIndex}`}>
                      <div className="admin-project-card__head">
                        <div className="admin-project-card__title">
                          <strong>{item.title || `News Story ${newsIndex + 1}`}</strong>
                          <span>Ye card admin list view me hai aur isi data se public newsroom page update hoga.</span>
                        </div>

                        <button
                          className="admin-button admin-button--ghost admin-button--small"
                          onClick={() => removeNewsItem(newsIndex)}
                          type="button"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="admin-project-layout">
                        <div className="admin-project-preview">
                          <div
                            className="admin-project-preview__media"
                            style={{
                              backgroundImage: `linear-gradient(180deg, rgba(23, 18, 14, 0.08), rgba(23, 18, 14, 0.72)), url('${item.image || '/images/luxury-villa.jpg'}')`,
                            }}
                          >
                            <div className="admin-project-preview__tag">{item.category || 'News Category'}</div>
                            <div className="admin-project-preview__copy">
                              <h3>{item.title || 'News Headline'}</h3>
                              <p>{item.publishedOn || 'Publish date'} | {item.source || 'Source'}</p>
                              <p>{item.excerpt || 'News excerpt preview will appear here.'}</p>
                            </div>
                          </div>
                        </div>

                        <div className="admin-project-editor">
                          <div className="admin-project-grid">
                            <label className="admin-field">
                              <span>Headline</span>
                              <input className="admin-input" onChange={(event) => updateExistingNewsField(newsIndex, 'title', event.target.value)} value={item.title} />
                            </label>
                            <label className="admin-field">
                              <span>Category</span>
                              <input className="admin-input" onChange={(event) => updateExistingNewsField(newsIndex, 'category', event.target.value)} value={item.category} />
                            </label>
                            <label className="admin-field">
                              <span>Published On</span>
                              <input className="admin-input" onChange={(event) => updateExistingNewsField(newsIndex, 'publishedOn', event.target.value)} value={item.publishedOn} />
                            </label>
                            <label className="admin-field">
                              <span>Source</span>
                              <input className="admin-input" onChange={(event) => updateExistingNewsField(newsIndex, 'source', event.target.value)} value={item.source} />
                            </label>
                            <label className="admin-field admin-field--full">
                              <span>Excerpt</span>
                              <textarea className="admin-input admin-textarea" onChange={(event) => updateExistingNewsField(newsIndex, 'excerpt', event.target.value)} rows={4} value={item.excerpt} />
                            </label>
                          </div>

                          <div className="admin-image-grid admin-image-grid--single">
                            <div className="admin-image-card">
                              <div
                                className="admin-image-card__preview"
                                style={{
                                  backgroundImage: item.image
                                    ? `linear-gradient(180deg, rgba(21, 17, 14, 0.08), rgba(21, 17, 14, 0.58)), url('${item.image}')`
                                    : undefined,
                                }}
                              >
                                {!item.image ? <span>No image selected</span> : null}
                              </div>
                              <div className="admin-image-card__controls">
                                <label className="admin-field">
                                  <span>Cover Image URL</span>
                                  <input className="admin-input" onChange={(event) => updateExistingNewsImage(newsIndex, event.target.value)} value={item.image} />
                                </label>
                                <label className="admin-upload-button">
                                  {uploadingTarget === `news-existing-${newsIndex}` ? 'Uploading...' : 'Upload Cover Image'}
                                  <input accept="image/*" onChange={(event) => void handleExistingNewsUpload(newsIndex, event)} type="file" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          ) : null}
        </main>
      </div>
    </div>
  )
}

export default AdminPage
