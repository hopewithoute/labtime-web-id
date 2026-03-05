---
title: "Dynamic PDF Generation Engine"
description: "How we built a 1:1 WYSIWYG certificate editor by separating React visual state from headless Chrome background workers."
date: 2026-03-05
category: "Content Architecture"
---

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
