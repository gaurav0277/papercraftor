import React from 'react'

export default function SectionEditor({ section, onChange }) {
  return (
    <div className="stack">
      <h3>{section.title || section.id}</h3>
      <textarea
        rows={8}
        value={section.body}
        onChange={e => onChange({ ...section, body: e.target.value })}
      />
    </div>
  )
}


