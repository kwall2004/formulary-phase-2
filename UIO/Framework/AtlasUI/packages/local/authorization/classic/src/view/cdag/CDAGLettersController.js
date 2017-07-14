/**
 * Created by agupta on 10/18/2016.
 */

Ext.define('Atlas.authorization.view.cdag.CDAGLettersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cdagletterscontroller',
    letterAuthId: null,

    listen: {
        controller: {
            '*': {
                parent_LoadGridValues: 'loadGridValues'
            },
            'cdagmaincontroller': {
                AuthIdChanged: 'updateAuthID'
            }
        }
    },

    updateAuthID: function(authID, EventUUID, refreshView) {
        var activeTabTitle = this.getView().up('#cdagTabBar').getActiveTab().title,
            CDAGInstanceUUID = this.getViewModel().get('CDAGInstanceUUID');

        if (activeTabTitle != 'Letters' || EventUUID != CDAGInstanceUUID) {
            return;
        }

        var vm = this.getViewModel(),
            LastAuthID = vm.get('LastAuthID');

        if (!refreshView && LastAuthID != null && LastAuthID != undefined && LastAuthID == authID) {
            this.loadDropDownMenu(authID);
            return;
        }

        vm.set('LastAuthID', authID);
        this.letterAuthId = authID;

        var view = this.getView();

        view.down('#hidAuthID').setValue(authID);
        view.down('#hiddenKey').setValue(authID);
        this.loadGridValues(authID);
    },

    getMedicareButtons : function(authStatus, partialApproval, hasMemberAppeal, hasProviderAppeal, carrierID){
        var buttons = '';
        if (authStatus == '09' && partialApproval == 'no'){
            buttons = 'Medicare Approval';
        }
        else if (authStatus == '08' || authStatus == '13' || authStatus == '14' || authStatus == '15' || (authStatus == '09' && partialApproval == 'yes')){
            buttons = 'Medicare Denial';
        }
        if (authStatus != '14' && authStatus != '13' && authStatus != '09' && authStatus != '08' && authStatus != '07' && carrierID == '5'){
            if (buttons != ''){
                buttons = buttons + ',Additional Info Request,Case Notification';
            }
            else{
                buttons = 'Additional Info Request,Case Notification';
            }
        }

        if (hasMemberAppeal){
            if (buttons != ''){
                buttons = buttons + ',Member Redetermination';
            }
            else{
                buttons = 'Member Redetermination';
            }
        }

        if (hasProviderAppeal){
            if (buttons != ''){
                buttons = buttons + ',Provider Redetermination';
            }
            else{
                buttons = 'Provider Redetermination';
            }
        }
        return buttons;
    },

    getMedicaidButtons : function(authStatus, hasMemberAppeal, hasProviderAppeal){
        var buttons = '';
        if (authStatus == '08' || authStatus == '13' || authStatus == '14' || authStatus == '15'){
            buttons = 'Medicaid PA Denial,Intervention';
        }
        if (hasMemberAppeal){
            if (buttons != ''){
                buttons = buttons + ',Member Appeal';
            }
            else{
                buttons = 'Member Appeal';
            }
        }

        if (hasProviderAppeal){
            if (buttons != ''){
                buttons = buttons + ',Provider Appeal';
            }
            else{
                buttons = 'Provider Appeal';
            }
        }

        return buttons;
    },

    getNLHMedicaidButtons : function(authStatus, hasMemberAppeal, hasProviderAppeal){
        var  buttons = '';

        if (authStatus == '08' || authStatus == '13' || authStatus == '14' || authStatus == '15'){
            buttons = 'NextLevel PA Denial';
        }
        else if (authStatus == '09'){
            buttons = 'NextLevel PA Approval';
        }

        if (hasMemberAppeal){
            if (buttons != ''){
                buttons = buttons + ',NextLevel Member Appeal';
            }
            else{
                buttons = 'NextLevel Member Appeal';
            }
        }

        if (hasProviderAppeal){
            if (buttons != ''){
                buttons = buttons + ',NextLevel Provider Appeal';
            }
            else{
                buttons = 'NextLevel Provider Appeal';
            }
        }

        return buttons;
    },

    getCommericalButtons : function(authStatus, hasMemberAppeal,hasProviderAppeal, carrierID){
        var buttons = '';
        var buttonname ='Choice';


        if(carrierID == '27')
            buttonname='Quicken';


        if (authStatus == '09' && carrierID == '27')
            buttons = buttonname+' PA Approval';
        else if (authStatus == '09')
            buttons = buttonname+' PA Approval';

        if (authStatus == '08' || authStatus == '13' || authStatus == '14' || authStatus == '15'){
            if (buttons != ''){
                buttons = buttons + ','+ buttonname+' PA Denial';
            }
            else{
                buttons = buttonname+' PA Denial';
            }
        }


        if (hasMemberAppeal){
            if (buttons != ''){
                buttons = buttons + ', '+ buttonname +' Member Appeal';
            }
            else{
                buttons = buttonname +' Member Appeal';
            }
        }

        if (hasProviderAppeal && carrierID=='27'){
            if (buttons != ''){
                buttons = buttons + ', '+ buttonname +' Provider Appeal';
            }
            else{
                buttons = buttonname +' Provider Appeal';
            }
        }

        return buttons;
    },


    onLetterRowSelect : function(dv, record, item, index, e){

        var me = this,
            vm = this.getViewModel(),
            view = this.getView(),
            IsAuthFromOldModule = view.up('cdagmain').down('#IsAuthFromOldModule').getValue(),
            letterType = record.data.letterType + ' ' + record.data.LOBName,
            letterTemplateFound = false,
            letterParameters = vm.get('letterParameters');

        letterParameters[0].LetterName = record.data.letterType == 'Medicare Auth Approval' ? 'MedicareApproval' : letterType;
        letterParameters[0].LetterFullName = record.data.letterName;
        letterParameters[0].pSystemID = record.data.systemID;
        letterParameters[0].pApprovedUser = record.data.approvedUser;
        letterParameters[0].pSentUser = record.data.sentUser;
        letterParameters[0].pCreateUser = record.data.createUser;
        letterParameters[0].pDocID = record.data.documentID;
        letterParameters[0].pLetterType = record.data.letterType + ' ' + record.data.LOBName;
        letterParameters[0].pCarrier = record.data.CarrierName;
        letterParameters[0].Action = 'update';
        letterParameters[0].IsAuthFromOldModule = IsAuthFromOldModule;

        switch (letterType) {
            case ('D Medicare'):
                letterTemplateFound = true;
                break;

            case ('D Medicaid'):
                letterTemplateFound = true;
                break;

            case ('R Medicare'):
                letterTemplateFound = true;
                break;

            case ('R Medicaid'):
                letterTemplateFound = true;
                break;

            case ('A Medicare'):
                letterTemplateFound = true;
                break;

            case ('A Medicaid'):
                letterTemplateFound = true;
                break;

            case ('Medicare Case Notification Medicare'):
                letterTemplateFound = true;
                break;

            case ('Medicare Auth Approval Medicare'):
                letterTemplateFound = true;
                break;

            case ('Medicare Additional Info Request Medicare'):
                letterTemplateFound = true;
                break;

            case ('Appeal Acknowledgement Medicaid'):
                letterTemplateFound = true;
                break;

            case ('Urgent Appeal Acknowledgement Medicaid'):
                letterTemplateFound = true;
                break;

            case ('Level 2 Appeal Acknowledgement Medicaid'):
                letterTemplateFound = true;
                break;

            case ('Appeal Acknowledgement Commercial'):
                letterTemplateFound = true;
                break;

            case ('Urgent Appeal Acknowledgement Commercial'):
                letterTemplateFound = true;
                break;

            case ('Intervention Medicaid'):
                letterTemplateFound = true;
                break;

            case ('Intervention Medicare'):
                letterTemplateFound = true;
                break;

            case ('HIX Auth Approval Commercial'):
                letterTemplateFound = true;
                break;

            case ('NextLevel Auth Approval Medicaid'):
                letterTemplateFound = true;
                break;

            case ('D Commercial'):
                letterTemplateFound = true;
                break;

            case ('A Commercial'):
                letterTemplateFound = true;
                break;
            case ('R Commercial'):
                letterTemplateFound = true;
                break;
            case ('Quicken Auth Approval Commercial'):
                letterTemplateFound = true;
                break;
        }

        if (letterTemplateFound) {
            var win = Ext.create({
                xtype: 'cdaglettertemplate',
                extraParams: letterParameters,
                autoShow: false
            });
            me.getView().up('cdagmain').add(win).show();
        }
    },

    onLetterBtnSelect : function(obj, eventargs){
        var me = this,
            view = this.getView(),
            IsAuthFromOldModule = view.up('cdagmain').down('#IsAuthFromOldModule').getValue();

        var letterName = obj.text.replace(/ /g, '');

        if (letterName == 'NoLettersAvailable') {
            return;
        }

        var vm = this.getViewModel(),
            letterParameters = vm.get('letterParameters');

        letterParameters[0].LetterName = letterName;
        letterParameters[0].pSystemID = '';
        letterParameters[0].pApprovedUser = '';
        letterParameters[0].pSentUser = '';
        letterParameters[0].pCreateUser = '';
        letterParameters[0].pDocID = '';
        letterParameters[0].pLetterType = '';
        letterParameters[0].pCarrier = '';
        letterParameters[0].Action = 'create';
        letterParameters[0].IsAuthFromOldModule = IsAuthFromOldModule;

        var win = Ext.create({
            xtype: 'cdaglettertemplate',
            extraParams: letterParameters,
            autoShow: false
        });
        me.getView().up('cdagmain').add(win).show();
    },

    loadDropDownMenu : function(authId){
        var view = this.getView();
        var menuButton = view.down('#LetterMenuButton');

        var fieldList = 'authStatus,$LOB,PartialApproval,carrierID';
        var buttons = '';
        var authStatus = '';
        var partialApproval = '';
        var lob = '';
        var carrierID = '';
        var hasMemberAppeal = false;
        var hasProviderAppeal = false;
        var paModel = Ext.create('Atlas.authorization.model.cdag.PriorAuthMasterDataModel');
        paModel.getProxy().setExtraParam('pPlanID','HPM');
        paModel.getProxy().setExtraParam('pAuthID',authId);
        paModel.getProxy().setExtraParam('pFieldList',fieldList);
        paModel.load({
            scope: this,
            failure: function (record, operation) {},
            success: function (record, operation) {},
            callback: function (record, operation, success) {

                if (menuButton.menu.items) {
                    menuButton.menu.items.each(function (item) {
                        menuButton.menu.remove(item);
                    });
                }

                var objRespPA = Ext.decode(operation.getResponse().responseText);
                if(objRespPA.message[0].code == 0){
                    var arrFieldValues = objRespPA.metadata.split('|');
                    authStatus = arrFieldValues[0];
                    lob =arrFieldValues[1];
                    partialApproval = arrFieldValues[2];
                    carrierID = arrFieldValues[3];
                    var modelAppealbyAuth =  Ext.create('Atlas.authorization.model.cdag.AppealByAuthModel');
                    modelAppealbyAuth.getProxy().setExtraParam('pAuthID',authId);
                    modelAppealbyAuth.load({
                        scope: this,
                        failure: function (record, operation) {},
                        success: function (record, operation) {},
                        callback: function (record, operation, success) {
                            var objRespAppeal = Ext.decode(operation.getResponse().responseText);
                            if(objRespAppeal.data.length >0){
                                objRespAppeal.data.forEach(function(item, index){
                                    if( (item.AppealType == 'Member Level 1 Appeal' || item.AppealType == 'Member Level 2 Appeal') && (item.AppealStatusCode == '13' || item.AppealStatusCode == '14')){
                                        hasMemberAppeal = true;
                                        return false;
                                    }
                                });

                                objRespAppeal.data.forEach(function(item, index){
                                    if( (item.AppealType == 'Provider Appeal') && (item.AppealStatusCode == '13' || item.AppealStatusCode == '14')){
                                        hasProviderAppeal = true;
                                        return false;
                                    }
                                })

                            }

                            if (lob == 'Medicare' && (carrierID == '5' || carrierID == '55')){
                                buttons = this.getMedicareButtons(authStatus, partialApproval, hasMemberAppeal, hasProviderAppeal, carrierID);
                            }
                            else if (lob == 'Medicaid' && carrierID == '5'){
                                buttons = this.getMedicaidButtons(authStatus, hasMemberAppeal, hasProviderAppeal);
                            }
                            else if (lob == 'Medicaid' && carrierID == '32')
                            {
                                buttons = this.getNLHMedicaidButtons(authStatus, hasMemberAppeal, hasProviderAppeal);
                            }
                            else if (lob == 'Commercial' && carrierID == '5')
                            {
                                buttons = this.getCommericalButtons(authStatus, hasMemberAppeal,hasProviderAppeal,carrierID);
                            }
                            else if (carrierID == '27')
                            {
                                buttons = this.getCommericalButtons(authStatus,hasMemberAppeal, hasProviderAppeal,carrierID);
                            }

                            if (buttons == '')
                            {
                                buttons = 'No Letters Available';
                            }

                            view.down('#hidLOB').setValue(lob);
                            var arrButtons = buttons.split(',');
                            if (menuButton.menu.items) {
                                menuButton.menu.items.each(function (item) {
                                    menuButton.menu.remove(item);
                                });
                            }
                            arrButtons.forEach(function(item, index){
                                menuButton.menu.add({
                                    text: item,
                                    handler: 'onLetterBtnSelect'
                                });
                            });

                        }
                    });
                }
            }
        });

    },

    loadGridValues: function (authId) {
        if (this.letterAuthId != authId) {
            return;
        }
        var store = this.getViewModel().getStore('storeLetters');
        store.getProxy().setExtraParam('pAuthId', authId);
        store.load();

        this.loadDropDownMenu(authId);
    }

});