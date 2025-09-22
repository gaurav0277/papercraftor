export function initialDoc() {
  return {
    meta: {
      title: "",
      authors: [{ name: "", affiliation: "", email: "", orcid: "" }],
      keywords: [],
      template: "ieee"
    },
    sections: [
      { id: "abstract", title: "Abstract", body: "" },
      { id: "intro", title: "Introduction", body: "" },
      { id: "methods", title: "Methods", body: "" },
      { id: "results", title: "Results", body: "" },
      { id: "discussion", title: "Discussion", body: "" },
      { id: "conclusion", title: "Conclusion", body: "" }
    ],
    acknowledgments: "",
    references: []
  }
}


