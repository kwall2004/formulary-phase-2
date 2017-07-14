Ext.define('Atlas.portals.provider.Vendor835ViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.portalsprovidervendor385',

  init: function () {
    var me = this;

    Ext.on('resize', function () {
      if (null !== me.getView()) {
        me.getView().center();
      }
    });
  },

  onDownloadClick: function () {
    var dlink = document.createElement('a'),
      data = this.getViewModel().get('txt835'),
      ie = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/),
      blob = new Blob([data], {
        type: 'octet/stream'
      }),
      url = window.URL.createObjectURL(blob);

    if (null === ie) {
      document.body.appendChild(dlink);
      dlink.style = 'display: none';
      dlink.href = url;
      dlink.download = '835.txt';
      dlink.click();
      window.URL.revokeObjectURL(url);
    } else {
      window.navigator.msSaveBlob(blob, '835.txt');
    }
  },

  onCancelClick: function () {
    this.getView().destroy();
  }
});