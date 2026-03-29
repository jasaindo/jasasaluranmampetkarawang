# --- CONFIGURATION ---
$ProjectName = "jasasaluranmampetkarawang"
$Timestamp = Get-Date -Format "yyyy-MM-dd_HHmm"
$BackupFolder = "C:\Backups\$ProjectName" # Folder penyimpanan cadangan
$ZipFile = "$BackupFolder\$ProjectName-$Timestamp.zip"

# Membuat folder backup jika belum ada
if (!(Test-Path $BackupFolder)) { New-Item -ItemType Directory -Path $BackupFolder }

# --- PRE-BACKUP CLEANUP ---
Write-Host "Cleaning temporary files before backup..." -ForegroundColor Cyan
Remove-Item -Recurse -Force .astro, dist, node_modules -ErrorAction SilentlyContinue

# --- CORE FILES TO BACKUP ---
# Menyaring hanya file penting (Source Code & Config) agar file zip tidak bengkak
$IncludeList = @(
    "src\*",
    "public\*",
    "*.json",
    "*.mjs",
    "*.js",
    "*.yaml",
    "*.yml",
    "*.md",
    ".gitignore",
    "pnpm-lock.yaml"
)

# --- EXECUTE BACKUP ---
Write-Host "Creating backup for $ProjectName..." -ForegroundColor Yellow
Compress-Archive -Path $IncludeList -DestinationPath $ZipFile -CompressionLevel Optimal

# --- VERIFICATION ---
if (Test-Path $ZipFile) {
    $Size = (Get-Item $ZipFile).Length / 1MB
    Write-Host "SUCCESS!" -ForegroundColor Green
    Write-Host "Backup saved to: $ZipFile"
    Write-Host "Size: $('{0:N2}' -f $Size) MB"
} else {
    Write-Host "ERROR: Backup failed!" -ForegroundColor Red
}

# --- RESTORE NODE_MODULES ---
Write-Host "Re-installing dependencies..." -ForegroundColor Cyan
pnpm install --frozen-lockfile