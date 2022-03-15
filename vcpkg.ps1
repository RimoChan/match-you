$vcpkgexe = (where.exe 'vcpkg')[0]
$vcpkgroot = Split-Path -Parent $vcpkgexe

Remove-Item -Recurse -Force -LiteralPath "$vcpkgroot\installed\","$vcpkgroot\buildtrees\"
# fking slaves get your axx back here
Write-Host '您配吗？'
