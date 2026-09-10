param(
    [string]$Root = "C:\Projets\portefolio"
)

$replacements = @{
    'Weidler <span>Studio</span>' = 'Francis <span>Manseau</span>'
    'Weidler Studio' = 'Francis Manseau'
    'François Weidler' = 'Francis Manseau'
    'weidlerstudio.com' = ''
}

$htmlFiles = Get-ChildItem -Path $Root -Recurse -Include *.html -File |
    Where-Object { $_.FullName -notmatch '\\_overlay\\' }

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $original = $content
    foreach ($key in $replacements.Keys) {
        $content = $content.Replace($key, $replacements[$key])
    }
    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
    }
}

$localePath = Join-Path $Root 'locales\fr.json'
if (Test-Path $localePath) {
    $json = Get-Content -Path $localePath -Raw -Encoding UTF8
    $json = $json.Replace('"studioName": "Weidler Studio"', '"studioName": "Francis Manseau"')
    $json = $json.Replace('© 2026 Weidler Studio', '© 2026 Francis Manseau')
    Set-Content -Path $localePath -Value $json -Encoding UTF8 -NoNewline
}

if (Test-Path (Join-Path $Root 'CNAME')) {
    Remove-Item (Join-Path $Root 'CNAME') -Force
}

Write-Host "Branding applique sur $($htmlFiles.Count) fichiers HTML."
