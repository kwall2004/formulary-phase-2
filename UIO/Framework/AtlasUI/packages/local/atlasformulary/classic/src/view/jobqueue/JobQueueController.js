Ext.define('Atlas.atlasformulary.view.jobqueue.JobQueueController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.formularyjobqueuecontroller',

  init: function () {
    var pagingBar = this.getView().down('#pagingBar');
    pagingBar.down('#refresh').setHandler(this.doHeadersReload, this);
  },

  doHeadersReload: function () {
    this.getViewModel().getStore('jobqueues').reload();
  },

  onUsersLoaded: function () {
    this.getViewModel().set('selectedUser', Atlas.user.un);
    this.onSearch();
  },

  onJobQueuesPaged: function (store, records) {
    var vm = this.getViewModel(),
      jobQueuesPaged = vm.getStore('jobqueuespaged');

    jobQueuesPaged.getProxy().setData(records);
    jobQueuesPaged.reload();
  },

  onSearch: function () {
    var me = this,
      vm = me.getViewModel(),
      user = this.getViewModel().get('selectedUser'),
      store = vm.getStore('jobqueues');

    if (!user) {
      delete store.getProxy().extraParams.userid;
    } else {
      store.getProxy().setExtraParam('userid', user);
    }

    store.load();
  },

  onJobClick: function () {
    var reportingURL = Atlas.apiReportURL,
      finalURL = reportingURL + '?%2fAtlas%2fFormulary%2fJobMessages&rs:Command=Render&operation_id=' + this.getView().selection.data.Actn +
        '&rc:Parameters=Collapsed';

    window.open(finalURL);
  },

  onDeleteJobClick: function () {
    var me = this,
      store = me.getViewModel().getStore('jobqueues'),
      proxy = store.getProxy(),
      job = this.getView().getSelection()[0];

    if (job) {
      proxy.setExtraParam('jobsk', job.get('JobSK'));
      Ext.Msg.show({
        title: 'Delete Job: Confirmation',
        message: 'Are you sure you want to delete <strong>Job #' + job.get('JobSK') + ' ?</strong>',
        buttons: Ext.Msg.YESNO,
        icon: Ext.Msg.QUESTION,
        fn: function (button) {
          if (button === 'yes') {
            Atlas.atlasformulary.data.proxy.FormularyAjax.request({
              method: 'DELETE',
              headers: {
                'sessionid': Atlas.sessionId,
                'username': Atlas.user.un
              },
              url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/jobqueue?jobsk=' + job.get('JobSK'),
              success: function () {
                Ext.toast('<strong>Job #' + job.get('JobSK') + '</strong> was successfully deleted.', 'Success');
                delete proxy.getExtraParams().jobsk;
                store.reload();
              },
              failure: function () {
                delete proxy.getExtraParams().jobsk;
              }
            });
          }
        }
      });
    }
  },

  onClearFiltersClick: function () {
    var grid = this.getView();
    var store = this.getViewModel().getStore('jobqueuespaged');

    grid.filters.clearFilters();
    store.clearFilter();
  },

  onDownloadClick: function (widget) {
    var filePath = widget.getViewModel().get('filePath');

    Atlas.atlasformulary.data.proxy.FormularyAjax.request({
      method: 'GET',
      binary: true,
      url: 'http://localhost:55229/formularyapi/api/fileexport?FilePath=' + filePath,
      headers: {
        sessionid: Atlas.sessionId,
        username: Atlas.user.un
      },
      success: function (response) {
        var blob = new Blob([response.responseBytes]);
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filePath.split('\\').pop().split('/').pop();
        link.click();
      }
    });
  }
});
