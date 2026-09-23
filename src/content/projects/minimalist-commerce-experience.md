---
title: "Minimalist Commerce Experience"
slug: "minimalist-commerce-experience"
description: "Pengalaman storefront e-commerce statis tanpa friksi untuk lini produk keramik dan furnitur artisanal."
date: "2025-08-10"
year: "2025"
category: "Fullstack Web & SSG"
featured: true
image: "/images/projects/commerce.svg"
tags: ["SvelteKit", "SSG", "Tailwind CSS", "Stripe API", "Micro-interactions"]
demoUrl: "https://example.com/commerce-demo"
repoUrl: "https://github.com/example/minimalist-commerce"
client: "Kanso Living Objects"
role: "Fullstack Creative Developer"
timeline: "2 Bulan (Jun 2025 – Jul 2025)"
---

## Gambaran Umum

**Minimalist Commerce Experience** menghadirkan pengalaman belanja daring yang menenangkan bagi jenama perlengkapan rumah tangga artisanal. Desain storefront meminimalkan elemen transaksional agresif (banner diskon berkedip, pop-up countdown) dan menggantinya dengan galeri visual yang luas, tipografi mewah, dan navigasi yang intuitif.

Dengan memanfaatkan Static Site Generation (SSG), setiap halaman produk dikompilasi sebelumnya untuk penyajian instan dari CDN edge terdekat.

---

## Pendekatan Desain & UX

- **Generous Whitespace**: Setiap objek keramik diberikan ruang kosong (*negative space*) yang lapang agar bentuk dan tekstur material menjadi fokus utama.
- **Pemisah Garis Tipis (Hairline)**: Pemisah antar opsi varian produk menggunakan garis border 1px yang halus, menjaga kemurnian estetika visual.
- **Micro-Interactions yang Lembut**: Hover preview gambar dan penambahan item ke keranjang belanja berjalan mulus dengan transisi CSS murni tanpa penundaan runtime.

---

## Fitur Teknis

1. **Static Site Generation (SSG)**: Halaman katalog produk di-render statis saat build-time menggunakan `@sveltejs/adapter-static`, menghasilkan skor Largest Contentful Paint (LCP) hanya 0.4 detik.
2. **Client-Side Cart Persistence**: State keranjang belanja disimpan di `localStorage` dan disinkronkan secara mulus melintasi sesi navigasi.
3. **Checkout Headless**: Integrasi langsung dengan Stripe Payment Elements untuk proses pembayaran yang aman tanpa mengorbankan desain antarmuka kustom.
