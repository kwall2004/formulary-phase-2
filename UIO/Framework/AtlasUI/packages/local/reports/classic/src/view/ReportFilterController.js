/* ------------------- NOTES -----------------------------------------
 ComboBox lists description
 DynamicFormulary
 01071 Part D Excluded Drugs
 01461 Drug Pricing Information By File (RFP)
 01551 Formulary PDF Report in Excel
 01821 Formulary Comparison Report
 01821 Formulary Comparison Report
 02391 Formulary Analysis Report
 02951 Formulary Effectuation Comparison Report

 DynamicPlanProgramCode
 01161 Rebate Utilization Report
 01621 Monthly Psychotropics Report
 01611 Monthly Pharmacy Monitoring
 01801 Market Share Report New Version
 00271 Claims Detail Analysis

 DynamicCMSContract
 00891 PDE Report - Creates an Excel File
 00931 MTM OptOut Report
 00941 MTM CMR Offer Report
 00951 MTM Service Delivery Report
 00991 MTM Enrollee Detail Report
 01171 Medicare Part-D LTC Utilization
 00981 MTM Pharmacy Claims Report
 01001 MTM Performance Report
 00971 MTM Member Months Report
 00961 MTM LTC Enrollment Report
 00671 Medicare Part-D Access to Extended Days Supply at Retail Pha
 00691 Medicare Part-D Coverage Determinations and Exceptions
 00441 Medicare Part-D Pharmacy Support of ePrescribing
 00711 Medicare PartD Rebate Report
 00701 Medicare Part-D Retail,HI,LTC Member Access
 00491 Prompt Payment by Part D Sponsors
 01751 PA Performance Report
 02481 FIR Transaction Report
 02621 CDAG Audit Universe Report
 02661 Formulary Administration Audit Universe Report
 02941 Medicare Part B Drug Spend

 NonPharmaCMSContract
 00901 PDE Export - Creates Flat File For Export To CMS
 01701 Export Plan Finder

 PharmaCMSContract
 02761 Export Plan Finder Pharmastar
 02731 PDE Export - Pharmastar Flat File for Export To CMS
 02851 PDE Export - Pharmastar All Contract Flat File for Export to CMS

 DynamicCMSPBP
 00931 MTM OptOut Report
 00941 MTM CMR Offer Report
 00951 MTM Service Delivery Report
 00991 MTM Enrollee Detail Report
 01171 Medicare Part-D LTC Utilization
 00981 MTM Pharmacy Claims Report
 01001 MTM Performance Report
 00971 MTM Member Months Report
 00961 MTM LTC Enrollment Report
 00671 Medicare Part-D Access to Extended Days Supply at Retail Pharma
 00691 Medicare Part-D Coverage Determinations and Exceptions
 00441 Medicare Part-D Pharmacy Support of ePrescribing
 00711 Medicare PartD Rebate Report
 00701 Medicare Part-D Retail,HI,LTC Member Access
 00491 Prompt Payment by Part D Sponsors
 01751 PA Performance Report
 -------------------------------------------------------------------- */
