@echo off
cd /d "%~dp0.."
python -m pip install Pillow -q 2>nul
python scripts\generate-brand-assets.py
pause
