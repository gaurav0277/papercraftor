import React from 'react'
import AuthorsEditor from './AuthorsEditor'
import SectionEditor from './SectionEditor'
import ReferencesEditor from './ReferencesEditor'

export default function FormBuilder({ doc, setDoc, mapping }) {
  const byId = Object.fromEntries(doc.sections.map(s => [s.id, s]))

  const setMeta = (key, value) => setDoc({ ...doc, meta: { ...doc.meta, [key]: value } })

  const ensureSection = (sid, title) => {
    if (!byId[sid]) {
      const next = { ...doc, sections: [...doc.sections, { id: sid, title, body: '' }] }
      setDoc(next)
    }
  }

  React.useEffect(() => {
    mapping.required.forEach(sid => ensureSection(sid, sid))
  }, [mapping])

  return (
    <div className="stack">
      <div className="section">
        <h2>Metadata</h2>
        <div className="stack">
          <input placeholder="Title" value={doc.meta.title} onChange={e => setMeta('title', e.target.value)} />
        </div>
        <AuthorsEditor authors={doc.meta.authors} onChange={authors => setMeta('authors', authors)} />
      </div>

      <div className="section">
        <h2>Sections</h2>
        {mapping.order.filter(sid => sid !== 'references').map(sid => {
          if (sid === 'acknowledgments') {
            return (
              <div key={sid} className="stack">
                <h3>Acknowledgments</h3>
                <textarea rows={5} value={doc.acknowledgments || ''}
                  onChange={e => setDoc({ ...doc, acknowledgments: e.target.value })} />
              </div>
            )
          }
          const s = byId[sid] || { id: sid, title: sid, body: '' }
          return (
            <SectionEditor key={sid} section={s} onChange={(updated) => {
              const sections = doc.sections.some(x => x.id === s.id)
                ? doc.sections.map(x => x.id === s.id ? updated : x)
                : [...doc.sections, updated]
              setDoc({ ...doc, sections })
            }} />
          )
        })}
      </div>

      <div className="section">
        <ReferencesEditor references={doc.references} onChange={(refs) => setDoc({ ...doc, references: refs })} />
      </div>
    </div>
  )
}


