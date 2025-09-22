# Paper Converter (IEEE ⇄ Springer, text-only MVP)

A web app to structure your paper in a neutral schema and export to different templates (IEEE, Springer). Text-only for now (no images/tables). Download Markdown and DOCX locally. A Node/Express API with MongoDB can persist projects.

## Stack
- Client: React + Vite (JavaScript)
- Server: Node.js + Express (JavaScript)
- Database: MongoDB (Mongoose)

## Features (MVP)
- Template choice: IEEE or Springer (section order/required fields)
- Neutral document model: title, authors, sections, references
- Dynamic form for metadata/sections/references
- Exports: Markdown (.md), DOCX (.docx)
- Server CRUD for projects (MongoDB)

## Project structure
```
project-root/
  client/
    src/
      components/
      exporters/
      models/
      templates/
      main.jsx, App.jsx
    index.html, vite.config.js, package.json
  server/
    src/
      models/Project.js
      routes/projects.js
      routes/export.js
      index.js
    package.json
  README.md
```

## Prerequisites
- Node.js 18+
- MongoDB instance (local or Atlas)

## Setup
### 1) Server
```bash
cd server
npm install
# create .env and set MONGO_URI (and PORT if needed)
# Example:
# MONGO_URI=mongodb://127.0.0.1:27017/paperx
# PORT=4000
npm run dev
```
Endpoints:
- GET http://localhost:4000/api/health
- CRUD http://localhost:4000/api/projects

### 2) Client
```bash
cd client
npm install
npm run dev
```
Open http://localhost:5173/

## Usage
1) Pick IEEE or Springer in the top bar.
2) Fill title, authors, sections, references.
3) Download Markdown or DOCX.

## Roadmap
- Validation rules per template
- Reference style formatting (IEEE numeric vs author-year)
- PDF export (server via Pandoc/LaTeX)
- Figures/tables (schema blocks)

## License
MIT
