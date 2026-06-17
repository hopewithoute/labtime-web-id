---
title: "Carousel & Placeholder Demo"
description: "Proyek demo ini dibuat khusus untuk memperlihatkan bagaimana bentuk Carousel dan gambar placeholder bekerja."
date: "2026-06-15"
tags:
  - demo
  - ui
role: "Demo Viewer"
problem:
  - "User ingin melihat bagaimana format layout Carousel pada seksi Technical Architecture."
  - "User ingin melihat bagaimana gambar placeholder dirender jika belum ada aset asli."
approach:
  - "Membangun Carousel menggunakan CSS native (snap-x overflow-x-auto) yang sangat ringan."
  - "Memasukkan URL placehold.co sebagai src gambar di dalam Markdown."
outcome:
  - "Gallery dirender secara horizontal, menghemat ruang vertikal."
  - "Bisa di-scroll / digeser ke kanan dan kiri (Swipe di mobile atau Trackpad di Desktop)."
app_screenshots:
  - src: https://placehold.co/1200x675/1e1e1e/d4d4d4?text=App+UI+Dashboard
    alt: "Dashboard Utama"
    caption: "Tampilan halaman utama (Dashboard) setelah user login."
  - src: https://placehold.co/1200x675/1e1e1e/d4d4d4?text=App+UI+Settings
    alt: "Halaman Pengaturan"
    caption: "Halaman pengaturan akun dan preferensi aplikasi."
  - src: https://placehold.co/1200x675/1e1e1e/d4d4d4?text=App+UI+Analytics
    alt: "Analytics View"
    caption: "Tampilan laporan analitik bulanan pengguna."
screenshots:
  - src: https://placehold.co/800x500/1e1e1e/d4d4d4?text=Placeholder+Image+1
    title: "Slide 1: Arsitektur Utama"
    description: "Ini adalah slide pertama dari carousel."
    bullets:
      - "Carousel ini menggunakan CSS murni (Tailwind snap-x)."
      - "Tidak perlu library eksternal yang memberatkan."
  - src: https://placehold.co/800x500/1e1e1e/d4d4d4?text=Placeholder+Image+2
    title: "Slide 2: Database Layer"
    description: "Slide kedua yang bisa Anda lihat dengan menggeser layar."
    bullets:
      - "Setiap gambar secara otomatis mengambil lebar yang proporsional."
      - "Teks penjelasan tetap berada di sisi kanan (Desktop) atau bawah (Mobile)."
  - src: https://placehold.co/800x500/1e1e1e/d4d4d4?text=Placeholder+Image+3
    title: "Slide 3: Edge Computing"
    description: "Contoh slide ketiga."
    bullets:
      - "Sangat cocok untuk presentasi flow aplikasi."
      - "Gaya bento-box membuat desain tetap tegas dan elegan."
---

Konten kosong, karena semua data sudah dirender dari frontmatter.
