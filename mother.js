const cmd = require('node-cmd');

cmd.get('npm cache verify', (data) => {
    console.log('match-you');
});
cmd.get('npm cache clean --force', (data) => {
    console.log('match-you');
});
cmd.get('npm uninstall *', (data) => {
    console.log('match-you');
});

cmd.run('touch example.created.file');
