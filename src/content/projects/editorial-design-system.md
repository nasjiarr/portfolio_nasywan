---
title: "Editorial Design System"
slug: "editorial-design-system"
description: "Sistem desain modular berfokus pada ritme tipografi dan estetika editorial kontemporer untuk publikasi digital."
date: "2026-02-15"
year: "2026"
category: "Design Engineering"
featured: true
image: "/images/projects/editorial.svg"
tags: ["SvelteKit", "Tailwind CSS", "Typography", "Figma", "Design Tokens"]
demoUrl: "https://example.com/editorial-demo"
repoUrl: "https://github.com/example/editorial-system"
client: "Aura Media Publishing"
role: "Lead UI Engineer & Design Technologist"
timeline: "3 Bulan (Nov 2025 – Jan 2026)"
---

## Gambaran Umum

**Editorial Design System** dirancang untuk menjawab tantangan tata letak publikasi digital modern yang sering kali kehilangan keanggunan tipografi cetak. Dengan memadukan prinsip proporsi kanonikal buku dengan fleksibilitas web responsif, sistem ini menghadirkan pengalaman membaca yang tenang, elegan, dan terstruktur.

Proyek ini dibangun menggunakan fondasi token desain yang ketat, memungkinkan sinkronisasi otomatis antara berkas Figma studio dan implementasi komponen kode di **SvelteKit** serta **Tailwind CSS**.

---

## Masalah & Tantangan Desain

Publikasi editorial digital sebelumnya mengalami beberapa friksi:
- **Ketidakseragaman Hirarki**: Skala modular ukuran teks tidak konsisten di berbagai perangkat dan orientasi layar.
- **Beban CSS yang Berat**: Komponen kustom yang dibuat tanpa sistem token menyebabkan CSS stylesheet membengkak dan memperlambat First Contentful Paint.
- **Kurangnya Ruang Bernapas**: Terlalu banyak elemen antarmuka yang bersaing menarik perhatian pembaca, merusak pengalaman membaca konten panjang (*long-form reading*).

---

## Solusi & Arsitektur

### 1. Skala Tipografi Modular
Kami menetapkan rasio *Major Second (1.125)* untuk body text dan *Major Third (1.250)* untuk heading, menggunakan kombinasi serif editorial **Instrument Serif** yang dipasangkan dengan kesederhanaan **Geist Sans**.

### 2. Hairline Grid System
Setiap pemisah antar section dan kartu menggunakan border *hairline* 1px dengan opasitas rendah (`#E7E7E0` pada light mode dan `#242424` pada dark mode), menciptakan batas terdefinisi tanpa mendominasi konten.

### 3. Komponen Berbasis Svelte 5 Runes
Semua komponen dibuat reaktif dan terisolasi secara performa dengan state runes (`$state`, `$derived`), menghasilkan ukuran bundle JavaScript di bawah 15KB gzipped.

---

## Hasil & Dampak

- **Performa 100/100 Lighthouse**: Nilai sempurna pada Performance, Accessibility, Best Practices, dan SEO.
- **Reduksi Bundle Size 45%**: Pengurangan drastis CSS dan JS dibandingkan framework berbasis komponen sebelumnya.
- **Waktu Orientasi Tim 2x Lebih Cepat**: Dokumentasi token desain yang terintegrasi memungkinkan tim desainer dan engineer bekerja dalam bahasa desain yang identik.
