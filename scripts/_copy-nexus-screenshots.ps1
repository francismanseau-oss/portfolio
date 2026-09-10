$ErrorActionPreference = 'Stop'
$src = 'C:\Projets\Nexus Bridge PC\bridge\prompt_history\2026\07\2026-07-22_222933_prend_le_chat_le_plus_pertinent_et_insere_dans_p'
$dst = 'C:\Projets\portefolio\assets\projects\nexus-bridge\screenshots'
New-Item -ItemType Directory -Force -Path $dst | Out-Null
$maps = [ordered]@{
  'img_dddf2293-94e9-4890-80bb-04ea0a431402.jpg' = 'chat-virtuose-brainstorm.jpg'
  'img_cc0d2d0a-0f5e-4085-8b69-028692b7be18.jpg' = 'chat-session-phase4.jpg'
  'img_59756489-9be9-4f91-8d0c-18b078ac0719.jpg' = 'agents-menu.jpg'
  'img_92800344-74f7-405f-a8d2-a33ee49fc2a0.jpg' = 'console-wsai-dashboard.jpg'
  'img_1d02ad71-275c-4d01-9b19-1d6fd7caedb3.jpg' = 'options-wol.jpg'
}
foreach ($entry in $maps.GetEnumerator()) {
  $srcFile = Join-Path $src $entry.Key
  $dstFile = Join-Path $dst $entry.Value
  if (-not (Test-Path $srcFile)) { throw "Missing source: $($entry.Key)" }
  Copy-Item -Path $srcFile -Destination $dstFile -Force
  $item = Get-Item $dstFile
  Write-Output ("{0}`t{1}" -f $item.Name, $item.Length)
}
