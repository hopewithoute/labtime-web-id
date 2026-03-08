---
title: "Building a server-driven PDF pipeline"
description: "How I separated certificate configuration, HTML rendering, and background PDF generation to produce consistent documents without pushing print logic into the browser."
date: 2026-03-13
tags: ["pdf", "chromicpdf", "certificate", "document-generation"]
category: "Content Delivery"
---

### Certificate generation needed consistency more than visual freedom
Certificates are part of the product's trust layer.

They need to look consistent, carry the right learner data, and remain stable when generated repeatedly over time. Browser-side HTML-to-PDF approaches make that harder than it needs to be. Output varies by environment, heavy assets move into the client, and layout control becomes fragile.

I wanted the browser to configure certificates, not render them.

### The pipeline split
![Dynamic PDF Generation Engine](/projects/lms-sertifikasi/pdf-engine-infographic.png)

The frontend produces structured certificate configuration through forms and controlled design options. Instead of a freeform editor, the UI captures a bounded set of layout and styling choices and serializes them into a predictable payload.

The backend then turns that payload into HTML through HEEx templates and generated CSS. Once the template is ready, Oban pushes the rendering work into the background and ChromicPDF produces the final PDF artifact.

That separation matters. Configuration happens in the product UI, deterministic rendering happens on the server, and CPU-heavy document generation stays off the request path.

### Why I chose structure over a looser editor
A wide-open WYSIWYG tool sounds flexible, but it shifts too much layout risk into the client.

For certificates, controlled customization was a better trade. Instructors can change branding and presentation, but the rendering system still owns the final document shape. That keeps generated PDFs consistent and makes the output easier to support.

It also fits the rest of the platform architecture. Certificate generation becomes a backend capability with stored configuration, repeatable rendering, and asynchronous execution, not a browser trick.

### The result
The platform can generate certificate PDFs more predictably without blocking interactive traffic.

Instructors still get meaningful customization, but the final document path stays structured, repeatable, and easier to operate. For a certification product, that was the right trade.