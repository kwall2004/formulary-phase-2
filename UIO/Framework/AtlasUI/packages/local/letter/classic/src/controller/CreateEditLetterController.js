Ext.define('Atlas.letter.controller.CreateEditLetterController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.createeditletterctrl',
    listen: {
        controller: {
            'letter-advsearch': {
                AdvRowSelect: 'onAdvSearchRowSelect'
            },
            'letterfaxwindowctrl': {
                SendLetterFax: 'onSendFax'
            },
            'letterqueuectrl': {
                closeCreateEditView: 'closeThisView'
            }
        }
    },


    init: function () {
        // Set Test values
        //this.setTestViewVariables();
        //this.setTestViewVariablesMember();
        //this.setTestViewCaseMgr();

        //Load Main menus for the right side - have to know parent Id - need to load menu
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            myVM = me.getViewModel(),
            ucfLetter,
            lettertypestore = myVM.getStore('lettertypes'),
            assigntouserliststore = myVM.getStore('assigntouserlist'),
            openView = view.openView,
            menuID = view.ID,
            letterID = view.LetterID,
            letterType = view.LetterType,
            letterName = view.LetterName,
            _letterType,
            _letterId,
            _claimId,
            keyValue = view.keyValue,
            currentDate =Atlas.common.utility.Utilities.getLocalDateTime(),
            currentYear = currentDate.getFullYear(),
            extJSDate = Ext.Date.format(currentDate, 'm/d/Y'),
            extJSDateTime = Ext.Date.format(currentDate, 'm/d/Y g:i a'),
            pUserMaintFieldList,
            userName,
            pFieldList,
            letterusermaintstore = vm.getStore('letterusermaintdata'),
            whereClause,
            indexKey,
            viewParam,
            isAcumen;

        //TODO - line# 535 LetterDetail.aspx ( var docReadyHandler  )
        myVM.set('vmUIActivation.bottomToolbar.links.viewClaims.isDisabled', true);
        myVM.set('vmUIActivation.bottomToolbar.links.viewMember.isDisabled', true);
        myVM.set('vmUIActivation.bottomToolbar.links.viewPrescriber.isDisabled', true);
        myVM.set('vmUIActivation.bottomToolbar.links.viewPCP.isDisabled', true);
        myVM.set('vmUIActivation.bottomToolbar.links.viewPharmacy.isDisabled', true);
        // Initialize hidden variables
        vm.set('vmConstants.CURRENT_YEAR', currentYear);
        vm.set('currentYear', currentYear);
        vm.set('currentDate', extJSDate);
        vm.set('currentDateTime', extJSDateTime);
        vm.set('vmHiddenFields.keyValue', !view.keyValue ? '' : view.keyValue);
        vm.set('vmHiddenFields.mtmID', !view.mtmID ? '' : view.mtmID);
        vm.set('vmHiddenFields.mtmCaseMgr', !view.mtmCaseMgr ? '' : view.mtmCaseMgr);
        //vm.set('vmHiddenFields.ucfLetter', !view.ucfLetter ? '' : view.ucfLetter);
        vm.set('vmHiddenFields.ucfLetter', view.keyValue);
        vm.set('vmHiddenFields.mtmPlanGroupID', !view.mtmPlanGroupID ? '' : view.mtmPlanGroupID);
        vm.set('vmHiddenFields.letterName', !view.LetterName ? '' : view.LetterName);
        vm.set('vmHiddenFields.letterType', !view.LetterType ? '' : view.LetterType);
        vm.set('vmHiddenFields.letterNameId', !view.letterNameId ? '' : view.letterNameId);
        vm.set('vmHiddenFields.letterID', !view.LetterID ? '' : view.LetterID); // new or ID number
        vm.set('vmHiddenFields._letterType', !view.LetterType ? '' : view.LetterType);
        vm.set('vmHiddenFields._letterID', !view.LetterID ? '' : view.LetterID); // new or ID number
        vm.set('vmHiddenFields.menuID', !view.ID ? '' : view.ID);
        vm.set('vmHiddenFields.UCFCLAIMID', !view.UCFCLAIMID ? '' : view.UCFCLAIMID);
        vm.set('vmHiddenFields.MTMRID', !view.MTMRID ? '' : view.MTMRID);

        // Assign View() to VM Object - will replace above lines??
        for (indexKey in myVM.get('vmViewMTM')) {
            if (view[indexKey]) {
                viewParam = 'vmViewMTM.' + indexKey;
                myVM.set(viewParam, view[indexKey]);
                myVM.set('vmViewMTM.viewMTMIsSet', true);
            }
        }

        if (vm.get('vmViewMTM.mtmID') !== '' || Atlas.user.un != '') {
            if (vm.get('vmViewMTM.mtmCaseMgr') !== '') {
                userName = vm.get('vmViewMTM.mtmCaseMgr');
            }
            else {
                userName = Atlas.user.un;
            }
            pUserMaintFieldList = 'username,firstname,lastname,middlename,groupid,active,queueAdmin,createDateTime,' +
                'email.ContactInfo,homephone.ContactInfo,workphone.ContactInfo,' +
                'cell.ContactInfo,Ext.ContactInfo,fax.ContactInfo';

            letterusermaintstore.getProxy().setExtraParam('pUserName', userName);
            letterusermaintstore.getProxy().setExtraParam('pFieldList', pUserMaintFieldList);
            letterusermaintstore.on({
                load: function (store, records, operation, success) {
                    vm.set('vmLetterUserMaintFullRecord', records[0]);
                },
                scope: me,
                single: true
            });
            letterusermaintstore.load();
        }

        // Initialize auto approval to false
        vm.set('letterAutoApproval', false);
        vm.set('vmCurrentDate', Ext.Date.format(currentDate, 'm/d/Y'));

        lettertypestore.filterBy(function (record) {
            var templateName = record.get('LetterTemplateName').toLowerCase();

            switch (templateName) {
                case 'na':
                case 'n/a':
                //case 'formularychange.aspx':
                case 'collectioncredit.aspx':
                case 'cobc.aspx':
                    return false;
                    break;
                default:
                    return true;
                    break;
            }
        });
        lettertypestore.on({
            load: function () {
                if (openView) {
                    vm.set('vmLetterID', letterID);

                    keyValue = vm.get('vmHiddenFields.keyValue');
                    _letterType = vm.get('vmHiddenFields._letterType');
                    _letterId = vm.get('vmHiddenFields._letterID');
                    _claimId = keyValue == '' ? '0' : keyValue;
                    if (_letterId == "NEW" ||
                        _letterId == "" ||
                        (_letterType == "UCF" && vm.get('vmHiddenFields.UCFCLAIMID') !== '' )) {

                        if (keyValue !== '' && (_letterType == 'Transition' || keyValue == 'UCF')) {
                            if (keyValue == 'Transition') {
                                vm.set('vmHiddenFields.STATE', 'Queue');
                                whereClause = ' ClaimID = "' + myVM.get('vmHiddenFields.keyValue') + '" ';
                                me.loadExtLetterDetail(whereClause);
                            } // if keyValue == 'Transition'
                            else if (keyValue == 'UCF') {
                                vm.set('vmHiddenFields.keyValue', vm.get('vmHiddenFields.UCFCLAIMID'));
                            }
                            else if (keyValue !== 'UCF') {
                                me.loadClaimDetails('HPM', _claimId);
                            }
                        }
                        if (_letterId == "NEW" || _letterId == "") {
                            me.onClickCreate();
                        }
                    }
                    else if (vm.get('vmHiddenFields.letterID') !== '' && vm.get('vmHiddenFields.letterID') !== 'New' ) {

                            vm.set('vmHiddenFields.STATE', 'Queue');
                        me.onClickSearch(vm.get('vmHiddenFields.letterID'));
                    }
                }

                // Initialize on-screen values
                vm.set('vmClaimID', vm.get('vmHiddenFields.keyValue'));
                ucfLetter = myVM.get('vmHiddenFields.ucfLetter');

                if (myVM.get('vmHiddenFields.letterID').toString().toLowerCase() == 'new') {

                    // Set UI elements
                    myVM.set('vmUIActivation.inputs.cbxLetterType.isReadOnly', false);
                    myVM.set('vmUIActivation.topToolbar.btnCreate.isDisabled', false);
                    myVM.set('vmUIActivation.topToolbar.btnCancel.isDisabled', false);
                    myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', true);
                    myVM.set('vmUIActivation.template.isDisabled', false);

                    if (letterType == 'Transition' || letterType == '1' || letterType == 'Claim Intervention' || ucfLetter == 'UCF') {
                        if (ucfLetter == 'UCF') {
                            // myVM.set('vmUCFClaimID', myVM.get('vmHiddenFields.keyValue'));
                            myVM.set('vmUCFClaimID', myVM.get('vmHiddenFields.UCFCLAIMID'));
                            vm.set('vmHiddenFields.letterID','0');
                            vm.set('vmHiddenFields._letterID','0');
                            vm.set('vmLetterID', '0');
                            me.onClickCreate();
                            //me.getUCFClaimDetail(myVM.get('vmHiddenFields.vmUCFClaimID'));
                            me.getView().down('#uiLetterType').setValue(myVM.get('vmHiddenFields.letterNameId'));
                            me.getView().down('#uiTxtClaimID').setValue(myVM.get('vmHiddenFields.UCFCLAIMID'));
                            me.getUCFClaimInfo(myVM.get('vmHiddenFields.UCFCLAIMID'));

                        }
                        else {
                            me.getClaimInfo('', myVM.get('vmHiddenFields.keyValue'), true);
                        }
                    }
                    else {
                        if (letterType == 'MTM Followup' || letterType == 'MTM Invitation' || letterType == 'MTM Physician Intervention' ||
                            letterType.indexOf('Acumen') > -1) {

                            if (myVM.get('vmViewMTM.mtmID') !== '') {
                                myVM.set('vmMTMID', myVM.get('vmViewMTM.mtmID'));
                                me.loadMTMCases(myVM.get('vmViewMTM.mtmID'));
                            }
                        }
                        else if (letterType == 'Rx Transfer' || letterType == 'General Cover Letter' ||
                            letterType == "Notice of Formulary Change" || letterType == "MAP Non Compliance Letter") {

                            if (myVM.get('vmViewMTM.mtmID')) {
                                myVM.set('vmMTMID', myVM.get('vmViewMTM.mtmID'));
                            }

                            if (myVM.get('vmViewMTM.MTMRID')) {
                                me.getMemberInfo(myVM.get('vmViewMTM.MTMRID'));
                            }
                            myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', true);
                        }
                    }
                }
                else if (myVM.get('vmHiddenFields.STATE') == 'Queue') {
                    if (letterType.indexOf('Acumen') > -1) {
                        if (myVM.get('vmHiddenFields.MTMRID') !== '') {
                            me.getMemberInfo(myVM.get('vmHiddenFields.MTMRID'));
                        }
                    }
                    else {
                        switch (letterType) {
                            case '1':
                            case 'Transition':
                            case 'Claim Intervention':
                            case 'Excluded Provider':
                            case 'HRM Member Letter':
                            case 'HRM Provider Letter':
                                me.getClaimInfo('', myVM.get('vmHiddenFields.keyValue'), false);
                                break;
                            case 'MTM Followup':
                            case 'MTM Invitation':
                            case 'MTM Physician Intervention':
                            case 'General Cover Letter':
                            case 'Rx Transfer':
                            case 'Notice of Formulary Change':
                            case 'MAP Non Compliance Letter':
                                if (myVM.get('vmHiddenFields.MTMRID') !== '') {
                                    me.getMemberInfo(myVM.get('vmHiddenFields.MTMRID'));
                                }
                                break;
                            case 'UCF Paid Letter':
                            case 'UCF Rejected Letter':
                                me.getClaimInfo('', myVM.get('vmHiddenFields.keyValue'), false);
                                break;
                        }
                    }
                }
                else {
                    vm.set('vmHiddenFields.STATE', '');
                    me.onClickSearch(vm.get('vmHiddenFields.letterID'));
                }
            }
        });
        lettertypestore.load();
        assigntouserliststore.load();
        var whereClause = " submittedBy = '" + Atlas.user.un + "' and wrdidx contains 'Drug Recall'";
        var drugrecalljobq = myVM.getStore('drugrecalljobqdata');
        drugrecalljobq.getProxy().setExtraParam('pWhere', whereClause);
        drugrecalljobq.getProxy().setExtraParam('pSort', 'submitDateTime DESC');
        drugrecalljobq.getProxy().setExtraParam('pBatchSize', '100');
        drugrecalljobq.getProxy().setExtraParam('pRowNum', '0');
        drugrecalljobq.getProxy().setExtraParam('pDBrowID', '');
        drugrecalljobq.load();
    },

    onClickCreate: function () {
        var me = this,
            myVM = me.getViewModel();

        // Set UI
        me.resetAll();

        myVM.set('vmUpdateMode', 'create');
        myVM.set('vmLetterID', '0');
        myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', true);
        myVM.set('vmUIActivation.bottomToolbar.buttons.btnDelete.isDisabled', true);
        myVM.set('vmUIActivation.bottomToolbar.buttons.btnView.isDisabled', true);
        myVM.set('vmUIActivation.topToolbar.btnCreate.isDisabled', true);
        myVM.set('vmUIActivation.topToolbar.btnCancel.isDisabled', false);
        myVM.set('vmUIActivation.inputs.cbxLetterType.isReadOnly', false);
        myVM.set('vmUIActivation.inputs.cbxLetterId.isReadOnly', true);

        // TODO: clear template fields
        me.setLetterTypeValue('LetterName', myVM.get('vmHiddenFields._letterType'));
        var letterstatusstore = myVM.getStore('letterstatusdata');
        letterstatusstore.getProxy().setExtraParam('pLetterID', 'null');
        letterstatusstore.load();
        myVM.set('letterAutoApproval', false);
        myVM.set('vmIsLetterApproved', false);
    },

    setLetterTypeValue: function (fieldName, fieldValue) {
        var me = this,
            myView = me.getView(),
            letterTypeValueList = myView.down('#uiLetterType').findRecord(fieldName, fieldValue),
            nameIDValue;

        if (fieldValue !== '') {
            nameIDValue = letterTypeValueList.data.LetterNameID;
            myView.down('#uiLetterType').setValue(nameIDValue);
        }
        else {
            myView.down('#uiLetterType').setValue('0');
        }
    },

    onClickSearch: function (letterID) {
        var me = this,
            myVM = me.getViewModel(),
            whereClause = ' LetterID = "' + letterID + '" ';
        if (letterID != '' && letterID != '0') {
            myVM.set('vmUpdateMode', '');
            myVM.set('vmUIActivation.inputs.cbxLetterType.isReadOnly', false);
            myVM.set('vmLetterID', letterID);
            me.loadExtLetterDetail(whereClause);
        }
    },

    loadExtLetterDetail: function (pWhereClause) {
        var me = this,
            myVM = me.getViewModel(),
            letterdetailextstore = myVM.getStore('letterdetailextstore');
        letterdetailextstore.getProxy().setExtraParam('pWhere', pWhereClause);
        letterdetailextstore.getProxy().setExtraParam('pSort', '');
        letterdetailextstore.getProxy().setExtraParam('pBatchSize', '350');
        letterdetailextstore.on({
            load: function (store, records, operation, success) {
                // Populate West Region Details
                //debugger;
                if (records[0]) {
                    if (records[0].data.ClaimID !== '' && records[0].data.ClaimID > 0) {
                        me.getClaimInfo(records[0].data.PlanGroupID, records[0].data.ClaimID, true);
                    }
                    if (records[0].data.PrescriberID && records[0].data.PrescriberID) {
                        me.loadPrescriberInfo(records[0].data.PrescriberID);
                    }
                    me.loadWestRegionDetails(records[0].data.RecipientID, records[0].data.NCPDPID);

                    // Set page UI
                    me.onSearch(records[0].data.LetterName, records[0].data.LetterID, records[0].data.ClaimID, records[0].data.PlanGroupID, records[0]);
                }
            },
            scope: me,
            single: true
        });
        letterdetailextstore.load(
            {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    if (record.length == 0) {
                        var obj = operation.getResponse().responseText;
                        // obj = obj.replace('\n"', '"');
                        var obj1 = Ext.decode(obj);
                        var obj2 = obj1.message[0].message;
                        myVM.set('vmUIActivation.inputs.cbxLetterType.isReadOnly', true);
                        Ext.Msg.alert('PBM', obj2 + ' for Letter  ID ' + me.getView().down('#uiLetterID').getValue());
                    }
                }
            });
    },

    onAdvSearchRowSelect: function (rec) {
        //debugger;
        var me = this,
            myVM = me.getViewModel();
        myVM.set('vmUpdateMode', '');
        if (rec.data.ClaimID !== '' && rec.data.ClaimID > 0) {
            me.getClaimInfo(rec.data.PlanGroupID, rec.data.ClaimID, false);
        }
        if (rec.get('PrescriberID') && rec.get('PrescriberID') > 0) {
            me.loadPrescriberInfo(rec.get('PrescriberID'));
        }

        if (rec.data.MTMID) {
            myVM.set('vmMTMID', rec.data.MTMID);
            me.resetWestRegion();
            me.loadMTMCases(myVM.get('vmMTMID'));
        }
        else {
            me.loadWestRegionDetails(rec.data.RecipientID, rec.data.NCPDPID);
        }

        me.onSearch(rec.data.LetterName, rec.data.LetterID, rec.data.ClaimID, rec.data.PlanGroupID, rec);
    },

    onSearch: function (letterName, letterID, ClaimID, PlanGroupID, fullRecord) {
        var me = this,
            myVM = me.getViewModel(),
            listStore = myVM.getStore('lettertypes').findRecord('LetterName', letterName);
        if (listStore == null) {
            return;
        }
        var xTypeTemplateName = listStore.data.LetterTemplateName,
            xTypeTemplate = xTypeTemplateName.substr(0, xTypeTemplateName.lastIndexOf('.')) || xTypeTemplateName,
            storeName = xTypeTemplate.toLowerCase() + 'data',
            lettermasterstore = myVM.getStore('lettermasterdata');

        me.resetAll();
        // Set UI
        me.setDefaultUIValues(storeName);
        myVM.set('vmUIActivation.inputs.cbxLetterId.isReadOnly', false);
        // Assign values to ViewModel
        myVM.set('letterDetailExtFullRecord', fullRecord);
        myVM.set('vmLetterID', letterID);
        myVM.set('vmClaimID', ClaimID);
        myVM.set('vmMTMID', fullRecord.get('MTMID'));

        lettermasterstore.getProxy().setExtraParam('pKeyType', 'LetterName');
        lettermasterstore.getProxy().setExtraParam('pKeyValue', letterName);
        lettermasterstore.load({
            callback: function (record, operation, success) {
                Ext.defer(function () {
                    myVM.set('vmLetterType', record[0].data.LetterNameID);
                    myVM.set('vmLetterProgramName', record[0].data.LetterProgramName);
                    myVM.set('vmLetterName', record[0].data.LetterName);
                }, 500);

                me.getLetterInfo(letterID);
            }
        });
    },

    onChangeLetterTypes: function (combobox, newValue) {
        if (newValue != "0") {
            var me = this,
                myView = me.getView(),
                myVM = me.getViewModel(),
                queryDBObj,
                queryDBObjItem,
                freeText3Array = [],
                freeText3List,
                screenFieldName,
                textFieldList,
                isSpecialHandlingNeeded = false,
                letterNameID = newValue !== '' ? newValue : '0',
                listStore = myVM.getStore('lettertypes').findRecord('LetterNameID', letterNameID);
            if (listStore == null) {
                return;
            }
            var xTypeTemplateName = listStore.data.LetterTemplateName,
                xTypeTemplate = xTypeTemplateName.substr(0, xTypeTemplateName.lastIndexOf('.')) || xTypeTemplateName,
                storeName = xTypeTemplate.toLowerCase() + 'data',
                //lobstore = myVM.getStore('lobstoredata'),
                //drugrecalljobq = myVM.getStore('drugrecalljobqdata'),
                whereClause = " submittedBy = '" + Atlas.user.un + "' and wrdidx contains 'Drug Recall'",
                templateStore = myVM.getStore(storeName),
                //transitionTypeStore = myVM.getStore('transitiontypedata'),
                letterDetailExtFullRecord = myVM.get('letterDetailExtFullRecord'),
                formFieldItemsList,
                invalidFields;

            // Set current value for letterType
            myVM.set('currentLetterType', newValue);
            myVM.set('currentTemplateXtype', xTypeTemplate);
            myVM.set('vmUCFStatus', '');
            myView.down('#xTypeTemplatePlaceHolder').remove('xTypeTemplateDetail', [true, true]);
            myView.down('#xTypeTemplatePlaceHolder').update();

            myView.down('#xTypeTemplatePlaceHolder').add({
                xtype: xTypeTemplate,
                itemId: 'xTypeTemplateDetail'
            });

            isSpecialHandlingNeeded = false;
            switch (storeName) {
                case 'transitionletterdata':
                    isSpecialHandlingNeeded = true;
                    break;
                case 'drugrecallletterdata':
                    //if (myVM.get('vmDocID') == null || myVM.get('vmDocID') == "") {
                    //    myView.down('#btnViewOutput').setDisabled(true);
                    //}
                    //else {
                    //    myView.down('#btnViewOutput').setDisabled(false);
                    //}
                    break;
                case 'ucfpaidtransitionletterdata':
                    myVM.set('vmUCFStatus', 'P');
                    break;
                case 'ucfrejectedtransitionletterdata':
                    myVM.set('vmUCFStatus', 'R');
                    break;
                default:
                    //<debug>
                    //console.log('Default: '+storeName);
                    //</debug>
                    break;
            }
            // Iterate through tempate fields to get list of FreetextX fields
            //  && formFieldItemsList[indexKey].xtype !== 'hiddenfield'
            if (storeName === 'rxtransfermedicareletterdata') {
                textFieldList = 'Freetext1,Freetext2,Freetext3,Freetext4,Freetext5,' +
                    'Freetext6,Freetext7,Freetext8,Freetext9,Freetext10,' +
                    'Freetext11';
            }
            else if (storeName == 'drugrecallletterdata') {
                textFieldList = 'Freetext1,Freetext2,Freetext3,Freetext4,Freetext5,' +
                    'Freetext6,Freetext7';
            }
            else {
                try {
                    textFieldList = '';
                    formFieldItemsList = myView.down('#xTypeTemplateDetail').items.items;
                    for (var indexKey in formFieldItemsList) {
                        if (formFieldItemsList[indexKey].name.indexOf('Freetext') != -1) {
                            textFieldList += formFieldItemsList[indexKey].name + ',';
                        }
                    }
                }
                catch (err) {
                    //console.log('ERROR: '+err);
                }
            }
            // Remove trailing comma
            textFieldList = textFieldList.replace(/(^,)|(,$)/g, "");

            // Set toolbar fields hidden value
            me.setDefaultUIValues(storeName);

            // Set auto approval to true for select stores
            if (storeName === 'mtminvitationletterdata' || storeName === 'claiminterventionletterdata' || storeName === 'generalcoverletterdata') {
                myVM.set('letterAutoApproval', true);
            }

            templateStore.getProxy().setExtraParam('pLetterID', letterDetailExtFullRecord.data.LetterID);
            templateStore.getProxy().setExtraParam('pFields', textFieldList);
            templateStore.load({
                callback: function (record, operation, success) {
                    queryDBObj = record[0].data;
                    if (storeName === 'rxtransfermedicareletterdata') {
                        for (queryDBObjItem in queryDBObj) {
                            if (queryDBObjItem.indexOf('Freetext') != -1) {
                                screenFieldName = '#' + queryDBObjItem;
                                myView.down(screenFieldName).setValue(queryDBObj[queryDBObjItem]);
                            }
                        }
                    }
                    else if (storeName === 'acumensponsnotfdata') {
                        for (queryDBObjItem in queryDBObj) {
                            if (queryDBObjItem.indexOf('Freetext') != -1) {
                                screenFieldName = '#' + queryDBObjItem;
                                if (queryDBObjItem.indexOf('Freetext7') != -1) {
                                    var list = queryDBObj[queryDBObjItem].split(',');
                                    me.getViewModel().set('vmAcumenRecordsIncluded', list.join());
                                    myView.down(screenFieldName).setValue(list);
                                }
                                else {
                                    myView.down(screenFieldName).setValue(queryDBObj[queryDBObjItem]);
                                }
                            }
                        }
                    }
                    else {
                        for (queryDBObjItem in queryDBObj) {
                            if (queryDBObjItem.indexOf('Freetext') != -1 && !queryDBObjItem.indexOf('Freetext3') != -1) {
                                screenFieldName = '#' + queryDBObjItem;
                                if ((myView.down(screenFieldName).config.xtype.indexOf('date') != -1) && queryDBObj[queryDBObjItem] != '?' && queryDBObj[queryDBObjItem] != '') {
                                    var convertedDate = new Date(queryDBObj[queryDBObjItem]);
                                    myView.down(screenFieldName).setValue(convertedDate);
                                }
                                else {
                                    myView.down(screenFieldName).setValue(queryDBObj[queryDBObjItem]);
                                    if (myView.down(screenFieldName).xtype.indexOf('typeahead') > -1) {
                                        myView.down(screenFieldName).setRawValue(queryDBObj[queryDBObjItem]);
                                    }
                                }
                            }
                        }
                    }

                    if (isSpecialHandlingNeeded) {
                        screenFieldName = '#Freetext3';
                        freeText3List = queryDBObj['Freetext3'].split(',');
                        //TODO: need to account for multiple options selected
                        myView.down('#Freetext3').setValue(freeText3List[0]);
                    }

                    // Set default template screen values where necessary
                    if (myVM.get('vmUpdateMode') == 'create') {
                        // Reset template fields
                        me.resetTemplateFields();

                        // Set initial field values as necessary
                        switch (storeName) {
                            case 'rxtransfermedicareletterdata':
                                myView.down('#Freetext5').setValue(myVM.get('currentYear') + 1);
                                myVM.set('vmMedQtyList.vmMedQty1', '');
                                myVM.set('vmMedQtyList.vmMedQty2', '');
                                myVM.set('vmMedQtyList.vmMedQty3', '');
                                myVM.set('vmMedQtyList.vmMedQty4', '');
                                myVM.set('vmMedQtyList.vmMedQty5', '');
                                myVM.set('vmMedQtyList.vmMedQty6', '');
                                break;
                            case 'ucfrejectedtransitionletterdata':
                                myView.down('#Freetext1').setValue(myVM.get('RejectCode'));
                                myView.down('#Freetext2').setValue(myVM.get('RejectStatus'));
                                myView.down('#Freetext3').setValue(myVM.get('vmConstants.LETTER_MeridianRx_Contact_Phone'));
                                myView.down('#Freetext4').setValue(myVM.get('vmConstants.CURRENT_YEAR'));
                                break;
                            case 'ucfpaidtransitionletterdata':
                                myView.down('#Freetext1').setValue(myVM.get('vmConstants.LETTER_MeridianRx_Contact_Phone'));
                                break;
                            case 'claiminterventionletterdata':
                                if(!myVM.get('isenter')) {
                                    myView.down('#Freetext1').setValue(myVM.get('masterRecord.@drugLN'));
                                    myView.down('#Freetext4').setValue(myVM.get('masterRecord.@UCFRejectDetails'));
                                }
                                myVM.set('isenter',false);
                                break;
                        }
                    }

                    if ((storeName == 'ucfpaidtransitionletterdata' || storeName == 'ucfrejectedtransitionletterdata') &&
                        me.getViewModel().get('vmUCFClaimID') !== '') {
                        me.getUCFClaimDetail(me.getViewModel().get('vmUCFClaimID'));
                    }

                    for (queryDBObjItem in queryDBObj) {
                        if (queryDBObjItem.indexOf('Freetext') != -1) {
                            screenFieldName = '#' + queryDBObjItem;
                            myView.down(screenFieldName).setDisabled(myVM.get('vmUIActivation.template.isDisabled'));
                        }
                    }
                    if(storeName=="drugrecallletterdata" && queryDBObj["Freetext6"]!="")
                    {
                        myView.down('#btnViewOutput').setDisabled(myVM.get('vmUIActivation.template.isDisabled'));
                    }
                    if (storeName == 'ucfrejectedtransitionletterdata') {
                        myView.down('#Freetext1').setDisabled(true);
                        myView.down('#Freetext2').setDisabled(true);
                    }
                    if(myVM.get('vmHiddenFields.letterID')=='NEW'&&myVM.get('vmHiddenFields.letterType')=='MTM Physician Intervention')
                    {
                        myView.down('#Freetext2').setValue(myVM.get('vmLetterUserMaintFullRecord').data.firstname+" "+myVM.get('vmLetterUserMaintFullRecord').data.lastname);
                        myView.down('#Freetext4').setValue(Ext.util.Format.phoneNumber(myVM.get('vmLetterUserMaintFullRecord').data.workphone));
                    }

                }
            });
            if (newValue == 561) {
                if(!myVM.get('vmUIActivation.template.isDisabled')) {
                    myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', false);
                }
                else{
                    myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', true);
                }
            }
            else {
                if (myVM.data.vmIsLetterApproved == true) {
                    myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', true);
                }
                else if (myVM.data.vmUIActivation.bottomToolbar.buttons.btnView.isDisabled == true) {
                    myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', true);
                }
                else {
                    myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', false);
                }
            }
        }
        else
            this.getView().down('#xTypeTemplatePlaceHolder').removeAll();
    },

    getLetterInfo: function (letterID) {
        var me = this,
            myView = me.getView(),
            myVM = me.getViewModel(),
            letterinfostore = myVM.getStore('letterinfodata'),
            letterstatusstore = myVM.getStore('letterstatusdata'),
            jsonFieldList = 'DocID,AssignTo,LetterNameID,planGroupId,recipientId',
            _letterNameID,
            _assocRxRefNum,
            _letterName;

        letterinfostore.getProxy().setExtraParam('pLetterID', letterID);
        letterinfostore.getProxy().setExtraParam('pFields', jsonFieldList);
        letterinfostore.on({
            load: function (store, records, operation, success) {
                me.loadLetterStatus(letterID);

                // Set ViewModel Fields
                myVM.set('vmDocID', parseInt(records[0].data.DocID));
                myVM.set('vmPlanGroupID', records[0].data.planGroupId);
                myVM.set('vmOrigAssignToID', (records[0].data.AssignTo == "null" || records[0].data.AssignTo == null) ? '' : records[0].data.AssignTo);
                myVM.set('letterMasterFullRecord', records[0]);
                myVM.set('vmHiddenFields.keyValue', records[0].data.ClaimID);
                myVM.set('vmHiddenFields.MTMRID', records[0].data.RecipientID);
                myVM.set('vmHiddenFields.mtmID', records[0].data.MTMID);
                myVM.set('vmHiddenFields.prescriberID', records[0].data.prescriberID);

                _letterNameID = records[0].data.LeterNameID;
                //_assocRxRefNum = records[0].data.@assocRxRefNum;

            },
            scope: me,
            single: true
        });
        letterinfostore.load();
    },

    runGetClaimInfo: function (field, e) {
        var me = this,
            myView = me.getView(),
            myVM = me.getViewModel();
        // e.HOME, e.END, e.PAGE_UP, e.PAGE_DOWN,
        // e.TAB, e.ESC, arrow keys: e.LEFT, e.RIGHT, e.UP, e.DOWN
        if (e.getKey() == e.ENTER) {
            myVM.set('isenter',true);
            me.getClaimInfo('', field.getValue(), true);
        }
    },

    getClaimInfo: function (PlanGroupID, ClaimID, loadWestRegionDetails) {
        var me = this,
            myView = me.getView(),
            myVM = me.getViewModel(),
            returnObj,
            errorMessage,
            jsonFieldList = 'recipientID,respStatus,ncpdpID,serviceDate,TransactionDate,TransitionFill,prescriberID,' +
                'prescriberNPI,pcpProvId,rxNum,gcnseq,@drugLN,ndc,assocRxRefNum,@UCFRejectDetails,' +
                'planGroupId,GPICode',
            claiminfostore = myVM.getStore('claiminfodata');
        claiminfostore.getProxy().setExtraParam('pPlanID', PlanGroupID);
        claiminfostore.getProxy().setExtraParam('pTransactionID', ClaimID);
        claiminfostore.getProxy().setExtraParam('pFieldList', jsonFieldList);

        claiminfostore.load({
            callback: function (record, operation, success) {
                returnObj = Ext.decode(operation.getResponse().responseText);
                if (returnObj.message[0].code == '0') {
                    myVM.set('vmUIActivation.bottomToolbar.links.viewClaims.isDisabled', false);
                    if (myVM.get('vmIsLetterApproved') == false) {
                        myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', false);
                    }
                    record[0].data.ClaimID = ClaimID;
                    if (record[0].data.TransitionFill.toLowerCase() === 'yes') {
                        record[0].data.TransFillText = 'Transition Fill';
                    }
                    else {
                        record[0].data.TransFillText = '';
                    }

                    //UCF CLAIM Condition
                    var claimStaus = record[0].get('respStatus'),
                        assocRxRefNum = record[0].get('assocRxRefNum'),
                        UCFReturnValue = record[0].get('@UCFRejectDetails'),
                        UCFRejectCode = '',
                        UCFRejectErrDescription = '',
                        UCFListErrDescription = '';

                    var status = '';
                    if (myView.down('#uiLetterType').rawValue == 'UCF Paid Letter') {
                        status = 'P';
                    }
                    else if (myView.down('#uiLetterType').rawValue == 'UCF Rejected Letter') {
                        status = 'R';
                    }
                    if (status == "R" && UCFReturnValue.length > 0) {
                        var newValues = UCFReturnValue.split(',');
                        if (newValues.length > 2) {
                            UCFRejectCode = newValues[0] == "-" ? "" : newValues[0];
                            UCFRejectErrDescription = newValues[1] == "-" ? "" : newValues[1];
                            UCFListErrDescription = newValues[2] == "-" ? "" : newValues[2];
                            me.getViewModel().set('RejectCode', UCFRejectCode);
                            me.getViewModel().set('RejectStatus', UCFRejectErrDescription);

                        }
                    }
                    if (status != '' && (status != claimStaus.toUpperCase() || (status == "R" && assocRxRefNum == '')
                        || (status == "R" && UCFListErrDescription == ''))) {

                        var msg = "Claim entered is not valid for selected Letter type.";
                        if (status == "R" && assocRxRefNum == '') {
                            msg = "No UCF Letter defined for the Claim Rejection reason.";
                        }
                        myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', true);
                        Ext.Msg.alert('Failure', msg);
                        return false;
                    }

                    // Set ViewModel values
                    me.getViewModel().set('vmViewLinks.CID', record[0].data.ClaimID);
                    me.getViewModel().set('vmViewLinks.RID', record[0].data.recipientID);
                    me.getViewModel().set('vmViewLinks.NPI', record[0].data.prescriberNPI);
                    me.getViewModel().set('vmViewLinks.PCPID', record[0].data.pcpProvId);
                    me.getViewModel().set('vmViewLinks.NCPDPID', record[0].data.ncpdpID);

                    me.getViewModel().set('vmUCFClaimID', record[0].data.assocRxRefNum);
                    me.getViewModel().set('vmPlanGroupID', record[0].data.planGroupId);
                    me.getViewModel().set('masterRecord', record[0]);
                    myVM.set('vmRecipientID', record[0].data.recipientID);

                    me.fireEvent('XTLoadClaimRecord', record[0]);

                    me.onChangeLetterTypes(myView.down('#uiLetterType'), myVM.get('vmLetterType'));
                    // myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', false);

                    if (loadWestRegionDetails) {
                        me.loadWestRegionDetails(record[0].data.recipientID, record[0].data.ncpdpID);
                    }
                    me.loadPrescriberInfo(record[0].data.prescriberNPI);
                    //TODO - Line#364 in LetterDetail.aspx
                }
                else {
                    myVM.set('vmUIActivation.bottomToolbar.links.viewClaims.isDisabled', true);
                    myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', true);
                    errorMessage = returnObj.message[0].message + ' (' + returnObj.message[0].code + ')';
                    Ext.Msg.alert('ERROR', errorMessage);
                }
            }
        });
    },


    getUCFClaimDetail: function () {
        var me = this,
            myVM = me.getViewModel(),
            ucfclaimdetailstore = myVM.getStore('ucfclaimdetaildata');

        ucfclaimdetailstore.getProxy().setExtraParam('ptransactionID', myVM.get('vmUCFClaimID'));
        //TODO - Set claimID based on UCFClaim Return
        ucfclaimdetailstore.load();
    },

    getMemberInfo: function (recipientID) {
        var me = this,
            myView = me.getView(),
            myVM = me.getViewModel(),
            returnObj,
            errorMessage,
            memberinfostore = myVM.getStore('memberinfodata'),
            memberStore = myView.down('#uiCbxMemberName').getStore(),
            memberStoreRec,
            jsonFieldList = 'recipientID,firstname,middlename,lastname,suffix,gender,birthDate,' +
                'homephone.ContactInfo,@enrollmentStatus',
            letterDetailExtFullRecord = myVM.get('letterDetailExtFullRecord'),
            memberCoverageHistoryFullRecord;

        memberinfostore.getProxy().setExtraParam('pKeyValue', recipientID);
        memberinfostore.getProxy().setExtraParam('pKeyType', 'recipientID');
        memberinfostore.getProxy().setExtraParam('pFieldList', jsonFieldList);
        memberinfostore.load({
            callback: function (record, operation, success) {
                returnObj = Ext.decode(operation.getResponse().responseText);
                if (returnObj.message[0].code == '0') {
                    myVM.set('vmUIActivation.bottomToolbar.links.viewMember.isDisabled', false);
                    // Load plan group list
                    if (!myView.down('#uiPlanGroupList').hidden) {
                        me.loadPlanGroupList(recipientID, '');
                    }

                    if (myVM.get('vmIsLetterApproved') == false) {
                        myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', false);
                    }
                    if (record[0].data.lastname && record[0].data.firstname) {
                        record[0].data.FullName = record[0].data.firstname + ' ' + record[0].data.lastname;
                    }
                    record[0].data.LOBName = letterDetailExtFullRecord.data.LOBName;
                    myVM.set('vmMemberFax', '');
                    // myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', false);
                    myVM.set('vmMemberEnrollStatus', record[0].data.enrollmentStatus);

                    me.fireEvent('XTLoadMemberRecord', record[0]);

                    // Populate memberID text
                    if (!myVM.get('vmUIActivation.inputs.cbxMemberName.isHidden') && myVM.get('vmMemberTypeAhead') == '') {
                        memberStoreRec = {
                            recipientID: recipientID,
                            firstName: record[0].data.firstname,
                            lastName: record[0].data.lastname
                        };
                        memberStore.add(memberStoreRec);
                        myView.down('#uiCbxMemberName').setValue(recipientID);
                        if (!myView.down('#uiPlanGroupList').hidden) {
                            me.loadPlanGroupList(recipientID, '');
                        }
                    }
                    var MemberCoverageHistoryStore = Ext.create('Ext.data.Store', {
                        model: 'Atlas.letter.model.MemberCoverageHistoryModel',
                        listeners: {
                            load: function (store, records, succesful, operation) {
                                myVM.set('memberCoverageHistoryFullRecord', store.first());
                                memberCoverageHistoryFullRecord = store.first();

                                // Assign necessary member fields
                                memberinfostore.first().data.LOBName = store.first().data.tCarrierLOBName;
                                myVM.set('CarrierLOBid', store.first().data.CarrierLOBid);
                                me.fireEvent('XTLoadMemberRecord', memberinfostore.first());

                                // Load PCP info
                                if (memberCoverageHistoryFullRecord.data.tPCPID) {
                                    me.loadPCPInfo(memberCoverageHistoryFullRecord.data.tPCPID);
                                }
                            }
                        }
                    });
                    MemberCoverageHistoryStore.getProxy().setExtraParam('pKeyValue', recipientID);
                    MemberCoverageHistoryStore.getProxy().setExtraParam('pKeyType', 'RecipientID');
                    MemberCoverageHistoryStore.sort('rowNum', 'DESC');
                    MemberCoverageHistoryStore.load();
                    //TODO -- line# 468 LetterDetail.aspx
                }
                else {
                    myVM.set('vmUIActivation.bottomToolbar.links.viewMember.isDisabled', true);
                    myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', true);
                    if(me.getView().down('#uiCbxMemberName').getValue())
                    {
                        errorMessage = returnObj.message[0].message + ' (' + returnObj.message[0].code + ')';
                        Ext.Msg.alert('ERROR (CEL-1)', errorMessage);
                    }

                }
            }
        });
    },

    getPharmacyInfo: function (NCPDPID) {
        var me = this,
            myVM = me.getViewModel(),
            returnObj,
            errorMessage,
            pharmacyinfostore = myVM.getStore('pharmacyinfodata'),
            jsonFieldList = 'ncpdpid,name,locPhone,locFax';
        myVM.set('vmUIActivation.bottomToolbar.links.viewPharmacy.isDisabled', false);
        pharmacyinfostore.getProxy().setExtraParam('pKeyValue', NCPDPID);
        pharmacyinfostore.getProxy().setExtraParam('pKeyType', 'ncpdpid');
        pharmacyinfostore.getProxy().setExtraParam('pFieldList', jsonFieldList);
        pharmacyinfostore.load({
            callback: function (record, operation, success) {
                returnObj = Ext.decode(operation.getResponse().responseText);
                if (returnObj.message[0].code == '0') {
                    me.fireEvent('XTLoadPharmacyRecord', record[0]);
                    myVM.set('vmPharmacyFax', record[0].data.locFax);
                    if (myVM.get('vmIsLetterApproved') == false) {
                        myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', false);
                    }
                }
                else {
                    myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', true);
                    errorMessage = returnObj.message[0].message + ' (' + returnObj.message[0].code + ')';
                    Ext.Msg.alert('ERROR (CEL-2)', errorMessage);
                }
            }
        });
    },

    loadPCPInfo: function (PCPID) {
        var me = this,
            myVM = me.getViewModel(),
            returnObj,
            errorMessage,
            blankStoreRecord,
            memberCoverageHistoryFullRecord = myVM.get('memberCoverageHistoryFullRecord'),
            pcpinfostore = myVM.getStore('prescriberinfodata'),
            jsonFieldList = 'locphone,locfax,lastname,firstname';
        myVM.set('vmUIActivation.bottomToolbar.links.viewPCP.isDisabled', false);
        pcpinfostore.getProxy().setExtraParam('pKeyValue', PCPID);
        pcpinfostore.getProxy().setExtraParam('pKeyType', 'npi');
        pcpinfostore.getProxy().setExtraParam('pFieldList', jsonFieldList);
        pcpinfostore.load({
            callback: function (record, operation, success) {
                returnObj = Ext.decode(operation.getResponse().responseText);
                if (returnObj.message[0].code == '0') {
                    if (record[0].data.lastname && record[0].data.firstname) {
                        record[0].data.PCPName = record[0].data.firstname + ' ' + record[0].data.lastname;
                    }
                    record[0].data.PCPID = PCPID;
                    me.fireEvent('XTLoadPCPRecord', record[0]);
                    myVM.set('vmPCPFax', record[0].data.locfax);
                    if (myVM.get('vmIsLetterApproved') == false) {
                        myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', false);
                    }
                }
                else {
                    myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', true);
                    errorMessage = returnObj.message[0].message + ' (' + returnObj.message[0].code + ')';
                    Ext.Msg.alert('ERROR (CEL-3)', errorMessage);
                }
            }
        });
    },

    onSelectPrescriber: function () {
        var me = this,
            vm = this.getViewModel();
        me.loadPrescriberInfo(vm.get('vmPrescriberID'));
    },

    loadPrescriberInfo: function (prescriberNPI) {
        //debugger;
        if (prescriberNPI) {
            var me = this,
                myView = me.getView(),
                myVM = me.getViewModel(),
                returnObj,
                errorMessage,
                blankStoreRecord,
                prescriberStoreRec,
                prescriberStore = myView.down('#uiCbxPrescriberName').getStore(),
                memberCoverageHistoryFullRecord = myVM.get('memberCoverageHistoryFullRecord'),
                prescriberinfostore = myVM.getStore('prescriberinfodata'),
                jsonFieldList = 'firstname,lastname,locfax,locname,locphone,npi';
            myVM.set('vmUIActivation.bottomToolbar.links.viewPrescriber.isDisabled', false);
            myVM.set('vmHiddenFields.prescriberID', prescriberNPI);
            prescriberinfostore.getProxy().setExtraParam('pKeyValue', prescriberNPI);
            prescriberinfostore.getProxy().setExtraParam('pKeyType', 'npi');
            prescriberinfostore.getProxy().setExtraParam('pFieldList', jsonFieldList);
            prescriberinfostore.load({
                callback: function (record, operation, success) {
                    //debugger;
                    returnObj = Ext.decode(operation.getResponse().responseText);
                    if (returnObj.message[0].code == '0') {
                        if (record[0].data.lastname && record[0].data.firstname) {
                            record[0].data.FullName = record[0].data.firstname + ' ' + record[0].data.lastname;
                            myVM.data.vmPrescriberName = record[0].data.FullName;
                            if (!myVM.get('vmUIActivation.inputs.cbxPrescriberName.isHidden') && myVM.get('vmPrescriberID') == '') {
                                prescriberStoreRec = {
                                    npi: prescriberNPI,
                                    fullname: record[0].data.FullName
                                };
                                prescriberStore.add(prescriberStoreRec);
                                myView.down('#uiCbxPrescriberName').setValue(prescriberNPI);
                            }
                        }
                        me.fireEvent('XTLoadPrescriberRecord', record[0]);
                        myVM.set('vmPrescriberFax', record[0].data.locfax);
                        if (myVM.get('vmIsLetterApproved') == false) {
                            myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', false);
                        }
                    }
                    else {
                        myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', true);
                        errorMessage = returnObj.message[0].message + ' (' + returnObj.message[0].code + ')';
                        Ext.Msg.alert('ERROR (CEL-4)', errorMessage);
                    }
                }
            });
        }
    },

    onClickSave: function () {
        var me = this,
            myVM = me.getViewModel(),
            vmUpdateMode = myVM.get('vmUpdateMode');

        switch (vmUpdateMode) {
            case 'create':
                me.createLetter();
                break;
            default:
                me.saveLetter();
                break;
        }
    },

    onClickDelete: function () {
        Ext.Msg.confirm('Confirm', 'Are you sure you would like to delete this letter?', function (btn) {
            if (btn == 'yes') {
                try {
                    var me = this,
                        myVM = me.getViewModel(),
                        parameterFieldList = 'ClaimID',
                        parameterFieldValues = myVM.get('vmClaimID'),
                        fullRecord = myVM.get('letterDetailExtFullRecord');

                    myVM.set('vmUpdateMode', '');
                    me.setLetterDetail('D', fullRecord.data.LetterID, parameterFieldList, parameterFieldValues);
                }
                catch (ex) {

                }
            }
        }, this);
    },

    createLetter: function () {
        var me = this,
            myView = me.getView(),
            myVM = me.getViewModel(),
            extJSDate = Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(new Date(),'m/d/Y g:i a'),
            loggedInUser = Atlas.user.un,
            isFormValid,
            formTemplateId = '#' + myVM.get('currentTemplateXtype'),
            parameterFieldList = '',
            parameterFieldValues = '',
            queryParm,
            queryParameters = {},
            hasAutoApproval = myVM.get('letterAutoApproval'),
            fullRecord = myVM.get('letterDetailExtFullRecord'),
            validationMessage,
            validationCode,
            templateFieldArray = {},
            lobstore = myVM.getStore('LetterLOBstoredata'),
            externalPrinting = false,
            searchTerm = 'ExternalPritingSolution';

        // Use form default value for allowBlank to validate field values
        // RxTransfer has a form in the template so it needs special attention
        if (myVM.get('currentTemplateXtype') == 'RxTransferMedicareLetter') {
            queryParameters.Freetext1 = myView.down('#Freetext1').getValue();
            queryParameters.Freetext2 = myView.down('#Freetext2').getValue();
            queryParameters.Freetext3 = myView.down('#Freetext3').getValue();
            queryParameters.Freetext4 = myView.down('#Freetext4').getValue();
            queryParameters.Freetext5 = myView.down('#Freetext5').getValue();
            queryParameters.Freetext6 = myView.down('#Freetext6').getValue();
            queryParameters.Freetext7 = myView.down('#Freetext7').getValue();
            queryParameters.Freetext8 = myView.down('#Freetext8').getValue();
            queryParameters.Freetext9 = myView.down('#Freetext9').getValue();
            queryParameters.Freetext10 = myView.down('#Freetext10').getValue();
            queryParameters.Freetext11 = myView.down('#Freetext11').getValue();
            validationCode = me.validateFormFields(formTemplateId, queryParameters);
        }
        else if (myVM.get('currentTemplateXtype') == 'DrugRecallLetter') {
            if (myView.down('#Freetext1').getValue()) {
                queryParameters.Freetext1 = Ext.Date.format(myView.down('#Freetext1').getValue(), 'm/d/Y');
            }
            else {
                queryParameters.Freetext1 = "";
            }
            queryParameters.Freetext2 = myView.down('#Freetext2').getValue();
            queryParameters.Freetext3 = myView.down('#Freetext3').getValue();
            queryParameters.Freetext4 = myView.down('#Freetext4').getValue();
            queryParameters.Freetext5 = myView.down('#Freetext5').getValue();
            queryParameters.Freetext6 = myView.down('#Freetext6').getValue();
            queryParameters.Freetext7 = myView.down('#Freetext7').getValue();
            validationCode = me.validateFormFields(formTemplateId, queryParameters);
        }
        else if (myVM.get('currentTemplateXtype') == 'UCFRejectedTransitionLetter') {
            queryParameters.Freetext1 = myView.down('#Freetext1').getValue();
            queryParameters.Freetext2 = myView.down('#Freetext2').getValue();
            queryParameters.Freetext3 = myView.down('#Freetext3').getValue();
            queryParameters.Freetext4 = myView.down('#Freetext4').getValue();
            validationCode = me.validateFormFields(formTemplateId, queryParameters);
        }
        else if (myVM.get('currentTemplateXtype') == "TransitionLetter") {
            var store = myVM.getStore('memberinfodata');
            if (store.first() != null && store.first().data.LOBName == "Medicare") {
                myView.down('#xTypeTemplatePlaceHolder').getForm(formTemplateId).getFields().each(function (field) {
                    field.allowBlank = false;
                });

            }
            else {
                myView.down('#xTypeTemplatePlaceHolder').getForm(formTemplateId).getFields().each(function (field) {
                    field.allowBlank = true;
                });
            }
            queryParameters = myView.getForm(formTemplateId).getValues();
            validationCode = me.validateFormFields(formTemplateId, queryParameters);

        }
        else {
            queryParameters = myView.getForm(formTemplateId).getValues();
            validationCode = me.validateFormFields(formTemplateId, queryParameters);
        }

        if (validationCode) {
            validationMessage = me.getValidationMessage('letters', validationCode);
            Ext.Msg.alert('ERROR (' + validationCode + ')', validationMessage);
            return;
        }

        // Loop through form fields and add to pParameters as necessary
        for (queryParm in queryParameters) {
            if (queryParm.indexOf('Freetext') != -1) {
                if (!queryParameters[queryParm]) {
                    queryParameters[queryParm] = '';
                }
                parameterFieldList += ',' + queryParm;
                parameterFieldValues += queryParameters[queryParm] + '|';
            }
        }

        // Trim trailing comma and pipe
        parameterFieldList = parameterFieldList.replace(/(^,)|(,$)/g, "");
        parameterFieldValues = parameterFieldValues.replace(/(^,)|(,$)/g, "");
        parameterFieldValues = parameterFieldValues.replace(/(^|)|(|$)/g, "");
        if (myVM.get('currentTemplateXtype') == 'UCFRejectedTransitionLetter' || myVM.get('currentTemplateXtype') == 'UCFPaidTransitionLetter')
        {
            var claimId=myView.down('#lblClaimId').getValue();
            myVM.set('vmClaimID',claimId)
        }
        // Add static fields to lists
        parameterFieldList += ',CreateDate,CreateBy,AssignTo,LetterNameID,RecipientID,ClaimID,MTMID,planGroupId,prescriberId';
        parameterFieldValues += extJSDate + '|' +
            loggedInUser + '|' +
            myVM.get('vmNewAssignToID') + '|' +
            myVM.get('vmLetterType') + '|' +
            myVM.get('vmRecipientID') + '|' +
            myVM.get('vmClaimID') + '|' +
            myVM.get('vmHiddenFields.mtmID') + '|' +
            myVM.get('vmPlanGroupID') + '|' +
            myVM.get('vmHiddenFields.prescriberID');

        // Trim trailing comma and pipe
        parameterFieldList = parameterFieldList.replace(/(^,)|(,$)/g, "");
        parameterFieldValues = parameterFieldValues.replace(/(^,)|(,$)/g, "");
        parameterFieldValues = parameterFieldValues.replace(/(^|)|(|$)/g, "");

        // U= Add if lExternalPritingSolution = yes in pbm/setLetterDetail.p
        // A= Add if NOT lExternalPritingSolution = yes in pbm/setLetterDetail.p
        // 0= LetterID - Conditional in pbm/setLetterDetail.p (if 'U' and 0 then ADD)
        // Due to ASynchronous call, can't call standalone function to return value
        lobstore.getProxy().setExtraParam('pListName', searchTerm);
        lobstore.load(
            {
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (records, operation) {
                    if (records.length > 0) {
                        var isIdExists = false;
                        var isLOBIdExist = false;
                        for (var index = 0; index < records.length; index++) {
                            if (records[index].data.Active) {
                                if (records[index].data.ListItem == myView.down('#uiLetterType').getValue()) {
                                    isIdExists = true;
                                }
                                else {
                                    isIdExists = false;
                                }
                                if (records[index].data.charString != "") {
                                    if (records[index].data.charString == myVM.get('CarrierLOBid')) {
                                        isLOBIdExist = true;
                                    }
                                    else {
                                        isLOBIdExist = false;
                                    }
                                }
                                else {
                                    isLOBIdExist = true;
                                }
                                if (isIdExists && isLOBIdExist) {
                                    externalPrinting = true;
                                    break;
                                }
                            }
                        }
                        if (externalPrinting) {
                            me.setLetterDetail('U', 0, parameterFieldList, parameterFieldValues);
                        }
                        else {
                            me.setLetterDetail('A', 0, parameterFieldList, parameterFieldValues);
                        }
                    }
                }
            });
    },

    saveLetter: function () {
        var me = this,
            myView = me.getView(),
            myVM = me.getViewModel(),
            isFormValid,
            formTemplateId = '#' + myVM.get('currentTemplateXtype'),
            parameterFieldList = '',
            parameterFieldValues = '',
            queryParm,
            queryParameters = {},
            hasAutoApproval = myVM.get('letterAutoApproval'),
            fullRecord = myVM.get('letterDetailExtFullRecord'),
            validationMessage,
            validationCode,
            templateFieldArray = {};
        //me.getView().updateRecord(fullRecord);
        // Use form default value for allowBlank to validate field values
        // RxTransfer has a form in the template so it needs special attention
        if (myVM.get('currentTemplateXtype') == 'RxTransferMedicareLetter') {
            queryParameters.Freetext1 = myView.down('#Freetext1').getValue();
            queryParameters.Freetext2 = myView.down('#Freetext2').getValue();
            queryParameters.Freetext3 = myView.down('#Freetext3').getValue();
            queryParameters.Freetext4 = myView.down('#Freetext4').getValue();
            queryParameters.Freetext5 = myView.down('#Freetext5').getValue();
            queryParameters.Freetext6 = myView.down('#Freetext6').getValue();
            queryParameters.Freetext7 = myView.down('#Freetext7').getValue();
            queryParameters.Freetext8 = myView.down('#Freetext8').getValue();
            queryParameters.Freetext9 = myView.down('#Freetext9').getValue();
            queryParameters.Freetext10 = myView.down('#Freetext10').getValue();
            queryParameters.Freetext11 = myView.down('#Freetext11').getValue();
            validationCode = me.validateFormFields(formTemplateId, queryParameters);
        }
        else if (myVM.get('currentTemplateXtype') == 'DrugRecallLetter') {
            if (myView.down('#Freetext1').getValue()) {
                queryParameters.Freetext1 = Ext.Date.format(myView.down('#Freetext1').getValue(), 'm/d/Y');
            }
            else {
                queryParameters.Freetext1 = "";
            }
            queryParameters.Freetext2 = myView.down('#Freetext2').getValue();
            queryParameters.Freetext3 = myView.down('#Freetext3').getValue();
            queryParameters.Freetext4 = myView.down('#Freetext4').getValue();
            queryParameters.Freetext5 = myView.down('#Freetext5').getValue();
            queryParameters.Freetext6 = myView.down('#Freetext6').getValue();
            queryParameters.Freetext7 = myView.down('#Freetext7').getValue();
            validationCode = me.validateFormFields(formTemplateId, queryParameters);
        }

        else if (myVM.get('currentTemplateXtype') == "TransitionLetter") {
            var store = myVM.getStore('memberinfodata');
            if (store.first() != null && store.first().data.LOBName == "Medicare") {
                myView.down('#xTypeTemplatePlaceHolder').getForm(formTemplateId).getFields().each(function (field) {
                    field.allowBlank = false;
                });

            }
            else {
                myView.down('#xTypeTemplatePlaceHolder').getForm(formTemplateId).getFields().each(function (field) {
                    field.allowBlank = true;
                });
            }
            queryParameters = myView.getForm(formTemplateId).getValues();
            validationCode = me.validateFormFields(formTemplateId, queryParameters);

        }
        else {
            queryParameters = myView.getForm(formTemplateId).getValues();
            validationCode = me.validateFormFields(formTemplateId, queryParameters);
        }

        if (validationCode) {
            validationMessage = me.getValidationMessage('letters', validationCode);
            Ext.Msg.alert('ERROR (' + validationCode + ')', validationMessage);
            return;
        }

        // Loop through form fields and add to pParameters as necessary
        for (queryParm in queryParameters) {
            if (queryParm.indexOf('Freetext') != -1) {
                if (!queryParameters[queryParm]) {
                    queryParameters[queryParm] = '';
                }
                parameterFieldList += ',' + queryParm;
                parameterFieldValues += queryParameters[queryParm] + '|';
            }
        }

        // Trim trailing comma and pipe
        parameterFieldList = parameterFieldList.replace(/(^,)|(,$)/g, "");
        parameterFieldValues = parameterFieldValues.replace(/(^,)|(,$)/g, "");
        parameterFieldValues = parameterFieldValues.replace(/(^|)|(|$)/g, "");

        var recipId = myView.down('#rid').getValue(), //myView.down('#uiCbxMemberName').hidden ? fullRecord.data.RecipientID : myView.down('#uiCbxMemberName').getValue(),
            claimId = myView.down('#uiTxtClaimID').hidden ? fullRecord.data.ClaimID : myView.down('#uiTxtClaimID').getValue(),
            mtmId = myView.down('#uiTxtMTMID').hidden ? fullRecord.data.MTMID : myView.down('#uiTxtMTMID').getValue(),
            planGorupId = myView.down('#uiPlanGroupList').hidden ? fullRecord.data.PlanGroupID : myView.down('#uiPlanGroupList').getValue(),
            presId = myView.down('#uiCbxPrescriberName').hidden ? fullRecord.data.PrescriberID : myView.down('#uiCbxPrescriberName').getValue();
        if (myVM.get('currentTemplateXtype') == 'UCFRejectedTransitionLetter' || myVM.get('currentTemplateXtype') == 'UCFPaidTransitionLetter')
        {
            claimId=myView.down('#lblClaimId').getValue();
        }
        // Add static fields to lists
        parameterFieldList += ',AssignTo,LetterNameID,RecipientID,ClaimID,MTMID,planGroupId,prescriberId';
        parameterFieldValues += myVM.get('vmNewAssignToID') + '|' +
            fullRecord.data.LetterNameID + '|' +
            recipId + '|' +
            claimId + '|' +
            mtmId + '|' +
            planGorupId + '|' +
            presId;

        // Trim trailing comma and pipe
        parameterFieldList = parameterFieldList.replace(/(^,)|(,$)/g, "");
        parameterFieldValues = parameterFieldValues.replace(/(^,)|(,$)/g, "");
        parameterFieldValues = parameterFieldValues.replace(/(^|)|(|$)/g, "");

        me.setLetterDetail('U', fullRecord.data.LetterID, parameterFieldList, parameterFieldValues);
    },

    validateFormFields: function (formId, formFields) {
        var me = this,
            myView = me.getView(),
            myVM = me.getViewModel(),
            indexKey,
            indexKeyID,
            isFormValid,
            // The following are bound to UI elements in CreateEditLetter.js
            letterNameID = myVM.get('vmLetterType'),
            claimID = myVM.get('vmClaimID'),
            mtmCaseID = myVM.get('vmMTMID'),
            prescriberID = myVM.get('vmPrescriberID'),
            returnMessageCode = '';

        if (!myVM.get('vmLetterType')) {
            returnMessageCode = 'CEL-V001';
        }

        if (myVM.get('vmMemberEnrollStatus').toLowerCase() == 'inactive') {
            returnMessageCode = 'CEL-V002';
        }

        switch (formId) {
            case '#TransitionLetter':
            case '#HRMMbrAwarenessLetters':
            case '#HRMPvdrAwarenessLetters':
                if (letterNameID === '' || claimID === '') {
                    returnMessageCode = 'CEL-V003';
                }
                break;
            case '#MTMFollowupLetter':
            case '#MTMInvitationLetter':
            case '#MTMPhysicianInterventionLetter':
            case '#AcumenMbrAppUse':
            case '#AcumenMbrInAppUse':
            case '#AcumenMbrNotf':
            case '#AcumenPvdNotf':
            case '#AcumenSponsNotf':
                if (myVM.get('vmMTMID') == '' || myVM.get('vmMTMID') == '0') {
                    returnMessageCode = 'CEL-V004';
                }
                else if (myVM.get('vmPlanGroupID') == '' || myVM.get('vmPlanGroupID') == '0') {
                    returnMessageCode = 'CEL-V006';
                }
                break;
            case '#FormularyChange':
            case '#GeneralCoverLetter':
            case '#RxTransferMedicareLetter':
            case '#NoticeofFormularyChange':
                if (myVM.get('vmMemberTypeAhead') == '') {
                    returnMessageCode = 'CEL-V005';
                }
                else if (myVM.get('vmPlanGroupID') == '') {
                    returnMessageCode = 'CEL-V006';
                }

                if (myVM.get('vmMemberTypeAhead') !== '') {
                    myVM.set('vmRecipientID', myVM.get('vmMemberTypeAhead'));
                }
                break;
            case '#ClaimInterventionLetter':
            case '#ExcludedProviderLetter':
                if (myVM.get('vmClaimID') == '') {
                    returnMessageCode = 'CEL-V007';
                }
                break;
            case '#MAPNonComplianceLetter':
                if (prescriberID == '') {
                    returnMessageCode = 'CEL-V008';
                }
                if (!mtmCaseID) {
                    returnMessageCode = 'CEL-V009';
                }
                break;
            case '#UCFPaidTransitionLetter':
            case '#UCFRejectedTransitionLetter':
                if (!myVM.get('vmUCFClaimID')) {
                    returnMessageCode = 'CEL-V010';
                }
                break;
            case '#DrugRecallLetter':
                break;
            default:
                for (indexKey in formFields) {
                    if (indexKey.indexOf('Freetext') != -1) {
                        indexKeyID = '#' + indexKey;
                        myView.down(indexKeyID).allowBlank = true;
                    }
                }
                break;
        }
        if (!returnMessageCode) {
            isFormValid = myView.getForm(formId).isValid();
            if (!isFormValid) {
                returnMessageCode = 'CEL-V999';
            }
        }
        return returnMessageCode;
    },

    getValidationMessage: function (modulePackage, validationCode) {
        var returnMessage;

        switch (modulePackage) {
            case 'letters':
                switch (validationCode) {
                    case 'CEL-V001':
                        returnMessage = 'Please Select Letter Type';
                        break;
                    case 'CEL-V002':
                        returnMessage = 'Letter could not be generated for an Inactive Member.';
                        break;
                    case 'CEL-V003':
                        returnMessage = 'All fields are required. Please enter all information before proceed.';
                        break;
                    case 'CEL-V004':
                        returnMessage = 'Please enter MTM Case ID.';
                        break;
                    case 'CEL-V005':
                        returnMessage = 'Please Select Member.';
                        break;
                    case 'CEL-V006':
                        returnMessage = 'Please Select a Plan Group.';
                        break;
                    case 'CEL-V007':
                        returnMessage = 'Please Enter Claim Id.';
                        break;
                    case 'CEL-V008':
                        returnMessage = 'Please Select Prescriber.';
                        break;
                    case 'CEL-V009':
                        returnMessage = 'Please enter valid MTM CaseID for Member Details.';
                        break;
                    case 'CEL-V010':
                        returnMessage = 'Please Enter valid UCF Claim Id.';
                        break;
                    case 'CEL-E011':
                        returnMessage = 'Letter NOT Saved.';
                        break;
                    case 'CEL-V999':
                        returnMessage = 'All required fields must be filled in to continue.';
                        break;
                }
                break;
        }
        return returnMessage;
    },

    setLetterDetail: function (pMode, pLetterID, pFieldList, pFieldValues) {
        var me = this,
            myVM = me.getViewModel(),
            requestParameter = {},
            returnValue,
            validationMessage,
            endPoint = 'member/rx/letterdetail/update';

        requestParameter.pLetterID = pLetterID;
        requestParameter.pMode = pMode;
        requestParameter.pFields = pFieldList;
        requestParameter.pValues = pFieldValues;

        //returnValue = Atlas.common.utility.Utilities.post(endPoint, requestParameter, ['pretLetterID']);

        var saveAction = [{
            "Save": {"key": '', "value": ''}
        }];
        var returnValue = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/letterdetail/update', null, [false], requestParameter,
            saveAction, ['pretLetterID']);

        if (returnValue.code == '0') {
            myVM.set('vmUpdateMode', '');
            myVM.set('vmUIActivation.inputs.cbxLetterId.isReadOnly', false);
            //Ext.Msg.alert('Information', returnValue.message.replace('Message:','') + ' (' + returnValue.code + ')');
            if (returnValue.pretLetterID && returnValue.pretLetterID != '0') {
                Ext.Msg.alert('Success', 'Record saved successfully');
                myVM.set('vmLetterID', returnValue.pretLetterID);
                me.onClickSearch(returnValue.pretLetterID);
                myVM.set('vmUIActivation.inputs.cbxLetterType.isReadOnly', true);
            }
            else if (returnValue.code == '0') {
                if (pMode == "D") {
                    Ext.Msg.alert('Success', 'Record deleted successfully');
                    me.resetAll();
                    var letterstatusstore = myVM.getStore('letterstatusdata');
                    letterstatusstore.getProxy().setExtraParam('pLetterID', 'null');
                    letterstatusstore.load();
                }
                else {
                    if (pFieldList.indexOf('ApproveBy') < 0 && pFieldList.indexOf('sentBy') < 0) {
                        Ext.Msg.alert('Success', 'Record saved successfully');
                    }
                    myVM.set('vmLetterID', pLetterID);
                    me.onClickSearch(pLetterID);
                    myVM.set('vmUIActivation.inputs.cbxLetterType.isReadOnly', true);
                }

            }
            else {
                validationMessage = me.getValidationMessage('letters', 'CEL-E011');
                Ext.Msg.alert('ERROR (CEL-E011)', validationMessage);
            }
            if (myVM.data.currentLetterType == 581 || myVM.data.currentLetterType == 1021 || myVM.data.currentLetterType == 1031) {
                var saveAction = [{
                    "Save": {"key": '', "value": ''}
                }];
                if (pMode == 'U') {
                    var requestParameterApprove = {};
                    requestParameterApprove.pLetterID = returnValue.pretLetterID;
                    requestParameterApprove.pMode = 'A';
                    requestParameterApprove.pFields = '';
                    requestParameterApprove.pValues = '';
                    var ret = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/letterdetail/update', null, [false], requestParameterApprove,
                        saveAction, ['pretLetterID']);
                }
                else if (pMode == 'A') {
                    var requestParameterApprove = {},
                        extJSDate = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y g:i a');
                    requestParameterApprove.pLetterID = returnValue.pretLetterID;
                    requestParameterApprove.pMode = 'U';
                    requestParameterApprove.pFields = 'ApproveBy,ApproveDate';
                    requestParameterApprove.pValues = Atlas.user.un + "|" + extJSDate;
                    var ret = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/letterdetail/update', null, [false], requestParameterApprove,
                        saveAction, ['pretLetterID']);

                    var extraParameters = {
                        pLetterID: returnValue.pretLetterID,
                        pLetterProgramName: myVM.data.currentTemplateXtype + '.p'
                    };
                    var setletterdocument = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/letterdocument/update', null, [false], extraParameters,
                        saveAction, ['DocID']);
                }

            }
        }
        else {
            Ext.Msg.alert('ERROR', returnValue.message.replace('Message:', '') + ' (' + returnValue.code + ')');
            myVM.set('vmUpdateMode', "create");
            //me.onClickCancel(); // Reset all fields
        }
    },

    setVMDRDocumentID: function (combobox) {
        var me = this,
            myVM = me.getViewModel(),
            myView = me.getView(),
            documentID;
        if (combobox.getValue()) {
            documentID = myVM.getStore('drugrecalljobqdata').findRecord('jobNum', combobox.getValue()).data.documentID;
            myVM.set('vmDocID', parseInt(documentID));
            myView.down('#btnViewOutput').setDisabled(false);

        }
    },

    onAdvancedSearch: function () {
        var vm = this.getViewModel();
        var me = this;
        if (!me.searchWin) {
            me.searchWin = Ext.create('Atlas.letter.view.AdvancedSearch', {
                autoShow: true,
                viewModel: {parent: vm},
                closeAction: 'hide'
            });
        } else {
            me.searchWin.show();
        }
    },

    onClickView: function () {
        // var me = this,
        //     myVM = me.getViewModel();
        // Atlas.common.utility.Utilities.viewDocument(myVM.get('vmDocID'), 'pdf');
        var me = this,
            myVM = me.getViewModel(),
            reportname = myVM.data.vmLetterName,
            programName = myVM.data.vmLetterProgramName,// 'TransitionLetter.p',
            parameters = myVM.data.vmLetterID, //'1239351', // letterId
            runMode = 1,
            programType = 'Report',
            saveDoc = false,
            faxNumber = '';

        if (myVM.get('vmDocID') != 0) {
            Atlas.common.utility.Utilities.viewDocument(myVM.get('vmDocID'), 'pdf');
        }
        else {
            var documentInfo = Atlas.common.utility.Utilities.submitJobViewDoc(reportname, programName, parameters, runMode, programType, saveDoc, faxNumber);

            if (documentInfo.code == 0) {
                Atlas.common.utility.Utilities.displayDocument(documentInfo.type, documentInfo.data)
            }
            else {
                Ext.Msg.alert('Error', documentInfo.message);
            }
        }


    },

    onClickApprove: function (isExternalPritingSolution) {
        var me = this,
            myVM = me.getViewModel(),
            //currentDate = Atlas.common.utility.Utilities.getLocalDateTime(),
            extJSDate = Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(new Date(),'m/d/Y g:i a'),
            mode,
            parameterFieldList,
            parameterFieldValues,
            letterDetailExtFullRecord = myVM.get('letterDetailExtFullRecord');

        if (isExternalPritingSolution) {
            mode = "A";
            parameterFieldList = "AssignTo";
            parameterFieldValues = myVM.get('vmNewAssignToID');
        }
        else {
            mode = "U";
            parameterFieldList = "ApproveBy,ApproveDate,AssignTo";
            parameterFieldValues = Atlas.user.un + "|" + extJSDate + "|" + myVM.get('vmNewAssignToID');
        }

        me.setLetterDetail(mode, letterDetailExtFullRecord.data.LetterID, parameterFieldList, parameterFieldValues);
    },

    onClickResetApprove: function (isExternalPritingSolution) {
        var me = this,
            myVM = me.getViewModel(),
           // currentDate = Atlas.common.utility.Utilities.getLocalDateTime(),
            extJSDate =Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(new Date(),'m/d/Y g:i a'),
            mode,
            parameterFieldList,
            parameterFieldValues,
            letterDetailExtFullRecord = myVM.get('letterDetailExtFullRecord');

        if (isExternalPritingSolution) {
            mode = "R";
            parameterFieldList = "AssignTo";
            parameterFieldValues = Atlas.user.un;
        }
        else {
            mode = "U";
            parameterFieldList = 'ApproveBy,ApproveDate,AssignTo,DocID';
            parameterFieldValues = '' + '|' + '' + '|' + Atlas.user.un + '|' + '0';
        }

        me.setLetterDetail(mode, letterDetailExtFullRecord.data.LetterID, parameterFieldList, parameterFieldValues);
        me.loadLetterStatus(letterDetailExtFullRecord.data.LetterID);
    },

    onClickFax: function () {
        var me = this,
            myVM = me.getViewModel();

        Ext.create('Atlas.letter.view.LetterFaxWindow', {
            autoShow: true,
            controller: 'letterfaxwindowctrl',
            viewModel: {
                data: {
                    vmIsPCPFax: myVM.get('vmIsPCPFax'),
                    vmPCPFax: myVM.get('vmPCPFax'),
                    vmIsPrescriberFax: myVM.get('vmIsPrescriberFax'),
                    vmPrescriberFax: myVM.get('vmPrescriberFax'),
                    vmIsMemberFax: myVM.get('vmIsMemberFax'),
                    vmMemberFax: myVM.get('vmMemberFax'),
                    vmIsPharmacyFax: myVM.get('vmIsPharmacyFax'),
                    vmPharmacyFax: myVM.get('vmPharmacyFax')
                }
            }
        });
    },

    onSendFax: function (faxValues) {
        var me = this,
            myVM = me.getViewModel(),
            letterDetailExtFullRecord = myVM.get('letterDetailExtFullRecord'),
            faxParameters,
            pDescription = '(' + letterDetailExtFullRecord.data.LetterName + ' Letter to && (Letter ID: ' + letterDetailExtFullRecord.data.LetterID + ')',
            pProgramName = 'faxDocument.p',
            pParameters = myVM.get('vmDocID') + '|' + '',
            pRunMode = 2,
            pProgramType = 'Fax',
            pSaveDocument = true,

            pFaxNumber = myVM.get('vmPCPFax'),
            faxTypes = [],
            faxReturnValues = {},
            faxJobNumberList = [],
            faxConfirmationTemplate = 'NA',
            faxConfirmationMessage,
            messageTxt;

        // Assign local VM values from letter fax window VM
        myVM.set('vmIsPCPFax', faxValues.vmIsPCPFax);
        myVM.set('vmPCPFax', faxValues.vmPCPFax);
        myVM.set('vmIsPrescriberFax', faxValues.vmIsPrescriberFax);
        myVM.set('vmPrescriberFax', faxValues.vmPrescriberFax);
        myVM.set('vmIsMemberFax', faxValues.vmIsMemberFax);
        myVM.set('vmMemberFax', faxValues.vmMemberFax);
        myVM.set('vmIsPharmacyFax', faxValues.vmIsPharmacyFax);
        myVM.set('vmPharmacyFax', faxValues.vmPharmacyFax);


        faxTypes.push({
            faxType: 'PCP',
            sendFax: myVM.get('vmIsPCPFax'),
            faxNum: myVM.get('vmPCPFax'),
            faxDesc: pDescription.replace('&&', ' PCP ')
        });

        faxTypes.push({
            faxType: 'PRESCRIBER',
            sendFax: myVM.get('vmIsPrescriberFax'),
            faxNum: myVM.get('vmPrescriberFax'),
            faxDesc: pDescription.replace('&&', ' Prescriber ')
        });

        faxTypes.push({
            faxType: 'MEMBER',
            sendFax: myVM.get('vmIsMemberFax'),
            faxNum: myVM.get('vmMemberFax'),
            faxDesc: pDescription.replace('&&', ' Member ')
        });

        faxTypes.push({
            faxType: 'PHARMACY',
            sendFax: myVM.get('vmIsPharmacyFax'),
            faxNum: myVM.get('vmPharmacyFax'),
            faxDesc: pDescription.replace('&&', ' PCP ')
        });

        faxParameters = {
            pSessionId: Atlas.user.sessionId,
            pSessionID: Atlas.user.sessionId,
            pDescription: '',
            pProgramName: pProgramName,
            pParameters: pParameters,
            pRunMode: pRunMode,
            pProgramType: pProgramType,
            pSaveDocument: pSaveDocument,
            pFaxNumber: ''
        };
        this.getDocumentDetails(myVM.get('vmDocID'), faxParameters, faxTypes);
    },

    onClickSend: function (isExternalPritingSolution) {
        var me = this,
            myVM = me.getViewModel(),
            //currentDate = Atlas.common.utility.Utilities.getLocalDateTime(),
            extJSDate = Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(new Date(),'m/d/Y g:i a'),
            mode,
            parameterFieldList,
            parameterFieldValues,
            letterDetailExtFullRecord = myVM.get('letterDetailExtFullRecord');

        isExternalPritingSolution = myVM.get('vmExternalPrinting'); // need to check
        if (isExternalPritingSolution){
            mode = "S";
            parameterFieldList = "AssignTo";
            parameterFieldValues = myVM.get('vmNewAssignToID');
        }
        else {
            mode = "U";
            parameterFieldList = "sentBy,sentDate,AssignTo";
            parameterFieldValues = Atlas.user.un + "|" + extJSDate + "|" + '';
        }

        me.setLetterDetail(mode, letterDetailExtFullRecord.data.LetterID, parameterFieldList, parameterFieldValues);
        if (myVM.data.vmLetterProgramName == 'TransitionLetter.p') {
            parameterFieldList = "subject,description,callStatus,contactType," +
                "contactUser,updatedBy,callDateTime,recipientID,transactionID,LastModifiedUser,planGroupId,updatedDatetime";
            parameterFieldValues = "Transition Letter" + "|" + "Transition letter is sent to member on " + Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(new Date(),'m/d/Y') + " Letter ID: " + myVM.data.vmLetterID +
                "|" + "C" + "|" + "L" + "|" + Atlas.user.un + "|" + Atlas.user.un +
                "|" + Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(new Date(),'m/d/Y') + "|" + myVM.data.vmRecipientID +
                "|" + myVM.data.vmClaimID + "|" + Atlas.user.un + "|" + myVM.data.vmPlanGroupID + "|now";

            var ttContactReasonCodeList = [];
            var ttContactReasonCodett = {};
            var ttContactReasonCode = {};
            ttContactReasonCode.CodeType = "Reason1";
            ttContactReasonCode.CodeValue = 'TL';
            ttContactReasonCodeList.push(ttContactReasonCode);

            ttContactReasonCodett.ttContactReasonCode = ttContactReasonCodeList;
            var extraParameters = {
                'pKeyValue': '0',
                'pKeyType': 'CaseNum',
                'pFieldList': parameterFieldList,
                'pFields': parameterFieldValues,
                'ttContactReasonCode': ttContactReasonCodett
            };
            var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
            var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/contactlogdata/update', null, [false], extraParameters,
                saveAction, null);
        }
        var letterName = myVM.data.vmLetterName;
        if (letterName == 'UCF Rejected Letter' || letterName == 'UCF Paid Letter') {
            var ucfClaimId = myVM.data.vmUCFClaimID,
                ucfPlanGroupId = '';
            if (ucfClaimId != '' && ucfClaimId != 0) {
                var saveAction = [{"Save": {"key": "mode", "value": "Update"}}],
                    saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], {
                            pcPlanID: ucfPlanGroupId,
                            pcKeyType: 'UCFTransactionId',
                            pcKeyValue: ucfClaimId,
                            pcKeyAction: 'A',
                            pcDocIDList: myVM.data.vmDocID,
                            pcDescrData: letterName
                        },
                        saveAction, null);
            }
        }
        else if (letterName == 'MTM Followup' || letterName == "MTM Invitation" || letterName == "MAP Non Compliance Letter" || letterName == "MTM Physician Intervention" || letterName.indexOf("Acumen") > -1) {
            var mtmId = myVM.data.vmMTMID,
                planGroupId = myVM.data.vmPlanGroupID;
            if (mtmId != '' && mtmId != 0) {
                var saveAction = [{"Save": {"key": "mode", "value": "Update"}}],
                    saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], {
                            pcPlanID: planGroupId,
                            pcKeyType: 'mtmID',
                            pcKeyValue: mtmId,
                            pcKeyAction: 'A',
                            pcDocIDList: myVM.data.vmDocID,
                            pcDescrData: letterName + ' Letter'
                        },
                        saveAction, null);
            }
        }
    },

    onClickCancel: function () {
        var me = this,
            myVM = me.getViewModel();
        myVM.set('vmUpdateMode', '');
        myVM.set('vmUIActivation.inputs.cbxLetterId.isReadOnly', false);
        me.resetAll();
    },

    resetAll: function () {
        var me = this,
            myVM = me.getViewModel();

        // Disable bottom buttons
        myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', true);
        myVM.set('vmUIActivation.bottomToolbar.buttons.btnView.isDisabled', true);
        myVM.set('vmUIActivation.bottomToolbar.buttons.btnApprove.isDisabled', true);
        myVM.set('vmUIActivation.bottomToolbar.buttons.btnResetApprove.isDisabled', true);
        myVM.set('vmUIActivation.bottomToolbar.buttons.btnFax.isDisabled', true);
        myVM.set('vmUIActivation.bottomToolbar.buttons.btnSend.isDisabled', true);
        myVM.set('vmUIActivation.bottomToolbar.buttons.btnDelete.isDisabled', true);

        // Hide inputs as necessary
        myVM.set('vmUIActivation.inputs.cbxMemberName.isHidden', true);
        myVM.set('vmUIActivation.inputs.txtClaimID.isHidden', true);
        myVM.set('vmUIActivation.inputs.txtMTMID.isHidden', true);
        myVM.set('vmUIActivation.inputs.cbxPlanGroupList.isHidden', true);
        myVM.set('vmUIActivation.inputs.txtUCFClaimID.isHidden', true);
        myVM.set('vmUIActivation.inputs.cbxPrescriberName.isHidden', true);
        myVM.set('vmUIActivation.bottomToolbar.links.viewClaims.isDisabled', true);
        myVM.set('vmUIActivation.bottomToolbar.links.viewMember.isDisabled', true);
        myVM.set('vmUIActivation.bottomToolbar.links.viewPrescriber.isDisabled', true);
        myVM.set('vmUIActivation.bottomToolbar.links.viewPCP.isDisabled', true);
        myVM.set('vmUIActivation.bottomToolbar.links.viewPharmacy.isDisabled', true);

        myVM.set('vmUIActivation.inputs.cbxLetterType.isReadOnly', true);
        myVM.set('vmUIActivation.template.isDisabled', true);
        myVM.set('vmUIActivation.topToolbar.btnCreate.isDisabled', false);
        myVM.set('vmUIActivation.topToolbar.btnCancel.isDisabled', true);

        myVM.set('vmUpdateMode', '');
        me.resetWestRegion();
        me.resetCenterRegion();
    },

    resetWestRegion: function () {
        var me = this;
        me.fireEvent('ResetAllClaimFields');
        me.fireEvent('ResetAllMedicationFields');
        me.fireEvent('ResetAllMemberFields');
        me.fireEvent('ResetAllPCPFields');
        me.fireEvent('ResetAllPharmacyFields');
    },

    resetCenterRegion: function () {
        var me = this,
            myView = me.getView(),
            myVM = me.getViewModel();
        myVM.set('vmLetterID', '');
        myVM.set('vmLetterType', '0');
        myVM.set('vmClaimID', '');
        myVM.set('vmMTMID', '');
        myVM.set('vmMemberTypeAhead', '');
        myVM.set('vmUCFClaimID', '');
        myVM.set('vmMemberEnrollStatus', '');
        myVM.set('vmPlanGroupID', '');
        myVM.set('vmPrescriberID', '');
    },

    resetTemplateFields: function () {
        var me = this,
            myView = me.getView(),
            myVM = me.getViewModel(),
            templateForm = myView.down('#xTypeTemplateDetail'),
            formFieldList = templateForm.items.items,
            elementID,
            indexKey,
            templateFieldList = '',
            templateFieldArray;

        // RxTransfer and DrugRecallLetter Templates contains a form so they needs special attention
        if (templateForm.xtype === 'RxTransferMedicareLetter' || templateForm.xtype == 'DrugRecallLetter') {
            switch (templateForm.xtype) {
                case 'DrugRecallLetter':
                    templateFieldList = 'Freetext1,Freetext2,Freetext3,Freetext4,Freetext5,' +
                        'Freetext6,Freetext7';
                    break;
                case 'RxTransferMedicareLetter':
                    templateFieldList = 'Freetext1,Freetext2,Freetext3,Freetext4,Freetext5,' +
                        'Freetext6,Freetext7,Freetext8,Freetext9,Freetext10,' +
                        'Freetext11';
                    break;
                default:
                    templateFieldList = '';
                    break;
            }
            templateFieldArray = templateFieldList.split(',');

            for (indexKey in templateFieldArray) {
                elementID = '#' + templateFieldArray[indexKey];
                myView.down(elementID).setValue('');
            }
        }
        else {
            for (indexKey in formFieldList) {
                if (formFieldList[indexKey].name.indexOf('Freetext') != -1 && formFieldList[indexKey].xtype != 'form') {
                    elementID = '#' + formFieldList[indexKey].name;
                    if (myView.down(elementID).getValue() != myVM.get('vmConstants.LETTER_MeridianRx_Contact_Phone') &&
                        myView.down(elementID).getValue() != myVM.get('vmConstants.CURRENT_YEAR')) {
                        myView.down(elementID).setValue('');
                    }
                }
            }
        }
    },

    onChangeAssignToUserList: function (combobox) {
        var me = this,
            myVM = me.getViewModel();

        myVM.set('vmNewAssignToID', combobox.value);
    },

    onSelectLetterMemberTypeAhead: function () {
        var me = this,
            myVM = me.getViewModel();

        //me.loadPlanGroupList(myVM.get('vmMemberTypeAhead'));
        me.loadWestRegionDetails(myVM.get('vmMemberTypeAhead'), '');
    },

    onBlurMTMID: function (field, e, eOpts) {
        var me = this,
            myVM = me.getViewModel();

        // 13= ENTER, 9= TAB
        if (e.keyCode === 13 || e.keyCode == 9) {
            //me.resetWestRegion();
            me.fireEvent('ResetAllMemberFields');
            me.loadMTMCases(myVM.get('vmMTMID'));
        }
    },
    onBlurMTMID_Blur: function (field) {
        var me = this,
            myVM = me.getViewModel();
        if (field.value != '') {
            //me.resetWestRegion();
            me.fireEvent('ResetAllMemberFields');
            me.loadMTMCases(myVM.get('vmMTMID'));
        }
    },


    addMedQty: function () {
        var me = this,
            myView = me.getView(),
            myVM = me.getViewModel();
        if (myView.down('#cbxNDC') && myView.down('#cbxNDC').getValue()) {
            var vmMedQtyList = myVM.get('vmMedQtyList'),
                medication = myView.down('#cbxNDC').getValue(),
                medicationQty = myView.down('#medicationQty').getValue() ? myView.down('#medicationQty').getValue() : '',
                qtyDisplayValue = medication + ' ' + medicationQty;
            myView.up().down('#cbxNDC').setValue('');
            myView.up().down('#medicationQty').setValue('');

            if (!myView.down('#Freetext6').getValue()) {
                myVM.set('vmMedQtyList.vmMedQty1', qtyDisplayValue);
            }
            else if (!myView.down('#Freetext7').getValue()) {
                myVM.set('vmMedQtyList.vmMedQty2', qtyDisplayValue);
            }
            else if (!myView.down('#Freetext8').getValue()) {
                myVM.set('vmMedQtyList.vmMedQty3', qtyDisplayValue);
            }
            else if (!myView.down('#Freetext9').getValue()) {
                myVM.set('vmMedQtyList.vmMedQty4', qtyDisplayValue);
            }
            else if (!myView.down('#Freetext10').getValue()) {
                myVM.set('vmMedQtyList.vmMedQty5', qtyDisplayValue);
            }
            else if (!myView.down('#Freetext11').getValue()) {
                myVM.set('vmMedQtyList.vmMedQty6', qtyDisplayValue);
            }
            else {
                Ext.Msg.alert('PBM', 'Max reached.');
            }
        }
    },

    setControls: function (letterID, letterStatusRec) {
        var me = this,
            myVM = me.getViewModel(),
            userIDList,
            approveAccess = false,
            queuelistdata = myVM.getStore('queuelistdata'),
            letterStatusData = '';

        if (letterStatusRec[0]) {
            letterStatusData = letterStatusRec[0].data
        }

        myVM.set('vmUIActivation.topToolbar.btnCreate.isDisabled', false);
        myVM.set('vmUIActivation.topToolbar.btnCancel.isDisabled', true);
        myVM.set('vmUIActivation.inputs.cbxLetterType.isDisabled', false);
        if (letterID) {
            myVM.set('vmUIActivation.bottomToolbar.buttons.btnView.isDisabled', false);
            myVM.set('vmUIActivation.bottomToolbar.buttons.btnDelete.isDisabled', false);
        }
        else {
            myVM.set('vmUIActivation.bottomToolbar.buttons.btnView.isDisabled', true);
            myVM.set('vmUIActivation.bottomToolbar.buttons.btnDelete.isDisabled', true);
        }
        if (letterStatusData) {
            if (letterStatusData.ApprovedBy) {
                myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', true);
                myVM.set('vmUIActivation.template.isDisabled', true);
                myVM.set('vmUIActivation.bottomToolbar.buttons.btnResetApprove.isHidden', false);
                myVM.set('vmUIActivation.bottomToolbar.buttons.btnResetApprove.isDisabled', false);
            }
            else {
                myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', false);
                myVM.set('vmUIActivation.template.isDisabled', false);
                myVM.set('vmUIActivation.bottomToolbar.buttons.btnResetApprove.isHidden', true);
                myVM.set('vmUIActivation.bottomToolbar.buttons.btnResetApprove.isDisabled', true);
            }

            if (!letterStatusData.ApprovedBy && letterID) {
                myVM.set('vmUIActivation.bottomToolbar.buttons.btnApprove.isDisabled', false);
                myVM.set('vmUIActivation.bottomToolbar.buttons.btnResetApprove.isHidden', true);
                myVM.set('vmUIActivation.bottomToolbar.buttons.btnResetApprove.isDisabled', true);
                myVM.set('vmUIActivation.bottomToolbar.buttons.btnFax.isDisabled', true);

                // getAccess - line#1859 letterdetail.aspx.cs
                queuelistdata.on({
                    load: function (store, records, operation, success) {
                        //userIDList = myVM.getStore('queuelistdata').findRecord('userName', Atlas.user.un);
                        userIDList = myVM.getStore('queuelistdata').findRecord('userName', Atlas.user.un, 0, false, true, true);
                        //if (userIDList.data.userName) {
                        if (userIDList != null) {
                            approveAccess = true;
                        }
                        else {
                            approveAccess = false;
                        }
                        myVM.set('vmUIActivation.bottomToolbar.buttons.btnApprove.isDisabled', (approveAccess == true ? false : true));
                        myVM.set('vmUIActivation.bottomToolbar.buttons.btnReset.isHidden', (approveAccess == true ? false : true));
                    }
                });
                queuelistdata.load();
            }
            else {
                myVM.set('vmUIActivation.bottomToolbar.buttons.btnApprove.isDisabled', true);
                myVM.set('vmUIActivation.bottomToolbar.buttons.btnResetApprove.isHidden', false);
                myVM.set('vmUIActivation.bottomToolbar.buttons.btnResetApprove.isDisabled', false);
                myVM.set('vmUIActivation.bottomToolbar.buttons.btnFax.isDisabled', true);
            }

            if (!letterStatusData.SentBy && letterID && letterStatusData.ApprovedBy) {
                myVM.set('vmUIActivation.bottomToolbar.buttons.btnSend.isDisabled', false);
                myVM.set('vmUIActivation.bottomToolbar.buttons.btnFax.isDisabled', false);
            }
            else {
                myVM.set('vmUIActivation.bottomToolbar.buttons.btnSend.isDisabled', true);
                myVM.set('vmUIActivation.bottomToolbar.buttons.btnResetApprove.isHidden', true);
            }
        }
    },

    setDefaultUIValues: function (storeName) {
        var me = this,
            myVM = me.getViewModel();

        switch (storeName) {
            case 'transitionletterdata':
            case 'drugrecalletterdata':
            case 'claiminterventionletterdata':
            case 'excludedproviderletter':
            case 'hrmmbrawarenesslettersdata':
            case 'hrmpvdrawarenesslettersdata':
            case 'excludedproviderletterdata':
                myVM.set('vmUIActivation.inputs.txtClaimID.isHidden', false);
                myVM.set('vmUIActivation.inputs.cbxMemberName.isHidden', true);
                myVM.set('vmUIActivation.inputs.cbxPrescriberName.isHidden', true);
                myVM.set('vmUIActivation.inputs.txtMTMID.isHidden', true);
                myVM.set('vmUIActivation.inputs.txtUCFClaimID.isHidden', true);
                myVM.set('vmUIActivation.inputs.cbxPlanGroupList.isHidden', true);
                break;
            case 'mtmfollowupletterdata':
            case 'mtminvitationletterdata':
            case 'mtmphysicianinterventionletterdata':
            case 'acumenmbrappusedata':
            case 'acumenmbrinappusedata':
            case 'acumenmbrnotfdata':
            case 'acumenpvdnotfdata':
            case 'acumensponsnotfdata':
                myVM.set('vmUIActivation.inputs.txtClaimID.isHidden', true);
                myVM.set('vmUIActivation.inputs.cbxMemberName.isHidden', true);
                myVM.set('vmUIActivation.inputs.cbxPrescriberName.isHidden', true);
                myVM.set('vmUIActivation.inputs.txtMTMID.isHidden', false);
                myVM.set('vmUIActivation.inputs.txtUCFClaimID.isHidden', true);
                myVM.set('vmUIActivation.inputs.cbxPlanGroupList.isHidden', false);
                break;
            case 'formularychangedata':
            case 'generalcoverletterdata':
            case 'rxtransfermedicareletterdata':
                myVM.set('vmUIActivation.inputs.txtClaimID.isHidden', true);
                myVM.set('vmUIActivation.inputs.cbxMemberName.isHidden', false);
                myVM.set('vmUIActivation.inputs.cbxPrescriberName.isHidden', true);
                myVM.set('vmUIActivation.inputs.txtMTMID.isHidden', true);
                myVM.set('vmUIActivation.inputs.txtUCFClaimID.isHidden', true);
                myVM.set('vmUIActivation.inputs.cbxPlanGroupList.isHidden', false);
                break;
            case 'ucfpaidtransitionletterdata':
            case 'ucfrejectedtransitionletterdata':
                myVM.set('vmUIActivation.inputs.txtClaimID.isHidden', true);
                myVM.set('vmUIActivation.inputs.cbxMemberName.isHidden', true);
                myVM.set('vmUIActivation.inputs.cbxPrescriberName.isHidden', true);
                myVM.set('vmUIActivation.inputs.txtMTMID.isHidden', true);
                myVM.set('vmUIActivation.inputs.txtUCFClaimID.isHidden', false);
                myVM.set('vmUIActivation.inputs.cbxPlanGroupList.isHidden', true);
                break;
            case 'mapnoncomplianceletterdata':
                myVM.set('vmUIActivation.inputs.txtClaimID.isHidden', true);
                myVM.set('vmUIActivation.inputs.cbxMemberName.isHidden', true);
                myVM.set('vmUIActivation.inputs.cbxPrescriberName.isHidden', false);
                myVM.set('vmUIActivation.inputs.txtMTMID.isHidden', false);
                myVM.set('vmUIActivation.inputs.txtUCFClaimID.isHidden', true);
                myVM.set('vmUIActivation.inputs.cbxPlanGroupList.isHidden', true);
                break;
            default:
                myVM.set('vmUIActivation.inputs.txtClaimID.isHidden', true);
                myVM.set('vmUIActivation.inputs.cbxMemberName.isHidden', true);
                myVM.set('vmUIActivation.inputs.cbxPrescriberName.isHidden', true);
                myVM.set('vmUIActivation.inputs.txtMTMID.isHidden', true);
                myVM.set('vmUIActivation.inputs.txtUCFClaimID.isHidden', true);
                myVM.set('vmUIActivation.inputs.cbxPlanGroupList.isHidden', true);
                break;
        }
        // Enable elements needed for create
        if (myVM.get('vmUpdateMode') === 'create') {
            myVM.set('vmUIActivation.inputs.cbxLetterType.isReadOnly', false);
            //myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', false);
            myVM.set('vmUIActivation.template.isDisabled', false);
            myVM.set('vmUIActivation.topToolbar.btnCreate.isDisabled', true);
            myVM.set('vmUIActivation.topToolbar.btnCancel.isDisabled', false);
        }
    },

    loadWestRegionDetails: function (recipientID, ncpdpID) {
        var me = this;
        if (recipientID !== '') {
            me.getViewModel().set('vmViewLinks.RID', recipientID);
            me.getMemberInfo(recipientID);
        }

        if (ncpdpID !== '') {
            me.getPharmacyInfo(ncpdpID);
        }
    },

    loadPlanGroupList: function (RID) {
        var me = this,
            myView = me.getView(),
            myVM = me.getViewModel(),
            plangroupstore = myVM.getStore('plangrouplistdata'),
            planGroupRec,
            returnObj,
            errorMessage;

        // Load plan group list
        plangroupstore.getProxy().setExtraParam('pRecipientId', RID);
        plangroupstore.getProxy().setExtraParam('pDate', myVM.get('vmCurrentDate'));
        plangroupstore.load({
            callback: function (record, operation, success) {
                try {
                    returnObj = Ext.decode(operation.getResponse().responseText);
                    //myView.down('#uiPlanGroupList').setValue('');
                    if (returnObj.message[0].code == '0') {
                        if (returnObj.data.length === 1) {
                            planGroupRec = plangroupstore.getAt(0);
                            if (planGroupRec && planGroupRec.data.planGroupId) {
                                myView.down('#uiPlanGroupList').setValue(planGroupRec.data.planGroupId);
                            }
                        }
                    }
                    else {
                        errorMessage = returnObj.message[0].message + ' (' + returnObj.message[0].code + ')';
                        Ext.Msg.alert('ERROR (CEL-5)', errorMessage);
                    }
                }
                catch (err) {

                }
            }
        });
    },

    loadClaimDetails: function (planId, claimId) {
        var me = this,
            myVM = me.getViewModel(),
            claiminfostore = myVM.getStore('claiminfodata'),
            pFieldList = 'recipientID,ncpdpID,prescriberID,prescriberNPI,pcpProvId';

        claiminfostore.getProxy().setExtraParam('pPlanID', planId);
        claiminfostore.getProxy().setExtraParam('pTransactionID', claimId);
        claiminfostore.getProxy().setExtraParam('pFieldList', pFieldList);
        claiminfostore.on({
            load: function (store, records, operation, success) {
                myVM.set('vmHiddenFields.RID', records[0].data.recipientID);
                myVM.set('vmHiddenFields.NCPDPID', records[0].data.ncpdpID);
                myVM.set('vmHiddenFields.NPI', records[0].data.prescriberNPI);
            }
        });
        claiminfostore.load();
    },

    loadLetterDetail: function (letterID, pFieldList) {
        var me = this,
            myView = me.getView(),
            myVM = me.getViewModel(),
            letterinfostore = myVM.getStore('letterinfodata'),
            _letterNameID,
            _assocRxRefNum,
            _letterName;

        letterinfostore.getProxy().setExtraParam('pLetterID', letterID);
        letterinfostore.getProxy().setExtraParam('pFields', pFieldList);
        letterinfostore.on({
            load: function (store, records, operation, success) {
                // Set ViewModel Fields
                myVM.set('vmDocID', parseInt(records[0].data.DocID));
                myVM.set('vmPlanGroupID', records[0].data.planGroupId);
                myVM.set('vmOrigAssignToID', records[0].data.AssignTo);
                myVM.set('letterMasterFullRecord', records[0]);
                myVM.set('vmHiddenFields.keyValue', records[0].data.ClaimID);
                myVM.set('vmHiddenFields.MTMRID', records[0].data.RecipientID);
                myVM.set('vmHiddenFields.mtmID', records[0].data.MTMID);
                myVM.set('vmHiddenFields.prescriberID', records[0].data.prescriberID);

                _letterNameID = records[0].data.LeterNameID;
                _assocRxRefNum = records[0].data.assocRxRefNum;

                if (_letterNameID !== '' && _assocRxRefNum !== '') {
                    me.loadLetterMaster('LetterNameID', _letterNameID);
                }

            },
            scope: me,
            single: true
        });
        letterinfostore.load();
    },

    loadLetterMaster: function (keyType, keyValue) {
        var me = this,
            myVM = me.getViewModel(),
            lettermasterstore = myVM.getStore('lettermasterdata');

        lettermasterstore.on({
            load: function (store, records, operation, success) {
                try {
                    if (records[0].data.LetterName === 'UCF Rejected Letter' ||
                        records[0].data.LetterName === 'UCF Paid Letter') {
                        myVM.set('vmHiddenFields._letterName', records[0].data.LetterName);
                    }
                }
                catch (err) {

                }
            },
            scope: me,
            single: true
        });
        lettermasterstore.getProxy().setExtraParam('pKeyType', keyType);
        lettermasterstore.getProxy().setExtraParam('pKeyValue', keyValue);
        lettermasterstore.load();
    },

    loadLetterStatus: function (letterID) {
        var me = this,
            myVM = me.getViewModel(),
            letterstatusstore = myVM.getStore('letterstatusdata');

        letterstatusstore.getProxy().setExtraParam('pLetterID', letterID);
        letterstatusstore.on({
            load: function (store, records, operation, success) {
                if (records.length > 0) {
                    if (records[0].get('ApproveDate') == null || records[0].get('ApproveDate') == '') {
                        myVM.set('vmIsLetterApproved', false);
                        myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', false);
                    }
                    else {
                        myVM.set('vmIsLetterApproved', true);
                        myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', true);
                    }
                    me.setControls(letterID, records);
                }
            }
        });
        letterstatusstore.load();
    },

    loadMTMCases: function (MTMID) {
        var me = this,
            myView = me.getView(),
            myVM = me.getViewModel(),
            mtmcasestore = myVM.getStore('mtmcaseinfodata'),
            letterUserMaintFullRecord = myVM.get('vmLetterUserMaintFullRecord'),
            whereClause = ' MTMID = "' + MTMID + '"  ',
            returnObj,
            errorMessage;

        mtmcasestore.getProxy().setExtraParam('pBatchSize', '99');
        mtmcasestore.getProxy().setExtraParam('pWhere', whereClause);
        mtmcasestore.getProxy().setExtraParam('ipiJumpStart', '');
        mtmcasestore.getProxy().setExtraParam('ipcDirection', 'FWD');
        mtmcasestore.getProxy().setExtraParam('ipcBckRecPointer', '');
        mtmcasestore.getProxy().setExtraParam('ipcFwdRecPointer', '');
        mtmcasestore.load({
            callback: function (record, operation, success) {
                var myVM = me.getViewModel(),
                    xTypeTemplate = myVM.get('currentTemplateXtype'),
                    letterUserMaintFullRecord = myVM.get('vmLetterUserMaintFullRecord');

                returnObj = Ext.decode(operation.getResponse().responseText);
                if (returnObj.message[0].code == '0') {
                    if (myVM.get('vmIsLetterApproved') == false) {
                        myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', false);
                    }
                    me.getMemberInfo(record[0].data.RecipientId);
                    myVM.set('vmRecipientID', record[0].data.RecipientId);
                    myVM.set('vmHiddenFields.mtmID', record[0].data.MTMId);
                    switch (xTypeTemplate) {
                        case 'MTMInvitationLetter':
                            if (myVM.get('vmLetterID') && myVM.get('vmLetterID') != '0') {
                                myView.down('#Freetext1').setValue(letterUserMaintFullRecord.data.firstname + ' ' + letterUserMaintFullRecord.data.lastname);
                                myView.down('#Freetext2').setValue(letterUserMaintFullRecord.data.workphone);
                            }
                            break;
                        default:
                            break;
                    }
                }
                else {
                    myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', true);
                    errorMessage = returnObj.message[0].message + ' (' + returnObj.message[0].code + ')';
                    myVM.set('vmPlanGroupID', '');
                    Ext.Msg.alert('ERROR', errorMessage);
                }
            }
        });
    },

    openClaimsModule: function () {
        var me = this;
        me.openModule('claims');
    },

    openMemberModule: function () {
        var me = this;
        me.openModule('member');
    },

    openPrescriberModule: function () {
        var me = this;
        me.openModule('prescriber');
    },

    openPCPModule: function () {
        var me = this;
        me.openModule('pcp');
    },

    openPharmacyModule: function () {
        var me = this;
        me.openModule('pharmacy');
    },

    openModule: function (moduleName) {
        var me = this,
            myVM = me.getViewModel(),
            PCPID,
            memberCoverageRec = myVM.get('memberCoverageHistoryFullRecord');

        switch (moduleName) {
            case 'claims':
                me.fireEvent('openView', 'merlin', 'claims', 'ClaimsToolbar', {
                    menuId: me.getViewMenuId('merlin/claims/ClaimsToolbar'),
                    atlasId: myVM.get('vmViewLinks.CID'),
                    CID: myVM.get('vmViewLinks.CID')
                });
                break;
            case 'member':
                me.fireEvent('openView', 'merlin', 'member', 'MemberToolbar', {
                    menuId: Atlas.common.Util.menuIdFromRoute('merlin/member/MemberToolbar'),
                    atlasId: myVM.get('vmViewLinks.RID'),
                    RID: myVM.get('vmViewLinks.RID'),
                    openView: true
                });
                break;
            case 'prescriber':
                me.fireEvent('openView', 'merlin', 'prescriber', 'PrescriberToolbar', {
                    menuId: me.getViewMenuId('merlin/prescriber/PrescriberToolbar'),
                    atlasId: myVM.get('vmViewLinks.NPI'),
                    NPI: myVM.get('vmViewLinks.NPI')
                });
                break;
            case 'pcp':
                if (memberCoverageRec) {
                    PCPID = memberCoverageRec.data.tPCPID;
                }
                else {
                    PCPID = myVM.get('vmViewLinks.NPI');
                }
                me.fireEvent('openView', 'merlin', 'prescriber', 'PrescriberToolbar', {
                    menuId: me.getViewMenuId('merlin/prescriber/PrescriberToolbar'),
                    atlasId: PCPID,
                    PCPID: myVM.get('vmViewLinks.PCPID'), //myVM.get('vmViewLinks.NPI')
                    openView: true
                });
                break;
            case 'pharmacy':
                me.fireEvent('openView', 'merlin', 'pharmacy', 'Pharmacy', {
                    menuId: me.getViewMenuId('merlin/pharmacy/Pharmacy'),
                    atlasId: myVM.get('vmViewLinks.NCPDPID'),
                    ncpdpId: myVM.get('vmViewLinks.NCPDPID')
                });
                break;
        }
    },

    getViewMenuId: function (route) {
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute(route);

        return menuId;
    },

    lookupOptionsValue: function (button) {
        var me = this,
            myView = me.getView(),
            myVM = me.getViewModel(),
            optionsListStore,
            searchTerm,
            lobstore = myVM.getStore('LetterLOBstoredata'),
            externalPrinting = false,
            letterMasterFullRecord = myVM.get('letterMasterFullRecord');

        switch (button.text) {
            case 'Approve':
            case 'Reset Approve':
                searchTerm = 'ExternalPritingSolution';
                break;
        }

        // Due to ASynchronous call, can't call standalone function to return value
        lobstore.getProxy().setExtraParam('pListName', searchTerm);
        lobstore.load(
            {
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (records, operation) {
                    if (records.length > 0) {
                        var isIdExists = false;
                        var isLOBIdExist = false;
                        for (var index = 0; index < records.length; index++) {
                            if (records[index].data.Active) {
                                if (records[index].data.ListItem == myView.down('#uiLetterType').getValue()) {
                                    isIdExists = true;
                                }
                                else {
                                    isIdExists = false;
                                }
                                if (records[index].data.charString != "") {
                                    if (records[index].data.charString == myVM.get('CarrierLOBid')) {
                                        isLOBIdExist = true;
                                    }
                                    else {
                                        isLOBIdExist = false;
                                    }
                                }
                                else {
                                    isLOBIdExist = true;
                                }
                                if (isIdExists && isLOBIdExist) {
                                    externalPrinting = true;
                                    break;
                                }
                            }
                        }
                        myVM.set('vmExternalPrinting', externalPrinting);
                        switch (button.text) {
                            case 'Approve':
                                me.onClickApprove(externalPrinting);
                                myVM.set('vmUIActivation.template.isDisabled', true);
                                break;
                            case 'Reset Approve':
                                me.onClickResetApprove(externalPrinting);
                                myVM.set('vmUIActivation.template.isDisabled', false);
                                break;
                        }
                        myView.down('#uiLetterType').fireEvent('change', '', myView.down('#uiLetterType').getValue());
                    }
                }
            });
    },

    getDocumentDetails: function (docID, faxParameters, faxTypes) {
        var me = this,
            queryDBObj,
            docDetailStore;
        docDetailStore = Ext.create('Ext.data.Store', {
            model: 'Atlas.letter.model.DocumentDetailModel'
        });
        docDetailStore.getProxy().setExtraParam('pcPlanID', '');
        docDetailStore.getProxy().setExtraParam('pcDocumentID', docID);
        docDetailStore.load({
            callback: function (record, operation, success) {
                try {
                    queryDBObj = Ext.decode(operation.getResponse().responseText);
                    if (queryDBObj.message[0].code != '0') {
                        var win = Ext.WindowManager.getActive();
                        if (win)
                            win.close();
                        Ext.Msg.alert("Message", "PDF Document is being generated. Please try later.");
                    }
                    else {
                        me.submitjob(faxParameters, faxTypes);
                    }
                }
                catch (err) {
                    Ext.Msg.alert('ERROR', err);
                }
            }
        });

    },
    submitjob: function (faxParameters, faxTypes) {
        for (var index in faxTypes) {
            if (faxTypes[index].sendFax) {
                faxParameters.pDescription=faxTypes[index].faxDesc;
                faxParameters.pFaxNumber=faxTypes[index].faxNum;
                var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
                var returnField = ['pJobNumber'];
                var submitJobReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], faxParameters,
                    saveAction, returnField);
                if (submitJobReturn.code == 0) {
                    var win = Ext.WindowManager.getActive();
                    if (win)
                        win.close();
                    Ext.Msg.alert("Message", "Please check your fax status in Job Queue.");
                }
            }
        }
    },
    utilitySubmitJob: function (pParameters) {
        var me = this,
            myVM = me.getViewModel(),
            returnValue,
            validationMessage,
            endPoint = 'document/rx/documentdetails/read';

        returnValue = Atlas.common.utility.Utilities.post(endPoint, pParameters, ['pJobNumber']);
        if (returnValue.code == '0') {
            var newJobNumber = returnValue.pJobNumber;
            var returnMsgStatus = 'Status: ' + returnValue.message;
            var returnMsgText = 'Job number is: ' + '<span style="font-weight: bold;">' + newJobNumber + '</span>';
            Ext.Msg.alert(returnMsgStatus, returnMsgText);
        }
        else {
            Ext.Msg.alert('ERROR', returnValue.message.replace('Message:', '') + ' (' + returnValue.code + ')');
            me.onClickCancel(); // Reset all fields
        }
    },

    closeThisView: function () {
        this.getView().close();
    },

    displayScreenInfo: function () {
        Ext.Msg.alert('Version Info', 'Last updated: 01/26/2017' + '<br/>' + 'Author: Dean C. Reed');
    },

    displayScreenErrors: function () {
        var me = this,
            myVM = me.getViewModel();

        Ext.Msg.alert(myVM.get('errorStatus'));
    },

    setTestViewVariables: function () {
        var me = this;

        me.getView().LetterID = 'NEW';
        me.getView().LetterType = 'MTM Followup';
        me.getView().keyValue = '505401';
        me.getView().MTMRID = '19921571';
        me.getView().mtmID = '505401';
        me.getView().mtmCaseMgr = '';
        me.getView().mtmPlanGroupID = '7301';
        me.getView().openView = true;
    },

    setTestViewCaseMgr: function () {
        var me = this;

        me.getView().LetterID = 'NEW';
        me.getView().LetterType = 'MTM Physician Intervention';
        me.getView().LetterName = 'MTM Physician Intervention';
        me.getView().keyValue = '507801';
        me.getView().MTMRID = '109500';
        me.getView().mtmID = '507801';
        me.getView().mtmCaseMgr = 'aclark';
        me.getView().mtmPlanGroupID = '580';
        me.getView().openView = true;

        /*menuId: 153,
         atlasId:1,
         openView:true,
         ID : 153,
         LetterID:'NEW',
         LetterType : 'MTM Physician Intervention'*/

    },

    setTestViewVariablesMember: function () {
        var me = this;

        me.getView().LetterID = 1232441;
        me.getView().LetterType = '';
        me.getView().LetterName = ' General Cover Letter';
        me.getView().keyValue = '';
        me.getView().MTMRID = '';
        me.getView().mtmID = '';
        me.getView().mtmCaseMgr = '';
        me.getView().mtmPlanGroupID = '';
        me.getView().openView = true;
    },

    onPharmacySelect: function (control, record, event) {
        var me = this,
            myView = me.getView();
        myView.down('#Freetext3').setValue(record.get('Name') + ', ' + record.get('Address1') + record.get('Address2') + ', ' + record.get('locCity') + ', ' + record.get('locState') + ' ' + record.get('locZip'));
        myView.down('#Freetext4').setValue(record.get('ncpdpId'));
    },

    cbxExclusionChange: function (control, record) {
        var me = this,
            vm = me.getViewModel(),
            view = me.getView();
        if (record == 'prescribed') {
            view.down('#Freetext3').setValue(vm.data.vmPrescriberName);
        }
        else if (record == 'dispensed') {
            if (vm.data.pharmacyinfodata.data.items[0] != null && vm.data.pharmacyinfodata.data.items[0].get('name') != undefined) {
                view.down('#Freetext3').setValue(vm.data.pharmacyinfodata.data.items[0].get('name'));
            }
        }

    },

    freetext_blur: function (control, newValue, oldValue) {
        if (control.lastMutatedValue == control.value) {
            Ext.defer(function () {
                control.setRawValue(control.value);
            }, 100);
        }
    },
    getUCFClaimInfo: function (sucfClaimId) {
        var me = this,
            myVM = me.getViewModel(),
            ucfclaim = myVM.getStore('ucfclaim');
        ucfclaim.getProxy().setExtraParam('ptransactionID', sucfClaimId);
        ucfclaim.on({
            load: function (store, records, operation, success) {
                // Populate West Region Details
                if (records[0]) {
                    if (records[0].data.claimRefNum !== '' && records[0].data.claimRefNum > 0) {
                        me.getClaimInfo('', records[0].get('claimRefNum'), true);
                    }
                    else {

                    }

                }
            },
            scope: me,
            single: true
        });
        ucfclaim.load(
            {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    if (record.length == 0) {
                        myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', true);
                        var obj = operation.getResponse().responseText;
                        // obj = obj.replace('\n"', '"');
                        var obj1 = Ext.decode(obj);
                        var obj2 = obj1.message[0].message;
                        //if(me.getView().down('#uiLetterID').getValue()=='' || me.getView().down('#uiLetterID').getValue()=='0' )
                            Ext.Msg.alert('PBM', obj2 +' ('+obj1.message[0].code+')');
                       // else
                         //   Ext.Msg.alert('PBM', obj2 + ' for Letter  ID ' + me.getView().down('#uiLetterID').getValue());


                    }
                    else {
                        if (myVM.get('vmIsLetterApproved') == false) {
                            myVM.set('vmUIActivation.bottomToolbar.buttons.btnSave.isDisabled', false);
                        }
                    }
                }
            });
    },
    onBlurPaidClaimID: function (field, e, eOpts) {
        var me = this,
            myVM = me.getViewModel();
        // 13= ENTER, 9= TAB
        if (e.keyCode === 13 || e.keyCode == 9) {
            me.resetWestRegion();
            me.getUCFClaimInfo(myVM.get('vmUCFClaimID'));
        }
    },
    onBlurPaidClaimID_Blur: function (field) {
        var me = this,
            myVM = me.getViewModel();
        if (field.value != '') {
            me.resetWestRegion();
            me.getUCFClaimInfo(myVM.get('vmUCFClaimID'));
        }
    }

    /*validateSave: function() {
     /!*var ValidateSave = function () {

     if (cbxLetterType.getValue() == '') {
     Ext.Msg.alert('Validation Error', 'Please Select Letter Type.');
     return false;
     }

     var MemStatus = window.parent.Ext.getCmp('lblEnrollmentStatus').getText();
     if (MemStatus == 'Inactive' || MemStatus == 'InActive' || MemStatus == 'INACTIVE') {
     Ext.Msg.alert('Validation Error', 'Letter could not be generated for an Inactive Member.');
     return false;
     }
     if (cbxLetterType.getText() == 'MTM Followup' || cbxLetterType.getText() == "MAP Non Compliance Letter" || cbxLetterType.getText() == "MTM Physician Intervention" || cbxLetterType.getText().indexOf('Acumen') > -1) {
     if (txtMTMID.getValue() == '' || txtMTMID.getValue() == '0') {
     Ext.Msg.alert('Validation Error', 'Please enter MTM Case ID.');
     return false;
     }
     }

     if (cbxLetterType.getText() == 'General Cover Letter' || cbxLetterType.getText() == 'Rx Transfer' || cbxLetterType.getText() == "Notice of Formulary Change") {
     if (cbxMember.getValue() == '') {
     Ext.Msg.alert('Validation Error', 'Please Select Member.');
     return false;
     }
     else if (cbxPlanGroupsUC.getValue() == '') {
     Ext.Msg.alert('Validation Error', 'Please Select a Plan Group.');
     return false;
     }
     }
     else if (cbxLetterType.getText() == 'Claim Intervention' || cbxLetterType.getText() == "Excluded Provider") {
     if (txtClaimID.getValue() == '') {
     Ext.Msg.alert('Validation Error', 'Please Enter Claim Id.');
     return false;
     }
     }

     if (cbxLetterType.getText() == 'UCF Paid Letter' || cbxLetterType.getText() == 'UCF Rejected Letter') {
     var claimidVal = window.parent.Ext.getCmp('lblClaimID').getText();
     if (txtUCFClaimID.getValue() == '' || claimidVal == '') {
     Ext.Msg.alert('Validation Error', 'Please Enter valid Claim Id.');
     return false;
     }
     }
     if (cbxLetterType.getText() == "MAP Non Compliance Letter") {

     if (cbxPrescriber.getValue() == '') {
     Ext.Msg.alert('Validation Error', 'Please Select Prescriber.');
     return false;
     }
     if (window.parent.Ext.getCmp('lblRID').getText() == '') {
     Ext.Msg.alert('Validation Error', 'Please enter valid MTM CaseID for Member Details.');
     return false;
     }

     }

     }
     SetControls()
     btnSaveNotes
     cbxCaseManager
     *!/
     }*/
});