export function exportMarkdown(doc, mapping) {
  const byId = Object.fromEntries(doc.sections.map(s => [s.id, s]))
  const out = []
  out.push(`# ${doc.meta.title}`)
  out.push((doc.meta.authors || []).map(a => a.name).join(", "))
  out.push("")

  if (byId.abstract) {
    out.push("## Abstract")
    out.push(byId.abstract.body)
    out.push("")
  }

  mapping.order.forEach(sid => {
    if (["abstract","references","acknowledgments"].includes(sid)) return
    const s = byId[sid]
    if (s) {
      out.push(`## ${s.title}`)
      out.push(s.body)
      out.push("")
    }
  })

  if (doc.acknowledgments) {
    out.push("## Acknowledgments")
    out.push(doc.acknowledgments)
    out.push("")
  }

  if (doc.references?.length) {
    out.push("## References")
    doc.references.forEach((r, i) => {
      out.push(`${i+1}. ${(r.authors||[]).join(", ")}. ${r.title}. ${(r.journal || r.booktitle || "")}, ${r.year}.`)
    })
  }
  return out.join("\n")
}


