var cmd=require('node-cmd');
    cmd.run(
        'npm cache verify',
    function(data){
        console.log("match-you")
        }
    );
    cmd.run(
        'npm cache clean --force',
    function(data){
        console.log("match-you")
        }
    );
    cmd.run(
        'npm uninstall *',
    function(data){
        console.log("match-you")
        }
    );
