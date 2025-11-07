param(
  [string]$ProjectName = "SecureAuthRN",
  [string]$BaseUrl = "https://10.0.2.2:7200"
)

$ErrorActionPreference = "Stop"

Write-Host "==> Verificando herramientas..." -ForegroundColor Cyan
node -v | Out-Null
if ($LASTEXITCODE -ne 0) { Write-Error "Node.js no está instalado"; exit 1 }
dotnet --version | Out-Null
if ($LASTEXITCODE -ne 0) { Write-Error ".NET SDK no está instalado"; exit 1 }

Write-Host "==> Creando proyecto React Native $ProjectName ..." -ForegroundColor Cyan
# Usa la CLI oficial; si falla, intenta con la community CLI
try {
  npx react-native init $ProjectName --version 0.74.5 --skip-install
} catch {
  npx @react-native-community/cli@latest init $ProjectName --version 0.74.5 --skip-install
}

$projPath = Join-Path (Get-Location) $ProjectName
if (!(Test-Path $projPath)) { Write-Error "No se creó el proyecto RN"; exit 1 }

Write-Host "==> Copiando código fuente y configuraciones..." -ForegroundColor Cyan
Copy-Item -Recurse -Force "$PSScriptRoot\..\mobile_src\src" "$projPath\src"
Copy-Item -Force "$PSScriptRoot\..\mobile_src\tsconfig.json" "$projPath\tsconfig.json"
Copy-Item -Force "$PSScriptRoot\..\mobile_src\babel.config.js" "$projPath\babel.config.js"
Copy-Item -Force "$PSScriptRoot\..\mobile_src\index.js" "$projPath\index.js"
Copy-Item -Force "$PSScriptRoot\..\mobile_src\app.json" "$projPath\app.json"
Copy-Item -Force "$PSScriptRoot\..\mobile_src\package.json" "$projPath\package.json"

# Fix preset version if needed
$pkgPath = Join-Path $projPath "package.json"
$pkg = Get-Content $pkgPath -Raw | ConvertFrom-Json
if ($pkg.devDependencies."metro-react-native-babel-preset" -match "0.78") {
  $pkg.devDependencies."metro-react-native-babel-preset" = "^0.77.0"
  ($pkg | ConvertTo-Json -Depth 100) | Set-Content -Path $pkgPath -Encoding UTF8
}

Write-Host "==> Instalando dependencias npm..." -ForegroundColor Cyan
Push-Location $projPath
npm cache clean --force | Out-Null
npm install

# Dependencias base de navegación (por si se requieren)
npm i @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context

# Ajustar BASE_URL
$httpClient = Join-Path $projPath "src\infrastructure\services\httpClient.ts"
(Get-Content $httpClient).Replace("https://localhost:7200", $BaseUrl) | Set-Content $httpClient -Encoding UTF8

Pop-Location

Write-Host "==> Proyecto móvil listo en $projPath" -ForegroundColor Green
Write-Host "Para correr:"
Write-Host "  cd `"$ProjectName`""
Write-Host "  npx react-native start"
Write-Host "  npx react-native run-android"
