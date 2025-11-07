Write-Host "==> Ejecutando backend .NET 8" -ForegroundColor Cyan
$apiPath = Join-Path (Get-Location) "backend\SecureAuth.Api"
if (!(Test-Path $apiPath)) { Write-Error "No se encontró backend\SecureAuth.Api"; exit 1 }
Push-Location $apiPath
dotnet restore
dotnet run
Pop-Location
