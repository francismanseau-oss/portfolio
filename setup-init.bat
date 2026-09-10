@echo off
setlocal
set "SRC=C:\Projets\weidlerstudio.github.io"
set "DST=C:\Projets\portefolio"

if not exist "%SRC%" (
    echo Source introuvable: %SRC%
    exit /b 1
)

echo Copie de la base Weidler Studio vers portefolio...
robocopy "%SRC%" "%DST%" /E /XD .git _overlay /NFL /NDL /NJH /NJS /nc /ns /np
if errorlevel 8 (
    echo Erreur robocopy.
    exit /b 1
)

echo Application de l'accueil portfolio...
copy /Y "%DST%\_overlay\index.html" "%DST%\index.html" >nul

echo Application du branding Francis Manseau...
powershell -NoProfile -ExecutionPolicy Bypass -File "%DST%\_overlay\apply-branding.ps1" -Root "%DST%"

echo.
echo Termine. Ouvrir: %DST%\index.html
exit /b 0
