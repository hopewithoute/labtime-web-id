# Design: LMS Sertifikasi PDF Engine Sub-Article

## Problem Statement
The user needs a focused, engineer-to-engineer write-up for their portfolio project (LMS Sertifikasi) covering the "Content Architecture", specifically the Dynamic PDF Generation Engine. The goal is to highlight the architectural split between the React frontend live preview and the asynchronous backend ChromicPDF renderer, avoiding AI-generated fluff.

## Selected Approach
We will create a dedicated "Deep Dive" markdown file (`content/projects/lms-sertifikasi/dynamic-pdf-engine.md`) that acts as a related writing/sub-article for the main LMS Sertifikasi project page. 

The article will follow a **Problem -> Architecture -> Result** structure.
It will include a custom-styled technical infographic (already generated via Nano Banana / AI Image Gen and placed in `public/projects/lms-sertifikasi/pdf-engine-infographic.png`).

## Content Draft

### Dynamic PDF Generation Engine

**The Problem**  
Building a reliable certificate generator is notoriously difficult. Relying on frontend Javascript to convert HTML to PDF often results in broken layouts across different browsers and requires downloading massive font files to the client. We needed a robust, server-side PDF generator that still allowed instructors to customize their certificate's look and feel without writing code.

**The Architecture**  
![Dynamic PDF Generation Engine](/projects/lms-sertifikasi/pdf-engine-infographic.png)

We solved this by building a highly structured, data-driven rendering pipeline that offloads the heavy lifting to the backend:

1. **Structured Frontend Configuration**: Instead of a brittle WYSIWYG drag-and-drop editor, the React frontend provides a structured form. Instructors select predefined, responsive layouts (Classic, Modern, Elegant, Minimal) and customize design tokens (fonts, HEX colors, custom labels). This is serialized into a clean JSON `styleConfig`.
2. **Dynamic Server-Side Rendering (Elixir)**: When a certificate needs to be generated, the Elixir backend takes this JSON payload and passes it to a dedicated `CertificateTemplateRenderer`. Using Elixir's HEEx templates, it dynamically generates the HTML structure and injects custom CSS on the fly based on the chosen design tokens.
3. **Asynchronous Headless Rendering**: Since PDF rendering is CPU-intensive, generation is offloaded to an asynchronous **Oban Worker Queue**. The worker spins up **ChromicPDF** (a Headless Chrome instance) to render the exact pixel-perfect PDF binary from the generated HTML.
4. **Edge Storage & Delivery**: The finalized high-fidelity PDF is streamed directly to **Cloudflare R2**. The database is updated, and the React frontend safely serves the `pdfUrl` to the user via the Media Gateway.

**The Result**  
A bulletproof, 100% consistent PDF generation engine that never blocks the main web threads. By utilizing structured JSON configs mapped to server-side HEEx templates, we eliminated CSS-to-print cross-browser inconsistencies while still giving instructors full creative control.
## Validation Plan
1. Ensure the markdown file is created at `content/projects/lms-sertifikasi/dynamic-pdf-engine.md`.
2. Ensure the frontmatter matches the expected schema for the labtime-web-id portfolio.
3. Ensure the image path resolves correctly in the Nuxt Content rendering.
