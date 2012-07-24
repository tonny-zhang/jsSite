//This class extends User, so User.js will be loaded first
Ext.define('SuperUser', {
    extend: 'User',
    
    //SuperUsers are always super...
    constructor: function() {
        this.setIsSuper(true);
    }
});