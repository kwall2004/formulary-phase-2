Ext.define('Atlas.common.model.UserPassword', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        url: 'system/{0}/userPassword'
    }
});
