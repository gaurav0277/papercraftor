import { Document, Packer, Paragraph, HeadingLevel } from 'docx'

export async function exportDocx(doc, mapping) {
  const paras = []
  paras.push(new Paragraph({ text: doc.meta.title, heading: HeadingLevel.TITLE }))
  paras.push(new Paragraph((doc.meta.authors || []).map(a => a.name).join(', ')))
  paras.push(new Paragraph(''))

  const byId = Object.fromEntries(doc.sections.map(s => [s.id, s]))
  if (byId.abstract) {
    paras.push(new Paragraph({ text: 'Abstract', heading: HeadingLevel.HEADING_1 }))
    paras.push(new Paragraph(byId.abstract.body))
  }
  mapping.order.forEach(sid => {
    if (["abstract","references","acknowledgments"].includes(sid)) return
    const s = byId[sid]
    if (s) {
      paras.push(new Paragraph({ text: s.title, heading: HeadingLevel.HEADING_1 }))
      paras.push(new Paragraph(s.body))
    }
  })
  if (doc.acknowledgments) {
    paras.push(new Paragraph({ text: 'Acknowledgments', heading: HeadingLevel.HEADING_1 }))
    paras.push(new Paragraph(doc.acknowledgments))
  }
  if (doc.references?.length) {
    paras.push(new Paragraph({ text: 'References', heading: HeadingLevel.HEADING_1 }))
    doc.references.forEach((r, i) => {
      paras.push(new Paragraph(`${i+1}. ${(r.authors||[]).join(', ')}. ${r.title}. ${(r.journal || r.booktitle || '')}, ${r.year}.`))
    })
  }

  const d = new Document({ sections: [{ children: paras }] })
  const blob = await Packer.toBlob(d)
  return blob
}



