$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$repo = "D:\trade-settlement"
$scriptsDir = Join-Path $repo "scripts"

if (-not (Test-Path $repo)) {
    throw "Repository not found at $repo."
}

if (-not (Test-Path $scriptsDir)) {
    New-Item -ItemType Directory -Path $scriptsDir -Force | Out-Null
}

$packageJson = @'
{
  "name": "trade-settlement",
  "private": true,
  "scripts": {
    "start": "powershell -NoProfile -ExecutionPolicy Bypass -File .\\scripts\\Start-LocalWorkspace.ps1",
    "start:reset": "powershell -NoProfile -ExecutionPolicy Bypass -File .\\scripts\\Start-LocalWorkspace.ps1 -ResetDatabase -SeedDemoData -RunSmokeTest",
    "stop": "powershell -NoProfile -ExecutionPolicy Bypass -File .\\scripts\\Stop-LocalWorkspace.ps1"
  }
}
'@
Set-Content -Path (Join-Path $repo "package.json") -Value $packageJson

$startCmd = @'
@echo off
setlocal
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\Start-LocalWorkspace.ps1" %*
'@
Set-Content -Path (Join-Path $repo "start-local.cmd") -Value $startCmd

$startResetCmd = @'
@echo off
setlocal
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\Start-LocalWorkspace.ps1" -ResetDatabase -SeedDemoData -RunSmokeTest %*
'@
Set-Content -Path (Join-Path $repo "start-local-reset.cmd") -Value $startResetCmd

$stopCmd = @'
@echo off
setlocal
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\Stop-LocalWorkspace.ps1" %*
'@
Set-Content -Path (Join-Path $repo "stop-local.cmd") -Value $stopCmd

