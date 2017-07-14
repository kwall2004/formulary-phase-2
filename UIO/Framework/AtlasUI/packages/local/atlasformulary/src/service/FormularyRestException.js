Ext.define('Atlas.atlasformulary.service.FormularyRestException', {
  singleton: true,

  exception: function (response) {
    var titleMsg = 'Error',
      msg = '<p>An unexpected error has occurred.</p>',
      errorDetail = Ext.JSON.decode(response.responseText);

    if (response) {
      switch (response.status) {
        case 400:
        case 401:
        case 403:
        case 404:
        case 405:
        case 500:
        case 0:
          if (errorDetail) {
            if (errorDetail.ExceptionCode) {
              titleMsg = 'Error ' + errorDetail.ExceptionCode;
            }

            if (errorDetail.FriendlyMessage) {
              msg = '<p>' + errorDetail.FriendlyMessage + '</p>';
            }
          } else {
            msg = '<p>' + response.statusText + '</p>';
          }

          Ext.Msg.show({
            title: titleMsg,
            message: msg,
            iconCls: 'x-fa fa-exclamation-circle',
            buttons: Ext.Msg.OK,
            fn: Ext.emptyFn
          });
          break;
        case 200:
        case 201: // TODO: Remove this once we've determined that all REST calls return proper value for success.
          break;
        default:
          throw new Error('Unexpected status (' + response.status + ')');
      }
    }
  },

  reload: function () {
    document.location.reload();
  }
});