import React, { useMemo, useState } from 'react'
import './index.css'
import { IEEE_TEMPLATE } from './templates/ieee'
import { SPRINGER_TEMPLATE } from './templates/springer'
import FormBuilder from './components/FormBuilder'
import DownloadDialog from './components/DownloadDialog'
import { initialDoc } from './models/documentSchema'

export default function App() {
  const [doc, setDoc] = useState(initialDoc())
  const [template, setTemplate] = useState('ieee')

  const mapping = useMemo(() => template === 'ieee' ? IEEE_TEMPLATE : SPRINGER_TEMPLATE, [template])

  return (
    <div className="app">
      <div className="topbar">
        <div className="topbar-inner">
          <div className="brand">Paper Converter</div>
          <div className="row">
            <label>Template</label>
            <select value={template} onChange={e => setTemplate(e.target.value)}>
              <option value="ieee">IEEE</option>
              <option value="springer">Springer</option>
            </select>
            <DownloadDialog doc={{ ...doc, meta: { ...doc.meta, template } }} mapping={mapping} />
          </div>
        </div>
      </div>

      <div className="container stack">
        <div className="panel card">
          <h1>Text-only paper builder</h1>
          <div className="spacer" />
          <FormBuilder doc={doc} setDoc={setDoc} mapping={mapping} />
        </div>
      </div>
    </div>
  )
}
