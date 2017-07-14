/*
 Last Developer: Srujith Cheruku
 Previous Developers: [Srujith Cheruku]
 Origin: Merlin - Member
 Description: This is used for patient safety view controller.
 */
Ext.define('Atlas.member.view.PatientSafetyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.patientSafetyController',

    onReset: function (bt) {
        bt.up('form').reset();
    },

    onCreateCaseClick: function (grid, rowIndex) {

        this.getViewModel().set('gridData', grid.getStore().getAt(rowIndex).data);
        this.lookupReference('createCaseWindow').show();
    },

    onCreateContactLogClick: function (grid, rowIndex) {

        var record = null;
        var me = this,
            view = this.getView(),
            user = Ext.first('viewport').getViewModel().get('user');


        grid.getStore().getAt(rowIndex).data.page = 'patientsafety';
        grid.getStore().getAt(rowIndex).data.key = 'ncpdpId';
        // grid.getStore().getAt(rowIndex).data.keyvalue=data.ncpdpid;
        // grid.getStore().getAt(rowIndex).data.keytext=data.name;


        grid.getStore().getAt(rowIndex).data.action = "add";
        me.getViewModel().set('forminfo', grid.getStore().getAt(rowIndex).data);
        me.editor = Ext.create({
            xtype: 'common-editgrid-window',
            callingView: view, //used to for closing methods cleanup as we open to viewport
            iconCls: 'icon-contactlog,8',
            title: record ? 'Update' : 'Add',
            viewModel: {
                type: this.getView().dialogviewmodel || 'common-editgrid-window',
                parent: this.getViewModel(),
                data: {
                    isEditing: record ? true : false,
                    record: record
                }
            },
            controller: "addcontactlogcontroller" || 'common-editgrid-window',
            width: 1000,
            height: 750,
            items: [{
                reference: 'editorForm',
                xtype: 'contactlogwindow'
            }]
        });
    },

    onSave: function () {
        var form = this.lookupReference('createCaseWindow').down('#createCaseForm');
        var formData = form.getValues();

        if (form.isValid() && formData) {
            Ext.Msg.confirm('Save Case', 'Are you sure you would like to create a case and Assign to: <b>' + formData.assignTo + '</b>?', function (btn) {
                if (btn == 'yes') {
                    try {
                        var me = this, gridData, saveData, saveAction, returnField,
                            pFields, pValues, pMTMId = 0, pMode = 'A';
                        gridData = me.getViewModel().get('gridData');
                        saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                        returnField = ['oMTMId', 'oSystemId'];
                        pFields = 'CaseManager,recipientID,description,EnrollDate,EnrollBy,EnrollReason,MTMstatus,effDate,followupDate,planGroupID';
                        pValues = formData.assignTo + '|' + gridData.RecipID //recipientID
                        if (gridData.AlertType == "Medication Adherence") {
                            pValues = pValues + '|' + "5";
                        }
                        else {
                            pValues = pValues + '|' + "12";
                        }
                        pValues = pValues + '|' + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y')//EnrollDate
                            + '|' + Atlas.user.un //EnrollBy
                            + '|' + gridData.AlertType + '-' + gridData.Descr //EnrollReason
                            + '|' + '1' //MTMstatus
                            + '|' + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') //effDate
                            + "|" + formData.followUpDate // followupDate
                            + "|" + gridData.PlanGroupID; //
                        //if (form.isValid() && formData) {
                        var extraParameters = {
                            'pMode': pMode,
                            'pFields': pFields,
                            'pValues': pValues,
                            'pMTMId': pMTMId
                        };
                        saveData = Atlas.common.utility.Utilities.saveData(
                            [{}], //stores array of stores
                            'member/rx/mtmcase/update', //url
                            null, //temptablenames
                            [false], //trackingRemoved
                            extraParameters, //extraParameters
                            saveAction, //action
                            returnField //returnfields
                        );
                        if (saveData.code == 0 && saveData.oMTMId > 0) {
                            var reasonCode = "PATS";
                            var sNotes = formData.notes;

                            //Contact Log
                            var fieldList5 = "subject,description,callStatus,contactType," +
                                "contactUser,updatedBy,callDateTime,recipientID,mtmID,LastModifiedUser,planGroupId,updatedDatetime";
                            var valueList5 = "Patient Safety Letter" + "|" + "Patient Safety letter is faxed to prescriber on " + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + " " + sNotes +
                                "|" + "C" + "|" + "L" + "|" + Atlas.user.un + "|" + Atlas.user.un +
                                "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y H:i:s') + "|" + gridData.RecipID +
                                "|" + saveData.oMTMId + "|" + Atlas.user.un + "|" + gridData.PlanGroupID + "|now";

                            var ttContactReasonCodeList = [];
                            var ttContactReasonCodett = {};
                            var ttContactReasonCode = {};
                            ttContactReasonCode.CodeType = "Reason1";
                            ttContactReasonCode.CodeValue = reasonCode;
                            ttContactReasonCodeList.push(ttContactReasonCode)
                            ttContactReasonCodett.ttContactReasonCode = ttContactReasonCodeList;
                            var extraParameters = {
                                'pKeyValue': '0',
                                'pKeyType': 'CaseNum',
                                'pFieldList': fieldList5,
                                'pFields': valueList5,
                                'ttContactReasonCode': ttContactReasonCodett
                            };
                            var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
                            var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/contactlogdata/update', null, [false], extraParameters,
                                saveAction, null);

                            //message
                            if (saveData.code == 0) {
                                var fieldlist = "Acknowledge,AcknowledgedDate,AcknowledgedUserName";
                                var fields = "y" + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + "|" + Atlas.user.un;
                                var extraParameters = {
                                    'pSystemID': gridData.SystemID,
                                    'pFieldList': fieldlist,
                                    'pFields': fields
                                };
                                var testReturnqmanagementdata = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/qmanagementdata/update', null, [false], extraParameters,
                                    saveAction, null);

                                Ext.Msg.alert("Case", "Patient Safety Case " + saveData.oMTMId + " has been created.", function (btn) {
                                    me.getViewModel().getStore('patientSafetyAlerts').reload();
                                    me.RedirectToCaseDetails(saveData.oMTMId);
                                });
                            }
                            else {
                                Ext.Msg.alert("Error", saveData.message);
                            }
                            form.reset();
                            this.lookupReference('createCaseWindow').hide();
                        }
                    }
                    catch (e) {
                        Ext.Msg.alert('Failure', ' error, Please contact admin.');
                    }
                }
            }, this);
        }
        else {
            Ext.MessageBox.alert('Validation Error', "Please fix all the validation errors before saving the data.", this.showResult, this);
        }
    },

    RedirectToCaseDetails: function (oMTMId) {
        var me = this;
        var MTMId = oMTMId;
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/casemanagement/CaseInfo');
    /*    var menuItems = me.getView().up('merlinworkspace').getViewModel().get('menuitems'),
            node = menuItems.findNode('route', 'merlin/casemanagement/CaseInfo'),
            client = me.getView().atlasClient,
            route = node.get('route') || node.get('routeId'),
            menuId = node.get('menuID'),
            menuTitle = node.get('menuTitle');*/

        me.fireEvent('openView', 'merlin', 'casemanagement', 'CaseInfo', {
            menuId: menuId,
            MTMId: MTMId,
            openView: true,
            atlasId: MTMId,
            title: 'Case Details'
        });
    },

    onCancel: function () {
        this.lookupReference('createCaseWindow').down('#createCaseForm').reset();
        this.lookupReference('createCaseWindow').hide();
    },

    onClaimClick: function (button) {
        var claimID = button._rowContext.record.get('ClaimID');
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/claims/ClaimsToolbar');
        this.fireEvent('openView', 'merlin', 'claims', 'ClaimsToolbar', {
            atlasId: claimID,
            menuId: menuId
        });
    },

    onMemberClick: function (button) {
        var memberID = button._rowContext.record.get('RecipID');
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/member/MemberToolbar');
        if (memberID && menuId) {
            this.fireEvent('openView', 'merlin', 'member', 'MemberToolbar', {
                atlasId: memberID,
                RID: memberID,
                menuId: menuId
            });
        }
    },

    onAcknowledgeClick: function (grid, rowIndex) {
        var me = this;
        Ext.Msg.confirm('Acknowledge', 'Are you sure you would like to acknowledge this task?',
            function (btn) {
                if (btn == 'yes') {
                    var record = grid.getStore().getAt(rowIndex);
                    try {
                        var fieldlist = "Acknowledge,AcknowledgedDate,AcknowledgedUserName";
                        var fields = "y" + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + "|" + Atlas.user.un;
                        var extraParameters = {
                            'pSystemID': record.data.SystemID,
                            'pFieldList': fieldlist,
                            'pFields': fields
                        };
                        var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
                        var saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/qmanagementdata/update', null, [false], extraParameters, saveAction, null);
                        me.onSearch(null);

                    }
                    catch (e) {
                        Ext.Msg.alert('Failure', ' error, Please contact admin.');
                    }
                }
            })
    },

    onLetterClick: function () {
        Ext.Msg.alert('Failure', 'Failed to send letters');
    },

    /*onCreateContactLogClick:function(grid, rowIndex)
     {
     var memberID = grid.getStore().getAt(rowIndex).data.RecipID;
     this.fireEvent('openView', 'merlin', 'common', 'AddContactLog', {
     atlasId: memberID
     });
     },*/

    init: function () {
        var view = this.getView();
        var atlasId = view.atlasId,
            vm = this.getViewModel(),
        store = vm.getStore('patientSafetyAlerts'),
            proxy = store.getProxy();
        if(view.openView) {
            view.lookupReference('alertType').setValue(atlasId);
            view.lookupReference('dateFrom').setValue('');
            view.lookupReference('dateTo').setValue('');
            proxy.setExtraParam('pAlertType', atlasId);
            proxy.setExtraParam('pStartDate', '');
            proxy.setExtraParam('pEndDate', '');
            store.load();
            view.atlasId = null;
        }
       /* else {
            if (atlasId !== null) {
                this.onSearch(atlasId);
            }
        }*/
    },

    onSearch: function (alert) {
        var me = this,

            vm = me.getViewModel(),
            store = vm.getStore('patientSafetyAlerts'),
            view = this.getView(),
            atlasId = view.atlasId ? view.atlasId.replace(/ /g, '') : null,
            proxy = store.getProxy(),
            form = me.getView().down('#searchForm'),
            data = form.getValues();
        if (form.isValid()) {
            if (atlasId !== null) {
                data.alertType = atlasId;
            }
            if (data.alertType) {
                if (data.alertType == 'All')
                    proxy.setExtraParam('pAlertType', '');
                else
                    proxy.setExtraParam('pAlertType', data.alertType);
            }

            if (data.dateFrom) {
                proxy.setExtraParam('pStartDate', data.dateFrom);
            }
            if (data.dateTo) {
                proxy.setExtraParam('pEndDate', data.dateTo);
            }
            if (data.dateTo && !data.dateFrom) {
                Ext.Msg.alert('Validation error', 'Please enter date from.');
            }
            else if (!data.dateTo && data.dateFrom) {
                Ext.Msg.alert('Validation error', 'Please enter date to.');
            }
            else {
                view.atlasId = null;
              /*  var sortProperty = [{
                    "property": "CreateDateTime",
                    "direction": "DESC"
                }];
                store.sorters.add(sortProperty);*/
                store.load();
            }
        }
    },

    validateDateRange: function (datefield, isValid) {
        var view = this.getView(),
            winDtFrom = view.down('#dateFrom'),
            winDtTo = view.down('#dateTo'),
            winDtFromValue = winDtFrom.getValue(),
            winDtToValue = winDtTo.getValue();

        if (datefield.itemId == 'dateFrom') {
            if (winDtFromValue != '' && winDtFromValue != null) {
                winDtTo.setMinValue(Ext.Date.format(winDtFromValue, 'm/d/Y'));
            }
        }
        else {
            if (winDtToValue != '' && winDtToValue != null) {
                winDtFrom.setMaxValue(Ext.Date.format(winDtToValue, 'm/d/Y'));
            }
        }
    }
});