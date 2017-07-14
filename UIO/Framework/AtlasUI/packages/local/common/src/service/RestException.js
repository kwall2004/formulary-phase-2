Ext.define('Atlas.common.service.RestException', {
    singleton: true,

    exception: function exception (proxy, response, operation) {
        var titleMsg = '',
            action = '',
            msg = '',
            fn = this.reload;

        if (operation) {
            switch (operation.action) {
                case 'read':
                    action = 'read';
                    break;
                case 'create':
                case 'update':
                    action = 'save';
                    break;
                case 'destroy':
                    action = 'delete';
                    break;
                default:
                    action = operation.action;
            }
        }

        if (response) {
            switch (response.status) {
                case 400:
                case 401:
                case 403:
                case 404:
                case 405:
                case 500:
                    var errorDetail = Ext.JSON.decode(response.responseText);
                    titleMsg = 'Error ' + response.status + ' ' + response.statusText;
                    msg = '<br/>Triggered by:<br/>' + response.request.method + ' ' + response.request.url + '<br/><br/>' + errorDetail.Message;
                    break;
                case 200:
                    break;
                default:
                    return false;
            }
            Ext.Msg.show({
                title: titleMsg,
                message: msg,
                iconCls: 'x-fa fa-exclamation-circle',
                buttons: Ext.Msg.OK,
                fn: Ext.emptyFn
            });
        }
    },

    reload: function () {
        document.location.reload();
    },

    getParameterByName: function (name, url) {
        if (!url) { url = window.location.href; }
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i'),
            results = regex.exec(url);
        if (!results) { return null; }
        if (!results[2]) { return '';}
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },

    clearTokensAndReturnToLogin: function () {
        localStorage.removeItem('user-token');
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
        this.reload();
    }
});
