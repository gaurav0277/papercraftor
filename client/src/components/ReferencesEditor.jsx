import React from 'react'

export default function ReferencesEditor({ references, onChange }) {
  const set = (idx, key, val) => {
    const next = references.map((r, i) => i === idx ? { ...r, [key]: val } : r)
    onChange(next)
  }
  const add = () => onChange([...references, { type: 'article', authors: [], title: '', journal: '', year: new Date().getFullYear() }])
  const remove = (idx) => onChange(references.filter((_, i) => i !== idx))

  return (
    <div className="stack">
      <h3>References</h3>
      {references.map((r, i) => (
        <div key={i} className="panel card">
          <div className="grid2">
            <input placeholder="Title" value={r.title} onChange={e => set(i, 'title', e.target.value)} />
            <input placeholder="Journal/Booktitle" value={r.journal || r.booktitle || ''} onChange={e => set(i, 'journal', e.target.value)} />
            <input placeholder="Authors (comma-separated)" value={(r.authors || []).join(', ')} onChange={e => set(i, 'authors', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
            <input placeholder="Year" value={r.year} onChange={e => set(i, 'year', Number(e.target.value) || '')} />
          </div>
          <div className="row" style={{ justifyContent: 'flex-end', marginTop: 8 }}>
            <button className="button" onClick={() => remove(i)}>Remove</button>
          </div>
        </div>
      ))}
      <button className="button" onClick={add}>Add reference</button>
    </div>
  )
}