Ext.define('Atlas.reports.controller.ReportFilterController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.reportfiltercontroller',
    config: {
        refs: {
            filterForm: '#filterForm'
        }
    },

    onReportListRecClick: function () {
        /* -------------------------------------
         Report filters from pbm.reportFilter
         |ComboBox                      |
         |DateField                     |
         |DateRange                     |
         |FileUploadField               |
         |MultiComboBox                 |
         |NumberField                   |
         |TextField
         ---------------------------------------- */
        var me = this,
            dateIds = '',
            vm = me.getViewModel(),
            parentVM = this.getViewModel().getParent(),
            myView = me.getView(),
            vmRecord = vm.get('record'),
            reportfilterstore = me.getStore('reportfilterdata'),
            form = me.getView().down('form'),
            currentCBList = '',
            testPattern = '',
            isFormulary = false,
            currDate = Atlas.common.utility.Utilities.getLocalDateTime() ,
            filterArray = [],
            dateValueDisplay = currDate,
            allowBlankFieldValue = true,
            elementEmptyText,
            comboBoxDisplayField = 'ListDescription',
            comboBoxValueField = 'ListItem',
            dateIds = "",
            strDesc = "",
            strDRDesc = "",
            strFrom = "",
            strTo = "",
            windowObj = me.getView(), // Use handle to window object to add items to the panel layout
            itemsTopLevelHandle = windowObj.down('#filterFormItems');

        parentVM.set('uploadedDocId', []);
        parentVM.set('hasFileUploader', false);
        parentVM.set('dateRangeCounter', 0);
        parentVM.set('orderFileUploader', []);

        reportfilterstore.getProxy().setExtraParam('pReportID', vmRecord.data.reportID);
        reportfilterstore.load();

        reportfilterstore.on('load', function (records, operations, success) {
            // Create hidden fields for common parameters
            filterArray.push({
                xtype: 'hiddenfield',
                name: 'rptParmProgramName',
                id: 'rptParmProgramName',
                value: vmRecord.data.programName,
                itemId: 'rptParmProgramName'
            });
            filterArray.push({
                xtype: 'hiddenfield',
                name: 'rptParmRunMode',
                id: 'rptParmRunMode',
                value: vmRecord.data.runMode,
                itemId: 'rptParmRunMode'
            });
            filterArray.push({
                xtype: 'hiddenfield',
                name: 'rptParmProgramType',
                id: 'rptParmProgramType',
                value: vmRecord.data.ReportObject,
                itemId: 'rptParmProgramType'
            });
            filterArray.push({
                fieldLabel: 'Report Name',
                xtype: 'textfield',
                name: 'rptParmReportName',
                allowBlank: false,
                id: 'rptParmReportName',
                value: vmRecord.data.reportName,
                itemId: 'rptParmReportName'
            });

            if (records.getCount() > 0) {
                records.each(function (record, id) {
                    myView.setHidden(false);

                    // Set common parameters
                    var filterFieldName = 'filterParm' + record.data.ParameterOrder,
                        filterFieldId = filterFieldName;

                    // AllowBlank of true = isRequired of false
                    allowBlankFieldValue = (record.data.isFilterReqd === 'true' ? false : true);

                    // Remove certain text from labelName to shorten length
                    elementEmptyText = record.data.LabelName;
                    record.data.LabelName = record.data.LabelName.replace('(comma separated)', '');

                    if (record.data.ControLType == 'DateField' || record.data.ControlType == 'DateRange') {
                        if (record.data.Description != '')
                            dateValueDisplay = Ext.Date.format(record.data.Description, 'm/d/Y');
                        else
                            dateValueDisplay = Ext.Date.format(currDate, 'm/d/Y');
                    }

                    switch (record.data.ControlType) {
                        case 'TextField':
                            filterArray.push({
                                fieldLabel: record.data.LabelName,
                                xtype: 'textfield',
                                name: filterFieldName,
                                value: record.data.Description,
                                emptyText: (elementEmptyText.indexOf('FF File') > -1) ? '' : '[Select ' + elementEmptyText + ']',
                                allowBlank: allowBlankFieldValue,
                                msgTarget: 'under',
                                invalidText: 'Value must not be blank',
                                placeHolder: 'Enter text here ...',
                                itemId: filterFieldId,
                                maskRe: /[A-Za-z0-9 ,]/
                            });
                            break;
                        case 'NumberField':
                            if (record.data.LabelName == 'Remit Batch' && (myView.getViewModel().get('record').data.remitBatchNum != undefined && myView.getViewModel().get('record').data.remitBatchNum != null)) {
                                filterArray.push({
                                    fieldLabel: record.data.LabelName,
                                    xtype: 'numberfield',
                                    name: filterFieldName,
                                    value: myView.getViewModel().get('record').data.remitBatchNum,
                                    emptyText: '[Select ' + elementEmptyText + ']',
                                    allowBlank: allowBlankFieldValue,
                                    msgTarget: 'under',
                                    invalidText: 'Value must be a number',
                                    placeHolder: 'Enter number value ...',
                                    itemId: filterFieldId,
                                    maskRe: /[0-9]/
                                });
                            }
                            else if (record.data.LabelName == 'Ledger Sequence' && (myView.getViewModel().get('record').data.ledgerSeqNum != undefined && myView.getViewModel().get('record').data.ledgerSeqNum != null)) {
                                filterArray.push({
                                    fieldLabel: record.data.LabelName,
                                    xtype: 'numberfield',
                                    name: filterFieldName,
                                    value: myView.getViewModel().get('record').data.ledgerSeqNum,
                                    emptyText: '[Select ' + elementEmptyText + ']',
                                    allowBlank: allowBlankFieldValue,
                                    msgTarget: 'under',
                                    invalidText: 'Value must be a number',
                                    placeHolder: 'Enter number value ...',
                                    itemId: filterFieldId,
                                    maskRe: /[0-9]/
                                });
                            }
                            else {
                                filterArray.push({
                                    fieldLabel: record.data.LabelName,
                                    xtype: 'numberfield',
                                    name: filterFieldName,
                                    value: record.data.Description,
                                    emptyText: '[Select ' + elementEmptyText + ']',
                                    allowBlank: allowBlankFieldValue,
                                    msgTarget: 'under',
                                    invalidText: 'Value must be a number',
                                    placeHolder: 'Enter number value ...',
                                    itemId: filterFieldId,
                                    maskRe: /[0-9]/
                                });
                            }

                            break;
                        case 'DateRange':
                            parentVM.set('dateRangeCounter', (parentVM.get('dateRangeCounter') + 1));
                            if (record.data.Description.indexOf("=") != -1)// "=" is a function
                            {
                                if (record.data.Description.indexOf(",") != -1) {
                                    //from default value

                                    strDRDesc = record.data.Description.substring(0, record.data.Description.indexOf(","));
                                    if (strDRDesc.indexOf("-") != -1) // today - no of days
                                    {
                                        var currentDate = Atlas.common.utility.Utilities.getLocalDateTime() ;
                                        currentDate.setDate(currentDate.getDate() - strDRDesc.split('-')[1]);
                                        strFrom = currentDate;
                                    }
                                    else if (strDRDesc.indexOf("+") != -1) // today + no of days
                                    {
                                        var currentDate = Atlas.common.utility.Utilities.getLocalDateTime() ;
                                        currentDate.setDate(currentDate.getDate() + strDRDesc.split('+')[1]);
                                        strFrom = currentDate;
                                    }
                                    else {
                                        strFrom = Atlas.common.utility.Utilities.getLocalDateTime() ;
                                    }
                                    //To default value
                                    strDRDesc = record.data.Description.substring(record.data.Description.indexOf(",") + 1);
                                    if (strDRDesc.indexOf("-") != -1) // today - no of days
                                    {
                                        var currentDate = Atlas.common.utility.Utilities.getLocalDateTime() ;
                                        currentDate.setDate(currentDate.getDate() - strDRDesc.split('-')[1]);
                                        strTo = currentDate;

                                    }
                                    else if (strDRDesc.indexOf("+") != -1) // today + no of days
                                    {
                                        var currentDate = Atlas.common.utility.Utilities.getLocalDateTime() ;
                                        currentDate.setDate(currentDate.getDate() + strDRDesc.split('+')[1]);
                                        strTo = currentDate;
                                    }
                                    else {
                                        strTo = Atlas.common.utility.Utilities.getLocalDateTime() ;
                                    }
                                }
                            }
                            else {
                                if (record.data.Description.indexOf(",") != -1) {
                                    //from default value
                                    strFrom = record.data.Description.substring(0, record.data.Description.indexOf(","));
                                    //To default value
                                    strTo = record.data.Description.substring(record.data.Description.indexOf(",") + 1);
                                }
                            }
                            filterArray.push({
                                    fieldLabel: record.data.LabelName != 'From' ? record.data.LabelName + ' From' : 'From',
                                    xtype: 'datefield',
                                    name: filterFieldName,
                                    value: strFrom,
                                    emptyText: '[Select Date From]',
                                    allowBlank: allowBlankFieldValue,
                                    //format: 'm/d/Y',
                                    format: 'm/d/Y',
                                    altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                                   // altFormats: 'm,d,Y|m,d,Y',
                                    msgTarget: 'under',
                                    invalidText: 'Value must be a valid date',
                                    // placeHolder: 'mm/dd/yyyy',
                                    itemId: filterFieldId,
                                    listeners: {
                                        select: 'setMinValue',
                                        focusleave: 'onLeaveDateRange'
                                    }
                                },
                                {
                                    fieldLabel: record.data.LabelName != 'From' ? record.data.LabelName + ' To' : 'To',
                                    xtype: 'datefield',
                                    name: filterFieldName + 'A',
                                    value: strTo,
                                    emptyText: '[Select Date To]',
                                    allowBlank: allowBlankFieldValue,
                                    format: 'm/d/Y',
                                   // altFormats: 'm,d,Y|m,d,Y',
                                    altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                                    msgTarget: 'under',
                                    invalidText: 'Value must be a valid date',
                                    placeHolder: 'mm/dd/yyyy',
                                    itemId: filterFieldId + 'A',
                                    listeners: {
                                        select: 'setMaxValue',
                                        focusleave: 'onLeaveDateRange'
                                    }
                                });
                            break;
                        case 'DateField':
                            if (dateIds == "") {
                                dateIds = record.data.ParameterOrder;
                            }
                            else {
                                dateIds = dateIds + "," + record.data.ParameterOrder;
                            }
                            if (record.data.Description.indexOf("=") != -1)// "=" is a function
                            {
                                if (record.data.Description.indexOf("-") != -1) // today - no of days
                                {
                                    var currentDate = Atlas.common.utility.Utilities.getLocalDateTime() ;
                                    currentDate.setDate(currentDate.getDate() - record.data.Description.split('-')[1]);
                                    strDesc = currentDate;

                                }
                                else if (record.data.Description.indexOf("+") != -1) // today + no of days
                                {
                                    var currentDate = Atlas.common.utility.Utilities.getLocalDateTime() ;
                                    currentDate.setDate(currentDate.getDate() + record.data.Description.split('+')[1]);
                                    strDesc = currentDate;
                                }
                                else {
                                    strDesc = Atlas.common.utility.Utilities.getLocalDateTime() ;
                                }
                            }
                            else {
                                strDesc = record.data.Description;
                            }
                            filterArray.push({
                                fieldLabel: record.data.LabelName,
                                xtype: 'datefield',
                                name: filterFieldName,
                                value: strDesc,
                                emptyText: '[Select ' + elementEmptyText + ']',
                                allowBlank: allowBlankFieldValue,
                                format: 'm/d/Y',
                                //altFormats: 'm,d,Y|m,d,Y',
                                altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                                msgTarget: 'under',
                                invalidText: 'Value must be a valid date',
                                placeHolder: 'mm/dd/yyyy',
                                itemId: filterFieldId,
                                listeners: {
                                    select: 'setDateValue',
                                    focusleave: 'onLeaveDateRange'
                                }
                            });
                            break;
                        case 'FileUploadField':
                            parentVM.set('hasFileUploader', true);
                            var fileUploderSetting = {},
                                arrFileUploader = parentVM.get('orderFileUploader');
                            fileUploderSetting.parametrOrder = record.data.ParameterOrder;
                            fileUploderSetting.isRequired = (!allowBlankFieldValue);
                            arrFileUploader.push(fileUploderSetting);
                            parentVM.set('orderFileUploader', arrFileUploader);

                            filterArray.push({
                                xtype: 'container',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                flex: 1,
                                items: [{
                                    xtype: 'textfield',
                                    fieldLabel: record.data.LabelName,
                                    labelWidth: 175,
                                    flex: 1,
                                    name: filterFieldName,
                                    //value: record.data.Description,
                                    emptyText: '[Select ' + elementEmptyText + ']',
                                    allowBlank: allowBlankFieldValue,
                                    msgTarget: 'under',
                                    invalidText: 'Value must not be blank',
                                    placeHolder: 'Enter text here ...',
                                    itemId: filterFieldId,
                                    readOnly: true
                                }, {
                                    xtype: 'button',
                                    text: '',
                                    iconCls: 'x-fa fa-paperclip',
                                    listeners: {
                                        click: function () {
                                            var view = this.up('reports-filterwindowitems'),
                                                winAddAttach = Ext.create('Ext.window.Window', {
                                                    title: 'Add Attachment',
                                                    floating: true,
                                                    layout: {type: 'fit', align: 'stretch'},
                                                    modal: true,
                                                    closable: true,
                                                    draggable: true,
                                                    resizable: true,
                                                    width: 500,
                                                    height: 300,
                                                    autoShow: false,
                                                    items: [
                                                        {
                                                            xtype: 'merlin.fileuploader',
                                                            keyType: 'imagePBMUpload',
                                                            fileType: record.data.Description.trim() == '' ? null : record.data.Description,
                                                            endpoint: 'shared/rx/document/update',
                                                            itemId: filterFieldId,
                                                            name: filterFieldName,
                                                            height: 200,
                                                            msgTarget: 'side',
                                                            emptyText: '[Select ' + elementEmptyText + ']',
                                                            buttonText: 'Select File',
                                                            flex: 1
                                                        }
                                                    ],
                                                    listeners: {
                                                        'beforeclose': 'onAttachmentWindowClose'
                                                    }
                                                });

                                            parentVM.set('fileUploaderDescriptionId', filterFieldId);
                                            view.add(winAddAttach);
                                            winAddAttach.show();
                                        }
                                    }
                                }]
                            });
                            break;
                        case 'ComboBox':
                        case 'MultiComboBox':
                            currentCBList = '';
                            testPattern = '';
                            isFormulary = false;
                            switch (record.data.Description) {
                                // Taken from ReportList.aspx.cs
                                case 'DynamicFormulary': // Formulary Comparison Report - Display needs to be table format
                                    var DynamicFormularyStore = Ext.create('Ext.data.Store', {
                                        model: 'Atlas.reports.model.DynamicFormularyModel',
                                        pageSize: 10,
                                        remoteSort: true,
                                        remoteFilter: true
                                    });
                                    comboBoxDisplayField = 'FormularyName';
                                    comboBoxValueField = 'systemID';
                                    //DynamicFormularyStore.filterBy(function (record) {
                                    //    if (record.get('FormularyName') != '') {
                                    //        testPattern = record.get('FormularyName');
                                    //        if (currentCBList.split(',').indexOf(testPattern) == -1) {
                                    //            currentCBList += ',' + testPattern;
                                    //            return true;
                                    //        }
                                    //        else return false;
                                    //    }
                                    //    else
                                    //        return false;
                                    //});
                                    //DynamicFormularyStore.sort('FormularyName', 'ASC');
                                    DynamicFormularyStore.load();
                                    filterArray.push({
                                        fieldLabel: record.data.LabelName,
                                        xtype: 'combobox',
                                        name: filterFieldName,
                                        itemId: filterFieldName,
                                        emptyText: '[Select ' + elementEmptyText + ']',
                                        allowBlank: allowBlankFieldValue,
                                        maskRe: /[A-Za-z0-9]/,
                                        //bind: {
                                        //    store: '{comboboxlistsdata}'
                                        //},
                                        viewModel: 'reportfilterviewmodel',
                                        store: DynamicFormularyStore,
                                        displayField: comboBoxDisplayField,
                                        valueField: comboBoxValueField,
                                        forceSelection: true,
                                        pageSize: 10,
                                        reference: 'rptfilterformularycombo',
                                        tpl: Ext.create('Ext.XTemplate',
                                            '</Html>'
                                            + '<tpl for=".">'
                                            + '<tpl if="xindex == 1">'
                                            + '<table class="comboGrid">'
                                            + '<tr>'
                                            + '<th>Formulary Name/Version</th>'
                                            + '<th>Status</th>'
                                            + '<th>Eff. Date</th>'
                                            + '<th>Term. Date</th>'
                                            + '<th>Data Src.</th>'
                                            + '<th>Type</th>'
                                            + '</tr>'
                                            + '</tpl>'
                                            + '<tr class="x-boundlist-item black" style="color:black">'
                                            + '<td>{FormularyName} &nbsp;(Ver:{FormularyVersion})</td>'
                                            + '<td>{StatDesc}</td>'
                                            + '<td>{EffectiveDate}</td>'
                                            + '<td>{TerminationDate}</td>'
                                            + '<td>{dataSource}</td>'
                                            + '<td>{formularyType}</td>'
                                            + '</tr>'
                                            + '<tpl if="xindex==0">'
                                            + '</table>'
                                            + '</tpl>'
                                            + '</tpl>'
                                            + '</Html>')
                                    });
                                    break;
                                case 'DynamicPlanCarriers': // 01841 Plan Setup Details Report
                                    var DynamicPlanCarriersStore = Ext.create('Ext.data.Store', {
                                        model: 'Atlas.reports.model.DynamicPlanCarriersModel'
                                    });
                                    comboBoxDisplayField = 'carrierName';
                                    comboBoxValueField = 'carrierId';
                                    DynamicPlanCarriersStore.load();
                                    filterArray.push({
                                        fieldLabel: record.data.LabelName,
                                        xtype: 'combobox',
                                        name: filterFieldName,
                                        viewModel: 'reportfilterviewmodel',
                                        queryMode: 'local',
                                        emptyText: '[Select ' + elementEmptyText + ']',
                                        allowBlank: allowBlankFieldValue,
                                        maskRe: /[A-Za-z0-9]/,
                                        store: DynamicPlanCarriersStore,
                                        displayField: comboBoxDisplayField,
                                        valueField: comboBoxValueField
                                    });
                                    break;
                                case 'DynamicPlanProgramCode': // See notes at top of page
                                    var DynamicPlanProgramCodeStore = Ext.create('Ext.data.Store', {
                                        model: 'Atlas.reports.model.DynamicPlanProgramCodeModel'
                                    });
                                    DynamicPlanProgramCodeStore.getProxy().setExtraParam('pPlanGroupId', '');
                                    DynamicPlanProgramCodeStore.getProxy().setExtraParam('pPlanBenefitId', '');
                                    DynamicPlanProgramCodeStore.getProxy().setExtraParam('pCarrierID', '');
                                    DynamicPlanProgramCodeStore.getProxy().setExtraParam('pCarrierAccountNumber', '');
                                    DynamicPlanProgramCodeStore.getProxy().setExtraParam('pLobID', '');
                                    comboBoxDisplayField = 'progDescription';
                                    comboBoxValueField = 'systemID';
                                    DynamicPlanProgramCodeStore.filterBy(function (record) {
                                        if (record.get('progDescription') != '') {
                                            testPattern = record.get('progDescription');
                                            if (currentCBList.split(',').indexOf(testPattern) == -1) {
                                                currentCBList += ',' + testPattern;
                                                return true;
                                            }
                                            else return false;
                                        }
                                        else
                                            return false;
                                    });
                                    DynamicPlanProgramCodeStore.load();
                                    filterArray.push({
                                        fieldLabel: record.data.LabelName,
                                        xtype: 'combobox',
                                        name: filterFieldName,
                                        viewModel: 'reportfilterviewmodel',
                                        queryMode: 'local',
                                        emptyText: '[Select ' + elementEmptyText + ']',
                                        allowBlank: allowBlankFieldValue,
                                        maskRe: /[A-Za-z0-9]/,
                                        store: DynamicPlanProgramCodeStore,
                                        displayField: comboBoxDisplayField,
                                        valueField: comboBoxValueField
                                    });
                                    break;
                                case 'DynamicCMSContract':
                                    var DynamicCMSContractStore = Ext.create('Ext.data.Store', {
                                        model: 'Atlas.reports.model.DynamicCMSMultiModel',
                                        listeners: {
                                            load: function (store) {
                                                store.insert(0, {CMSCntrId: 'All'});
                                            }
                                        }
                                    });
                                    comboBoxDisplayField = 'CMSCntrId';
                                    comboBoxValueField = 'CMSCntrId';
                                    DynamicCMSContractStore.filterBy(function (record) {
                                        if (record.get('CMSCntrId')) {
                                            testPattern = record.get('CMSCntrId');
                                            if (currentCBList.split(',').indexOf(testPattern) == -1) {
                                                currentCBList += ',' + testPattern;
                                                return true;
                                            }
                                            else {
                                                return false;
                                            }
                                        }
                                        else {
                                            return false;
                                        }
                                    });
                                    DynamicCMSContractStore.load();
                                    filterArray.push({
                                        fieldLabel: record.data.LabelName,
                                        xtype: 'combobox',
                                        name: filterFieldName,
                                        viewModel: 'reportfilterviewmodel',
                                        queryMode: 'local',
                                        emptyText: '[Select ' + elementEmptyText + ']',
                                        allowBlank: allowBlankFieldValue,
                                        maskRe: /[A-Za-z0-9]/,
                                        store: DynamicCMSContractStore,
                                        displayField: comboBoxDisplayField,
                                        valueField: comboBoxValueField
                                    });
                                    break;
                                case 'PharmaCMSContract':// See notes at top of page
                                    var DynamicPharmaCMSContractStore = Ext.create('Ext.data.Store', {
                                        model: 'Atlas.reports.model.DynamicCMSMultiModel',
                                        listeners: {
                                            load: function (store) {
                                                store.insert(0, {CMSCntrId: 'All'});
                                            }
                                        }
                                    });
                                    comboBoxDisplayField = 'CMSCntrId';
                                    comboBoxValueField = 'CMSCntrId';
                                    DynamicPharmaCMSContractStore.filterBy(function (record) {
                                        if (record.get('CMSCntrId') == 'All' || (record.get('CMSCntrId') && record.get('carrierId') == '75')) {
                                            testPattern = record.get('CMSCntrId');
                                            if (currentCBList.split(',').indexOf(testPattern) == -1) {
                                                currentCBList += ',' + testPattern;
                                                return true;
                                            }
                                            else {
                                                return false;
                                            }
                                        }
                                        else {
                                            return false;
                                        }
                                    });
                                    DynamicPharmaCMSContractStore.load();
                                    filterArray.push({
                                        fieldLabel: record.data.LabelName,
                                        xtype: 'combobox',
                                        name: filterFieldName,
                                        viewModel: 'reportfilterviewmodel',
                                        queryMode: 'local',
                                        emptyText: '[Select ' + elementEmptyText + ']',
                                        allowBlank: allowBlankFieldValue,
                                        maskRe: /[A-Za-z0-9]/,
                                        store: DynamicPharmaCMSContractStore,
                                        displayField: comboBoxDisplayField,
                                        valueField: comboBoxValueField
                                    });
                                    break;
                                case 'NonPharmaCMSContract':
                                    var DynamicNonPharmaCMSContractStore = Ext.create('Ext.data.Store', {
                                        model: 'Atlas.reports.model.DynamicCMSMultiModel',
                                        listeners: {
                                            load: function (store) {
                                                store.insert(0, {CMSCntrId: 'All'});
                                            }
                                        }
                                    });
                                    comboBoxDisplayField = 'CMSCntrId';
                                    comboBoxValueField = 'CMSCntrId';
                                    DynamicNonPharmaCMSContractStore.filterBy(function (record) {
                                        if (record.get('CMSCntrId') && record.get('carrierId') != '75') {
                                            testPattern = record.get('CMSCntrId');
                                            if (currentCBList.split(',').indexOf(testPattern) == -1) {
                                                currentCBList += ',' + testPattern;
                                                return true;
                                            }
                                            else {
                                                return false;
                                            }
                                        }
                                        else {
                                            return false;
                                        }
                                    });
                                    DynamicNonPharmaCMSContractStore.load();
                                    filterArray.push({
                                        fieldLabel: record.data.LabelName,
                                        xtype: 'combobox',
                                        name: filterFieldName,
                                        viewModel: 'reportfilterviewmodel',
                                        queryMode: 'local',
                                        emptyText: '[Select ' + elementEmptyText + ']',
                                        allowBlank: allowBlankFieldValue,
                                        maskRe: /[A-Za-z0-9]/,
                                        store: DynamicNonPharmaCMSContractStore,
                                        displayField: comboBoxDisplayField,
                                        valueField: comboBoxValueField
                                    });
                                    break;
                                case 'DynamicCMSPBP': // See notes at top of page
                                    var DynamicCMSPBPStore = Ext.create('Ext.data.Store', {
                                        model: 'Atlas.reports.model.DynamicCMSPBPModel',
                                        listeners: {
                                            load: function (store) {
                                                store.insert(0, {cmsPBPid: 'All'});
                                            }
                                        }
                                    });
                                    comboBoxDisplayField = 'cmsPBPid';
                                    comboBoxValueField = 'cmsPBPid';
                                    DynamicCMSPBPStore.filterBy(function (record) {
                                        if (record.get('cmsPBPid') != '') {
                                            testPattern = record.get('cmsPBPid');
                                            if (record.get('CMSCntrId') == 'All') {
                                                return true;
                                            }
                                            else if (currentCBList.split(',').indexOf(testPattern) == -1) {
                                                currentCBList += ',' + testPattern;
                                                return true;
                                            }
                                            else {
                                                return false;
                                            }
                                        }
                                        else
                                            return false;
                                    });
                                    DynamicCMSPBPStore.load();
                                    filterArray.push({
                                        fieldLabel: record.data.LabelName,
                                        xtype: 'combobox',
                                        name: filterFieldName,
                                        viewModel: 'reportfilterviewmodel',
                                        queryMode: 'local',
                                        emptyText: '[Select ' + elementEmptyText + ']',
                                        allowBlank: allowBlankFieldValue,
                                        maskRe: /[A-Za-z0-9]/,
                                        store: DynamicCMSPBPStore,
                                        displayField: comboBoxDisplayField,
                                        valueField: comboBoxValueField
                                    });
                                    break;
                                case 'DynamicUserList': // Contact Code Report
                                    var DynamicUserListStore = Ext.create('Ext.data.Store', {
                                        model: 'Atlas.reports.model.DynamicUserListModel'
                                    });
                                    DynamicUserListStore.getProxy().setExtraParam('pShowActive', 'yes');
                                    comboBoxDisplayField = 'userName';
                                    comboBoxValueField = 'userName';
                                    DynamicUserListStore.load();
                                    filterArray.push({
                                        fieldLabel: record.data.LabelName,
                                        xtype: 'combobox',
                                        name: filterFieldName,
                                        viewModel: 'reportfilterviewmodel',
                                        queryMode: 'local',
                                        emptyText: '[Select ' + elementEmptyText + ']',
                                        allowBlank: allowBlankFieldValue,
                                        maskRe: /[A-Za-z0-9]/,
                                        store: DynamicUserListStore,
                                        displayField: comboBoxDisplayField,
                                        valueField: comboBoxValueField
                                    });
                                    break;
                                case 'DynamicUserGroupList': // Multi-select Combobox
                                    var DynamicUserGroupList = Ext.create('Ext.data.Store', {
                                        model: 'Atlas.reports.model.DynamicUserGroupListModel'
                                    });
                                    DynamicUserGroupList.load();
                                    filterArray.push({
                                        fieldLabel: record.data.LabelName,
                                        xtype: 'tagfield',
                                        name: filterFieldName,
                                        viewModel: 'reportfilterviewmodel',
                                        queryMode: 'local',
                                        emptyText: '[Select ' + elementEmptyText + ']',
                                        allowBlank: allowBlankFieldValue,
                                        maskRe: /[A-Za-z0-9]/,
                                        store: DynamicUserGroupList,
                                        displayField: 'groupName',
                                        valueField: 'groupId'
                                    });
                                    break;
                                default:
                                    itemsTopLevelHandle.add(filterArray);
                                    filterArray = [];

                                    var randomNumber = me.createRandomCustom(),
                                        dynModelName = 'Atlas.reports.model.ReportsListItemsModel' + randomNumber,
                                        dynModelAlias = 'reportslistitemsmdl' + randomNumber;

                                    // Define model to keep lists separate - Ideally destroy if exists rather than random()
                                    myView.dynModelNames = [];
                                    myView.dynModelNames.push(dynModelName);
                                    myView.dynModelNames[dynModelName] =
                                        Ext.define(dynModelName, {
                                            extend: 'Atlas.reports.model.ReportsListItemsModel',
                                            alias: dynModelAlias
                                        });

                                    // Create multi-select CB
                                    if (record.data.ControlType == 'MultiComboBox') {
                                        var DefaultCBStoreMulti = Ext.create('Ext.data.Store', {
                                            model: myView.dynModelNames[dynModelName]
                                        });
                                        DefaultCBStoreMulti.getProxy().setExtraParam('pListName', record.data.Description);
                                        comboBoxDisplayField = 'ListDescription';
                                        comboBoxValueField = 'ListItem';
                                        DefaultCBStoreMulti.filterBy(function (record) {
                                            if (record.get('Active')) {
                                                return true;
                                            }
                                            else {
                                                return false;
                                            }
                                        });
                                        DefaultCBStoreMulti.load();
                                        itemsTopLevelHandle.add({
                                            fieldLabel: record.data.LabelName,
                                            xtype: 'combobox',
                                            name: filterFieldName,
                                            viewModel: 'reportfilterviewmodel',
                                            queryMode: 'local',
                                            emptyText: '[Select ' + elementEmptyText + ']',
                                            allowBlank: allowBlankFieldValue,
                                            maskRe: /[A-Za-z0-9]/,
                                            store: DefaultCBStoreMulti,
                                            displayField: comboBoxDisplayField,
                                            valueField: comboBoxValueField,
                                            multiSelect: true,
                                            editable: true,
                                            triggerAction: 'all',
                                            listConfig: {
                                                getInnerTpl: function () {
                                                    return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {ListDescription} </div>';
                                                }
                                            }
                                        });
                                    }
                                    else {
                                        var DefaultCBStore = Ext.create('Ext.data.Store', {
                                            model: myView.dynModelNames[dynModelName]
                                        });
                                        DefaultCBStore.getProxy().setExtraParam('pListName', record.data.Description);
                                        comboBoxDisplayField = 'ListDescription';
                                        comboBoxValueField = 'ListItem';
                                        DefaultCBStore.sort('ListDescription', 'ASC');
                                        DefaultCBStore.filterBy(function (record) {
                                            if (record.get('Active')) {
                                                return true;
                                            }
                                            else {
                                                return false;
                                            }
                                        });
                                        DefaultCBStore.load();
                                        itemsTopLevelHandle.add({
                                            fieldLabel: record.data.LabelName,
                                            xtype: 'combobox',
                                            name: filterFieldName,
                                            viewModel: 'reportfilterviewmodel',
                                            queryMode: 'local',
                                            emptyText: '[Select ' + elementEmptyText + ']',
                                            allowBlank: allowBlankFieldValue,
                                            maskRe: /[A-Za-z0-9]/,
                                            store: DefaultCBStore,
                                            displayField: comboBoxDisplayField,
                                            valueField: comboBoxValueField
                                        });
                                    }
                                    break;
                            } // switch(record.data.Description)
                            break; // case: combobox
                    } // switch(record.data.ControlType)
                }); // records.each()
                if (filterArray !== 'null') {
                    itemsTopLevelHandle.add(filterArray);
                }
                vm.set('hdnDateIds', dateIds);
                windowObj.unmask();
            }
            else if (vmRecord.get('dataAccessFilterFlag')) {
                if (filterArray !== 'null') {
                    itemsTopLevelHandle.add(filterArray);
                }
                windowObj.unmask();
            }
            else {
                me.runReport();
            }
        });
    },

    onLeaveDateRange: function (myDatefield) {
        Atlas.common.view.AutoFormatDate.autoFormatDate(myDatefield);
    },
    setDateValue: function (datefield, isValid) {
        var vm = this.getViewModel();
        if (vm.get('hdnDateIds')) {
            var Parameters = vm.get('hdnDateIds').split(',');
            if (Parameters.length > 1) {
                var view = this.getView(),
                    winDtFrom = view.down('#filterParm' + Parameters[0]),
                    winDtTo = view.down('#filterParm' + Parameters[1]),
                    winDtFromValue = winDtFrom.getValue(),
                    winDtToValue = winDtTo.getValue();

                if (datefield.itemId == winDtFrom.itemId) {
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
        }
    },
    setMinValue: function (datefield, isValid) {
        var view = this.getView(),
            winDtFrom = view.down('#' + datefield.itemId),
            winDtTo = view.down('#' + datefield.itemId + 'A'),
            winDtFromValue = winDtFrom.getValue(),
            winDtToValue = winDtTo.getValue();
        if (winDtFromValue != '' && winDtFromValue != null) {
            winDtTo.setMinValue(Ext.Date.format(winDtFromValue, 'm/d/Y'));
        }

    },
    setMaxValue: function (datefield, isValid) {
        var view = this.getView(),
            fromDateId = datefield.itemId.split('A')[0],
            winDtFrom = view.down('#' + fromDateId),
            winDtTo = view.down('#' + datefield.itemId),
            winDtFromValue = winDtFrom.getValue(),
            winDtToValue = winDtTo.getValue();
        if (winDtToValue != '' && winDtToValue != null) {
            winDtFrom.setMaxValue(Ext.Date.format(winDtToValue, 'm/d/Y'));
        }
    },

    onClickRunReport: function (button) {
        // Get list of all form fields into pParameters
        var me = this,
            vm = me.getViewModel(),
            parentVM = me.getViewModel().getParent(),
            vmRecord = vm.get('record'),
            myExtraParams = vm.get('myExtraParams'),
            useVMParams = vm.get('useVMParams'),
            pProgramType,
            pSaveDocument,
            parameterAddOn = '',
            pParameters = '',
            queryParm,
            sliceParam1 = '',
            sliceParam2 = '',
            rptParmRunMode = '2',
            dataAccessTreeObj = me.getView().down('#rptDataAccessTree'),
            form = me.getView().down('form'), //[action=child]');
            queryParameters = form.getValues();

        if (!form.isValid()) {
            Ext.Msg.alert('Validation Error', 'Please provide all required filter criteria’s to run the report.');
            return;
        }

        // Loop through form fields and add to pParameters as necessary
        for (queryParm in queryParameters) {
            if (queryParm.indexOf('filterParm') != -1) {
                pParameters += queryParameters[queryParm] + '|';
            }
        }

        pParameters = pParameters.replace(/\|$/, '');

        if (useVMParams) {
            for (extraParam in myExtraParams) {
                pParameters += '|' + myExtraParams[extraParam];
            }
        }

        if (parentVM && parentVM.type == 'rebate' && vmRecord.data.dataAccessFilterFlag) {
            // Append  Contact ID, Report Type , PlanGroup and PCN info to url parameters
            this.getPCNPlangroupPlanbenefitList(dataAccessTreeObj.store.data.items, '');
            parameterAddOn = parentVM.data.contractID + '|' + parentVM.data.reportType + '|' + parentVM.get('plangroupList') + '^' + parentVM.get('pcnList');
        }
        // If DataAccessTree is displayed, gather Data Access value(s)
        else if (parentVM && parentVM.type != 'rebate' && vmRecord.data.dataAccessFilterFlag) {
            parentVM.set('pcnList', '');
            parentVM.set('plangroupList', '');
            parentVM.set('planbenefitList', '');
            this.getPCNPlangroupPlanbenefitList(dataAccessTreeObj.store.data.items, parentVM.get('expandToLevel'));
            parameterAddOn = parentVM.get('plangroupList') + '^' + parentVM.get('pcnList');
            if (parentVM.get('expandToLevel') === 'PB') {
                parameterAddOn += '^' + parentVM.get('planbenefitList');
            }
        }

        if (parentVM.get('hasFileUploader')) {
            var params = pParameters.split('|');
            for (var c = 0; c < parentVM.get('orderFileUploader').length; c++) {
                if (parentVM.get('orderFileUploader')[c].isRequired && (!parentVM.get('uploadedDocId')[c])) {
                    Ext.Msg.alert('Validation Error', 'Please upload required file to run the report.');
                    return;
                }
                else {
                    if (parentVM.get('uploadedDocId')[c]) {
                        params[(parentVM.get('orderFileUploader')[c].parametrOrder) - 1 + parentVM.get('dateRangeCounter')] = parentVM.get('uploadedDocId')[c];
                    }
                    else {
                        params.splice((parentVM.get('orderFileUploader')[c].parametrOrder) - 1 + parentVM.get('dateRangeCounter'), 1);
                    }

                }
            }
            pParameters = params.join('|');
        }

        pParameters = pParameters == "" ? parameterAddOn : pParameters + (parameterAddOn == "" ? "" : "|" + parameterAddOn);

        if (queryParameters['rptParmRunMode'] === '1') {
            rptParmRunMode = '1';
            pProgramType = 'Report';
            pSaveDocument = false;
        }
        else {
            if (vm.get('ReportFrom')) {
                pProgramType = "Report";
            }
            else {
                if (queryParameters['rptParmProgramType'] != null)
                    pProgramType = queryParameters['rptParmProgramType'];
                else
                    pProgramType = "Report";
            }
            pSaveDocument = true;
        }

        var reportSubmitModel = Ext.create('Atlas.reports.model.ReportSubmitModel');

        reportSubmitModel.getProxy().setExtraParam('pDescription', queryParameters['rptParmReportName']);
        reportSubmitModel.getProxy().setExtraParam('pParameters', pParameters);
        reportSubmitModel.getProxy().setExtraParam('pProgramName', queryParameters['rptParmProgramName']);
        reportSubmitModel.getProxy().setExtraParam('pRunMode', parseInt(rptParmRunMode));
        reportSubmitModel.getProxy().setExtraParam('pProgramType', pProgramType);
        reportSubmitModel.getProxy().setExtraParam('pSaveDocument', pSaveDocument);
        reportSubmitModel.getProxy().setExtraParam('pFaxNumber', '');

        // if ((parentVM) && (parentVM.type == 'rebate')) {
        //     reportSubmitModel.getProxy().setExtraParam('pFaxNumber', 'No');
        // }

        reportSubmitModel.save(
            {
                scope: me,
                failure: function (record, operation) {
                    var obj = Ext.decode(operation.getResponse().responseText);
                    var returnMsgStatus = obj.message[0].message;
                    Ext.Msg.alert('Status', returnMsgStatus);
                },
                success: function (record, operation) {
                    //Ext.Msg.alert('Success', 'On success from call');
                },
                callback: function (record, operation, success) {
                    var obj = Ext.decode(operation.getResponse().responseText);
                    if (queryParameters['rptParmRunMode'] === '1') {
                        Atlas.common.utility.Utilities.displayDocument('pdf', obj.metadata.pData);
                    }
                    else {
                        var newJobNumber = obj.metadata.pJobNumber;
                        var returnMsgStatus = 'Status: ' + obj.message[0].message;
                        var returnMsgText = 'Job number is: ' + '<span style="font-weight: bold;">' + newJobNumber + '</span>';
                        Ext.Msg.alert(returnMsgStatus, returnMsgText);
                        var pVM = me.getViewModel().getParent();
                        if (pVM) {
                            if (pVM.type == 'rebate') {
                                var fieldList = 'parentSystemID';
                                var fieldValue = pVM.data.parentSystemId;
                                var saveAction = [{"Save": {"key": "mode", "value": "Update"}}],
                                    saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/jobqueuedata/update', null, [true], {
                                            pJobNum: newJobNumber,
                                            pFieldList: fieldList,
                                            pFieldValues: fieldValue
                                        },
                                        saveAction, null);
                                if (saveData.code == 0) {
                                    Ext.Msg.alert(returnMsgStatus, returnMsgText);
                                    //Reload the Reports  grid.
                                    var store = pVM.getStore('attachmentandreportstore');
                                    if (store) {
                                        store.getProxy().setExtraParam('pKeyType', 'RebateContractSystemID');
                                        store.getProxy().setExtraParam('pParentSystemId', pVM.data.parentSystemId);
                                        store.load();
                                    }
                                }
                                else {
                                    Ext.Msg.alert(returnMsgStatus, saveData.message);
                                }
                            }
                        }
                        var win = button.up('window');
                        win.close();
                    }
                }
            }
        );
    },

    runReport: function () {
        var me = this,
            myView = me.getView(),
            myVM = me.getViewModel(),
            pParameters = '',
            queryParm,
            form = me.getView().down('form'),
            queryParameters = form.getValues(),
            constantParams = myVM.get('record');

        // Loop through form fields and add to pParameters as necessary
        for (queryParm in queryParameters) {
            if (queryParm.indexOf('filterParm') != -1) {
                if (pParameters === '') {
                    pParameters = queryParameters[queryParm];
                }
                else {
                    pParameters += '|' + queryParameters[queryParm];
                }
            }
        }

        var reportSubmitModel = Ext.create('Atlas.reports.model.ReportSubmitModel');
        reportSubmitModel.getProxy().setExtraParam('pDescription', constantParams.data.reportName);
        reportSubmitModel.getProxy().setExtraParam('pParameters', pParameters);
        reportSubmitModel.getProxy().setExtraParam('pProgramName', constantParams.data.programName);
        reportSubmitModel.getProxy().setExtraParam('pRunMode', parseInt(constantParams.data.runMode));
        reportSubmitModel.getProxy().setExtraParam('pProgramType', constantParams.data.reportID);
        reportSubmitModel.getProxy().setExtraParam('pSaveDocument', false);
        reportSubmitModel.getProxy().setExtraParam('pFaxNumber', '');
        reportSubmitModel.save(
            {
                failure: function (record, operation) {
                    var obj = Ext.decode(operation.getResponse().responseText);
                    var returnMsgStatus = obj.message[0].message;
                    Ext.Msg.alert('Status', returnMsgStatus);
                },
                success: function (record, operation) {
                    //Ext.Msg.alert('Success', 'On success from call');
                },
                callback: function (record, operation, success) {
                    var obj = Ext.decode(operation.getResponse().responseText);
                    var newJobNumber = obj.metadata.pJobNumber;
                    var returnMsgStatus = 'Status: ' + obj.message[0].message;
                    var returnMsgText = 'Job number is: ' + '<span style="font-weight: bold;">' + newJobNumber + '</span>';
                    Ext.Msg.alert(returnMsgStatus, returnMsgText);
                }
            }
        );

        myView.close();
    },

    boxReady: function (view, width, height) {
        var me = this,
            myView = me.getView();

        //myView.setHidden(true);

        Ext.defer(function () {
            me.onReportListRecClick();
        }, 1000);
    },

    readObj: function printObject(o) {
        var out = '';
        for (var p in o) {
            out += p + ': ' + o[p] + '\n';
        }
        alert(out);
    },

    createRandomCustom: function () {
        var d = Atlas.common.utility.Utilities.getLocalDateTime() .getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    },

    getPCNPlangroupPlanbenefitList: function (record, expandToLevel) {
        if (record) {
            record.forEach(function (item, index) {
                var me = this,
                    pcnlist = '',
                    pglist = '',
                    pblist = '',
                    parentVM = me.getViewModel().getParent(),
                    pcnList = parentVM.get('pcnList'),
                    plangroupList = parentVM.get('plangroupList'),
                    planbenefitList = parentVM.get('planbenefitList');
                if (item.childNodes.length == 0 && item.get('checked')) {
                    if (expandToLevel === 'PB') {
                        pcnlist = item.parentNode.get('pcnList');
                        pglist = item.parentNode.get('nodeValue');
                        pblist = item.get('nodeValue');
                        if (planbenefitList.indexOf(pblist) === -1) {
                            if (planbenefitList) {
                                if (planbenefitList.charAt(planbenefitList.length - 1) === ',') {
                                    parentVM.set('planbenefitList', (planbenefitList + (pblist ? pblist : '')));
                                }
                                else {
                                    parentVM.set('planbenefitList', (planbenefitList + (pblist ? (',' + pblist) : '')));
                                }
                            }
                            else {
                                parentVM.set('planbenefitList', (planbenefitList + (pblist ? pblist : '')));
                            }
                        }
                    }
                    else {
                        pcnlist = item.get('PCNList');
                        pglist = item.get('PlanGroupList');
                    }
                    if (pcnList.indexOf(pcnlist) === -1) {
                        if (pcnList) {
                            if (pcnList.charAt(pcnList.length - 1) === ',') {
                                parentVM.set('pcnList', (pcnList + (pcnlist ? pcnlist : '')));
                            }
                            else {
                                parentVM.set('pcnList', (pcnList + (pcnlist ? (',' + pcnlist) : '')));
                            }
                        }
                        else {
                            parentVM.set('pcnList', (pcnList + (pcnlist ? pcnlist : '')));
                        }
                    }
                    if (plangroupList.indexOf(pglist) === -1) {
                        if (plangroupList) {
                            if (plangroupList.charAt(plangroupList.length - 1) === ',') {
                                parentVM.set('plangroupList', (plangroupList + (pglist ? pglist : '')));
                            }
                            else {
                                parentVM.set('plangroupList', (plangroupList + (pglist ? (',' + pglist) : '')));
                            }
                        }
                        else {
                            parentVM.set('plangroupList', (plangroupList + (pglist ? pglist : '')));
                        }
                    }
                }
                else {
                    this.getPCNPlangroupPlanbenefitList(item.childNodes, expandToLevel);
                }
            }, this);
        }
    },

    onAttachmentWindowClose: function (win) {
        var view = this.getView(),
            parentVM = this.getViewModel().getParent(),
            documentIDList = win.down('panel').getViewModel().get('documentIDList'),
            description = win.down('#fileUploaderGrid').getStore().data.length > 0 ? win.down('#fileUploaderGrid').getStore().getAt(0).get('description') : '';
        if (documentIDList.length != 0 && description) {
            view.down('#' + parentVM.get('fileUploaderDescriptionId')).setValue(description);
            var arrDocIds = parentVM.get('uploadedDocId');
            arrDocIds.push(documentIDList[0].trim());
            parentVM.set('uploadedDocId', arrDocIds);
        }
    }
});