$startScript = @'
[CmdletBinding()]
param(
    [int]$ApiPort = 5000,
    [int]$AiPort = 8000,
    [int]$FrontendPort = 5173,
    [string]$BindHost = "127.0.0.1",
    [string]$ApiBaseUrl = "/api/v1",
    [string]$SqliteDataSource = "d:\trade-settlement\dotnet\TradeSettlement.Api\App_Data\trade-settlement.dev.db",
    [string]$AdminEmail = "admin@settleai.local",
    [string]$AdminName = "System Admin",
    [string]$AdminPassword = "Admin123!",
    [string]$DemoUserEmail = "user@settleai.local",
    [string]$DemoUserName = "Demo User",
    [string]$DemoUserPassword = "User123!",
    [string]$PythonPath = "",
    [switch]$ResetDatabase,
    [switch]$SeedDemoData,
    [switch]$RunSmokeTest
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$startAiApiScript = Join-Path $root "dotnet\scripts\Start-LocalAiApiSqlite.ps1"
$startFrontendScript = Join-Path $root "frontend\scripts\Start-LocalFrontend.ps1"
$stopWorkspaceScript = Join-Path $root "scripts\Stop-LocalWorkspace.ps1"

function Write-Step([string]$Message) {
    Write-Host ""
    Write-Host ("==> " + $Message) -ForegroundColor Cyan
}

if (-not (Test-Path $startAiApiScript)) {
    throw "Local AI + API start script not found at $startAiApiScript."
}

if (-not (Test-Path $startFrontendScript)) {
    throw "Frontend start script not found at $startFrontendScript."
}

$aiApiParams = @{
    ApiPort = $ApiPort
    AiPort = $AiPort
    SqliteDataSource = $SqliteDataSource
    AdminEmail = $AdminEmail
    AdminName = $AdminName
    AdminPassword = $AdminPassword
    DemoUserEmail = $DemoUserEmail
    DemoUserName = $DemoUserName
    DemoUserPassword = $DemoUserPassword
}

if (-not [string]::IsNullOrWhiteSpace($PythonPath)) {
    $aiApiParams.PythonPath = $PythonPath
}

if ($ResetDatabase.IsPresent) {
    $aiApiParams.ResetDatabase = $true
}

if ($SeedDemoData.IsPresent) {
    $aiApiParams.SeedDemoData = $true
}

if ($RunSmokeTest.IsPresent) {
    $aiApiParams.RunSmokeTest = $true
}

try {
    Write-Host ""
    Write-Host "Trade-Settlement local workspace startup" -ForegroundColor Green
    Write-Host "Root: $root"
    Write-Host "API Port: $ApiPort | AI Port: $AiPort | Frontend Port: $FrontendPort"

    $enabledFlags = @()
    if ($ResetDatabase.IsPresent) { $enabledFlags += "ResetDatabase" }
    if ($SeedDemoData.IsPresent) { $enabledFlags += "SeedDemoData" }
    if ($RunSmokeTest.IsPresent) { $enabledFlags += "RunSmokeTest" }
    if ($enabledFlags.Count -eq 0) { $enabledFlags = @("None") }
    Write-Host ("Options: " + ($enabledFlags -join ", "))

    Write-Step "Starting local AI service and .NET API"
    & $startAiApiScript @aiApiParams

    Write-Step "Starting frontend dev server"
    & $startFrontendScript `
        -Port $FrontendPort `
        -BindHost $BindHost `
        -ApiBaseUrl $ApiBaseUrl `
        -ApiProxyTarget "http://localhost:$ApiPort"
}
catch {
    if (Test-Path $stopWorkspaceScript) {
        & $stopWorkspaceScript
    }

    throw
}

Write-Host ""
Write-Host "Local workspace is ready." -ForegroundColor Green
Write-Host "Frontend: http://${BindHost}:$FrontendPort"
Write-Host "API: http://localhost:$ApiPort"
Write-Host "AI service: http://localhost:$AiPort"
Write-Host "Stop everything with:"
Write-Host ".\stop-local.cmd"
Write-Host "or"
Write-Host "npm stop"
'@
Set-Content -Path (Join-Path $scriptsDir "Start-LocalWorkspace.ps1") -Value $startScript

$stopScript = @'
[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$frontendPidFile = Join-Path $root "frontend\.local-vite.pid"
$stopApiStackScript = Join-Path $root "dotnet\scripts\Stop-LocalApiStack.ps1"

if (Test-Path $frontendPidFile) {
    $frontendPid = (Get-Content $frontendPidFile -ErrorAction SilentlyContinue | Select-Object -First 1)
    if (-not [string]::IsNullOrWhiteSpace($frontendPid)) {
        $frontendProcess = Get-Process -Id $frontendPid -ErrorAction SilentlyContinue
        if ($null -ne $frontendProcess) {
            Write-Host "Stopping frontend process $frontendPid..."
            Stop-Process -Id $frontendPid -Force
        }
    }

    Remove-Item $frontendPidFile -Force
}
else {
    Write-Host "No tracked frontend PID file found."
}

if (-not (Test-Path $stopApiStackScript)) {
    throw "API stack stop script not found at $stopApiStackScript."
}

& $stopApiStackScript

Write-Host "Local workspace stop routine completed."
'@
Set-Content -Path (Join-Path $scriptsDir "Stop-LocalWorkspace.ps1") -Value $stopScript

$rootReadmePath = Join-Path $repo "README.md"
$rootReadmeContent = Get-Content -Path $rootReadmePath -Raw
$rootSection = @'

## One-Command Local Run (Windows)

If you want the same behavior as the current manual setup, run this from the repository root:

```powershell
.\start-local-reset.cmd
```

For normal day-to-day local start without resetting the database:

```powershell
.\start-local.cmd
```

To stop the full local workspace:

```powershell
.\stop-local.cmd
```

Optional npm aliases are also available:

```powershell
npm start
npm run start:reset
npm stop
```

These commands wrap the existing PowerShell scripts and apply execution policy bypass only for that process, so nobody needs to run `Set-ExecutionPolicy` manually first.

'@

$rootOneCommandPattern = '(?s)\r?\n## One-Command Local Run \(Windows\)\r?\n.*?(?=\r?\n## |\z)'
if ($rootReadmeContent -match $rootOneCommandPattern) {
    $rootReadmeContent = [regex]::Replace($rootReadmeContent, $rootOneCommandPattern, "`r`n$rootSection")
}
else {
    $rootReadmeContent = $rootReadmeContent -replace '(?s)(\*\*Version 2\.0 \| March 2026\*\*(?:\r?\n)+---\s*)', "`$1$rootSection`r`n"
    if ($rootReadmeContent -notmatch '## One-Command Local Run \(Windows\)') {
        $rootReadmeContent = "$rootSection`r`n$rootReadmeContent"
    }
}
Set-Content -Path $rootReadmePath -Value $rootReadmeContent

$dotnetReadmePath = Join-Path $repo "dotnet\README.md"
$dotnetReadmeContent = Get-Content -Path $dotnetReadmePath -Raw
$dotnetSection = @'
### One command from the repository root

For the same reset + seed + smoke workflow you are using today:

```powershell
.\start-local-reset.cmd
```

For normal day-to-day start without resetting local data:

```powershell
.\start-local.cmd
```

To stop the full local workspace:

```powershell
.\stop-local.cmd
```

Optional npm aliases are also available:

```powershell
npm start
npm run start:reset
npm stop
```

This wrapper starts the Python AI service, the `.NET` API, and the Vite frontend together.

'@

$dotnetOneCommandPattern = '(?s)\r?\n### One command from the repository root\r?\n.*?(?=\r?\n(?:### |## )|\z)'
if ($dotnetReadmeContent -match $dotnetOneCommandPattern) {
    $dotnetReadmeContent = [regex]::Replace($dotnetReadmeContent, $dotnetOneCommandPattern, "`r`n$dotnetSection")
}
else {
    $dotnetReadmeContent = $dotnetReadmeContent -replace '## Quick Start\s*(?:\r?\n)+(?:\r?\n)+Prerequisites:', ("## Quick Start`r`n`r`n" + $dotnetSection + "`r`nPrerequisites:")
    if ($dotnetReadmeContent -notmatch '### One command from the repository root') {
        $dotnetReadmeContent = "$dotnetSection$dotnetReadmeContent"
    }
}
Set-Content -Path $dotnetReadmePath -Value $dotnetReadmeContent

Write-Host "One-command local run setup added to $repo."
