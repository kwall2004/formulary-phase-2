/*
 Last Developer: Paul Glinski
 Previous Developers: [Tremaine Grant]
 Origin: Merlin - Member
 Date: 7/26/2016
 Description: Controller that drives most logic for the member page.
 */
Ext.define('Atlas.member.view.MemberController', {
    extend: 'Atlas.common.view.merlin.MenuBaseController',
    alias: 'controller.member',

    /**
     * Called when the view is created
     */
    listen: {
        controller: {
            '*': {
                contactLogLoaded: 'getContactLog'
            }
        }
    },

    init: function () {
        // debugger;
        var me = this,
            curViewModel = me.getViewModel(),
            view = me.getView(),
            atlasId = view.atlasId;
        // view.parentViewID = view.id;
        view.parentViewID = view.id;

        var menuStore = curViewModel.getStore('menu'),
            proxy = menuStore.getProxy();
        var rid = me.getView().RID;
        this.getViewModel().set('isNPISearch', true);

        proxy.setExtraParam('pRootMenu', view.menuId);
        proxy.setExtraParam('pLevels', 1);
        menuStore.on({
            load: 'onMenuLoad',
            scope: me,
            single: true // Remove listener after Load
        });
        if (rid != null && rid != '' && rid != undefined) {
           // me.getMemberMaster(view.RID, me.getView());
            if (curViewModel.data.isMemberPassedIn) {
                if (curViewModel.data.masterrecord.get('recipientID')) {

                    me.onMemberSelection('', curViewModel.data.masterrecord);
                    curViewModel.data.isMemberPassedIn = false;
                } else {
                    Ext.Msg.alert('Message', 'Member record not found');
                }
            }
        }
        menuStore.load(
            {
                callback: function (record, operation) {
                    if (view.recordCase != null) {
                        me.onMemberSelection('', view.recordCase);
                    }
                    var selection = {};
                    if (view.subTabs != null) {
                        for (var i = 0; i < view.subTabs.length; i++) {
                            selection.value = view.subTabs[i];
                            me.menuOnClick(selection);
                        }
                    }
                }
            }
        );

        if (atlasId !== null && view.subTabsOpen == null) {
            this.memberIdLookup(atlasId);
        }

    },
    onMemberSelection: function (combo, record) {
        var vm = this.getViewModel();
        var theView = this.getView();
        theView.RID=undefined;
        var recipientID = record.get('recipientID');
        theView.atlasId = recipientID;
        var memberName = record.get('MemberName');
        vm.recipientID = record.get('recipientID');

        theView.down('#cboMember').setValue(record.get('MemberName'));
        theView.down('#cboMember').setRawValue(record.get('memberID') +" "+ record.get('MemberName'));
        vm.memberId= record.get('memberID');
        vm.set("isMemberSelected", true);
        vm.set("planGroupName", record.get('planGrpName'));
        this.memberIdLookup(recipientID);
        this.fireEvent('SearchClaimsCommonController', 'recipientID', vm.recipientID, true);
        // this.fireEvent('SearchMemberPAHistory', 'recipientID', vm.recipientID, theView.CDAGInstanceUUID);
        this.fireEvent('SearchMemberPAHistory', 'recipientID', vm.recipientID, theView.parentViewID);
        // debugger;
        // if(theView.down('DeterminationHistory'))
        // {
        //     theView.down('DeterminationHistory').getController().SearchMemberPAHistory('recipientID', vm.recipientID, theView.CDAGInstanceUUID);
        // }
        /*var form =  this.lookup('detailsForm');
         if(form)
         form.reset();*/

    },
    getMemberMaster: function (recipId, view) {

        var me = this,
            theView = me.getView(),
            vm = me.getViewModel(),
            item = view.down('#status'),
            store = vm.getStore('memberMasterStore');

        vm.set('canOrderDocs', false);
        store.getProxy().setExtraParam('pFieldList', 'recipientID,firstname,middlename,lastname,suffix,gender,@enrollmentStatus,birthDate,socSecNum,@languageDescription,langCode,race,deathDate,Home.Address1,Home.Address2,Home.City,home.zipCode,Home.State,@countyDescription,homephone.ContactInfo,workphone.ContactInfo,cell.ContactInfo,email.ContactInfo,@alerts,hedisMessage,@enrollmentStatus,respFirstName,respMiddleName,respLastName,resp.address1,resp.address2,resp.state,resp.city,resp.ZipCode,respHomePhone.ContactInfo,respWorkPhone.ContactInfo,complianceAlert,CarrierName,AccountName,@CoCMember,primRecipientId,@mcsProgGroupCode,@medicarePlanGroupId,@spareField03,@HICN,@FosterCareInd,@Age');
        store.getProxy().setExtraParam('pKeyValue', recipId);
        vm.recipientID = recipId;
        store.load(
            {
                scope: this,
                callback: function (record, operation, success) {
                    var status = operation.getResultSet().message[0];
                    if (status.code === 0) {

                        var data = record[0];
                        data.page = 'member';
                        data.key = 'recipientID';
                        data.keyvalue = record[0].data.recipientID;
                        data.keytext = record[0].data.MemberName;
                        data.ClaimID = 0;
                        data.PlanGroupID = record[0].data.PlanGroupID;
                        data.authID = 0;
                        data.recipientID = record[0].data.recipientID;
                        data.prescriberID = record[0].data.npi;
                        data.ncpdpID = 0;
                        data.npi = 0;
                        vm.set('canOrderDocs', true);
                        vm.set('masterrecord', record[0].data);
                        vm.set('contactlogmasterrecord', data);
                        me.fireEvent('contactloggridrefresh');
                        if(view.atlasId && vm.memberId)
                        {
                            theView.down('#cboMember').setValue(record[0].get('MemberName'));
                            theView.down('#cboMember').setRawValue(vm.memberId + " " +record[0].get('MemberName'));
                        }
                        if(!vm.memberId)
                            theView.down('#cboMember').setRawValue(record[0].get('MemberName'));
                    }
                    else {
                        Ext.Msg.alert("Message", 'Member record not found');
                        theView.down('#cboMemberList').clearValue();
                        return;
                    }
                    vm.set('contactdisabledflag', false);
                    if (recipId == 0 || recipId == null || recipId == '' || recipId == 'undefined') {
                        theView.setTitle('Member');

                    }
                    else {
                        theView.setTitle('Member' + ' - ' + vm.get('masterrecord').MemberName);
                        this.getView().down('#progGroup').setFieldStyle({color: 'red', fontweight: 'bold'});
                        this.getView().down('#cocMember').setFieldStyle({color: 'red', fontweight: 'bold'});
                        this.getView().down('#alerts').setFieldStyle({color: 'red', fontweight: 'bold'});
                    }
                    if (vm.get('masterrecord').enrollmentStatus == 'Active') {
                        item.removeCls('m-red-color');
                        item.addCls('m-green-color');
                        this.getView().down('#statusVal').setFieldStyle({color: 'green', fontweight: 'bold'});
                    }
                    else {
                        item.removeCls('m-green-color');
                        item.addCls('m-red-color');
                        this.getView().down('#statusVal').setFieldStyle({color: 'red', fontweight: 'bold'});
                    }
                }
            });
    },
    memberIdLookup: function (recipientID) {
        var me = this,
            vm = me.getViewModel();
        //TODO Params need to be added to this load, to load the correct letter for the user selected.
        var theView = this.getView();
        theView.down('#btnContact').setDisabled(false);
        var memberCoverageHistoryStore = vm.getStore('membercoveragehistorystore');
        memberCoverageHistoryStore.getProxy().setExtraParam('pKeyValue', recipientID);
        var sortProperty = [{
            "property": "tEffDate",
            "direction": "DESC"
        }];
        memberCoverageHistoryStore.getSorters().add(sortProperty);
        memberCoverageHistoryStore.load({
            scope: this,
            success: function (record, operation) {

            },
            callback: function (record, operation, success) {
                if (record && record.length > 0) {
                    var rid = theView.RID;
                    if (rid != null && rid != '' && rid != undefined) {
                        for(var count=0;count<record.length;count++){
                            if (record[0].joined[0].data.items[count].get('tTermDate') == null || record[0].joined[0].data.items[count].get('tTermDate') >= record[0].joined[0].data.items[count].get('tEffDate'))
                            {
                            Ext.defer(function () {
                                  theView.down('#cboMember').setRawValue(record[0].joined[0].data.items[count].get('tmemberId') + ' ' + theView.down('#cboMember').rawValue); }, 500);
                                return;
                            }

                        }


                    }
                }
            }
        });
        var form = this.lookup('detailsForm');
        if (form)
            form.reset();
        var memberfamilystore = vm.getStore('memberfamilystore');
        memberfamilystore.getProxy().setExtraParam('pRecipientID', recipientID);
        memberfamilystore.load(
            {
                scope: this,
                success: function (record, operation) {

                },
                callback: function (record, operation, success) {
                    theView.down('#cboMemberList').setValue(recipientID);


                }
            }
        );

        this.fireEvent('MemberChange', recipientID,this.getView().id);
        theView.down('#hiddenRecipientID').setValue(recipientID);
        this.fireEvent('LoadAllergiesData', recipientID);
        this.getMemberMaster(recipientID, this.getView());
        var memberHedisStore = vm.getStore('memberhedissummary');
        memberHedisStore.getProxy().setExtraParam('pKey', recipientID);
        memberHedisStore.load({
            scope: this,
            failure: function (record, operation) {
                //do something if the load failed
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                vm.set('hedisrecord', record);
            }
        });
        var memberhedissummaryall = vm.getStore('memberhedissummaryall');
        memberhedissummaryall.getProxy().setExtraParam('pKey', recipientID);
        memberHedisStore.filter('lastSeen', null);
        memberhedissummaryall.load({
            scope: this,
            callback: function (record, operation, success) {
                vm.set('hedisrecord', record);
            }
        });

    },
    searchRecipId: function (field, e) {
        if (e.getKey() == e.ENTER) {

            var me = this,
                view = me.getView(),
                vm = me.getViewModel(),
                recip = me.lookup('recipId').getValue();

            if (recip) {
                this.clearOutStores();
                me.memberIdLookup(recip);
                this.fireEvent('SearchClaimsCommonController', 'recipientID', vm.recipientID, true);
                // this.fireEvent('SearchMemberPAHistory', 'recipientID', vm.recipientID, view.CDAGInstanceUUID);
                this.fireEvent('SearchMemberPAHistory', 'recipientID', vm.recipientID, view.parentViewID);
                // debugger;
                // if(view.down('DeterminationHistory'))
                // {
                //     view.down('DeterminationHistory').getController().SearchMemberPAHistory('recipientID', vm.recipientID, view.CDAGInstanceUUID);
                // }
            }
        }
    },
    clearOutStores: function () {
        var vm = this.getViewModel();
        this.clearOutStore(vm.getStore('memberCoverageHistoryStore'));
        this.clearOutStore(vm.getStore('memberHedisStore'));
        this.clearOutStore(vm.getStore('memberfamilystore'));
        this.clearOutStore(vm.getStore('memberhedissummaryall'));
        this.clearOutStore(vm.getStore('memberMasterStore'));
        this.clearOutStore(vm.getStore('memberplanstore'));
        this.clearOutStore(vm.getStore('memberidstore'));
        this.clearOutStore(vm.getStore('memberMasterStore'));
        vm.set('masterrecord', null);
    },
    clearOutStore: function (s) {
        if (s && s.count() > 0)
            s.removeAll();
    },

    getContactLog: function () {
        this.fireEvent('contactloggridrefresh');
    },
    createContactHedisWindow: function () {
        var temp = [],
            vm = this.getViewModel(),
            recipientID = vm.get('masterrecord').recipientID,
            memberplanstore = vm.getStore('memberplanstore'),
            memberhedissummaryWindow = vm.getStore('memberhedissummaryWindow');

        memberplanstore.onAfter('load', 'onMemberPlanStoreLoad');
        memberplanstore.getProxy().setExtraParam('pRecipientId', recipientID);
        memberplanstore.load({
            scope: this,
            callback: function () {
                memberhedissummaryWindow.getProxy().setExtraParam('pKey', recipientID);
                memberhedissummaryWindow.load({
                    scope: this,
                    callback: function (record) {
                        record.forEach(function (item) {
                            if (!item.data.lastSeen) {
                                temp.push(item);
                            }
                        });
                        memberhedissummaryWindow.loadData(temp);
                    }
                });
            }
        });
    },

    onMemberPlanStoreLoad: function (memberplanstore, records) {
        var me = this,
            view = me.getView();

        memberplanstore.unAfter('load', 'onMemberPlanStoreLoad');

        var contactWindow = Ext.create({
            xtype: 'window',
            title: 'Hedis Contact',
            modal: true,
            itemId: 'winHedisContact',
            reference: 'winHedisContact',
            width: 500,
            height: 600,

            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },
            bodyPadding: 10,
            defaults: {
                frame: true,
                bodyPadding: 10
            },
            items: [
                {
                    height: 75,
                    margin: '0 0 10 0',
                    layout: 'fit',
                    plain: true,
                    items: [
                        {
                            defaultType: 'displayfield',
                            fieldDefaults: {
                                labelWidth: 60
                            },
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            bodyPadding: 5,
                            border: false,
                            items: [
                                {
                                    fieldLabel: 'MRx ID',
                                    name: 'MRxID',
                                    bind: '{masterrecord.recipientID}'
                                },
                                {
                                    fieldLabel: 'Name',
                                    name: 'memberName',
                                    bind: '{masterrecord.MemberName}'
                                }]
                        }]
                },
                {
                    flex: 1,
                    margin: '0 0 10 0',
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    bodyPadding: 10,
                    defaults: {
                        frame: true,
                        bodyPadding: 10
                    },
                    items: [
                        {
                            flex: 1,
                            margin: '0 10 0 0',
                            title: 'Contact',
                            xtype: 'fieldset',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    columns: 1,
                                    name: 'rb-contact',
                                    items: [
                                        {
                                            boxLabel: 'Member Contact',
                                            name: 'contact',
                                            inputValue: 'member',
                                            itemId: 'rdMemberContact', checked: true
                                        }, {
                                            boxLabel: 'Provider Contact',
                                            name: 'contact',
                                            inputValue: 'provider',
                                            itemId: 'rdProviderContact'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            flex: 1,
                            margin: '0 10 0 0',
                            title: 'Call',
                            xtype: 'fieldset',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    columns: 1,
                                    name: 'rb-call',
                                    items: [
                                        {
                                            boxLabel: 'Inbound Call',
                                            name: 'call',
                                            inputValue: 'inbound',
                                            itemId: 'rdInboundCall', checked: true
                                        }, {
                                            boxLabel: 'Outbound Call',
                                            name: 'call',
                                            inputValue: 'outbound',
                                            itemId: 'rdOutboundCall'
                                        }
                                    ]

                                }
                            ]
                        }
                    ]
                },
                {
                    height: 10,
                    margin: '0 0 10 0',
                    xtype: 'checkbox',
                    boxLabel: 'Resolved in First Call', itemId: 'chkResolvedCall'
                },
                {
                    flex: 2,
                    margin: '0 0 10 0',
                    xtype: 'fieldset',
                    title: 'Notes',
                    layout: 'fit',
                    plain: true,
                    itemId: 'hedisNotes',
                    items: [
                        {
                            xtype: 'form',
                            defaultType: 'displayfield',
                            fieldDefaults: {
                                labelWidth: 100
                            },
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            bodyPadding: 5,
                            border: false,
                            items: [
                                {
                                    fieldLabel: 'Completed Hedis',
                                    name: 'completedHedis',
                                    xtype: 'combobox',
                                    itemId: 'compHedis',
                                    bind: {
                                        store: '{memberhedissummaryWindow}'
                                    },
                                    valueField: 'measureDesc',
                                    displayField: 'measureDesc',
                                    listeners: {select: 'onMeasureSelect'},
                                    createNewOnEnter: false,
                                    createNewOnBlur: false,
                                    filterPickList: false,
                                    publishes: 'value',
                                    name: 'compHedis',
                                    matchFieldWidth: true,
                                    multiSelect: true,
                                    forceSelection: true,
                                    editable: true,
                                    triggerAction: 'all',
                                    listConfig: {
                                        getInnerTpl: function () {
                                            return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {measureDesc} </div>';
                                        }
                                    },
                                    queryMode: 'local'
                                },
                                {
                                    xtype: 'textarea',
                                    itemId: 'noteDesc',
                                    name: 'noteDesc',
                                    // Setting flex to 1 for textarea when no other component has flex
                                    // is effectively tells the layout to strech the textarea vertically,
                                    // taking all the space left after the fields above have been laid out.
                                    flex: 1
                                }]
                        }]
                }
            ],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                /*layout: {
                 type: 'hbox',
                 pack: 'start',
                 align: 'stretch'
                 },*/
                bodyPadding: 10,
                defaults: {
                    frame: true,
                    bodyPadding: 10
                },
                items: [
                    {
                        xtype: 'combobox',
                        reference: 'planGroupCombo',
                        itemId: 'planGroupCombo',
                        fieldLabel: 'Plan Group',
                        queryMode: 'local',
                        allowBlank: false,
                        forceSelection: true,
                        bind: {store: '{memberplanstore}'},
                        displayField: 'planGroupName',
                        valueField: 'planGroupId'
                    }, '->',
                    {
                        //TODO make sure this is hooked up to save to server.
                        xtype: 'button',
                        text: 'Save',
                        handler: 'onSaveClick'
                    },
                    {
                        xtype: 'button',
                        text: 'Cancel',
                        handler: function () {
                            this.up().up().hide();
                        }
                    }
                ]
            }]
        });
        view.add(contactWindow);
        var combo = contactWindow.down('#planGroupCombo'); //this.getView().down('[name=planGroupCombo]'); // view.query('#planGroupCombo')[0];
        if (combo != null && records[0].data)
            combo.setValue(records[0].data.planGroupId);
        contactWindow.show();
    },
    onSaveClick: function () {
        var reason1 = "";
        var reason2 = "";
        var reason3 = "";
        var Notes = "";
        var resolvedstatus = "";
        var callStatus = "";
        var dtCodeList = [];
        var dtCode = {};
        var ttContactReasonCode = {};

        var me = this;
        var view = this.getView();
        var recipientID, vm = this.getViewModel();
        recipientID = vm.get('masterrecord').recipientID;

        if (view.down('#rdMemberContact').getValue() == true && view.down('#rdInboundCall').getValue() == true) {
            dtCodeList.push({CodeValue: "A41"});
            dtCodeList.push({CodeValue: "P32D"});
        }
        else if (view.down('#rdMemberContact').getValue() == true && view.down('#rdOutboundCall').getValue() == true) {
            dtCodeList.push({CodeValue: "A47"});
            dtCodeList.push({CodeValue: "P5C"});
        }
        else if (view.down('#rdProviderContact').getValue() == true && view.down('#rdInboundCall').getValue() == true) {
            dtCodeList.push({CodeValue: "A42"});
            dtCodeList.push({CodeValue: "P32C"});
        }
        else if (view.down('#rdProviderContact').getValue() == true && view.down('#rdOutboundCall').getValue() == true) {
            dtCodeList.push({CodeValue: "A42A"});
            dtCodeList.push({CodeValue: "P5B"});
        }
        if (view.down('#chkResolvedCall').getValue() == true) {
            resolvedstatus = "yes";
            callStatus = "C";
            dtCodeList.push({CodeValue: "P8B"});
        }
        else {
            resolvedstatus = "no";
            callStatus = "O";
        }


        ttContactReasonCode.ttContactReasonCode = dtCodeList;
        Notes = view.down('#noteDesc').getValue();
        if (Notes == '') {
            Ext.Msg.alert('Contact', 'Please Enter Notes.');
            return;
        }
        var RID = recipientID;
        var combo = this.lookupReference('planGroupCombo');
        var SelectedPlanGroupId = '';
        if (combo.selection) {
            SelectedPlanGroupId = combo.selection.data.planGroupId;
        }
        var fieldList = "reasonCode1,reasonCode2,reasonCode3,description,resolvedFirstCall,recipientID,callStatus,LastModifiedUser,CallDateTime,contactUser,updatedBy,contactType,subject,updatedDatetime,planGroupId";
        var fields = reason1 + "|" + reason2 + "|" + reason3 + "|" + Notes + "|" + resolvedstatus + "|" + RID + "|" + callStatus + "|" + Atlas.user.un + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y H:i:s') + "|" + Atlas.user.un + "|" + Atlas.user.un + "|P|Hedis Contact|now|" + SelectedPlanGroupId;
        var saveAction = [{"Save": {"key": "mode", "value": "U"}}];
        var extraParameters = {
            pKeyValue: '0',
            pKeyType: 'CaseNum',
            pFieldList: fieldList,
            pFields: fields,
            ttContactReasonCode: ttContactReasonCode

        };
        var result = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/contactlogdata/update', null, [true], extraParameters,
            saveAction, null);
        if (result.code == 0) {
            /* var controller =Ext.create('Atlas.common.view.sharedviews.ContactLogController');
             controller.fireEvent('contactloggridrefresh');*/
            me.fireEvent('contactloggridrefresh');
            var contactWindow = this.lookupReference('winHedisContact');
            contactWindow.close();
        }
        else
            Ext.Msg.alert('Failure', result.message);

        /* For MCS Save*/
        var pbmMemberId = '';
        var memberidstore = this.getViewModel().getStore('memberidstore');
        memberidstore.getProxy().setExtraParam('pRecipientId', RID);
        memberidstore.load();

    },

    onMeasureSelect: function () {
        var view = this.getView();
        if (view.down('#compHedis').getValue() != '') {
            view.down('#noteDesc').setValue('The following hedis measures' + ' ' + view.down('#compHedis').getValue() + ' ' + 'have been completed.');
        }
        else {
            view.down('#noteDesc').setValue('');
        }

    },
    onSearchTypeToggle: function (seg, button, isPressed, eOpts) {
        var vm = this.getViewModel(),
            advancedSearch = this.lookup('advancedtextbox'),
            recipId = this.lookup('recipId');

        if (button.action === 'recip') {
            advancedSearch.setHidden(true);
            recipId.setHidden(false);
        } else {
            advancedSearch.setHidden(false);
            recipId.setHidden(true);
        }


    },
    onMenuClick: function (menu, item) {
        var me = this,
            view = me.getView(),
            vm = this.getViewModel(),
            cards = view.getLayout().getLayoutItems(),
            created = false,
            len = cards.length,
            i = 0;
        //Check if the tab exists
        for (; i < len; i++) {
            if (cards[i].route === item.route) {
                created = true;
                view.setActiveTab(cards[i]);
            }
        }

        if (!created) {
            view.add({
                xclass: Atlas.common.Util.classFromRoute(item.route),
                height: '100%',
                route: item.route,
                title: item.text
            });
            view.setActiveTab(len);
            if (item.text == 'Prior Auth') {
                if (vm.recipientID != null && vm.recipientID != undefined) {
                    // this.fireEvent('SearchMemberPAHistory', 'recipientID', vm.recipientID, view.CDAGInstanceUUID);
                    this.fireEvent('SearchMemberPAHistory', 'recipientID', vm.recipientID, view.parentViewID);
                    // debugger;
                    // if(view.down('DeterminationHistory'))
                    // {
                    //     view.down('DeterminationHistory').getController().SearchMemberPAHistory('recipientID', vm.recipientID, view.CDAGInstanceUUID);
                    // }
                }
            }
            else if (item.text == 'Claims') {
                this.fireEvent('SearchClaimsCommonController', 'recipientID', vm.recipientID, true);
            }
            else if (item.text == "Contact Log") {
                this.fireEvent('contactloggridrefresh');
            }
        }
    },

    menuOnClick: function (selection) {
        var tabPanel = this.getView();

        var existingTab = tabPanel.down(selection.value),
            tab;

        var view = this.getView(),
            vm = this.getViewModel();


        if (!existingTab) {
            tab = tabPanel.add({
                xtype: selection.value,
                itemConfig: {}
            });

            tabPanel.setActiveTab(tab);
        } else {
            tabPanel.setActiveTab(existingTab);
        }
    },
    onChange: function (me, newValue, oldValue) {

        if (newValue == false) {
            this.getView().down('#dtAltInsOverrideEndDate').setValue('');
        }
    },
    memberCoverageHistoryRowClick: function (grid, record) {
        record.data.fosterCareInd = (record.get('fosterCareInd') == 'false' || record.get('fosterCareInd') == false || record.get('fosterCareInd') == '' || record.get('fosterCareInd') == 'No') ? 'No' : 'Yes';
        this.lookup('detailsForm').loadRecord(record);
        var MemDetailsSysId = record.get('MemDetailsSysId'),
            tPlanGroupID = record.get('tPlanGroupID'),
            tRecipientID = record.get('tRecipientID'),
            tsystemID = record.get('tsystemID'),
            tmemberId = record.get('tmemberId'),
            CarrierLOBid = record.get('CarrierLOBid'),
            tAltInsMemberID = record.get('tAltInsMemberID'),
            tAltInsCarrierName = record.get('tAltInsCarrierName'),
            tAltInsInd = record.get('tAltInsInd');
        this.getViewModel().set('memberCoverageRecord', record);
        var view = this.getView();
        var bActiveEnrollment = false;
        var today = Atlas.common.utility.Utilities.getLocalDateTime() ;
        var dtEffDate = record.get('tEffDate');
        dtEffDate = new Date(dtEffDate);
        var dtTermDate = record.get('tTermDate');
        //   dtTermDate = new Date(dtTermDate);
        var tEffDate = dtEffDate;
        var tTermDate = dtTermDate;
        if (Ext.isDate(dtEffDate) != false && Ext.isDate(dtTermDate) != false) {
            if ((today >= dtEffDate) && (today <= dtTermDate)) {
                bActiveEnrollment = true;
            }
        }
        else if (Ext.isDate(dtEffDate) && (!Ext.isDate(dtTermDate))) {
            bActiveEnrollment = true;
        }

        view.down('#dtAltInsOverrideEndDate').setValue(record.get('altInsOverrideEndDate', 'm/d/Y'));

        if (record.get('tAltInsInd') == 'true' && bActiveEnrollment == true)
        //   if(record.get('tAltInsInd') =='true')
        {
            view.down('#btnApply').setDisabled(false);
            view.down('#dtAltInsOverrideEndDate').setDisabled(false);
            //  view.down('#dtAltInsOverrideEndDate').allowBlank = true;
            view.down('#chkAltInsOverride').setDisabled(false);
        }
        else {
            view.down('#btnApply').setDisabled(true);
            view.down('#dtAltInsOverrideEndDate').setDisabled(true);
            view.down('#chkAltInsOverride').setDisabled(true);
        }
        var vm = this.getViewModel(),
            memberCOBDetailStore = vm.getStore('membercobdetailstore');
        memberCOBDetailStore.getProxy().setExtraParam('pAltInsMemberID', record.get('tAltMemberID'));
        memberCOBDetailStore.load();
    },
    SaveOverrideDetails: function () {
        var r = window.confirm("Are you sure you want to update override information?");
        if (r == true) {
            var view = this.getView();
            var sOverridedDate, sAltInsOverride, sCoverageType, sAltInsOverrideEndDate, sActivityDesc;
            var pMode, memberCoverageRecord = this.getViewModel().get('memberCoverageRecord').data;
            var MemDetailsSysId = memberCoverageRecord.MemDetailsSysId;
            var tAltInsInd = memberCoverageRecord.tAltInsInd;
            if (MemDetailsSysId == 0 || MemDetailsSysId == null || MemDetailsSysId == '' || MemDetailsSysId == '0') {
                pMode = 'A';
            }
            else {
                pMode = 'U';
            }
            sAltInsOverride = view.down('#chkAltInsOverride').getValue();
            sAltInsOverrideEndDate = view.down('#dtAltInsOverrideEndDate').getValue();
            if (sAltInsOverride == true) {
                if (Ext.isDate(view.down('#dtAltInsOverrideEndDate').getValue()) == false) {
                    Ext.Msg.alert('PBM', 'Override Through Date is required.');

                    return false;
                }
            }
            if (Ext.isDate(view.down('#dtAltInsOverrideEndDate').getValue()) == true) {
                if (sAltInsOverride == false) {
                    Ext.Msg.alert('PBM', 'Please select Alt Ins Override.');
                    return false;
                }
            }
            if (sAltInsOverride != '') {
                if (sAltInsOverride == 'yes' || sAltInsOverride == 'y' || sAltInsOverride == 'true' || sAltInsOverride == '1') {
                    sAltInsOverride = 'Yes';
                }
                else {
                    sAltInsOverride = 'No';
                }
            }
            if (sAltInsOverride == 'Yes') {
                sOverridedDate = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y');
            }

            if (tAltInsInd == 'yes' || tAltInsInd == 'y' || tAltInsInd == 'true' || tAltInsInd == '1') {
                sCoverageType = 'Primary';
            }
            else {
                sCoverageType = 'Secondary';
            }

            var pFieldList = 'recipientid,memberid,overridedDate,carrierLOBId,AltInsID,AltInsName,AltInsEffDate,AltInsTermDate,CoverageType,altInsOverride,altInsOverrideEndDate';
            var pFieldValues = memberCoverageRecord.tRecipientID + '|' + memberCoverageRecord.tmemberId + '|' + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') +
                '|' + memberCoverageRecord.CarrierLOBid + '|' + memberCoverageRecord.tAltInsMemberID + '|' + memberCoverageRecord.tAltInsCarrierName +
                '|' + Ext.Date.format(new Date(memberCoverageRecord.tEffDate), 'm/d/Y') + '|' + Ext.Date.format(new Date(memberCoverageRecord.tTermDate), 'm/d/Y') +
                '|' + sCoverageType + '|' + sAltInsOverride + '|' + Ext.Date.format(sAltInsOverrideEndDate, 'm/d/Y');
            var saveAction = [{"Save": {"key": "pMode", "value": pMode}}];
            var extraParameters = {
                'pRecipientId': memberCoverageRecord.tRecipientID,
                'pFields': pFieldList,
                'pValues': pFieldValues
            };
            var result = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/memberdetails/update', null, [true], extraParameters, saveAction, ['oSystemId']);

            if (result.code == 0) {
                sActivityDesc = "Updated Medicaid Override Details. Alt Ins Override: " + sAltInsOverride + " / ";
                sActivityDesc = sActivityDesc + "Overrided Through: " + sAltInsOverrideEndDate + " / ";
                sActivityDesc = sActivityDesc + "Alt Ins Member ID: " + memberCoverageRecord.tAltInsMemberID + " / ";
                sActivityDesc = sActivityDesc + "Alt Ins Name: " + memberCoverageRecord.tAltInsCarrierName + " / ";
                sActivityDesc = sActivityDesc + "Alt Ins Eff Date: " + memberCoverageRecord.tEffDate + " / ";
                sActivityDesc = sActivityDesc + "Alt Ins Term Date: " + memberCoverageRecord.tTermDate;
                var ParentSystemId = memberCoverageRecord.tsystemID;
                var ParentId = memberCoverageRecord.tRecipientID;
                var ActivityType = 'MCDOVRRIDE';
                var ActivityDesc = sActivityDesc;
                this.setActivityLog(ParentSystemId, ParentId, ActivityType, ActivityDesc);
                Ext.Msg.alert('PBM', 'Alternate Insurance Override Details Successfully Updated.');

            }
            this.getViewModel().getStore('membercoveragehistorystore').load();
        }
        else return;
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
    openPlanBenefitView: function () {
        var me = this,
            planBenefitId = me.getView().down('[name=tPlanBenefitID]').getValue(),
            BenefitName = me.getView().down('[name=planBenefitName]').getValue(),
            PlanGroupID = me.getView().down('[name=tPlanGroupID]').getValue(),
            atlasId = planBenefitId;
       var menuId = Atlas.common.Util.menuIdFromRoute('merlin/plan/Benefits');
       /* var menuItems = me.getView().up('merlinworkspace').getViewModel().get('menuitems'),
            node = menuItems.findNode('route', 'merlin/plan/Benefits'),
            route = node.get('route') || node.get('routeId'),
            parentMenuId = node.get('parentMenuID'),
            menuId = node.get('menuID'),
            menuTitle = node.get('menuTitle');*/

        this.fireEvent('openView', 'merlin', 'plan', 'Benefits', {
            ID: menuId,
            planBenefitId: planBenefitId,
            BenefitName: BenefitName,
            planGroupId: PlanGroupID,
            plangroupRecord: null,
            keyValue: '0',
            openView: true,
           /* routeId: route + '/' + atlasId,
            parentMenuId: parentMenuId,*/
            menuId: menuId,
            title: 'Plan Benefit Setup',
            atlasId: planBenefitId,
            benefitRecord: null

        });
    },
    openPlanGroupView: function () {
        var me = this,
            planGroupId = me.getView().down('[name=tPlanGroupID]').getValue(),
            planGroupName = me.getView().down('[name=tPlanGroupName]').getValue(),
            planGroupCode = me.getView().down('[name=tPlanGroupCode]').getValue(),
            atlasId = planGroupId;
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/plan/Groups');
     /*   var menuItems = me.getView().up('merlinworkspace').getViewModel().get('menuitems'),
            node = menuItems.findNode('route', 'merlin/plan/Groups'),
            route = node.get('route') || node.get('routeId'),
            parentMenuId = node.get('parentMenuID'),
            menuId = node.get('menuID'),
            menuTitle = node.get('menuTitle');*/

        this.fireEvent('openView', 'merlin', 'plan', 'Groups', {
            ID: menuId,
            planGroupId: planGroupId,
            planGroupName: planGroupName,
            planGroupCode: planGroupCode,
            plangroupRecord: null,
            keyValue: '0',
            openView: true,
          /*  routeId: route + '/' + atlasId,
            parentMenuId: parentMenuId,*/
            menuId: menuId,
            title: 'Plan Group Setup',
            atlasId: planGroupId


        });
    },
    orderDocsOnClick: function (e) {
        var view = this.getView(),
            parentView = view.up(),
            viewModel = this.getViewModel(),
            masterRecord = viewModel.get('masterrecord');
        var firstName = masterRecord.firstname;
        var middleName = masterRecord.middlename;
        var lastName = masterRecord.lastname;
        var planGroup = viewModel.planGroupName;
        var recipientID = masterRecord.recipientID;
        var orderDocsListItemsStore = viewModel.getStore('orderDocsListItems');
        orderDocsListItemsStore.load(
            {
                scope: this,
                failure: function (record, operation) {
                    //do something if the load failed
                },
                success: function (record, operation) {

                },
                callback: function (records, operation, success) {
                    var firstDocType = records[0].get('name');


                    var memberplanstore = this.getViewModel().getStore('memberplanstore');
                    memberplanstore.getProxy().setExtraParam('pRecipientId', recipientID);
                    memberplanstore.load({

                        scope: this,
                        failure: function (record, operation) {
                        },
                        success: function (record, operation) {
                        },
                        callback: function (record, operation, success) {

                            var orderDocsWindow = Ext.create('Ext.window.Window', {
                                itemId: 'demographicsOrderDocsWindow',
                                title: 'Order Docs',
                                iconCls: 'fa fa-print',
                                height: 430,
                                width: 400,

                                viewModel: {
                                    parent: viewModel
                                },
                                layout: 'fit',
                                modal: true,
                                items: [{
                                    xtype: 'member-demographicsorderdocs',
                                    firstName: firstName,
                                    middleName: middleName,
                                    lastName: lastName,
                                    planGroup: planGroup,
                                    firstDocumentType: firstDocType
                                }]
                            });
                            view.add(orderDocsWindow);
                            orderDocsWindow.show();
                            // var combo = orderDocsWindow.down('#planGroupCombo'); //this.getView().down('[name=planGroupCombo]'); // view.query('#planGroupCombo')[0];
                            // if (combo != null && record[0].data)
                            //     combo.setValue(record[0].data.planGroupId);
                            var combo1 = orderDocsWindow.down('#letterTypeCombo'); //this.getView().down('[name=planGroupCombo]'); // view.query('#planGroupCombo')[0];
                            if (combo1 != null && records[0].data)
                                combo1.setValue(records[0].data.value);
                        }

                    });


                }
            });
        var memberplanstore = this.getViewModel().getStore('memberplanstore');
        memberplanstore.getProxy().setExtraParam('pRecipientId', recipientID);
        memberplanstore.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                viewModel.set('memberplan', record);
            }

        });

    },
    coverageHistory: function (cmp, e) {
        var me = this,
            vm = this.getViewModel(),
            SystemId,
            win;
        SystemId = cmp.$widgetRecord.get('tsystemID');
        win = Ext.create({
            xtype: 'sharedviews-AuditTrail',
            auditConfig: {
                'tableName': 'MemberEnrollment',
                'parentSystemId': SystemId,
                'title': 'Member Enrollment Audit Trail'
            }
        });
        me.getView().add(win);
        win.show();
    }
});