/**
 * Created by j2487 on 10/4/2016.
 */
Ext.define('Atlas.member.view.MemberCOBCController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.membercobc',
    init: function () {
        var view = this.getView();
        if (view.openView == true) {
            view.down('#txtMemID').setValue(view.RecipientID);
            if (view.RecipientID == '') {
                Ext.Msg.alert('Message', 'Please enter MeridianRx ID');
            }
            this.GetCOBCInfoParent(view.RecipientID);
            this.GetBlockStatus(view.RecipientID);
            this.getCOBCBlockDetails(view.RecipientID);

        }
    },
    MemberSearch: function (f, e) {
        var view = this.getView();

        if (e.getKey() == e.ENTER) {
            var recipientID = view.down('#txtMemID').getValue();
            this.getViewModel().set('recipientID', recipientID);
            this.getViewModel().set('rowIndex', null);
            this.getViewModel().set('record', null);
            if (recipientID == '') {
                Ext.Msg.alert('Message', 'Please enter MeridianRx ID');
            }
            this.GetCOBCInfoParent(recipientID);
            this.GetBlockStatus(recipientID);
            this.getCOBCBlockDetails(recipientID);
        }

    },
    GetBlockStatus: function (recipientID) {
        //TODO Pending method


    },
    GetCOBCInfoParent: function (recipientID) {
        var where = '';
        where = this.buildWhereClause(where, 'RecipientId', '=', recipientID);
        var cobcmemberinfostore = this.getViewModel().getStore('cobcmemberinfostore');
        cobcmemberinfostore.getProxy().setExtraParam('pWhere', where);
        cobcmemberinfostore.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                if (record.length <= 0) {
                    Ext.Msg.alert('PBM', 'COBC Record not found.');
                    return;
                }
                else {
                    this.GetMemberInfo(recipientID);
                    this.GetCOBCInfoChild(recipientID);
                }
            }
        });
        // this.getView().down('#lblKey').setValue(recipientID);

    },
    GetMemberInfo: function (recipientID) {

        var view = this.getView();
        var item = view.down('#status');
        var memberMasterModel = Ext.create('Atlas.member.model.MemberMaster', {});
        memberMasterModel.getProxy().setExtraParam('pKeyValue', recipientID);
        memberMasterModel.load(
            {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {

                },
                callback: function (record, operation, success) {

                    var obj = Ext.decode(operation.getResponse().responseText);
                    if (obj.message[0].message != 'Successful') {
                        Ext.Msg.alert('Message', obj.message[0].message);
                    }
                    this.getViewModel().set('masterrecord', record);
                    if (record.get('enrollmentStatus') == 'Active') {
                        item.setFieldStyle({color: 'green'});

                    }
                    else {
                        item.setFieldStyle({color: 'red'});
                    }
                }
            });
        var memberCoverageHistoryStore = this.getViewModel().getStore('membercoveragehistorystore');
        memberCoverageHistoryStore.getProxy().setExtraParam('pKeyValue', recipientID);
        memberCoverageHistoryStore.load(
            {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {

                    if (record.length != 0) {
                        view.down('#lob').setValue(record[(record.length) - 1].get('tCarrierLOBName'));
                        view.down('#pcpname').setValue(record[(record.length) - 1].get('tPrimaryCarePhys'));
                        var npi = record[(record.length) - 1].get('tPCPID');
                        this.getViewModel().set('npi', npi);
                        view.down('#npi').setValue(npi);
                        var prescribersstore = this.getViewModel().getStore('prescribersstore');
                        prescribersstore.getProxy().setExtraParam('pKeyValue', npi);
                        prescribersstore.load(
                            {
                                scope: this,
                                failure: function (record, operation) {
                                },
                                success: function (record, operation) {
                                },
                                callback: function (record, operation, success) {
                                    var locphone = record[0].get('locphone');
                                    if (locphone.length == 10) {
                                        locphone = "(" + locphone.substr(0, 3) + ") " + locphone.substr(3, 3) + "-" + locphone.substr(6);
                                    }
                                    view.down('#pcpphone').setValue(locphone);
                                    var locfax = record[0].get('locfax');
                                    if (locfax.length == 10) {
                                        locfax = locfax.substr(0, 3) + "-" + locfax.substr(3, 3) + "-" + locfax.substr(6);
                                    }
                                    view.down('#pcpfax').setValue(locfax);
                                }
                            })
                    }
                }
            });
    },
    GetCOBCInfoChild: function (recipientID) {
        if (recipientID.toString().length <= 0 || recipientID.toString().length == 0) {
            Ext.Msg.alert('PBM Error", "COBC Details could not be loaded.');
            return;
        }
        this.GetCOBLetterDetail(recipientID);
        this.GetInsuranceInfo(recipientID);
    },
    GetCOBLetterDetail: function (recipientID) {
        var where = '';
        where = this.buildWhereClause(where, 'RecipientId', '=', recipientID);
        where = this.buildWhereClause(where, 'cobcstatus', '<>', '1');
        where = this.buildWhereClause(where, 'lettertype', '<>', '');
        where = this.buildWhereClause(where, 'lettertype', '<>', '?');

        var cobcletterdetailstore = this.getViewModel().getStore('cobcletterdetailstore');
        cobcletterdetailstore.getProxy().setExtraParam('pWhere', where);
        cobcletterdetailstore.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                if (record.length > 0) {

                    //this.getViewModel().set('cobcLetterDetailData',record[0].data)
                }

            }
        });
    },
    GetInsuranceInfo: function (recipientID) {

        var cobchistorystore = this.getViewModel().getStore('cobchistorystore');
        cobchistorystore.getProxy().setExtraParam('pRecipientId', recipientID);
        cobchistorystore.getProxy().setExtraParam('pCOBCRecordId', 0);
        cobchistorystore.getProxy().setExtraParam('pRecordType', 'ALLCOVERAGE');
        cobchistorystore.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
            }
        });
    },
    onRowDblClick: function (me, record, tr, rowIndex, e, eOpts) {
        var view = this.getView(), vm = this.getViewModel();
        vm.set('mCOBCLetterDetails', record);
        view.down('[name=cobcStatus]').setValue(record.data.COBCStatusDesc);
        var win = this.lookupReference('UpdateLetterStatus');
        vm.set('letterrecord', record);
        win.show();
        var status = record.data.COBCStatus;
        if (status == 7 || status == 6) // No Response Required or ECRS update complete
        {
            view.down('#saveStatus').setDisabled(true);
        }
        else view.down('#saveStatus').setDisabled(false);
        view.down('#updatenotes').setRawValue();

    },
    onExpandedRowDblClick: function (me, record, tr, rowIndex, e, eOpts) {
        var view = this.getView(), vm = this.getViewModel();
        view.down('[name=cobcStatus]').setValue(record.data.COBCStatusDesc);
        var win = this.lookupReference('UpdateLetterStatus');
        vm.set('letterrecord', vm.get('temprecord'));
        win.show();
        var status = record.data.COBCStatus;
        if (status == 7 || status == 6) // No Response Required or ECRS update complete
        {
            view.down('#saveStatus').setDisabled(true);
        }
        else view.down('#saveStatus').setDisabled(false);
        view.down('#updatenotes').setRawValue();
    },
    expand: function (rowNode, record, expandRow, a, b, c) {
        var view = this.getView();
        var grid = view.down('#outerGrid');
        var vm = this.getViewModel();
        vm.set('temprecord', record);
        vm.set('letterrecord', record);
        var store = grid.getStore();
        var rowindex = store.indexOf(record);
        if (store.data.length > 1) {
            if (this.getViewModel().get('rowIndex') != null) {
                if (Ext.encode(grid.getPlugin().recordsExpanded).indexOf(this.getViewModel().get('record').internalId) > -1 && this.getViewModel().get('record').internalId != record.internalId) {
                    grid.getPlugin().toggleRow(this.getViewModel().get('rowIndex'), this.getViewModel().get('record'));
                    this.getViewModel().set('rowIndex', null);
                    this.getViewModel().set('record', null);
                    this.getViewModel().set('rowIndex', rowindex);
                    this.getViewModel().set('record', record);
                }
                else {
                    this.getViewModel().set('rowIndex', rowindex);
                    this.getViewModel().set('record', record);
                }
            }
            else {
                this.getViewModel().set('rowIndex', rowindex);
                this.getViewModel().set('record', record);
            }
        }
        this.getViewModel().set('letterrecord', record);
        var recId = record.get('cobcrecordid');
        var recipientID = record.get('recipientid');
        var cobcexpandstore = this.getViewModel().getStore('cobcexpandstore');
        cobcexpandstore.getProxy().setExtraParam('pRecipientId', recipientID);
        cobcexpandstore.getProxy().setExtraParam('pCOBCRecordId', recId);
        cobcexpandstore.getProxy().setExtraParam('pRecordType', 'ALLCOVERAGE');
        cobcexpandstore.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {


            }
        });
    },
    buildWhereClause: function (fullString, param, condition, value) {
        if (value === null || value.length === 0) {
            return fullString = fullString.length > 0 ? fullString : fullString
        } else {
            return fullString = fullString.length > 0 ? fullString + " AND " + param + condition + "'" + value + "'" : param + condition + "'" + value + "'";
        }
    },
    createAdvSearchWindow: function () {
        var win = this.lookupReference('AdvSearchCOBC');
        win.show();
    },
    /*  onReset: function (bt) {
     bt.up('form').reset();

     if( this.getViewModel().getStore('cobcmemberinfostore1').data.length > 0)
     {
     this.getViewModel().getStore('cobcmemberinfostore1').removeAll();
     }
     },*/
    onBlockClick: function (grid, rowIndex, colIndex) {
        var record = grid.getStore().getAt(rowIndex).data;
        this.getViewModel().set('recipientID', record.RecipientId);
        this.getCOBCBlockDetails(record.RecipientId);
        this.getViewModel().set('coverageDetails', record);
        var win = this.lookupReference('BlockOverrideWindow');
        win.show();
    },
    getCOBCBlockDetails: function (recipientID) {
        var where = '', vm = this.getViewModel(), view = this.getView();
        view.down('#lblStatus').setValue("");
        where = this.buildWhereClause(where, 'RecipientId', '=', recipientID);
        var memberdetailstore = this.getViewModel().getStore('memberdetailstore');
        memberdetailstore.getProxy().setExtraParam('pWhere', where);
        memberdetailstore.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                if (record.length != 0) {
                    this.getViewModel().set('cobcLetterDetailData', record[0].data);
                    vm.set('memberDetailData', record[0].data);
                    var combo = view.down('[name=blockPrimaryInsurance]');
                    if (record[0].data.blockedprimary) {
                        view.down('#lblStatus').setValue("Member's Primary Insurance Blocked.").setFieldStyle({
                            color: 'red',
                            fontweight: 'bold'
                        });
                        if (combo != null)
                            combo.setValue('Yes');
                    }
                    else {
                        view.down('#lblStatus').setValue("");
                        if (combo != null)
                            combo.setValue('No');
                    }

                }

            }
        });


    },
    onUpdateNotesHistoryClick: function () {
        var win = this.lookupReference('winCOBCNotesHistory');
        win.show();
        this.getNotes(parseFloat(this.getViewModel().get('letterrecord').get('SystemId')));
    },
    onBlockNotesHistoryClick: function () {
        var win = this.lookupReference('winCOBCNotesHistory');
        win.show();
        // var parentSystemId = this.getViewModel().get('cobcLetterDetailData').SystemId;
        this.getNotes(parseFloat(this.getStore('memberdetailstore').data.items[0].get('systemID')));

    },
    /*View item from Grid */
    onViewClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        Atlas.common.utility.Utilities.viewDocument(rec.get('DocID'), 'pdf');
    },
    SaveCOBCLetterDetails: function () {
        var view = this.getView();
        var vm = this.getViewModel();
        var status = vm.get('letterrecord').get('COBCStatusDesc');
        if (view.down('[name=cobcStatus]').getValue() == status) {
            Ext.Msg.alert('PBM', 'No status updates done.');
            return;
        }
        var result, pResult, message = '', pSystemId, oSystemId, pFieldList = '', pFieldValues = '', sSuccessMessage = '', sActivityDesc = '', lettersentdate = '', MemRespDate = '', ecrssentdate = '', ecrscompletedate = '';
        if (vm.get('letterrecord').get('SystemId').toString().length <= 0) {
            Ext.Msg.alert('PBM', 'COBC Letter Details could not be saved.');
            return;
        }
        else pSystemId = vm.get('letterrecord').get('SystemId');

        var cobcstatusvalue = view.down('[name=cobcStatus]').getValue();
        var cobcstatustext = view.down('[name=cobcStatus]').getDisplayValue();
        var lettertype = view.down('[name=letterType]').getValue();
        var notes = view.down('[name=updatenotes]').getValue();
        switch (cobcstatustext.toLowerCase()) {
            case "cobc letter sent":
                lettersentdate = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y H:i:s');
                break;
            case "member response received":
                MemRespDate = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y H:i:s');
                break;
            case "sent to ecrs":
                ecrssentdate = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y H:i:s');
                break;
            case "ecrs update complete":
                ecrscompletedate = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y H:i:s');
                break;
        }
        pFieldList = 'cobcstatus,MemRespDate,ecrssentdate,ecrscompletedate';
        pFieldValues = cobcstatusvalue + '|' + MemRespDate + '|' + ecrssentdate + '|' + ecrscompletedate;
        var saveAction = [{"Save": {"key": "mode", "value": "U"}}];
        var extraParameters = {
            'pSystemId': pSystemId,
            'pFields': pFieldList,
            'pValues': pFieldValues
        };
        var result = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/cobcletterdetail/update', null, [true], extraParameters, saveAction, ['oSystemId']);

        if (result.code == 0) {
            if (lettersentdate.length > 0) {
                var mode = 'U';
                var userName = Atlas.user.un;
                var today = Atlas.common.utility.Utilities.getLocalDateTime() ;
                var fieldList = "sentBy,sentDate,AssignTo";
                var valueList = userName + '|' + today + '|' + '';
                var letterID = this.getViewModel().get('letterrecord').get('cobcrecordid').toString();
                var retLetterID;
                var saveAction = [{"Save": {"key": "mode", "value": "U"}}];
                var extraParameters = {
                    pMode: mode,
                    pFields: fieldList,
                    pValues: valueList,
                    pLetterID: letterID

                };
                var result = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/letterdetail/update', null, [true], extraParameters, saveAction, ['retLetterID']);
                if (result.code == 0) {
                    Ext.MessageBox.alert('Success', "COB Letter Details Saved Successfully");
                }
                else {
                    Ext.MessageBox.alert('Failure', result.message);
                }
            }
            sActivityDesc = "Updated COBC Letter Details. Letter Type: " + lettertype + " / ";
            sActivityDesc = sActivityDesc + "Previous Status: " + this.getViewModel().get('letterrecord').get('COBCStatusDesc').toString() + " / ";
            sActivityDesc = sActivityDesc + "Current Status: " + cobcstatustext + " / ";
            sActivityDesc = sActivityDesc + "Notes: " + notes.toString();
            this.setActivityLog('', vm.get('letterrecord').get('recipientid').toString(), 'COBC', sActivityDesc);
            if (vm.get('letterrecord').get('SystemId').toString().length > 0) {
                this.SetNotes(vm.get('letterrecord').get('SystemId').toString(), "Updated COBC Letter Details for Member: " + vm.get('letterrecord').get('recipientid').toString(), notes);
            }
            Ext.MessageBox.alert('Success', "COB Letter Details Saved Successfully");
            this.lookupReference('UpdateLetterStatus').hide();
        }
        else {
            Ext.MessageBox.alert('Failure', "COB Letter details not saved - " + result.message, this.showResult, this);
        }

        this.GetCOBLetterDetail(vm.get('letterrecord').get('recipientid'));
        this.GetInsuranceInfo(vm.get('letterrecord').get('recipientid'));
    },
    SetNotes: function (parentSystemId, subject, Notes) {
        var today = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y H:i:s');
        var now = Atlas.common.utility.Utilities.getLocalDateTime() ,
            then = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                0, 0, 0),
            seconds = now.getTime() - then.getTime();
        var pFieldList = "ParentSystemID,Subject,Note,CreateUser,CreateDate,CreateTime";
        var pFieldValues = parentSystemId + "|" + subject + "|" + Notes + "|" + Atlas.user.un + "|" + today + "|" + seconds.toString();
        var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
        var extraParameters = {
            psystemId: 0,
            pMode: 'A',
            pFieldList: pFieldList,
            pFields: pFieldValues
        };
        var result = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/notes/update', null, [true], extraParameters,
            saveAction, null);
    },
    setActivityLog: function (ParentSystemId, ParentId, ActivityType, ActivityDesc) {
        var result;
        var message = '';
        var pRetSystemId;
        var pFieldList = '';
        var pFieldValues = '';
        var now = Atlas.common.utility.Utilities.getLocalDateTime() ;
        pFieldList = 'ActivityDate,ActivityDesc,ActivityBy,parentSystemID,ActivityType,parentid';
        pFieldValues = now + '|' + ActivityDesc + '|' + Atlas.user.un + '|' + ParentSystemId + '|' + ActivityType + '|' + ParentId;
        var extraParameters = {
            pSystemId: 0,
            pFields: pFieldList,
            pValues: pFieldValues
        };
        var saveAction = [{"Save": {"key": "pAction", "value": "A"}}];
        var result = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/activitylog/update', null, [true], extraParameters,
            saveAction, [pRetSystemId]);
    },
    AdvancedSearch: function () {
        var view = this.getView();
        var recipientID = view.down('#cbxMember').getValue();
        var cobcStatus = view.down('#cbxCOBCStatus').getValue();
        if (recipientID == null && cobcStatus == null) {
            Ext.Msg.alert('PBM', 'At least one search criteria is required.');
            return;
        }
        this.getViewModel().set('recipientID', recipientID);
        var where = '';
        where = this.buildWhereClause(where, 'RecipientId', '=', recipientID);
        where = this.buildWhereClause(where, 'cobcstatus', '=', cobcStatus);
        view.down('#ptbar').moveFirst();
        var cobcmemberinfostore1 = this.getViewModel().getStore('cobcmemberinfostore1');
        cobcmemberinfostore1.getProxy().setExtraParam('pWhere', where);
        cobcmemberinfostore1.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                if (record.length <= 0) {
                    Ext.Msg.alert('PBM', 'COBC Record not found.');
                }
            }
        });

    },

    cmbCoverage_Type_Render:function (value, meta, record) {
        var coverages = [
            "Member Record",
            "Primary",
            "Secondary"
        ];
        if(value == 'DTL')
            return coverages[0];
        else  if(value == 'PRM')
            return coverages[1];
        else if(value == 'SUP')
            return coverages[2];
        else
            return '';
    },


    loadCOBCDetails: function (me, record, tr, rowIndex, e, eOpts) {
        this.getViewModel().set('rowIndex', null);
        this.getViewModel().set('record', null);
        this.getView().down('#txtMemID').setValue(record.get('RecipientId'));
        this.getViewModel().set('recipientID', record.get('RecipientId'));
        this.GetCOBCInfoParent(record.get('RecipientId'));
        this.getView().down('#winSearch').hide();

    },

    SaveBlock: function () {
        var view = this.getView(), vm = this.getViewModel(), form = view.down('[name=blockOverrideForm]'), formData = form.getValues(),
            pMode, result, message, oSystemId, systemID, oRecipientId, pFieldList, pFieldValues, sSuccessMessage, sActivityDesc, sBlock, sOverrideThrough, sNotes;
        if (vm.get('cobcLetterDetailData'))
            systemID = vm.get('cobcLetterDetailData').systemID;
        Ext.MessageBox.confirm('Confirm ', 'Are you sure you want to modify block/override information ?', function (btn) {
            if (btn === 'yes') {
                if (form.isValid() && formData) {
                    //var pMode = '', result, message = '', oSystemId, oRecipientId, pFieldList = '', pFieldValues = '', sSuccessMessage = '', sActivityDesc = '', sBlock = '', sOverrideThrough = '', sNotes = '';
                    if (!systemID)
                        var saveAction = [{"Save": {"key": "pMode", "value": "A"}}];
                    else var saveAction = [{"Save": {"key": "pMode", "value": "U"}}];

                    sBlock = formData.blockPrimaryInsurance;
                    sNotes = formData.notes;
                    sOverrideThrough = formData.blockOverrideDate;
                    var sBlockedDate = '';

                    if (sBlock && sBlock.toUpperCase() == 'YES') {
                        sBlockedDate = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y');
                    }
                    else sOverrideThrough = '';
                    var sOverriddenDate = '';
                    if (sOverrideThrough) {
                        sOverriddenDate = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y');
                    }
                    var recipientID = vm.get('masterrecord').get('recipientID');
                    var coverageType = view.down('[name=coverageType]').getValue();
                    var altInsId = vm.get('coverageDetails').HICNRRB;
                    var altInsName = vm.get('coverageDetails').InsurerName;
                    var altInsEffDate = Ext.Date.format(vm.get('coverageDetails').EffDate, 'm/d/Y');
                    var altInsTermDate = Ext.Date.format(vm.get('coverageDetails').TermDate, 'm/d/Y');

                    pFieldList = 'recipientid,blockedprimary,overridedthrough,blockedDate,overridedDate';
                    pFieldValues = recipientID + '|' + sBlock + '|' + sOverrideThrough + '|' + sBlockedDate + '|' + sOverriddenDate;
                    if (sBlock && sBlock.toUpperCase() == 'YES') {
                        pFieldList = pFieldList + ',' + 'AltInsID,AltInsName,AltInsEffDate,AltInsTermDate,CoverageType';
                        pFieldValues = pFieldValues + '|' + altInsId + '|' + altInsName + '|' + altInsEffDate + '|' + altInsTermDate + '|' + coverageType;
                    }
                    else {
                        pFieldList = pFieldList + ',' + 'AltInsID,AltInsName,AltInsEffDate,AltInsTermDate,CoverageType';
                        pFieldValues = pFieldValues + '|' + '' + '|' + '' + '|' + '' + '|' + '' + '|' + '';
                    }
                    var extraParameters = {
                        pRecipientId: recipientID,
                        pValues: pFieldValues,
                        pFields: pFieldList
                    };

                    var result = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/memberdetails/update', null, [true], extraParameters, saveAction, ['oSystemId', 'oRecipientId']);
                    if (result.code == 0) {
                        sActivityDesc = 'Updated Block/Override Details. Block Primary Insurance: ' + sBlock + '/';
                        if (sOverrideThrough) {
                            sActivityDesc = sActivityDesc + "Override Through: " + sOverrideThrough + " / ";
                        }
                        if (sBlock && sBlock.toUpperCase() == 'YES') {
                            sActivityDesc = sActivityDesc + "Coverage Type: " + coverageType + " / ";
                            sActivityDesc = sActivityDesc + "Alt. Ins. ID: " + altInsId + " / ";
                            sActivityDesc = sActivityDesc + "Alt. Ins. Name: " + altInsName + " / ";
                            sActivityDesc = sActivityDesc + "Alt. Ins. Eff. Date: " + altInsEffDate + " / ";
                            sActivityDesc = sActivityDesc + "Alt. Ins. Term. Date: " + altInsTermDate + " / ";
                        }
                        sActivityDesc = sActivityDesc + "Notes: " + sNotes;
                        this.setActivityLog('', recipientID, 'COBC', sActivityDesc);
                        this.SetNotes(vm.get('coverageDetails').SystemID, "Updated COBC Block/Override Details for Member: " + recipientID, sNotes)
                        this.getCOBCBlockDetails(recipientID);
                        sSuccessMessage = "Block/Override Details Successfully Updated.";
                        Ext.Msg.alert("Successful", sSuccessMessage);
                        var win = this.lookupReference('BlockOverrideWindow');
                        win.hide();
                    }
                }


            }
            else {
                return;
            }
        }, this);


    },
    winNotesClose: function () {
        this.getView().down('#winNotes').close();
    },
    getNotes: function (parentSystemId) {
        var strReviewNotes = '';
        var notestore = this.getViewModel().getStore('notestore');
        notestore.getProxy().setExtraParam('pParentSystemID', parentSystemId);
        notestore.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                var objResp = Ext.decode(operation.getResponse().responseText);
                if (objResp.message[0].code == 0) {
                    if (record.length > 0) {
                        for (var i = 0; i < record.length; i++) {

                            strReviewNotes = record[i].get('CreateUser') + '(' + Ext.Date.format(new Date(record[i].get('CreateDate')), 'm/d/Y') + ' ' + record[i].get('CreateTime') + ')' + '--' + record[i].get('Note') + '\r\n' + '\r\n' + strReviewNotes;
                        }
                        this.getView().down('#txtNotes').setValue(strReviewNotes);
                    }
                    else {
                        Ext.Msg.alert('Info', "No Note History found");
                    }

                }
                else {
                    Ext.Msg.alert('Failure', objResp.message[0].message);
                }

            }

        });

    },
    onMemberClick: function () {
        var me = this, vm = me.getViewModel();
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/member/MemberToolbar'), id = vm.get('recipientID');
        //Make sure you specify atlasId, as it serves as unique identifier to opened tab.
        this.fireEvent('openView', 'merlin', 'member', 'MemberToolbar', {
            atlasId: id,
            RID: id,
            menuId: menuId
        });
    },
    onPCPClick: function () {
        var me = this, vm = me.getViewModel();
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/prescriber/PrescriberToolbar'), id = vm.get('npi');

        //Make sure you specify atlasId, as it serves as unique identifier to opened tab.
        me.fireEvent('openView', 'merlin', 'prescriber', 'PrescriberToolbar', {
            atlasId: id,
            ncpdpId: id,
            menuId: menuId
        }, null);

    }

});
