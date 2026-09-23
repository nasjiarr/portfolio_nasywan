---
title: "Fintech Analytics Platform"
slug: "fintech-analytics-platform"
description: "Platform analitik keuangan interaktif dengan visualisasi data real-time dan sistem antarmuka berbasis densitas tinggi."
date: "2025-11-20"
year: "2025"
category: "Product Design & Frontend"
featured: true
image: "/images/projects/fintech.svg"
tags: ["SvelteKit", "TypeScript", "Tailwind CSS", "Data Vis", "WebSockets"]
demoUrl: "https://example.com/fintech-demo"
repoUrl: "https://github.com/example/fintech-platform"
client: "Vanguard Asset Capital"
role: "Senior Frontend Engineer"
timeline: "4 Bulan (Agu 2025 – Nov 2025)"
---

## Gambaran Umum

**Fintech Analytics Platform** adalah portal manajemen portofolio institusi yang memproses data transaksi bursa secara *real-time*. Antarmuka dirancang untuk menyajikan metrik penting dengan cepat tanpa membebani daya visual pengambil keputusan finansial.

Pendekatan desain mengadopsi estetika monokromatis hangat dengan aksen Deep Emerald untuk indikator pertumbuhan positif dan hairline grid presisi untuk memisahkan tabel data.

---

## Tantangan Teknis

1. **Frekuensi Pembaruan Tinggi**: Aliran data melalui WebSockets mencapai ratusan tick per detik yang berisiko membuat antarmuka macet (*dropped frames*).
2. **Keterbacaan Angka Finansial**: Angka statistik membutuhkan font monospace atau tabular figures (*font-variant-numeric: tabular-nums*) agar tidak bergeser posisi saat nilai berubah.
3. **Adaptasi Mode Gelap Otomatis**: Analis pasar kerap bekerja di lingkungan pencahayaan redup, memerlukan palet gelap yang tidak menyilaukan mata namun tetap memiliki kontras WCAG AAA.

---

## Solusi Implementasi

### 1. Rendering Berkinerja Tinggi dengan Svelte 5
Menggunakan kompilator Svelte 5 untuk *fine-grained reactivity*. Pembaruan harga hanya memicu manipulasi DOM pada elemen spesifik tanpa me-rerender pohon komponen secara keseluruhan.

### 2. Tabular Grid & Micro-Charts
Merancang komponen sparkline SVG ringan yang dirender secara inline tanpa dependensi pustaka grafik eksternal yang berat, memangkas waktu muat hingga di bawah 300ms.

### 3. Palet Warna Finansial Understated
Menghindari warna neon agresif yang biasa ditemukan di aplikasi trading umum. Memilih rona emerald gelap `#1B4D3E` dan emas redup `#B48C36` untuk menciptakan nuansa profesional dan tenang.
