Ext.define('Atlas.member.view.MemLocksPharmacyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.memlockspharmacycontroller',
    listen: {
        controller: {
            'fileuploader': {
                successfulUpload: 'onUploadAttachment'
            }
        }
    },
    init: function () {
        this.onLoad();
        this.getViewModel().getStore('FaxQStoreAllRecs').onAfter('load', 'afterLoadFaxQStoreAllRecs');
    },
    onAddPharmacyLocks: function () {
        var me = this,
            vm = me.getViewModel(),
            view = me.getView(),
            form = view.down('form'),
            formData = form.getValues(),
            saveAction = [{"Save": {"key": "mode", "value": "A"}}];
        if (form.isValid() && formData) {
            var saveCheck=true;
            if (view.down('#cbxcurrentStatus').getValue() == 'Active' || view.down('#cbxcurrentStatus').getValue() == 'ACTIVE') {
                if (vm.data.action == 'C') {
                    if (view.down('#cbxPharmacy').getValue() == null || view.down('#cbxPharmacy').getValue() == '') {
                        Ext.Msg.alert('Validation Error', 'Please enter Pharmacy to be changed.');
                        saveCheck= false;
                    }
                    else if (view.down('#cbxPharmacy').getValue() == view.down('#txtNewPharmacy').getValue()) {
                        Ext.Msg.alert('Validation Error', 'Current Pharmacy and New Pharmacy cannot be the same.');
                        saveCheck= false;
                    }
                }
            }
            var approver=true;
            if (vm.data.approver == 'no' || vm.data.approver == '') //Not an Approver
            {
                if (view.down('#cbxStatusToBe').getValue() == 'Submitted for Approval' ||
                    view.down('#cbxStatusToBe').getValue() == 'Submitted for Removal') {
                    approver=false;
                    Ext.Msg.confirm('Member Lock', 'Once the Lock is Submitted for Approval, no changes will be allowed. Do you want to proceed?',
                        function (btn) {
                            if (btn == 'yes') {
                                me.saveDetails();
                            }
                        }, this)
                }
                else {
                    approver=false;
                    me.saveDetails();
                }
            }
            if (approver && saveCheck)
            {
                me.saveDetails();
            }

        }
        else {
            Ext.Msg.alert('Validation Error', 'Please fix all the validation errors before saving the data.');
        }
    },
    saveDetails:function() {
        var recipientID = this.masterRecord.recipientID;
        var me = this,
            vm = me.getViewModel(),
            view = me.getView(),
            form = view.down('form'),
            formData = form.getValues(),
            saveAction = [{"Save": {"key": "mode", "value": "A"}}];
        if (view.down('#cbxcurrentStatus').getValue() == 'Active'
            && (view.down('#cbxPharmacy').getValue() != null && view.down('#cbxPharmacy').getValue() != '' && view.down('#txtNewPharmacy').getValue() != "")) {
            this.getViewModel().data.action = "C";
        }
        var fieldList = 'recipientID,lockType,newLockID,currentLockID,currentStatus,toBeStatus,planContactName,planContactExtn,planContactJobDesc,officeContact,officeContactPhone,action,PlangroupId';
        var fieldValues =
            recipientID + '|' + //recipientID
            'NCPDP' + '|';  //lockType
        if (view.down('#cbxPharmacy').getValue() != null) {
            fieldValues = fieldValues + view.down('#cbxPharmacy').getValue() + '|';
        }
        else {
            fieldValues = fieldValues + '' + '|';
        }
        if (view.down('#txtNewPharmacy').getValue() != null) {
            fieldValues = fieldValues + view.down('#txtNewPharmacy').getValue() + '|';
        }
        else {
            fieldValues = fieldValues + '|';
        }
        fieldValues = fieldValues + view.down('#cbxcurrentStatus').getValue() + '|' +  //currentStatus
            view.down('#cbxStatusToBe').getValue() + '|' +  //toBeStatus
            formData.planContactName + '|' + //planContactName
            formData.planContactExtn + '|' + //planContactExtn
            formData.planContactJobDesc + '|' + //planContactJobDesc
            formData.officeContact + '|' + //officeContact
            formData.officeContactPhone + '|' + //officeContactPhone
            this.getViewModel().data.action + '|' + //action
            formData.plangroupId; //PlangroupId

        if (view.down('#cbxcurrentStatus').getValue() == "Draft" && view.down('#cbxStatusToBe').getValue() == "Submitted for Removal") {
            Ext.Msg.alert('Member Locks', "Lock's Current Status is not valid for To Be Status.");
        }
        else if (view.down('#cbxcurrentStatus').getValue() == "Draft" && this.getViewModel().data.action == "R") {
            Ext.Msg.alert('Member Locks', "Lock is not Active yet.");
        }
        else {
            var bApproval = false;
            var result = 1;
            var outSystemId;
            if (vm.data.approver == 'yes') {
                if (view.down('#cbxStatusToBe').getValue().toUpperCase() == "ACTIVE" ||
                    view.down('#cbxStatusToBe').getValue().toUpperCase() == "APPROVAL DENIED" ||
                    view.down('#cbxStatusToBe').getValue().toUpperCase() == "INACTIVE" ||
                    view.down('#cbxStatusToBe').getValue().toUpperCase() == "REMOVAL APPROVED" ||
                    view.down('#cbxStatusToBe').getValue().toUpperCase() == "REMOVAL DENIED") {
                    bApproval = true;
                }
            }
            if (bApproval == true) {
                var bCallSaveProgram = false;

                if (view.down('#hdnSystemId').getValue() == "" || view.down('#hdnSystemId').getValue() == "0") {
                    bCallSaveProgram = true;
                }
                else if (view.down('#cbxcurrentStatus').getValue().toUpperCase() == "ACTIVE" && this.getViewModel().data.action == "C") {
                    bCallSaveProgram = true;
                }
                if (bCallSaveProgram == true) {
                    var returnField = ['pOutSystemID'];
                    var params = {
                        pSystemID: view.down('#hdnSystemId').getValue(),
                        pFieldList: fieldList,
                        pFieldValues: fieldValues
                    };
                    var setMemberLocks = Atlas.common.utility.Utilities.saveData([], 'member/rx/memberlockdetails/update', '', [false], params, saveAction, returnField);
                    if (setMemberLocks.code == 0) {
                        view.down('#hdnSystemId').setValue(setMemberLocks.pOutSystemID);
                        result = 0;
                        outSystemId = setMemberLocks.pOutSystemID;
                        // this.onCancelClick();
                    }
                }
                var paramsApproval = {
                    pSystemID: view.down('#hdnSystemId').getValue(),
                    paction: this.getViewModel().data.action,
                    pStatus: view.down('#cbxStatusToBe').getValue()
                };
                var setMemberLocksApproval = Atlas.common.utility.Utilities.saveData([], 'member/rx/memberlockapproval/update', '', [false], paramsApproval, saveAction, null);
                if (setMemberLocksApproval.code == 0) {
                    result = 0;
                }
            }
            else {
                var params = {
                    pSystemID: view.down('#hdnSystemId').getValue(),
                    pFieldList: fieldList,
                    pFieldValues: fieldValues
                };
                var setMemberLocks = Atlas.common.utility.Utilities.saveData([], 'member/rx/memberlockdetails/update', '', [false], params, saveAction, ['pOutSystemID']);
                if (setMemberLocks.code == 0) {
                    result = 0;
                    this.fireEvent('loadStoreData');
                }
            }
            if (result == 0) {
                var NotesText = " (" + view.down('#cbxStatusToBe').getValue() + ") " + view.down('#txtNotes').getValue();
                var NotesSubject = "Lock Details Notes";
                var oSystemId = view.down('#hdnSystemId').getValue();
                if(oSystemId == 0 ){oSystemId = setMemberLocks.pOutSystemID};
                if (NotesText.length > 0) {
                    if (oSystemId.trim().length > 0 && oSystemId.trim() != "0") {
                        //debugger;
                        var pFieldListNotes = "ParentSystemID,Subject,Note,CreateUser,CreateDate,CreateTime";
                        var now = new Date (Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y H:i:s')) ;
                        var then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
                        var seconds =( now .getHours() * 3600) +  (now .getMinutes() * 60) +  now .getSeconds();
                        var pFieldValuesNotes = oSystemId + "|" + NotesSubject + "|" + NotesText + "|" + Atlas.user.un + "|" + Ext.Date.format(now , 'm/d/Y') + "|" + seconds;
                        var extraParameters = {
                            'psystemId': oSystemId,
                            'pMode': 'A',
                            'pFieldList': pFieldListNotes,
                            'pFields': pFieldValuesNotes
                        };
                        var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/Notes/update', null, [true], extraParameters,
                            saveAction, null);
                        if (testReturn.code == 0) {
                            //Get the Notes log.
                            //getLocksNotes(oSystemId);
                        }
                    }
                }
                Ext.Msg.alert('Member Locks', "Lock Saved Successfully");

                var window = this.getView().up();
                this.editor = Ext.destroy(window);
            }
        }
    },
    onCancelClick: function () {
        var window = this.getView().up();
        this.editor = Ext.destroy(window);
    },
    onLoad: function () {
        var me = this, vm = me.getViewModel(), id;
        me.masterRecord = vm.data.masterRecord;
        id = me.masterRecord.recipientID;
        this.memberLockStatusStoreLoad();
        // this.LoadFaxAndAttachments();
        var store = vm.getStore('planGroupsStore');
        store.getProxy().setExtraParam('pRecipientId', id);
        store.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                if (vm.data.action == "A") {
                    me.getView().down('#cbxplangroupId').setValue(record[0].data.planGroupId);
                }
            }

        });
    },
    btnDelete_Click: function (sender, index) {
        var view = this.getView();
        var me=this;
        var grid = view.down('#FaxGrid');
        try {
            Ext.MessageBox.confirm('Confirm Remove', 'Are you sure you want to remove?',
                function (btn) {
                    if (btn === 'yes') {
                        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                        var record = grid.getStore().getAt(index);
                        var extraParameters = {
                            'pcPlanID': "",
                            'pcKeyType': 'LocksSystemId',
                            'pcKeyValue': view.down('#hdnSystemId').getValue(),
                            'pcKeyAction': 'D',
                            'pcDocIDList': record.data.DocumentID,
                            'pcDescrData': 'anything'
                        }
                        var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [false], extraParameters,
                            saveAction, null);
                        if (submitJobReturn.code == 0) {
                            Ext.Msg.alert("PBM", submitJobReturn.message);
                        }
                        me.LoadFaxAndAttachments();
                    }
                },this)
        }
        catch (e) {
            Ext.Msg.alert('Failure', ' error, Please contact admin.');
        }
    },
    memberLockStatusStoreLoad: function () {
       var memberLockStatusStore= this.getViewModel().getStore('memberLockStatusStore');
        memberLockStatusStore.on({
            load: 'LoadStatus',
            single: true // Remove listener after Load
        });
        memberLockStatusStore.load();

    },
    LoadStatus:function() {
        var view=this.getView();
        try {
            if (this.getViewModel().data.action != "") {
                var sLockAction = this.getViewModel().data.action;
                var datar = new Array();
                var temp=new Array();
                if (sLockAction == "A") {
                    if (this.getViewModel().data.approver == "yes") {
                        //removeList.Add(new { Id = "Draft", Name = "Draft" });
                        temp.push("Inactive");
                        temp.push("Removal Denied");
                        temp.push("Removal Approved");
                        temp.push("Submitted for Removal");
                    }
                    else {
                        temp.push("Active");
                        temp.push("Inactive");
                        temp.push("Approval Denied");
                        temp.push("Removal Denied");
                        temp.push("Removal Approved");
                        temp.push("Submitted for Removal");
                    }
                }
                else if (sLockAction == "C") {
                    if (this.getViewModel().data.approver == "yes") {
                        temp.push("Inactive");
                        temp.push("Removal Denied");
                        temp.push("Removal Approved");
                        temp.push("Submitted for Removal");
                    }
                    else {
                        temp.push("Active");
                        temp.push("Inactive");
                        temp.push("Approval Denied");
                        temp.push("Removal Denied");
                        temp.push("Removal Approved");
                        temp.push("Submitted for Removal");
                    }
                }
                else if (sLockAction == "R") {
                    if (this.getViewModel().data.approver == "yes") {
                        temp.push("Active");
                        temp.push("Approval Denied");
                        temp.push("Removal Approved");
                        temp.push("Submitted for Approval");
                    }
                    else {
                        temp.push("Active");
                        temp.push("Inactive");
                        temp.push("Approval Denied");
                        temp.push("Removal Denied");
                        temp.push("Removal Approved");
                        temp.push("Submitted for Approval");
                    }
                }
                 for (var i=0;i< this.getViewModel().getStore('memberLockStatusStore').data.length;i++)
                 {
                     if(temp.indexOf(this.getViewModel().getStore('memberLockStatusStore').data.items[i].data.name)<=-1)
                     {
                         datar.push({name: this.getViewModel().getStore('memberLockStatusStore').data.items[i].data.name, value: this.getViewModel().getStore('memberLockStatusStore').data.items[i].data.value});
                     }
                 }
                var memberLockStatusToBeStore = this.getViewModel().getStore('memberLockStatusToBeStore');
                view.down('#cbxStatusToBe').setStore(memberLockStatusToBeStore);
                memberLockStatusToBeStore.loadData(datar);
                view.down('#cbxStatusToBe').setValue(this.getViewModel().data.toBeStatus);
            }
        }
        catch
            (ex) {

        }
    },
    AddAttachment_Click: function () {
        var me = this,
            win;
        win = Ext.create('Ext.window.Window', {
            title: 'Add Attachment',
            modal: true,
            closable: true,
            scrollable: true,
            height:300,
            width:700,
            layout: {
                type: 'fit',
                align: 'stretch'
            },
            scope: me,
            itemId: 'winAddAttachment',
            items: [
                {
                    xtype: 'merlin.fileuploader',
                    keyType: 'imageLocks',
                    height: '100%',
                    fileType: 'pdf',
                    origin: me.getView().id,
                    endpoint: 'shared/rx/document/update'
                }



            ]

        });
        this.getView().add(win);
        win.show();

    },
    onUploadAttachment: function (arrayDocumentId,origin) {
        var view=this.getView();
        var me=this;
        if (origin !== view.id) {
            return; // ignore
        }
        else
        {
            var win = view.down('#winAddAttachment');
            if (win) {
                var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                var panelFileUpload = view.down('#fileUploadGrid'),
                    fileStore = panelFileUpload.getViewModel().getStore('fileStore');
                var params = {
                    pcPlanID: '',
                    pcKeyType: 'LocksSystemId',
                    pcKeyValue: view.down('#hdnSystemId').getValue(),
                    pcKeyAction: 'A',
                    pcDocIDList: arrayDocumentId[0].trim(),
                    pcDescrData: fileStore.getAt(0).get('description')
                };
                var setAttachmentList = Atlas.common.utility.Utilities.saveData([], 'shared/rx/attachmentlist/update', '', [false], params,
                    saveAction, null);
                win.close();
                me.LoadFaxAndAttachments();
                Ext.Msg.alert('Success', 'File Upload Sucessfully');
            }
        }
    },
    LoadFaxAndAttachments: function () {
        var view = this.getView();
        if (view.down('#hdnSystemId').getValue() != null && view.down('#hdnSystemId').getValue() != "") {
            var vm = this.getViewModel();
            var FaxHistoryStore = vm.getStore('FaxAndAttachmentsStore');
            FaxHistoryStore.getProxy().setExtraParam("pcKeyType","LocksSystemId");
            FaxHistoryStore.getProxy().setExtraParam("pcKeyValue", view.down('#hdnSystemId').getValue());
            FaxHistoryStore.load();
        }
    },
    FaxQueue_Click: function () {
        var me = this;
        var win = Ext.create('Ext.window.Window',{
            itemId: 'winFaxQWindow',
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
                    viewConfig: {
                        plugins: {
                            ptype: 'gridviewdragdrop',
                            containerScroll: true,
                            dragGroup: 'faxDDGroup',
                            dropGroup: 'faxDDGroup',
                            copy: true,
                            enableDrop: false
                        }
                    },
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
    OnSearchClick: function () {
        var view = this.getView();
        if (view.down('#cbxFax').getValue() != null && view.down('#cbxFax').getValue() == '1') {
            this.loadInitialFaxQStoreData(null, null, "");
        } else {
            var _ack = 'Y';
            this.loadInitialFaxQStoreData(view.down('#faxReceivedDate').getValue(), view.down('#dtTo').getValue(), _ack);
        }
    },
    afterLoadFaxQStoreAllRecs: function(FaxQStoreAllRecs, records, success){
        Atlas.common.view.GetFilteredStore.getFilteredStore(FaxQStoreAllRecs, [], this.getViewModel().getStore('FaxQStore'));
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
            var fields = "y" + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + "|" + Atlas.user.un;
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

    dropmenberLocks : function (node, data, dropRec, dropPosition) {
        data.records[data.records.length - 1].dirty = true;
        this.updatedropmenberLocks(data);
    },

    updatedropmenberLocks: function (data) {
        var iCnt,
            docID = 0,
            docList = '',
            delDocList = '',
            descList = '',
            docDescription = '',
            saveData = '',
            updatedropmenberLocksstore = this.getViewModel().getStore('FaxAndAttachmentsStore');

        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
        for (iCnt = 0; iCnt < updatedropmenberLocksstore.count(); iCnt++) {

            var record = updatedropmenberLocksstore.data.items[iCnt];

            if (!record.dirty) {
                continue;
            }
            record.data.DocumentID = data.records[data.records.length - 1].get('DocumentID');
            record.data.faxDate = data.records[data.records.length - 1].get('RecieptDate');
            record.data.inOut = 'Incoming Fax';
        }

            saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], {
                    pcPlanID: 'HPM',
                    pcKeyType: 'LocksSystemId',
                    pcKeyValue:  this.getView().down('#hdnSystemId').getValue(),
                    pcKeyAction: 'A',
                    pcDocIDList: data.records[data.records.length - 1].get('DocumentID'),
                    pcDescrData: 'Locks Fax'
                },
                saveAction, null);

            if (saveData.code != "0") {
                Ext.Msg.alert('Attachment Error', saveData.message, Ext.emptyFn);
            }


        /* DELETE ATTACHMENT RECORD */
        for (iCnt in updatedropmenberLocksstore.removed) {
            delDocList = delDocList + (delDocList == '' ? '' : '|') + updatedropmenberLocksstore.removed[iCnt].data.DocumentID;
        }

        if (delDocList != '') {
            saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], {
                    pcPlanID: 'HPM',
                    pcKeyType: 'LocksSystemId',
                    pcKeyValue:  this.getView().down('#hdnSystemId').getValue(),
                    pcKeyAction: 'A',
                    pcDocIDList: data.records[data.records.length - 1].get('DocumentID'),
                    pcDescrData: 'Locks Fax'
                },
                saveAction, null);

            if (saveData.code != "0") {
                Ext.Msg.alert('Attachment Error', saveData.message, Ext.emptyFn);
            }
        }

        this.LoadFaxAndAttachments();
    }
});