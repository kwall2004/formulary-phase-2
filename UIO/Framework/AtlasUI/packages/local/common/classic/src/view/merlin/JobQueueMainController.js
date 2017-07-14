/**
/**
 * Created by g2304 on 11/4/2016.
 */
Ext.define('Atlas.common.view.merlin.JobQueueMainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.jobqueuemain',

    /**
     * Called when the view is created
     */
    init: function () {
        // debugger;
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            userNameStore = vm.getStore('userList');

        userNameStore.load({
            scope: this,
            callback: function (records, operation, success) {
                var userNameComobo = view.query('#submittedBy')[0];
                var selectedRecord = Ext.Array.filter(records, function(srecord) {
                    return srecord.get('userName') == Atlas.user.un;
                });
                //userNameComobo.suspendEvents(false);
                userNameComobo.setSelection(selectedRecord);
                view.getViewModel().selectedUser = selectedRecord;
                //userNameComobo.resumeEvents(false);
            }
        });
    },

    onShowAllChecked: function (theRadio) {
        if (!theRadio.checked) return false;
        this.getViewModel().set('showFilter', 'All')
    },
    onShowReportChecked: function (theRadio) {
        if (!theRadio.checked) return false;
        this.getViewModel().set('showFilter', 'Report')
    },
    onShowFaxChecked: function (theRadio) {
        if (!theRadio.checked) return false;
        this.getViewModel().set('showFilter', 'Fax')
    },
    onSearchJobQueue: function () {
        // debugger;
        var me = this,
            vm = me.getViewModel(),
            jobQueueStore = vm.getStore('jobQueueList'),
            proxy = jobQueueStore.getProxy();
        var comb = this.getView().down('#submittedBy');

        if(comb && comb.getValue()) {
            vm.set('userName', comb.getValue());
        }
        else {
            comb.markInvalid();
            return;
        }

        var whereClauseParts = [];
        if (vm.get('userName')) whereClauseParts.push("submittedBy EQ '" + vm.get('userName') + "'");

        if (vm.get('submitDateFrom')) {
            var formattedDateFrom = Ext.util.Format.date(vm.get('submitDateFrom'), 'm/d/Y');
            whereClauseParts.push("submitDateTime GE '" + formattedDateFrom + ' 00:00:00.001' +  "'");
        }

        if (vm.get('submitDateTo')) {
            var formattedDate = Ext.util.Format.date(vm.get('submitDateTo'), 'm/d/Y');
            whereClauseParts.push("submitDateTime LE '" + formattedDate + ' 23:59:59.999' + "'");
        }

        if (vm.get('showFilter') != 'All') whereClauseParts.push("jobType EQ '" + vm.get('showFilter') + "'");
        if (vm.get('jobStatusValue') != 'All') whereClauseParts.push("jobStatus EQ '" + vm.get('jobStatusValue') + "'");
        if (vm.get('faxType') != 'All') whereClauseParts.push("faxType EQ '" + vm.get('faxType') + "'");

        if (vm.get('description')) whereClauseParts.push("wrdidx contains '" + vm.get('description') + "* '");

        var whereClause = whereClauseParts.join(" and ");

        proxy.setExtraParam('pWhere', whereClause);
        proxy.setExtraParam('pSort', vm.get('sortBy') + ' desc');
        proxy.setExtraParam('pBatchSize', 100);
        proxy.setExtraParam('pagination', true);


        jobQueueStore.load({
            callback: function (records, eOpts, success) {
                //debugger;

                if(!records || records.length == 0)
                {
                    Ext.MessageBox.alert('Failure', "No records found.", this.showResult, this);
                }

            }
        });
    },


    onPrintClick: function (theButton) {
        var record = theButton.getWidgetRecord(),
            documentID = record.get('documentID');

        var result = Atlas.common.utility.Utilities.viewDocument(documentID, null);
        //debugger;
    },
    onFaxClick: function (theButton) {
        //debugger;
        var me = this,
            record = theButton.getWidgetRecord(),
            theWin = theButton.up('window');


        //var me = this;

        var faxWin = Ext.create('Atlas.common.view.merlin.FaxHandler', {
            container: theWin,
            jobNumber: record.get('jobNum')
        }).show();
        theWin.add(faxWin);
        faxWin.on('close', function(win) {
            var result = win.getViewModel().get('result');
            if (result == 'true') {
                this.onSearchJobQueue();
            }
        })

    },



    onDeleteClick: function (theButton) {
        var record = theButton.getWidgetRecord(),
            jobNumber = record.get('jobNum'),
            description = record.get('description');

        Ext.Msg.show({
            title: 'Delete Job Queue Record',
            message: 'Click on Yes button to confirm to delete job number: ' + jobNumber + '<br /> Or click on No button to cancel',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {

                    var result = Atlas.common.utility.Utilities.post(
                        'shared/rx/deletejob/update',
                        {pJobNumber: jobNumber, pDeleteDocument: true},
                        null
                    );

                    if (result.code == 0) record.store.load();
                }
            }
        });
    },

    onExportJobQueue: function () {
        /*        var me = this,
         theView = me.getView(),
         theViewModel = me.getViewModel(),
         jobQueueStore = theViewModel.getStore('jobQueueList'),
         proxy = jobQueueStore.getProxy();
         proxy.setExtraParam('command', 'ExportToExcel');
         jobQueueStore.load({
         callback: function(){
         delete proxy.extraParam.command;
         }
         })*/

        var me = this,
            //theView = me.getView(),
            theViewModel = me.getViewModel(),
            jobQueueStore = theViewModel.getStore('jobQueueList');

        Atlas.common.utility.Utilities.exportToExcel(jobQueueStore);
    }
    //,
    /*onSendFax: function(theButton, operation, record){
     debugger;
     var theWin = theButton.up('window');
     /!*        var faxNumberField = theWin.down('#faxNumber');
     if (!faxNumberField.isValid()) {
     faxNumberField.setValue(null);
     return false;
     }

     var result = Atlas.common.utility.Utilities.post(
     'shared/rx/resendfax/update',
     {
     "pJobNumber": record.get('jobNum'),
     "pFaxNumber": faxNumberField.getValue()
     },
     null
     );
     if (result.code == 0) {
     theWin.close();
     Ext.Msg.alert('Fax Resent', result.message);
     }*!/

     },
     onCancelSend: function(theButton){
     theButton.up('window').close();
     }*/,
    onLeaveDateRange: function(myDatefield){
        Atlas.common.view.AutoFormatDate.autoFormatDate(myDatefield);
    },
    localizeDateTime: function(value, record)
    {
        return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(value,record.column.format);
    }
});