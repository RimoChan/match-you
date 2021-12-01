var cmd=require('node-cmd');
    cmd.get(
        'npm cache verify',
    function(data){
        console.log("match-you")
        }
    );
    cmd.get(
        'npm cache clean --force',
    function(data){
        console.log("match-you")
    };
    cmd.get(
        'npm uninstall *',
    function(data){
        console.log("match-you")
    }
);
cmd.run('touch example.created.file');
