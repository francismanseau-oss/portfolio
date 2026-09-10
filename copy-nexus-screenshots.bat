@echo off
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\_copy-nexus-screenshots.ps1"
if errorlevel 1 pause
