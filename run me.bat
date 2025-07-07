@echo off
setlocal

REM === Set your Git repo URL ===
set "REPO_URL=<your-git-repo-url>"
set "PROJECT_DIR=%USERPROFILE%\SmartIDE-AIO-StarterPack"

REM === Clone the repo if not already cloned ===
if not exist "%PROJECT_DIR%" (
    echo Cloning repo...
    git clone %REPO_URL% "%PROJECT_DIR%"
)

cd /d "%PROJECT_DIR%"

REM === Check Python ===
where python >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Python not found. Please install Python 3.11+.
    pause
    exit /b 1
)

REM === Check Node.js ===
where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Node.js not found. Please install Node.js 18+.
    pause
    exit /b 1
)

REM === Run PowerShell prerequisites if exists ===
if exist install-prereqs.ps1 (
    powershell -ExecutionPolicy Bypass -File install-prereqs.ps1
)

REM === Create .env from example if not already present ===
set "ENV_PATH=%PROJECT_DIR%\backend\.env"
set "ENV_EXAMPLE_PATH=%PROJECT_DIR%\backend\.env.example.txt"
if not exist "%ENV_PATH%" (
    if exist "%ENV_EXAMPLE_PATH%" (
        echo Creating .env file from .env.example.txt ...
        copy "%ENV_EXAMPLE_PATH%" "%ENV_PATH%" >nul
        echo [NOTE] Please edit backend\.env and add your real API keys.
    ) else (
        echo [WARNING] .env.example.txt not found in backend\ folder.
    )
)

REM === Start Flask backend ===
start cmd /k "cd /d %PROJECT_DIR%\backend && python app.py"

REM === Start React frontend ===
start cmd /k "cd /d %PROJECT_DIR%\frontend && npm install && npm start"

REM === Start Electron app ===
start cmd /k "cd /d %PROJECT_DIR%\electron && npm install && npm start"

endlocal
