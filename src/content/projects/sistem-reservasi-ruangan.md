---
title: "Sistem Reservasi Ruangan"
slug: "sistem-reservasi-ruangan"
description: "Sistem reservasi ruangan berbasis web untuk pengelolaan, persetujuan, dan check-in fasilitas ruangan rapat dan aula secara real-time."
date: "2026-09-21"
year: "2026"
category: "Fullstack Web Application"
featured: true
image: "/images/projects/reservasi.svg"
tags: ["Laravel", "Inertia.js", "Vue 3", "Tailwind CSS", "MySQL", "WebSocket"]
demoUrl: ""
repoUrl: "https://github.com/nasjiarr/reservasi-ruangan"
client: ""
role: "Fullstack Developer"
timeline: "Sep 2026"
---

## Gambaran Umum

**Sistem Reservasi Ruangan** adalah aplikasi web untuk mengelola peminjaman ruangan rapat dan aula secara efisien. Sistem mencakup pengajuan reservasi, alur persetujuan berjenjang, deteksi bentrok jadwal, hingga konfirmasi kehadiran via QR code.

Dibangun dengan arsitektur monolit modern Laravel + Inertia.js + Vue 3, aplikasi ini menyatukan backend yang robust dengan antarmuka reaktif tanpa harus membangun API terpisah.

---

## Pendekatan Desain & UX

- **Kalender Interaktif**: Tampilan jadwal ruangan menggunakan FullCalendar dengan badge warna status reservasi.
- **Validasi Real-Time**: Feedback langsung pada form pemesanan saat terjadi bentrok jadwal.
- **Alur Approval yang Jelas**: Manajer dapat menyetujui atau menolak reservasi beserta alasan penolakan.

---

## Fitur Teknis

1. **Role & Permission**: Manajemen hak akses menggunakan Spatie Laravel Permission.
2. **Real-Time Broadcasting**: Notifikasi instan via Laravel Reverb (WebSocket).
3. **QR Code Check-In**: Setiap reservasi menghasilkan QR untuk konfirmasi kehadiran publik.
4. **Export Laporan**: Rekapan reservasi dalam format Excel (Maatwebsite) dan PDF (DomPDF).
5. **Containerized**: Dilengkapi `Dockerfile` dan `docker-compose.yml` untuk deployment konsisten.
