Ext.define('Atlas.home.xclassview.JobQueueAlertController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xclassjobqueuealert',

    init: function() {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            jobQueueStore = vm.getStore('jobqueuealert'),
            proxy = jobQueueStore.getProxy();

        proxy.setExtraParam('pWhere', "submittedBy='" + Atlas.user.un + "' and (jobStatus='Complete' or jobStatus='Failed')");

        jobQueueStore.load();
    },

    onPrintClick: function(view, rowIndex, colIndex, item, e, record, row) {
           var documentID = record.get('documentID');
          Atlas.common.utility.Utilities.viewDocument(documentID, null);
    },

    onItemDblClick: function(dataview, record, item, index, e, eOpts) {
        //console.log('Print PDF Double Clicked: ' + record.data.description);
    }
});