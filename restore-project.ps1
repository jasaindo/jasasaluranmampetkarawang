# --- CONFIGURATION ---
$ProjectName = "jasasaluranmampetkarawang"
$BackupFolder = "C:\Backups\$ProjectName" # Folder sumber cadangan

# 1. Cari file backup terbaru berdasarkan tanggal
$LatestBackup = Get-ChildItem -Path $BackupFolder -Filter "$ProjectName-*.zip" | 
                Sort-Object LastWriteTime -Descending | 
                Select-Object -First 1

if ($null -eq $LatestBackup) {
    Write-Host "ERROR: Tidak ada file cadangan ditemukan di $BackupFolder" -ForegroundColor Red
    exit
}

Write-Host "MEMULIHKAN: $($LatestBackup.Name)" -ForegroundColor Cyan

# 2. Pembersihan folder saat ini (Safety First)
Write-Host "Membersihkan folder proyek saat ini (Kecuali node_modules)..." -ForegroundColor Yellow
$ItemsToRemove = Get-ChildItem -Exclude "node_modules", ".git", "restore-project.ps1", "backup-project.ps1"
$ItemsToRemove | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

# 3. Ekstrak file cadangan
Write-Host "Ekstraksi file sedang berlangsung..." -ForegroundColor Yellow
Expand-Archive -Path $LatestBackup.FullName -DestinationPath (Resolve-Path .).Path -Force

# 4. Sinkronisasi Dependensi & Cache
Write-Host "Membersihkan cache Astro dan memperbarui pnpm..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .astro, dist -ErrorAction SilentlyContinue
pnpm install --frozen-lockfile

# 5. Verifikasi Akhir
Write-Host "-------------------------------------------" -ForegroundColor Green
Write-Host "PEMULIHAN BERHASIL!" -ForegroundColor Green
Write-Host "Project Name: $ProjectName"
Write-Host "Restore Date: $(Get-Date)"
Write-Host "Silakan jalankan 'pnpm run build' untuk tes." -ForegroundColor White
Write-Host "-------------------------------------------" -ForegroundColor Green