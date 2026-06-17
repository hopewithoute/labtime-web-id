# Infographic Architecture Prompts Template

Dokumen ini berisi *template prompt* standar yang digunakan untuk meng-_generate_ diagram arsitektur teknis (infografis) menggunakan AI Image Generation (seperti Imagen 3 atau Midjourney). Tujuannya adalah untuk menjaga konsistensi gaya visual *portfolio* tanpa halusinasi teks atau elemen *lore* (*game*) fiktif yang tidak relevan.

## Aturan Dasar Prompting AI Infographic
Agar AI membuat infografis yang terstruktur (bukan seni abstrak acak) dan memiliki teks yang tepat:
1. **Definisikan Teks Secara Eksplisit:** Beri instruksi jelas teks apa saja yang harus ada di dalam setiap _node_ (misal: "The text inside the nodes must read exactly: 'DRAFT', 'PENGAJUAN'").
2. **Deskripsikan Struktur Aliran:** Jelaskan bentuk diagramnya (misal: "clean rectangular nodes connected by arrows" atau "flow: CRON JOB -> QUEUE WORKER").
3. **Kendalikan Estetika/Style:** Gunakan deskripsi warna dan gaya UI spesifik web Anda ("Minimalist brutalist flat technical UI style, beige and dark gray monochrome palette").
4. **Cegah Halusinasi Lore/Abstrak:** Gunakan *negative prompt* eksplisit ("DO NOT WRITE the word 'YoRHa' or any fictional lore text anywhere", "no abstract random shapes").

---

## 1. State Machine Workflow Template
Gunakan template ini untuk diagram alur kerja atau transisi status:

```text
A professional technical architecture infographic diagram showing a State Machine workflow. The diagram has clean rectangular nodes connected by arrows. The text inside the nodes must read exactly: 'DRAFT', 'PENGAJUAN', 'DISETUJUI', 'DITERIMA', 'SELESAI'. Minimalist brutalist flat technical UI style, beige and dark gray monochrome palette. High contrast, sharp vector graphics, very structured, no abstract random shapes. DO NOT WRITE the word "YoRHa" or any fictional lore text anywhere.
```

## 2. Polymorphic / Database Relational Template
Gunakan template ini untuk relasi tabel *database* atau skema entitas:

```text
A professional technical database architecture infographic diagram showing a Polymorphic Data Model. The diagram features a central database table block named "PENGADAAN" connecting to three other blocks named "PEMBELIAN", "HIBAH", and "DONASI". Above them is a block named "ASET". Minimalist brutalist flat technical UI style, beige and dark gray monochrome palette. High contrast, sharp vector graphics, very structured flowchart, no abstract random shapes. DO NOT WRITE the word "YoRHa" or any fictional lore text anywhere.
```

## 3. Background Job / System Engine Template
Gunakan template ini untuk arsitektur sistem asinkron (*cron job, queue worker*, algoritma khusus):

```text
A professional technical flowchart infographic diagram showing an Automated Engine. The diagram shows a flow: "CRON JOB" -> "QUEUE WORKER" -> "CALCULATION" -> "UPDATE VALUE". Minimalist brutalist flat technical UI style, beige and dark gray monochrome palette. High contrast, sharp vector graphics, very structured flowchart, no abstract random shapes. DO NOT WRITE the word "YoRHa" or any fictional lore text anywhere.
```

## 4. Security / Audit Flow Template
Gunakan template ini untuk mekanisme keamanan, validasi berlapis, atau log infrastruktur:

```text
A professional technical security architecture infographic diagram showing an Immutable Audit Trail. The diagram shows a flow: "USER ACTION" -> "RBAC VALIDATION" -> "DATABASE" -> "IMMUTABLE LOG". Minimalist brutalist flat technical UI style, beige and dark gray monochrome palette. High contrast, sharp vector graphics, very structured flowchart, no abstract random shapes. DO NOT WRITE the word "YoRHa" or any fictional lore text anywhere.
```
