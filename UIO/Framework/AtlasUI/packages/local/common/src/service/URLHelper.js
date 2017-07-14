Ext.define('Atlas.common.service.URLHelper', {
    singleton: true,
    alias: 'service.URLHelper',
    getBaseUrl: function() {
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + '//' + getUrl.host + '/';
        return baseUrl;
    }
});
