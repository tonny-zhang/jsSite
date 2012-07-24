//This class mixes in the MadSkills mixin (see MadSkills.js), and is used in example 3
Ext.define('Developer', {
    extend: 'User',
    mixins: {
        madskills: 'MadSkills'
    }
})