---
title: "Arsip Berkas & Disposisi"
slug: "arsip-berkas-disposisi"
description: "Aplikasi pengarsipan dokumen SK dan SOP lengkap dengan modul disposisi, pencarian, dan ekspor laporan untuk arsip keseluruhan berkas."
date: "2026-09-08"
year: "2026"
category: "Web Application"
featured: false
image: "/images/projects/arsip.svg"
tags: ["PHP", "MySQL", "PhpSpreadsheet", "PDO", "JavaScript"]
demoUrl: ""
repoUrl: "https://github.com/nasjiarr/arsipberkas"
client: ""
role: "Web Developer"
timeline: "Sep 2026"
---

## Gambaran Umum

**Arsip Berkas & Disposisi** adalah sistem pengarsipan dokumen (Surat Keputusan dan SOP) yang menggantikan pengelolaan arsip fisik. Dokumen terorganisir dengan metadata lengkap, dapat dicari dengan cepat, dan dapat diunduh kapan saja.

Modul disposisi memungkinkan distribusi dokumen ke pihak terkait dengan pencatatan nomor disposisi secara terpisah untuk dokumen masuk maupun keluar.

---

## Pendekatan Desain & UX

- **Pencarian Cepat**: Pencarian SK dan SOP berdasarkan nomor, perihal, atau tanggal.
- **Unduhan Aman**: File dilayani melalui endpoint khusus, bukan akses langsung ke direktori.
- **Ekspor Excel**: Rekap disposisi dapat diekspor ke spreadsheet via PhpSpreadsheet.

---

## Fitur Teknis

1. **CRUD Dokumen**: Penambahan, pengubahan, penghapusan, dan penampilan SK dan SOP.
2. **Modul Disposisi**: Pengelolaan disposisi masuk dan keluar dengan nomor disposisi unik.
3. **Multi-User dengan Login**: Sistem autentikasi dan manajemen pengguna.
4. **Database SQL**: Skema database relasional untuk dokumen, disposisi, dan pengguna.
5. **Integrasi Jaringan**: Akses ke berkas pada *network share* untuk sinkronisasi file eksternal.
