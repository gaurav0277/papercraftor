import React from 'react'

export default function AuthorsEditor({ authors, onChange }) {
  const set = (idx, key, val) => {
    const next = authors.map((a, i) => i === idx ? { ...a, [key]: val } : a)
    onChange(next)
  }
  const add = () => onChange([...authors, { name: '', affiliation: '', email: '', orcid: '' }])
  const remove = (idx) => onChange(authors.filter((_, i) => i !== idx))

  return (
    <div className="stack">
      <h3>Authors</h3>
      {authors.map((a, i) => (
        <div key={i} className="grid4">
          <input placeholder="Name" value={a.name} onChange={e => set(i, 'name', e.target.value)} />
          <input placeholder="Affiliation" value={a.affiliation} onChange={e => set(i, 'affiliation', e.target.value)} />
          <input placeholder="Email" value={a.email} onChange={e => set(i, 'email', e.target.value)} />
          <div className="row">
            <input placeholder="ORCID" value={a.orcid} onChange={e => set(i, 'orcid', e.target.value)} />
            <button className="button" onClick={() => remove(i)}>Remove</button>
          </div>
        </div>
      ))}
      <button className="button primary" onClick={add}>Add author</button>
    </div>
  )
}


