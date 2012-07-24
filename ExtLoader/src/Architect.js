//This extends Developer, which in turn extends User. Because User mixes in the MadSkills mixin, that file is loaded 
//in addition to the LeetSkills and CommitReverter files defined in this file. This is the deepest example of dependency
//loading in this demo, requiring a total of 6 classes.
//Real-world applications can define dependency graphs to any level and leave Ext JS to figure out how to load them
Ext.define('Architect', {
    extend: 'Developer',
    mixins: {
        leetskills: 'LeetSkills'
    },
    requires: ['CommitReverter'],
    
    constructor: function() {
        this.reverter = Ext.create('CommitReverter');
        this.reverter.setUrl('secretRepo.git');
    },
    
    revertCommits: function(count) {
        this.reverter.revertCommits(count);
    }
});