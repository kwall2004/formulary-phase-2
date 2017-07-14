Ext.define('Atlas.member.view.MemLocksController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.memlocks',

    listen: {
        controller: {
            'member': {
                MemberChange: 'refreshMemLocks'
            },
            'memlocksmedicationcontroller': {
                loadStoreData: 'loadStoreData'
            },
            'memlockspharmacycontroller': {
                loadStoreData: 'loadStoreData'
            },
            'memlocksprescribercontroller': {
                loadStoreData: 'loadStoreData'
            }
        }
    },
    loadStoreData: function () {
        var me = this,
            view = me.getView(),
            viewModel = me.getViewModel().getParent(),
            masterRecord = viewModel.get('masterrecord');
        if (masterRecord !== null) {
            var recipientID = masterRecord.recipientID;
            me.loadPharmacyLocks(recipientID);
            me.loadPrescriberLocks(recipientID);
            me.loadMedicationLocks(recipientID);
            me.loadDEALocks(recipientID);
            me.CheckMemberLocksAllowed(recipientID);
        }
    },
    CheckMemberLocksAllowed: function (recipientID) {
        var bActiveCoverageAvailable = false;
        var me = this,
            view = me.getView();
        var sbAllowMemberLocks = "";
        var sDisableReason = "";
        var model = Ext.create('Atlas.member.model.MemberCoverage');
        var saveProxy = model.getProxy();
        saveProxy.setExtraParam('pKeyValue', recipientID);
        model.phantom = false;
        model.load({
            failure: function (record, operation) {
            },
            success: function (recorddata, operation) {
                var obj = Ext.decode(operation.getResponse().responseText);
                if (obj.data != null) {
                    for (var i = 0; i < obj.data.length; i++) {
                        var sEffDate = null;
                        var sTermDate = null;
                        if (obj.data[i].tEffDate != null) {
                            sEffDate = new Date(obj.data[i].tEffDate);
                            sEffDate.setDate(sEffDate.getDate() + 1);
                        }
                        if (obj.data[i].tTermDate != null) {
                            sTermDate = new Date(obj.data[i].tTermDate);
                            sTermDate.setDate(sTermDate.getDate() + 1);
                        }
                        if (sEffDate != null) {
                            if (sEffDate <= new Date()) {
                                if (sTermDate == null || sTermDate >= new Date()) {
                                    bActiveCoverageAvailable = true;
                                    if (obj.data[i].allowMemberLocks != null) {
                                        sbAllowMemberLocks = sbAllowMemberLocks + obj.data[i].allowMemberLocks;
                                    }
                                    break;
                                }

                            }
                        }
                    }
                    if (bActiveCoverageAvailable == false) {
                        sDisableReason = "Member is Inactive. Locks could not be added.";
                    }
                    else {
                        if (sbAllowMemberLocks.toLowerCase()=="yes" || sbAllowMemberLocks.toLowerCase()=="true") {
                        }
                        else {
                            sDisableReason = "Member's Plangroup does not allow locks and any existing locks for this member will be ignored.";
                        }
                    }
                    if (sDisableReason != "") {
                        Ext.Msg.alert("<B>Member Locks</B>", sDisableReason);

                        view.down('#btnAddPharmacy').setDisabled(true);
                        view.down('#btnEdit').setDisabled(true);
                        view.down('#btnRemovePharmacy').setDisabled(true);
                        view.down('#btnSavePharmacyLocks').setDisabled(true);
                        view.down('#btnAddProvider').setDisabled(true);
                        view.down('#btnEditPresc').setDisabled(true);
                        view.down('#btnRemovePresc').setDisabled(true);
                        view.down('#btnSaveDEALocks').setDisabled(true);
                    }
                    else {
                        view.down('#btnAddPharmacy').setDisabled(false);
                        view.down('#btnEdit').setDisabled(false);
                        view.down('#btnRemovePharmacy').setDisabled(false);
                        view.down('#btnSavePharmacyLocks').setDisabled(false);
                        view.down('#btnAddProvider').setDisabled(false);
                        view.down('#btnEditPresc').setDisabled(false);
                        view.down('#btnRemovePresc').setDisabled(false);
                        view.down('#btnSaveDEALocks').setDisabled(false);
                    }
                }
            }
        })

    },
    onRemovePharmacyClick: function () {
        var view = this.getView();
        var grid = view.down('#PharmacyLocksGrid');
        if (grid.getSelectionModel().getSelected().items.length == 0) {
            Ext.Msg.alert("Member Locks", "Please select a Lock from the Grid Below");

        }
        else {
            var viewModel = this.getViewModel();
            var me = this;
            me.editor = Ext.create({
                xtype: 'window',
                bind: {
                    title: '{title}'
                },
                iconCls: 'icon-locksalert,11',
                layout: 'fit',
                ghost: false,
                modal: true,
                closable: true,
                items: [{
                    xtype: 'member-memlockspharmacy'
                }],

                session: {
                    schema: 'atlas'
                },

                viewModel: {
                    parent: me.getViewModel(),
                    data: {
                        action: 'R',
                        toBeStatus: grid.getSelectionModel().getSelection()[0].data.toBeStatus,
                        approver: me.getView().down('#hdnApprover').getValue(),
                        title: 'Remove Lock - Pharmacy',
                        masterRecord: me.getViewModel().getParent().get('masterrecord')
                    }
                }
            });
            me.editor.down('#formPharmacy').reset();
            me.editor.down('#formPharmacy').loadRecord(grid.getSelectionModel().getSelection()[0]);
            var storenotes = viewModel.get('storenotes');
            storenotes.getProxy().setExtraParam('pParentSystemID', grid.getSelectionModel().getSelection()[0].data.systemID);
            storenotes.load({
                scope: this,
                callback: function (records, operation, success) {
                    // the operation object
                    // contains all of the details of the load operation
                    if (success) {
                        var strNotesJson = {};
                        var strNotes = '';
                        for (var i in records) {

                            var createTimeLength =  records[i].data.CreateTime.length;
                            var docCreateTime =  records[i].data.CreateTime.substring(0,createTimeLength-2)+ ' '+  records[i].data.CreateTime.substring(createTimeLength-2);
                            var docCreateDateTime = new Date(Ext.Date.format(records[i].data.CreateDate, 'm/d/Y') + ' '+ docCreateTime) ;

                            docCreateDateTime = Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(docCreateDateTime, 'm/d/Y  h:i:s A');
                            // strNotes += records[i].data.CreateUser + ' - ' + Ext.Date.format(new Date(records[i].data.CreateDate), 'm/d/Y') + ' - ' + records[i].data.CreateTime + ": " + records[i].data.Subject + " - " + records[i].data.Note + '\r\n\r\n';
                            strNotes += records[i].data.CreateUser + ' - ' + docCreateDateTime + ": " + records[i].data.Subject + " - " + records[i].data.Note + '\r\n\r\n';
                        }
                        me.editor.down('#NotesHistory').setValue(strNotes);
                        me.editor.show();
                    }
                }
            });
            var FaxAndAttachmentsStore = viewModel.getStore('FaxAndAttachmentsStore');
            FaxAndAttachmentsStore.getProxy().setExtraParam("pcKeyType", "LocksSystemId");
            FaxAndAttachmentsStore.getProxy().setExtraParam("pcKeyValue", grid.getSelectionModel().getSelection()[0].data.systemID);
            FaxAndAttachmentsStore.load();
            //me.LoadStatus(grid.getSelectionModel().getSelection()[0],me.editor);
            me.EnableDisableButtons(grid.getSelectionModel().getSelection()[0], me.editor, 'Remove');
        }
    },
    onRemovePrescriberClick: function () {
        var view = this.getView();
        var grid = view.down('#PrescriberGrid');
        if (grid.getSelectionModel().getSelected().items.length == 0) {
            Ext.Msg.alert("Member Locks", "Please select a Lock from the Grid below");

        }
        else {
            var viewModel = this.getViewModel();
            var me = this;
            me.editor = Ext.create({
                xtype: 'window',
                bind: {
                    title: '{title}'
                },
                iconCls: 'icon-locksalert,11',
                ghost: false,
                modal: true,
                closable: true,

                items: [{
                    xtype: 'member-memlocksprescriber'
                }],

                session: {
                    schema: 'atlas'
                },

                viewModel: {
                    data: {
                        action: 'R',
                        toBeStatus: grid.getSelectionModel().getSelection()[0].data.toBeStatus,
                        approver: me.getView().down('#hdnApprover').getValue(),
                        title: 'Remove Lock - Prescriber',
                        masterRecord: me.getView().getViewModel().get('masterrecord')
                    }
                }
            });
            me.editor.down('#formPrescriber').reset();
            me.editor.down('#formPrescriber').loadRecord(grid.getSelectionModel().getSelection()[0]);
            var storenotes = viewModel.get('storenotes');
            storenotes.getProxy().setExtraParam('pParentSystemID', grid.getSelectionModel().getSelection()[0].data.systemID);
            storenotes.load({
                scope: this,
                callback: function (records, operation, success) {
                    // the operation object
                    // contains all of the details of the load operation
                    if (success) {
                        var strNotesJson = {};
                        var strNotes = '';
                        for (var i in records) {

                            var createTimeLength =  records[i].data.CreateTime.length;
                            var docCreateTime =  records[i].data.CreateTime.substring(0,createTimeLength-2)+ ' '+  records[i].data.CreateTime.substring(createTimeLength-2);
                            var docCreateDateTime = new Date(Ext.Date.format(records[i].data.CreateDate, 'm/d/Y') + ' '+ docCreateTime) ;

                            docCreateDateTime = Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(docCreateDateTime, 'm/d/Y  h:i:s A');
                            // strNotes += records[i].data.CreateUser + ' - ' + Ext.Date.format(new Date(records[i].data.CreateDate), 'm/d/Y') + ' - ' + records[i].data.CreateTime + ": " + records[i].data.Subject + " - " + records[i].data.Note + '\r\n\r\n';
                            strNotes += records[i].data.CreateUser + ' - ' + docCreateDateTime + ": " + records[i].data.Subject + " - " + records[i].data.Note + '\r\n\r\n';
                        }
                        me.editor.down('#NotesHistory').setValue(strNotes);
                        me.editor.show();
                    }
                }
            });
            var FaxAndAttachmentsStore = viewModel.getStore('FaxAndAttachmentsStore');
            FaxAndAttachmentsStore.getProxy().setExtraParam("pcKeyType", "LocksSystemId");
            FaxAndAttachmentsStore.getProxy().setExtraParam("pcKeyValue", grid.getSelectionModel().getSelection()[0].data.systemID);
            FaxAndAttachmentsStore.load();
            //me.LoadStatus(grid.getSelectionModel().getSelection()[0],me.editor);
            me.EnableDisableButtons(grid.getSelectionModel().getSelection()[0], me.editor, 'Remove');
        }
    },
    onRemoveMedicationClick: function () {
        var view = this.getView();
        var grid = view.down('#MedicationGrid');
        if (grid.getSelectionModel().getSelected().items.length == 0) {
            Ext.Msg.alert("Validation Error", "Please select a medication before removing the Medication lock.");

        }
        else {
            var viewModel = this.getViewModel().getParent(),
                masterRecord = viewModel.get('masterrecord');
            var record = grid.getSelectionModel().getSelection()[0];
            Ext.Msg.confirm('Confirm', 'Do you wish to delete selected Medication lock?',
                function (btn) {
                    if (btn == 'yes') {
                        var drugLevel = record.data.Id;
                        var drugCode = record.data.LockIdType;
                        var ttMemberLocks = {};
                        var ttMemberLockSingle = {};
                        ttMemberLockSingle.mode = 'D';
                        ttMemberLockSingle.id = drugLevel;
                        ttMemberLockSingle.dbRowID = "";
                        ttMemberLockSingle.LockIdSubType = record.data.LockIdSubType;
                        var tempData = [];
                        tempData.push(ttMemberLockSingle);
                        ttMemberLocks.ttMemberLocks = tempData;
                        if (ttMemberLocks.ttMemberLocks.length > 0) {
                            var extraParameters = {
                                'pRecipientId': masterRecord.recipientID,
                                'pLockType': drugCode,
                                'ttMemberLocks': ttMemberLocks
                            };
                            var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
                            var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/memberlocks/update', null, [false], extraParameters,
                                saveAction, null);
                            if (testReturn.code == 0) {
                                Ext.Msg.alert("Member", "Medication Locks successfully removed.");
                            }
                            this.loadStoreData();
                        }
                    }
                }, this);
        }
    },
    init: function () {
        // debugger;
        var me = this;

        setTimeout(function() {

            var view = me.getView(),
                viewModel = me.getViewModel().getParent(),
                masterRecord = viewModel.get('masterrecord');
            if (masterRecord !== null) {
                var recipientID = masterRecord.recipientID;

                me.loadPharmacyLocks(recipientID);
                me.loadPrescriberLocks(recipientID);
                me.loadMedicationLocks(recipientID);
                me.loadDEALocks(recipientID);
                me.LoadApproval();
                me.CheckMemberLocksAllowed(recipientID);

            }
            if (view.up().openView) {
                if (view.up().RID) {
                    var recipientID = view.up().RID;
                    me.loadPharmacyLocks(recipientID);
                    me.loadPrescriberLocks(recipientID);
                    me.loadMedicationLocks(recipientID);
                    me.loadDEALocks(recipientID);
                    me.LoadApproval();
                }
                if(view.up().LOCKFAX)
                {
                    var faxQStore = this.getViewModel().getStore('FaxQStoreAllRecs');
                    faxQStore.onBefore('load', 'beforeLoadFaxQStoreAllRecs');
                    faxQStore.onAfter('load', 'afterLoadFaxQStoreAllRecs');
                    me.FaxQueue_Window();
                }
            }
        }, 1000);


    },
    FaxQueue_Window: function () {
        var me = this;
        var win = Ext.create('Ext.window.Window',{
            itemId: 'winFaxQWindowRedirect',
            title: 'Fax Queue',
            viewModel: {
                parent: me.getViewModel()
            },
            width: 940,
            height: 500,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Filter Fax Q',
                    collapsible: false,
                    height: 75,
                    items: [{
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'combobox',
                                itemId: 'cbxFax',
                                displayField: 'text',
                                valueField: 'value',
                                store: {
                                    data: [{"text": 'New Faxes', "value": '1', "selected": true},
                                        {"text": 'Acknowledged Faxes', "value": '2'}]
                                },
                                listeners: {
                                    select: 'cbxFax_Select'
                                }
                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Rcvd between',
                                itemId: 'faxReceivedDate',
                                format: 'm/d/Y',
                                listeners: {
                                    focusleave: 'onLeaveDate'
                                }
                            },
                            {
                                xtype: 'datefield',
                                itemId: 'dtTo',
                                format: 'm/d/Y',
                                disabled: true,
                                listeners: {
                                    focusleave: 'onLeaveDate'
                                }
                            },
                            {
                                xtype: 'button',
                                text: 'Search',
                                handler: 'OnSearchClick'
                            },
                            {
                                xtype: 'button',
                                text: 'Reset',
                                handler: 'onReset'
                            }
                        ]
                    }]
                },
                {
                    region: 'center',
                    xtype: 'grid',
                    layout:'fit',
                    flex: 1,
                    autoScroll:true,
                    itemId: 'FaxQGridPanel',
                    bind: '{FaxQStore}',
                    plugins: [
                        'gridfilters'
                    ],
                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                filter: {
                                    type: 'number'
                                },
                                text: 'ID(*Filter)',
                                dataIndex: 'DocumentID'
                            },
                            {
                                text: 'Date Rcvd.',
                                dataIndex: 'RecieptDate',
                                xtype: 'datecolumn',
                                format: 'm/d/Y'

                            },
                            {
                                text: 'Time Rcvd.',
                                dataIndex: 'RecieptTime'

                            },
                            {
                                text: 'SystemID',
                                dataIndex: 'SystemID',
                                hidden: true
                            },
                            {
                                text: 'Assign To',
                                dataIndex: 'AssignTo',
                                hidden: true
                            },
                            {
                                text: 'AckDate',
                                xtype: 'datecolumn',
                                format: 'm/d/Y h:i:s A',
                                dataIndex: 'AcknowledgedDate',
                                hidden: true
                            },
                            {
                                xtype: 'actioncolumn',
                                dataIndex: 'DocumentID',
                                text: 'View',
                                hideable: false,
                                items: [{
                                    // Use a URL in the icon config
                                    iconCls: 'x-fa fa-paperclip',
                                    // Use a URL in the icon config
                                    tooltip: 'View',
                                    handler: 'btnView_Click'

                                }]
                            },
                            {
                                xtype: 'actioncolumn',
                                dataIndex: 'DocumentID',
                                text: 'Acknowledge',
                                hideable: false,
                                items: [{
                                    // Use a URL in the icon config
                                    iconCls: 'x-fa fa-plus-square',
                                    // Use a URL in the icon config
                                    tooltip: 'Click to flag this fax as acknowledged.',
                                    handler: 'btnAcknowledge_Click',
                                    isDisabled : function(view, rowIndex, colIndex, item, record) {
                                        if (record.data.AcknowledgedDate) {
                                            return true;
                                        }
                                        else {
                                            return false;
                                        }
                                    }

                                }]
                            }
                        ]
                    },
                    bbar: {
                        xtype: 'pagingtoolbar',
                        bind: '{FaxQStore}',
                        displayInfo: true,
                        hideRefresh: true
                    }

                }
            ]

        });
        win.down('#cbxFax').setValue('1');
        win.down('#faxReceivedDate').setValue('');
        win.down('#faxReceivedDate').setDisabled(true);
        win.down('#dtTo').setValue('');
        win.down('#dtTo').setDisabled(true);
        this.loadInitialFaxQStoreData(null, null, "");
        this.getView().add(win);
        win.show();
    },
    beforeLoadFaxQStoreAllRecs: function(){
        this.getView().down('#FaxQGridPanel').mask('Loading');
    },
    afterLoadFaxQStoreAllRecs: function(FaxQStoreAllRecs, records, success){
        var myGrid = this.getView().down('#FaxQGridPanel');
        Atlas.common.view.GetFilteredStore.getFilteredStore(FaxQStoreAllRecs, [], this.getViewModel().getStore('FaxQStore'));
        myGrid.unmask();
    },
    OnSearchClick: function () {
        var view = this.getView();
        if (view.down('#cbxFax').getValue() != null && view.down('#cbxFax').getValue() == '1') {
            this.loadInitialFaxQStoreData(null, null, "");
        } else {
            var _ack = 'Y';
            this.loadInitialFaxQStoreData(view.down('#faxReceivedDate').getValue(), view.down('#dtTo').getValue(), _ack);
        }
    },
    onLeaveDate:function(myDatefield){
        Atlas.common.view.AutoFormatDate.autoFormatDate(myDatefield);
    },
    loadInitialFaxQStoreData: function (pRecieptDateFrom, pRecieptDateTo, pAcknowledged) {
        var vm = this.getViewModel(),
            FaxQStoreAllRecs = vm.getStore('FaxQStoreAllRecs');

        FaxQStoreAllRecs.load({
            params: {
                pPlanID: 'HPM',
                pQDescription: 'Member Locks',
                pRecieptDateFrom: pRecieptDateFrom,
                pRecieptDateTo: pRecieptDateTo,
                pAcknowledged: pAcknowledged,
                pagination: false
            }
        });
    },
    onReset: function () {
        var view = this.getView();
        view.down('#faxReceivedDate').setValue('');
        view.down('#dtTo').setValue('');
        this.loadInitialFaxQStoreData(null, null, "");
    },
    btnView_Click: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        Atlas.common.utility.Utilities.viewDocument(rec.get('DocumentID'),'pdf');
    },
    btnAcknowledge_Click: function (sender,index) {
        var view = this.getView();
        var grid = view.down('#FaxQGridPanel');
        var record = grid.getStore().getAt(index);
        try {
            var fieldlist = "Acknowledge,AcknowledgedDate,AcknowledgedUserName";
            var fields = "y" + "|" + Ext.Date.format(new Date(), 'm/d/Y') + "|" + Atlas.user.un;
            var extraParameters = {
                'pSystemID': record.data.SystemID,
                'pFieldList': fieldlist,
                'pFields': fields
            };
            var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
            var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/qmanagementdata/update', null, [false], extraParameters,
                saveAction, null);
            this.loadInitialFaxQStoreData(null, null, "");
        }
        catch (e) {
            Ext.Msg.alert('Failure', ' error, Please contact admin.');
        }
    },
    cbxFax_Select: function () {
        var view = this.getView();
        view.down('#faxReceivedDate').setValue('');
        view.down('#dtTo').setValue('');
        if (view.down('#cbxFax').getValue() != null && view.down('#cbxFax').getValue() == '2') {
            view.down('#dtTo').setDisabled(false);
            view.down('#faxReceivedDate').setDisabled(false);
        }
        else {
            view.down('#dtTo').setDisabled(false);
            view.down('#faxReceivedDate').setDisabled(true);
        }
    },
    LoadApproval:function()
    {
        var me=this;
        var view=this.getView();
        var LockApproversBean = this.getViewModel().getStore('LockApproversBean');
        LockApproversBean.load({
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation) {
                for (var r in record) {
                    if (record[r].data.name == Atlas.user.un) {
                        view.down('#hdnApprover').setValue('yes');
                        break;
                    }
                }
                me.getMemberMaster(view.up().RID);

            }
        });
    },
    OpenLock:function()
    {
        var me = this,
            theView = me.getView();
        if(theView.up().recordCase)
        {
            if(theView.up().recordCase.data.lockType=="NPI")
            {
                me.OpenLockForNPI(theView.up().recordCase);
            }
            else if(theView.up().recordCase.data.lockType=="NCPDP")
            {
                me.OpenLockForNCPDP(theView.up().recordCase);
            }

        }

    },
    getMemberMaster: function (recipId) {
        var me = this,
            theView = me.getView(),
            vm = me.getViewModel(),
            store = vm.getStore('memberMasterStore');
        store.getProxy().setExtraParam('pFieldList', 'recipientID,firstname,middlename,lastname,suffix,gender,@enrollmentStatus,birthDate,socSecNum,@languageDescription,langCode,race,deathDate,Home.Address1,Home.Address2,Home.City,home.zipCode,Home.State,@countyDescription,homephone.ContactInfo,workphone.ContactInfo,cell.ContactInfo,email.ContactInfo,@alerts,hedisMessage,@enrollmentStatus,respFirstName,respMiddleName,respLastName,resp.address1,resp.address2,resp.state,resp.city,resp.ZipCode,respHomePhone.ContactInfo,respWorkPhone.ContactInfo,complianceAlert,CarrierName,AccountName,@CoCMember,primRecipientId,@mcsProgGroupCode,@medicarePlanGroupId,@spareField03,@HICN,@FosterCareInd,@Age');
        store.getProxy().setExtraParam('pKeyValue', recipId);
        store.on({
            load: 'OpenLock',
            single: true // Remove listener after Load
        });
        store.load();
    },
    OpenLockForNCPDP:function(recordCase)
    {
        var viewModel = this.getViewModel();
       var memberMasterStore=  viewModel.getStore('memberMasterStore');
        var me = this;
        me.editor = Ext.create({
            xtype: 'window',
            bind: {
                title: '{title}'
            },
            iconCls: 'icon-locksalert,11',
            layout: 'fit',
            ghost: false,
            modal: true,
            closable: true,
            items: [{
                xtype: 'member-memlockspharmacy'
            }],

            session: {
                schema: 'atlas'
            },

            viewModel: {
                data: {
                    action: recordCase.data.action,
                    toBeStatus: recordCase.data.toBeStatus,
                    approver: me.getView().down('#hdnApprover').getValue(),
                    title: 'Change Lock - Pharmacy',
                    masterRecord:memberMasterStore.data.items[0].data
                }
            }
        });
        me.editor.down('#formPharmacy').reset();
        if (recordCase.data.systemID == null || recordCase.data.systemID <= 0) {
            Ext.Msg.alert("Member Locks", "Invalid System Id.");
            return;
        }
        else {
            me.editor.down('#formPharmacy').loadRecord(recordCase);
            var storenotes = viewModel.get('storenotes');
            storenotes.getProxy().setExtraParam('pParentSystemID', recordCase.data.systemID);
            storenotes.load({
                scope: this,
                callback: function (records, operation, success) {
                    // the operation object
                    // contains all of the details of the load operation
                    if (success) {
                        var strNotesJson = {};
                        var strNotes = '';
                        for (var i in records) {

                            var createTimeLength =  records[i].data.CreateTime.length;
                            var docCreateTime =  records[i].data.CreateTime.substring(0,createTimeLength-2)+ ' '+  records[i].data.CreateTime.substring(createTimeLength-2);
                            var docCreateDateTime = new Date(Ext.Date.format(records[i].data.CreateDate, 'm/d/Y') + ' '+ docCreateTime) ;

                            docCreateDateTime = Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(docCreateDateTime, 'm/d/Y  h:i:s A');
                            // strNotes += records[i].data.CreateUser + ' - ' + Ext.Date.format(new Date(records[i].data.CreateDate), 'm/d/Y') + ' - ' + records[i].data.CreateTime + ": " + records[i].data.Subject + " - " + records[i].data.Note + '\r\n\r\n';
                            strNotes += records[i].data.CreateUser + ' - ' + docCreateDateTime + ": " + records[i].data.Subject + " - " + records[i].data.Note + '\r\n\r\n';
                        }
                        me.editor.down('#NotesHistory').setValue(strNotes);
                        me.editor.show();
                        me.CheckMemberLocksAllowed(me.getView().up().recordCase.data.recipientID);
                    }
                }
            });
            var FaxAndAttachmentsStore = viewModel.getStore('FaxAndAttachmentsStore');
            FaxAndAttachmentsStore.getProxy().setExtraParam("pcKeyType", "LocksSystemId");
            FaxAndAttachmentsStore.getProxy().setExtraParam("pcKeyValue", recordCase.data.systemID);
            FaxAndAttachmentsStore.load();
            // me.LoadStatus(grid.getSelectionModel().getSelection()[0],me.editor);
            me.EnableDisableButtons(recordCase, me.editor);

        }

    },
    OpenLockForNPI:function(recordCase) {
        var viewModel = this.getViewModel();
        var memberMasterStore=  viewModel.getStore('memberMasterStore');
        var me = this;
        me.editor = Ext.create({
            xtype: 'window',
            bind: {
                title: '{title}'
            },
            iconCls: 'icon-locksalert,11',
            layout: 'fit',
            ghost: false,
            modal: true,
            closable: true,
            items: [{
                xtype: 'member-memlocksprescriber'
            }],

            session: {
                schema: 'atlas'
            },

            viewModel: {
                data: {
                    action: recordCase.data.action,
                    toBeStatus: recordCase.data.toBeStatus,
                    approver: me.getView().down('#hdnApprover').getValue(),
                    title: 'Change Lock - Prescriber',
                    masterRecord:memberMasterStore.data.items[0].data
                }
            }
        });

        me.editor.down('#formPrescriber').reset();
        if (recordCase.data.systemID == null || recordCase.data.systemID <= 0) {
            Ext.Msg.alert("Member Locks", "Invalid System Id.");
            return;
        }
        else {
            me.editor.down('#formPrescriber').loadRecord(recordCase);
            var storenotes = viewModel.get('storenotes');
            storenotes.getProxy().setExtraParam('pParentSystemID', recordCase.data.systemID);
            storenotes.load({
                scope: this,
                callback: function (records, operation, success) {
                    // the operation object
                    // contains all of the details of the load operation
                    if (success) {
                        var strNotesJson = {};
                        var strNotes = '';
                        for (var i in records) {

                            var createTimeLength =  records[i].data.CreateTime.length;
                            var docCreateTime =  records[i].data.CreateTime.substring(0,createTimeLength-2)+ ' '+  records[i].data.CreateTime.substring(createTimeLength-2);
                            var docCreateDateTime = new Date(Ext.Date.format(records[i].data.CreateDate, 'm/d/Y') + ' '+ docCreateTime) ;


                            docCreateDateTime = Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(docCreateDateTime, 'm/d/Y  h:i:s A');
                            // strNotes += records[i].data.CreateUser + ' - ' + Ext.Date.format(new Date(records[i].data.CreateDate), 'm/d/Y') + ' - ' + records[i].data.CreateTime + ": " + records[i].data.Subject + " - " + records[i].data.Note + '\r\n\r\n';
                            strNotes += records[i].data.CreateUser + ' - ' + docCreateDateTime + ": " + records[i].data.Subject + " - " + records[i].data.Note + '\r\n\r\n';
                        }
                        me.editor.down('#NotesHistory').setValue(strNotes);
                        me.editor.show();
                        me.CheckMemberLocksAllowed(me.getView().up().recordCase.data.recipientID);
                    }
                }
            });
            var FaxHistoryStore = viewModel.getStore('FaxAndAttachmentsStore');
            FaxHistoryStore.getProxy().setExtraParam("pcKeyType", "LocksSystemId");
            FaxHistoryStore.getProxy().setExtraParam("pcKeyValue", recordCase.data.systemID);
            FaxHistoryStore.load();
            // me.LoadStatus(grid.getSelectionModel().getSelection()[0],me.editor);
            me.EnableDisableButtons(recordCase, me.editor);

        }
    },
    refreshMemLocks: function (recipientID,parentPanelId) {
        if(this.getView().up().id == parentPanelId) {
            var me = this;
            if (me.getView().up().atlasId == recipientID && me.getView().up().tab.active) {
                me.loadPharmacyLocks(recipientID);
                me.loadPrescriberLocks(recipientID);
                me.loadMedicationLocks(recipientID);
                me.loadDEALocks(recipientID);
                me.CheckMemberLocksAllowed(recipientID);
            }
        }
    },
    loadPharmacyLocks: function (recipientID) {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('memlockspharmacy'),
            proxy = store.getProxy();

        proxy.setExtraParam('pRecipientId', recipientID);

        store.load();
    },
    loadPrescriberLocks: function (recipientID) {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('memlocksprescriber'),
            proxy = store.getProxy();

        proxy.setExtraParam('pRecipientId', recipientID);

        store.load();
    },
    loadMedicationLocks: function (recipientID) {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('memlocksmedication'),
            proxy = store.getProxy();

        proxy.setExtraParam('pRecipientId', recipientID);

        store.load();
    },
    loadDEALocks: function (recipientID) {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('memlocksdeadrugs'),
            proxy = store.getProxy();

        proxy.setExtraParam('pRecipientId', recipientID);
        store.on({
            load: 'LoadCheckBox',
            single: true // Remove listener after Load
        });
        store.load();
    },
    LoadCheckBox:function() {
        var view = this.getView();
        var store = this.getViewModel().getStore('memlocksdeadrugs');
        view.down('#chkDea1').setValue(false);
        view.down('#chkDea2').setValue(false);
        view.down('#chkDea3').setValue(false);
        view.down('#chkDea4').setValue(false);
        view.down('#chkDea5').setValue(false);
        if(store.data.length>0) {
            var strDeaLockIds = store.data.items[0].data.Id;
            var arrDeaLockIds = strDeaLockIds.split(',');
            for (var i = 0; i < arrDeaLockIds.length; i++) {
                switch (arrDeaLockIds[i]) {
                    case "1":
                        view.down('#chkDea1').setValue(true);
                        break;
                    case "2":
                        view.down('#chkDea2').setValue(true);
                        break;
                    case "3":
                        view.down('#chkDea3').setValue(true);
                        break;
                    case "4":
                        view.down('#chkDea4').setValue(true);
                        break;
                    case "5":
                        view.down('#chkDea5').setValue(true);
                        break;
                }

            }
        }
    },
    onAddPharmacyClick: function () {
        var me = this;
        var record = {};
        this.getViewModel().getStore('FaxAndAttachmentsStore').removeAll();
        this.getViewModel().getStore('FaxAndAttachmentsStore').getProxy().setExtraParam("pcKeyType", "");
        this.getViewModel().getStore('FaxAndAttachmentsStore').getProxy().setExtraParam("pcKeyValue", "");
        me.editor = Ext.create({
            xtype: 'window',
            bind: {
                title: '{title}'
            },
            iconCls: 'icon-locksalert,11',
            layout: 'fit',
            ghost: false,
            modal: true,
            closable: true,
            items: [{
                xtype: 'member-memlockspharmacy'
            }],

            session: {
                schema: 'atlas'
            },

            viewModel: {
                data: {
                    action: 'A',
                    approver: me.getView().down('#hdnApprover').getValue(),
                    toBeStatus: 'Draft',
                    title: 'Add Lock - Pharmacy',
                    masterRecord: me.getViewModel().getParent().get('masterrecord')
                }
            }
        });
        // me.LoadStatus(grid.getSelectionModel().getSelection()[0],me.editor);
        var data = {action: 'A', currentStatus: 'Draft', toBeStatus: 'Draft', systemID: ''};
        record.data = data;
        me.editor.down('#hdnSystemId').setValue('0');
        me.editor.down('#cbxcurrentStatus').setValue('Draft');
        //me.editor.down('#txtNewPharmacy').setDisabled(true);
        me.EnableDisableButtons(record, me.editor);
        me.editor.show();
    },
    onAddPrescriberClick: function () {
        var me = this;
        this.getViewModel().getStore('FaxAndAttachmentsStore').removeAll();
        this.getViewModel().getStore('FaxAndAttachmentsStore').getProxy().setExtraParam("pcKeyType", "");
        this.getViewModel().getStore('FaxAndAttachmentsStore').getProxy().setExtraParam("pcKeyValue", "");
        var record = {};
        me.editor = Ext.create({
            xtype: 'window',
            bind: {
                title: '{title}'
            },
            iconCls: 'icon-locksalert,11',
            ghost: false,
            modal: true,
            closable: true,

            items: [{
                xtype: 'member-memlocksprescriber'
            }],

            session: {
                schema: 'atlas'
            },

            viewModel: {
                data: {
                    action: 'A',
                    toBeStatus: 'Draft',
                    approver: me.getView().down('#hdnApprover').getValue(),
                    title: 'Add Lock - Prescriber',
                    masterRecord: me.getView().getViewModel().get('masterrecord')
                }
            }
        });
        var data = {action: 'A', currentStatus: 'Draft', toBeStatus: 'Draft', systemID: ''};
        record.data = data;
        me.editor.down('#hdnSystemId').setValue('0');
        me.editor.down('#cbxcurrentStatus').setValue('Draft');
      //  me.editor.down('#txtNewPrescriber').setDisabled(true);
        me.EnableDisableButtons(record, me.editor);
        me.editor.show();
    },
    onAddMedicationClick: function () {
        var me = this;

        me.editor = Ext.create({
            xtype: 'window',
            bind: {
                title: '{title}'
            },
            iconCls: 'icon-locksalert,11',
            layout: 'fit',
            ghost: false,
            modal: true,
            closable: true,
            width: 450,

            items: [{
                xtype: 'member-memlocksmedication'
            }],

            session: {
                schema: 'atlas'
            },

            viewModel: {
                data: {
                    title: 'Add Lock - Medication'
                }
            }
        });
        me.editor.down('#hdnRecipientId').setValue(me.getViewModel().getParent().get('masterrecord').recipientID);
        me.editor.show();
    },
    onChangeSelectAll: function (checkbox, newValue, oldValue, eOpts) {
        var me = checkbox,
            view = this.getView();

        if (me.checked) {
            view.down('#chkDea1').setValue(true);
            view.down('#chkDea2').setValue(true);
            view.down('#chkDea3').setValue(true);
            view.down('#chkDea4').setValue(true);
            view.down('#chkDea5').setValue(true);
        }
        //else {
        //    view.down('#chkDea1').setValue(false);
        //    view.down('#chkDea2').setValue(false);
        //    view.down('#chkDea3').setValue(false);
        //    view.down('#chkDea4').setValue(false);
        //    view.down('#chkDea5').setValue(false);
        //}
    },
    EnableDisableButtons: function (record, view, mode) {
        var sLockAction = "";
        if (mode == 'Remove')
            sLockAction = "R";
        else
            sLockAction = record.data.action;
        var sCurrentStatus = record.data.currentStatus;
        var sToBeStatus = record.data.toBeStatus;
        view.down('#btnDetailSave').setDisabled(false);

        if ((sCurrentStatus.toUpperCase() == "INACTIVE" ||
            sCurrentStatus.toUpperCase() == "APPROVAL DENIED" ||
            sCurrentStatus.toUpperCase() == "REMOVAL DENIED" ||
            sCurrentStatus.toUpperCase() == "REMOVAL APPROVED") && (this.getView().down('#hdnApprover').getValue() == "yes")) {
            view.down('#btnDetailSave').setDisabled(false);
        }
        else {
            if (sLockAction == "R") //Remove Action
            {
                //Only Active locks can be removed.
                if (sCurrentStatus.toUpperCase() != "ACTIVE") {
                    view.down('#btnDetailSave').setDisabled(true);
                }
            }
            else //All actions other than Remove.
            {

                if (this.getView().down('#hdnApprover').getValue() == "yes") {
                    view.down('#btnDetailSave').setDisabled(false);

                }
                else //For Regular users, if lock is submitted for approval or removal no changes are allowed.
                {
                    if (sToBeStatus.toUpperCase() == "SUBMITTED FOR APPROVAL" ||
                        sToBeStatus.toUpperCase() == "SUBMITTED FOR REMOVAL") {
                        view.down('#btnDetailSave').setDisabled(true);
                    }
                }

            }
        }
        var bDisableFaxAttachments = false;

        if (record.data.systemID == "0" || record.data.systemID == "") {
            bDisableFaxAttachments = true;
        }
        else if (view.down('#btnDetailSave').disabled == true) {
            bDisableFaxAttachments = true;
        }
        else {
            if (this.getView().down('#hdnApprover').getValue() == "yes") {
                if (sToBeStatus.toUpperCase() == "APPROVAL DENIED" ||
                    sToBeStatus.toUpperCase() == "REMOVAL APPROVED" ||
                    sToBeStatus.toUpperCase() == "REMOVAL DENIED" ||
                    sToBeStatus.toUpperCase() == "INACTIVE" ||
                    sToBeStatus.toUpperCase() == "ACTIVE") {
                    bDisableFaxAttachments = true;
                }

            }
            { //All Other Users, other than Approvers.

                if (sToBeStatus.toUpperCase() == "APPROVAL DENIED" ||
                    sToBeStatus.toUpperCase() == "REMOVAL APPROVED" ||
                    sToBeStatus.toUpperCase() == "REMOVAL DENIED" ||
                    sToBeStatus.toUpperCase() == "INACTIVE" ||
                    sToBeStatus.toUpperCase() == "ACTIVE" ||
                    sToBeStatus.toUpperCase() == "SUBMITTED FOR APPROVAL" ||
                    sToBeStatus.toUpperCase() == "SUBMITTED FOR REMOVAL") {
                    bDisableFaxAttachments = true;
                }//ToBeStatus Check.

            } //Approver Check.
        }

        if (bDisableFaxAttachments == true) {
            view.down('#btnFaxQueue').setDisabled(true);
            view.down('#btnAttachment').setDisabled(true);
        }
        else {
            view.down('#btnFaxQueue').setDisabled(false);
            view.down('#btnAttachment').setDisabled(false);
        }
        /*----------------------------------------------------
         END.. Enabling and Disabling Fax/Attachments Buttons.
         ----------------------------------------------------*/

    },
    btnEditPharmacy_Click: function () {
        var view = this.getView();
        var grid = view.down('#PharmacyLocksGrid');
        if (grid.getSelectionModel().getSelected().items.length == 0) {
            Ext.Msg.alert("Member Locks", "Please select a Lock from the Grid below");

        }
        else {
            var viewModel = this.getViewModel();
            var me = this;
            me.editor = Ext.create({
                xtype: 'window',
                bind: {
                    title: '{title}'
                },
                iconCls: 'icon-locksalert,11',
                layout: 'fit',
                ghost: false,
                modal: true,
                closable: true,
                items: [{
                    xtype: 'member-memlockspharmacy'
                }],

                session: {
                    schema: 'atlas'
                },

                viewModel: {
                    data: {
                        action: grid.getSelectionModel().getSelection()[0].data.action,
                        toBeStatus: grid.getSelectionModel().getSelection()[0].data.toBeStatus,
                        approver: me.getView().down('#hdnApprover').getValue(),
                        title: 'Change Lock - Pharmacy',
                        masterRecord: me.getViewModel().getParent().get('masterrecord')
                    }
                }
            });
            me.editor.down('#formPharmacy').reset();
            if (grid.getSelectionModel().getSelection()[0].data.systemID == null || grid.getSelectionModel().getSelection()[0].data.systemID <= 0) {
                Ext.Msg.alert("Member Locks", "Invalid System Id.");
                return;
            }
            else {
                me.editor.down('#formPharmacy').loadRecord(grid.getSelectionModel().getSelection()[0]);
                var storenotes = viewModel.get('storenotes');
                storenotes.getProxy().setExtraParam('pParentSystemID', grid.getSelectionModel().getSelection()[0].data.systemID);
                storenotes.load({
                    scope: this,
                    callback: function (records, operation, success) {
                        // the operation object
                        // contains all of the details of the load operation
                        if (success) {
                            var strNotesJson = {};
                            var strNotes = '';
                            for (var i in records) {

                                var createTimeLength =  records[i].data.CreateTime.length;
                                var docCreateTime =  records[i].data.CreateTime.substring(0,createTimeLength-2)+ ' '+  records[i].data.CreateTime.substring(createTimeLength-2);
                                var docCreateDateTime = new Date(Ext.Date.format(records[i].data.CreateDate, 'm/d/Y') + ' '+ docCreateTime) ;

                                docCreateDateTime = Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(docCreateDateTime, 'm/d/Y  h:i:s A');
                                // strNotes += records[i].data.CreateUser + ' - ' + Ext.Date.format(new Date(records[i].data.CreateDate), 'm/d/Y') + ' - ' + records[i].data.CreateTime + ": " + records[i].data.Subject + " - " + records[i].data.Note + '\r\n\r\n';
                                strNotes += records[i].data.CreateUser + ' - ' + docCreateDateTime + ": " + records[i].data.Subject + " - " + records[i].data.Note + '\r\n\r\n';
                            }
                            me.editor.down('#NotesHistory').setValue(strNotes);
                            me.editor.show();
                        }
                    }
                });
                var FaxAndAttachmentsStore = viewModel.getStore('FaxAndAttachmentsStore');
                FaxAndAttachmentsStore.getProxy().setExtraParam("pcKeyType", "LocksSystemId");
                FaxAndAttachmentsStore.getProxy().setExtraParam("pcKeyValue", grid.getSelectionModel().getSelection()[0].data.systemID);
                FaxAndAttachmentsStore.load();
                // me.LoadStatus(grid.getSelectionModel().getSelection()[0],me.editor);
                me.EnableDisableButtons(grid.getSelectionModel().getSelection()[0], me.editor);
            }
        }
    },
    onEditPrescriber_Click: function () {
        var view = this.getView();
        var grid = view.down('#PrescriberGrid');
        if (grid.getSelectionModel().getSelected().items.length == 0) {
            Ext.Msg.alert("Member Locks", "Please select a Lock from the Grid below");

        }
        else {
            var viewModel = this.getViewModel();
            var me = this;
            me.editor = Ext.create({
                xtype: 'window',
                bind: {
                    title: '{title}'
                },
                iconCls: 'icon-locksalert,11',
                layout: 'fit',
                ghost: false,
                modal: true,
                closable: true,
                items: [{
                    xtype: 'member-memlocksprescriber'
                }],

                session: {
                    schema: 'atlas'
                },

                viewModel: {
                    data: {
                        action: grid.getSelectionModel().getSelection()[0].data.action,
                        toBeStatus: grid.getSelectionModel().getSelection()[0].data.toBeStatus,
                        approver: me.getView().down('#hdnApprover').getValue(),
                        title: 'Change Lock - Prescriber',
                        masterRecord: me.getViewModel().getParent().get('masterrecord')
                    }
                }
            });
            me.editor.down('#formPrescriber').reset();
            if (grid.getSelectionModel().getSelection()[0].data.systemID == null || grid.getSelectionModel().getSelection()[0].data.systemID <= 0) {
                Ext.Msg.alert("Member Locks", "Invalid System Id.");
                return;
            }
            else {
                me.editor.down('#formPrescriber').loadRecord(grid.getSelectionModel().getSelection()[0]);
                var storenotes = viewModel.get('storenotes');
                storenotes.getProxy().setExtraParam('pParentSystemID', grid.getSelectionModel().getSelection()[0].data.systemID);
                storenotes.load({
                    scope: this,
                    callback: function (records, operation, success) {
                        // the operation object
                        // contains all of the details of the load operation
                        if (success) {
                            var strNotesJson = {};
                            var strNotes = '';
                            for (var i in records) {

                                var createTimeLength =  records[i].data.CreateTime.length;
                                var docCreateTime =  records[i].data.CreateTime.substring(0,createTimeLength-2)+ ' '+  records[i].data.CreateTime.substring(createTimeLength-2);
                                var docCreateDateTime = new Date(Ext.Date.format(records[i].data.CreateDate, 'm/d/Y') + ' '+ docCreateTime) ;

                                docCreateDateTime = Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(docCreateDateTime, 'm/d/Y  h:i:s A');
                                // strNotes += records[i].data.CreateUser + ' - ' + Ext.Date.format(new Date(records[i].data.CreateDate), 'm/d/Y') + ' - ' + records[i].data.CreateTime + ": " + records[i].data.Subject + " - " + records[i].data.Note + '\r\n\r\n';
                                strNotes += records[i].data.CreateUser + ' - ' + docCreateDateTime + ": " + records[i].data.Subject + " - " + records[i].data.Note + '\r\n\r\n';
                            }
                            me.editor.down('#NotesHistory').setValue(strNotes);
                            me.editor.show();
                        }
                    }
                });
                var FaxHistoryStore = viewModel.getStore('FaxAndAttachmentsStore');
                FaxHistoryStore.getProxy().setExtraParam("pcKeyType", "LocksSystemId");
                FaxHistoryStore.getProxy().setExtraParam("pcKeyValue", grid.getSelectionModel().getSelection()[0].data.systemID);
                FaxHistoryStore.load();
                // me.LoadStatus(grid.getSelectionModel().getSelection()[0],me.editor);
                me.EnableDisableButtons(grid.getSelectionModel().getSelection()[0], me.editor);
            }
        }
    },
    CheckUnCheck: function () {
        var view = this.getView();
        if (view.down('#chkDeaAll').checked == false) {
            if (view.down('#chkDea1').checked == true && view.down('#chkDea2').checked == true && view.down('#chkDea3').checked == true && view.down('#chkDea4').checked == true && view.down('#chkDea5').checked == true) {
                //Ext.Msg.alert('Member Locks', 'All check boxes Checked');
                view.down('#chkDeaAll').setValue(true);
            }
        }
        if (view.down('#chkDeaAll').checked == true) {
            if (view.down('#chkDea1').checked == false || view.down('#chkDea2').checked == false || view.down('#chkDea3').checked == false || view.down('#chkDea4').checked == false || view.down('#chkDea5').checked == false) {
                //Ext.Msg.alert('Member Locks', 'Some check box Un-Checked');
                view.down('#chkDeaAll').setValue(false);
            }
        }
    },
    SaveDEALocks: function () {
        try {
            var view = this.getView();
            var viewModel = this.getViewModel().getParent(),
                masterRecord = viewModel.get('masterrecord');
            var objDeaLocks = "";
            if (view.down('#chkDeaAll').checked) {
                objDeaLocks = "1,2,3,4,5";
            }
            else {
                if (view.down('#chkDea1').checked) {
                    if (objDeaLocks == "") {
                        objDeaLocks = "1";
                    }
                    else {
                        objDeaLocks = objDeaLocks + ",1";
                    }
                }
                if (view.down('#chkDea2').checked) {
                    if (objDeaLocks == "") {
                        objDeaLocks = "2";
                    }
                    else {
                        objDeaLocks = objDeaLocks + ",2";
                    }
                }
                if (view.down('#chkDea3').checked) {
                    if (objDeaLocks == "") {
                        objDeaLocks = "3";
                    }
                    else {
                        objDeaLocks = objDeaLocks + ",3";
                    }
                }
                if (view.down('#chkDea4').checked) {
                    if (objDeaLocks == "") {
                        objDeaLocks = "4";
                    }
                    else {
                        objDeaLocks = objDeaLocks + ",4";
                    }
                }
                if (view.down('#chkDea5').checked) {
                    if (objDeaLocks == "") {
                        objDeaLocks = "5";
                    }
                    else {
                        objDeaLocks = objDeaLocks + ",5";
                    }
                }
            }
            var ttMemberLocks = {};
            var ttMemberLockSingle = {};
            ttMemberLockSingle.mode = 'A';
            ttMemberLockSingle.id = objDeaLocks;
            ttMemberLockSingle.dbRowID = "";
            ttMemberLockSingle.LockIdSubType = "";
            var tempData = [];
            tempData.push(ttMemberLockSingle);
            ttMemberLocks.ttMemberLocks = tempData;
            if (ttMemberLocks.ttMemberLocks.length > 0) {
                var extraParameters = {
                    'pRecipientId': masterRecord.recipientID,
                    'pLockType': "DEADRUG",
                    'ttMemberLocks': ttMemberLocks
                };
                var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
                var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/memberlocks/update', null, [false], extraParameters,
                    saveAction, null);
                if (testReturn.code == 0) {
                    Ext.Msg.alert("Member", "Medication Locks successfully saved.");
                }
                this.loadStoreData();
            }
        }
        catch (ex) {
            Ext.Msg.alert("Exception", ex.message);
        }
    }
});
