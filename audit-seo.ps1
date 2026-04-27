# --- Audit Crawlability AstroWind ---
$siteUrl = "https://jasasaluranmampetkarawang.my.id"
$robotsPath = "public/robots.txt"
$configPath = "src/utils/config.ts"

Write-Host "--- Memulai Audit SEO Googlebot ---" -ForegroundColor Cyan

# 1. Cek robots.txt
if (Test-Path $robotsPath) {
    $robotsContent = Get-Content $robotsPath
    if ($robotsContent -match "Disallow: /") {
        Write-Host "[!] PERINGATAN: robots.txt memblokir seluruh situs (Disallow: /)" -ForegroundColor Red
    } else {
        Write-Host "[v] robots.txt aman untuk perayapan." -ForegroundColor Green
    }
} else {
    Write-Host "[!] robots.txt tidak ditemukan di /public." -ForegroundColor Yellow
}

# 2. Cek Default Metadata Robots (SSOT)
if (Test-Path $configPath) {
    $configContent = Get-Content $configPath
    if ($configContent -match "index: false") {
        Write-Host "[!] PERINGATAN: Global metadata di config.ts disetel 'index: false'." -ForegroundColor Red
    } else {
        Write-Host "[v] Global metadata diizinkan diindeks (index: true)." -ForegroundColor Green
    }
}

# 3. Cek Proteksi Cloudflare (Integritas Browser)
Write-Host "`n--- Rekomendasi Sisi Cloudflare ---" -ForegroundColor Cyan
Write-Host "Silakan cek Dashboard Cloudflare Anda:"
Write-Host "1. Security > WAF > Bot: Pastikan 'Verified Bot Fight Mode' TIDAK memblokir Googlebot."
Write-Host "2. Security > Settings: Pastikan 'Browser Integrity Check' dalam posisi ON (Googlebot biasanya lolos otomatis)."
Write-Host "3. Cek Firewall Rules: Pastikan tidak ada Rule yang memblokir User-Agent 'Googlebot'."

Write-Host "`n--- Selesai Audit ---" -ForegroundColor Cyan