//This is a fictional supporting class used by the Architect class to revert changes to a repository
Ext.define('CommitReverter', {
    config: {
        url: ''
    },
    
    revertCommits: function(count) {
        alert('Reverted ' + count + (count == 1 ? ' change' : ' changes'));
    }
});