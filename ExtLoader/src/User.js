//By defining properties in the config declaration we get functions for getEmail, setEmail, etc
//See example 2 for sample usage
Ext.define('User', {
    config: {
        email: '',
        isSuper: false
    }
});