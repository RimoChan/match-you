foreach($name in (Get-Module).name){
  Remove-Module $name
}
