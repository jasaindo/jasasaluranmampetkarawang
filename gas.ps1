Write-Host "
--- [1/4] Hard Reset: Menghapus Cache & Folder Build ---" -ForegroundColor Yellow
if (Test-Path "dist") { Remove-Item -Recurse -Force dist }
if (Test-Path ".astro") { Remove-Item -Recurse -Force .astro }

Write-Host "--- [2/4] Sinkronisasi Dependensi (pnpm install) ---" -ForegroundColor Cyan
pnpm install --frozen-lockfile

Write-Host "--- [3/4] Menjalankan Build Produksi AstroWind ---" -ForegroundColor Cyan
pnpm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "--- [4/4] Build Sukses! Mengirim ke GitHub ---" -ForegroundColor Green
    git add .
    $tanggal = Get-Date -Format 'dd-MM-yyyy HH:mm'
    git commit -m "update: $tanggal (Hard Reset Cache & Build Sukses)"
    git push origin main
    Write-Host "
DONE! Cek progres di Cloudflare Pages Dashboard." -ForegroundColor Magenta
} else {
    Write-Host "
[!] ERROR: Build Gagal. Perbaiki kode sebelum push!" -ForegroundColor Red
    exit 1
}
