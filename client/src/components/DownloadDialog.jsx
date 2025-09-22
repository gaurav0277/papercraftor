import React from 'react'
import { exportMarkdown } from '../exporters/toMarkdown'
import { exportDocx } from '../exporters/toDocx'

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function DownloadDialog({ doc, mapping }) {
  const slug = (s) => s.trim().toLowerCase().replace(/\s+/g, '-')
  const onMd = () => {
    const md = exportMarkdown(doc, mapping)
    downloadBlob(`${slug(doc.meta.title)}_${doc.meta.template}.md`, new Blob([md], { type: 'text/markdown' }))
  }
  const onDocx = async () => {
    const blob = await exportDocx(doc, mapping)
    downloadBlob(`${slug(doc.meta.title)}_${doc.meta.template}.docx`, blob)
  }
  return (
    <div className="row">
      <button className="button" onClick={onMd}>Download Markdown</button>
      <button className="button primary" onClick={onDocx}>Download DOCX</button>
    </div>
  )
}


