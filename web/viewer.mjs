/**
 * Modified viewer.mjs for PDF.js v5.4.54
 * – Semua toolbar dihapus
 * – Menampilkan PDF fullscreen tanpa kontrol
 */

import { AppOptions, PDFViewerApplication } from "./app.mjs";

// Inisialisasi viewer setelah DOM siap
async function webViewerLoad() {
  // Jika ingin membuka PDF default dari server, ganti URL:
  // AppOptions.set('defaultUrl', 'pdf/YourPDF.pdf');

  try {
    await PDFViewerApplication.initialize();

    // Hapus elemen toolbar dari DOM jika masih ada
    document.getElementById("toolbarContainer")?.remove();
    document.getElementById("secondaryToolbar")?.remove();

    // Atur PDF viewer agar fullscreen
    const viewer = document.getElementById("viewerContainer");
    if (viewer) {
      viewer.style.top = "0";
      viewer.style.height = "100%";
      viewer.style.overflow = "auto";
    }

    // Jika URL memiliki query "file", buka file tersebut
    const urlParams = new URLSearchParams(window.location.search);
    const fileUrl = urlParams.get("file");
    if (fileUrl) {
      await PDFViewerApplication.open(fileUrl);
    }
  } catch (err) {
    console.error("PDFViewerApplication failed to open:", err);
  }
}

// Tunggu DOM siap lalu jalankan
if (document.readyState === "interactive" || document.readyState === "complete") {
  webViewerLoad();
} else {
  document.addEventListener("DOMContentLoaded", webViewerLoad);
}
