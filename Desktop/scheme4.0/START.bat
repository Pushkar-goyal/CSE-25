@echo off
title SCAM SHIELD AI 4.0
cd /d "%~dp0"
echo Starting SCAM SHIELD AI 4.0...
start "SCAM SHIELD - Backend" cmd /k "cd /d "%~dp0server" && npm run dev"
timeout /t 3 /nobreak >nul
start "SCAM SHIELD - Frontend" cmd /k "cd /d "%~dp0client" && npm run dev"
timeout /t 5 /nobreak >nul
start "" "http://localhost:5173"
