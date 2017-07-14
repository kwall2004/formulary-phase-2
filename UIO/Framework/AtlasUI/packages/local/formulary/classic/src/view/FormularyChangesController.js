/**
 * Created by mkorivi on 9/29/2016.
 */


Ext.define('Atlas.formulary.view.FormularyChangesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.formularychanges',
    init: function () {

        var view = this.getView();
        var vm = this.getViewModel();


        if (vm.get('Stat') == '3') {
            view.down('#approveFormulary').setDisabled(false);
            view.down('#rejectFormulary').setDisabled(false);
        }
        else if (vm.get('Stat') == '4') {
            view.down('#approveFormulary').setDisabled(false);
            view.down('#rejectFormulary').setDisabled(false);

        }
        else if (vm.get('Stat') == '1' || vm.get('Stat') == '2' || vm.get('Stat') == '5') {

            view.down('#approveFormulary').setDisabled(true);
            view.down('#rejectFormulary').setDisabled(true)

        }

        var storenotes = vm.get('storenotes');

        storenotes.getProxy().setExtraParam('pParentSystemID',  vm.get('systemID'));

        storenotes.load({
            scope: this,
            callback: function(records, operation, success) {
                // the operation object
                // contains all of the details of the load operation
                if (success) {
                    var strNotesJson = {};
                    var strNotes = '';
                    for (var i in records) {
                        strNotes += records[i].data.CreateUser + ' - ' + Ext.Date.format(new Date(records[i].data.CreateDate), 'm/d/Y')  + ' - ' + records[i].data.CreateTime + ": " + records[i].data.Subject + " - " + records[i].data.Note  +  '\r\n\r\n';
                    }
                    var view = this.getView();
                    var vm = this.getViewModel();


                    vm.set('NotesData', strNotes);

                }
            }
        });






        var storeformularychanges = vm.get('storeformularychanges');

        storeformularychanges.getProxy().setExtraParam('pcFormID', vm.get('FormularyID'));
        storeformularychanges.getProxy().setExtraParam('pcFormVsn', vm.get('FormularyVersion'));
        storeformularychanges.getProxy().setExtraParam('pcBatchSize', '500');
        storeformularychanges.load();
    },

    /*,
     onNotesLoad: function (store, records, success) {
            //debugger;
     },
     */


    onApproveButtonCLick: function () {
        var me = this,
            theView = me.getView(),
            vm = me.getViewModel();
        var action =  vm.set('Action','Approve' );
        this.createNotesWindow(action);


    },

    createNotesWindow: function(action)
    {
        var me = this,
            theView = me.getView(),
            vm = me.getViewModel(),
            win;
        var currentdate = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(),'m/d/Y');
        win = Ext.create('Ext.window.Window', {
            title: 'Notes',
            modal: true,
            scrollable: true,
            layout: 'vbox',
            viewModel:{
                parent: me.getViewModel()
            },
            itemId:'Formularynotes',
            xtype: 'FormularyNotes',
            height: 300,
            width: 500,
//            controller: me,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    layout: 'hbox',
                    items: [
                        {xtype: 'displayfield', fieldLabel: 'Date', name: 'Date',bind:{value :currentdate}},
                        {xtype: 'displayfield', fieldLabel: 'User', name: 'User', bind:{value :Atlas.user.un}}
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    style: {borderColor: 'black', borderStyle: 'solid'},
                    items: [
                        '->'
                        , {xtype: 'button', text: 'Save', iconCls: 'fa fa-save', handler: 'UpdateFormularyStatus', scope:this}
                        , {xtype: 'button', text: 'cancel', iconCls: 'fa fa-remove' ,handler: 'btn_Cancel'}
                    ]


                }
            ],
            items: [
                {xtype: 'datefield', fieldLabel: 'Eff. Date', name: 'EffDate', bind: {value: '{EffectiveDate}'}, itemid: 'EffectiveDate'},
                {xtype: 'textfield', fieldLabel: 'Subject', name: 'Subject', bind: {value: '{Action}' }, itemid: 'Action'},
                {xtype: 'textarea', fieldLabel: 'Description', name: 'Description', bind: {value: '{Description}'}, height: 130, width: 300}

            ]
        });
        this.getView().add(win);
        win.show()

    },
    onRejectButtonCLick: function () {
        var me = this,
            theView = me.getView(),
            vm = me.getViewModel();
        var action =  vm.set('Action','Reject' );

        this.createNotesWindow(action);

    },
    UpdateFormularyStatus: function (button) {
        var me = this;
        var stat = me.getViewModel().get('Stat');
        var action = me.getViewModel().get('Action');
        var effectiveDate = me.getViewModel().get('EffectiveDate');
        var deffectiveDate = new Date(effectiveDate);
        var msg='';
        if (action == 'Approve') {
            if (stat == "3")
                msg = 'Are you sure you want to submit the formulary for Medical Director approval?';

            if (stat == "4") {
                msg = 'Are you sure you want to approve the formulary effective ' + deffectiveDate + '?';
            }
        }
        if (action == 'Reject') {
            msg = 'Are you sure you want to reject the new formulary changes?';
        }
        Ext.Msg.confirm('Formulary Upload', msg,
            function (btn) {
                if (btn == 'yes') {
                    var newStatus = '';
                    var currentdate = Atlas.common.utility.Utilities.getLocalDateTime();
                    if (action != "Approve" && action != "Reject") {
                        Ext.MessageBox.alert("Formulary Management", "Invalid formulary action.", this.showResult, this);
                        return;
                    }
                    if (stat == '1' || stat == '2' || stat == '5') {
                        Ext.MessageBox.alert('Formulary Management', 'Invalid formulary status to Approve or Reject.', this.showResult, this);
                        return;
                    }
                    if (action == "Approve") {
                        if (effectiveDate == "") {
                            Ext.MessageBox.alert("Formulary Management", "Invalid formulary effective date.", this.showResult, this);
                            return;
                        }

                        if (deffectiveDate < currentdate) {
                            Ext.MessageBox.alert("Formulary Management", "Invalid formulary effective date.", this.showResult, this);
                            return;
                        }
                        if (stat != '3' && stat != '4') {
                            Ext.MessageBox.alert('Formulary Management', 'Invalid formulary version.', this.showResult, this);
                            return;
                        }
                        if (stat == '3') {
                            newStatus = '4'; // Pending MD Approval
                        }

                        if (stat == '4') {
                            newStatus = '2'; // Approved
                        }
                    }
                    if (action == "Reject") {
                        newStatus = "5"; // Rejected Status
                    }
                    var fieldList = 'ParentSystemID,Subject,Note,CreateUser,CreateDate,CreateTime';
                    var fields = me.getViewModel().get('systemID') + '|' + action + '|' + me.getViewModel().get('Description') + '|' + Atlas.user.un + '|' + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y') + '|' + '111';
                    var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
                    var extraParameters = {
                        'pcFormID': me.getViewModel().get('FormularyID'),
                        'pcFormVsn': me.getViewModel().get('FormularyVersion'),
                        'pStatusToBe': newStatus,
                        'pcEffDate': Ext.Date.format(deffectiveDate, 'm/d/Y')
                    };
                    var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'formulary/rx/changeformularystatus/update', null, [true], extraParameters,
                        saveAction, null);
                    var _iRetCode = parseInt(testReturn.code);
                    if (_iRetCode == 0) {
                        var extraParameters = {
                            'psystemId': me.getViewModel().get('systemID'),
                            'pMode': 'A',
                            'pFieldList': fieldList,
                            'pFields': fields
                        };
                        var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/Notes/update', null, [true], extraParameters,
                            saveAction, null);
                        var formularyinfodata = me.getViewModel().getParent().getStore('formularyinfodata');
                        formularyinfodata.load();
                        var win = Ext.WindowManager.getActive();
                        if (win) {
                            win.close();
                        }
                        Ext.MessageBox.alert("Formulary Management", 'Formulary has been successfully set to ' + action + '.', this.showResult, this);

                    }
                    else {
                        Ext.Msg.alert("Formulary Management", testReturn.message);
                    }
                }
            });
    },
    onExportButtonCLick:function(sender,e) {
        var view = this.getView();
        var grid = view.down('#gvFormularies');
        var store = grid.getStore();
        if (store.data.items.length > 0) {
            store.getProxy().setExtraParam('pcBatchSize',  0);
            Atlas.common.utility.Utilities.exportToExcel(store);
        }
        else {
            Ext.Msg.alert('PBM', 'No record found', Ext.emptyFn);
        }
    },
    btn_Cancel : function() {
        var view=this.getView();
        view.down('#Formularynotes').close();
    }


});

