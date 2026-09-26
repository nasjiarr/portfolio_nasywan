---
title: "FRC Reporting System"
slug: "frc-reporting-system"
description: "Sistem pelaporan dan penugasan perbaikan fasilitas untuk pengelolaan laporan kerusakan, penugasan teknisi, hingga pelacakan hasil perbaikan."
date: "2026-04-18"
year: "2026"
category: "Fullstack Web Application"
featured: true
image: "/images/projects/frc.svg"
tags: ["Laravel", "Chart.js", "Tailwind CSS", "MySQL", "Role-Based Access"]
demoUrl: ""
repoUrl: "https://github.com/nasjiarr/frc-reporting-system"
client: ""
role: "Fullstack Developer"
timeline: "Apr 2026 – Jul 2026"
---

## Gambaran Umum

**FRC Reporting System** adalah platform internal untuk mengelola seluruh siklus perbaikan fasilitas: mulai dari pelaporan kerusakan oleh pengguna, penugasan teknisi, hingga dokumentasi hasil perbaikan. Sistem ini menggantikan alur manual yang sebelumnya berjalan via pesan instan dan kertas.

Setiap laporan terdokumentasi dengan foto sebelum/sesudah, alasan penolakan jika ditolak, dan riwayat penugasan yang dapat diaudit.

---

## Pendekatan Desain & UX

- **Dashboard per Peran**: Tampilan dan fitur berbeda untuk Admin, Pelapor, Teknisi, dan Kepala FRC.
- **Detail Laporan Lengkap**: Foto sebelum dan sesudah perbaikan menjadi bukti visual yang dapat ditinjau ulang.
- **Notifikasi Internal**: Pemberitahuan otomatis saat laporan ditugaskan atau selesai dikerjakan.

---

## Fitur Teknis

1. **Multi-Role Workflow**: Empat peran (Admin, Pelapor, Teknisi, Kepala FRC) dengan middleware `role` khusus di setiap rutenya.
2. **Manajemen Penugasan**: Teknisi menerima, mengerjakan, atau menolak penugasan dengan alasan.
3. **Pencatatan Utilitas**: Pelacahan konsumsi air bersih, air hujan, dan listrik (AC, lampu, lift, MDP, SDP).
4. **Laporan PDF**: Dokumentasi hasil perbaikan yang dapat diunduh dalam PDF.
5. **Visualisasi Data**: Chart.js untuk memantau tren laporan dan tugas pada dashboard.
