Ext.define('Atlas.portals.provider.MemberHEDISUpdateViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.memberhedisupdate',

    init: function() {
        var me = this,
            vm = me.getViewModel(),
            faxNumber = '313-202-0006';

        if (Atlas.user.providerStateSelected == 'IL') {
            faxNumber = '312-508-7213';
        }
        vm.set('HEDISFaxNumber', faxNumber);
        if  ((this.getViewModel().get('memberAge')) >= 18)  {
            vm.set('title', "Adult BMI Information");
            vm.set('bmidatetitle', "BMI Date");
        } else {
            vm.set('title', "Child BMI Information");
            vm.set('bmidatetitle', "BMI Percentile Date");
        }

    },

    afterRender: function () {
        this.generateMeasureForm();
        var me = this,
            vm = me.getViewModel();
        if  ((this.getViewModel().get('memberAge')) <= 2)
            vm.set('isBaby', 1);
        else
            vm.set('isBaby', 0);
        if  ((this.getViewModel().get('memberAge')) >= 18) {
            vm.set('isAdult', 1);
        } else {
            vm.set('isAdult', 0);
        }
    },

    generateMeasureForm: function () {
        var measureDetail = this.getViewModel().getStore('measuredetail'),
            dynamicForm = this.lookup('dynamicHEDISForm'),
            me = this;



        measureDetail.getProxy().setExtraParam('pMeasure', me.getViewModel().getData().measure);
        measureDetail.getProxy().setExtraParam('pNumerator', me.getViewModel().getData().numerator);

        measureDetail.load({
            callback: function (value, operation) {
                var pFieldList = Ext.JSON.decode(operation.getResponse().responseText).metadata.pFieldList,
                    parsedList = pFieldList.split('|'),
                    formRows = parsedList[0].split(';');

                for (var i = 0; i < formRows.length; i++) {
                    var inputs = formRows[i].split(','),
                        inputRow = [];
                    for (var j = 0; j < inputs.length; j++) {
                        var inputInfo = inputs[j].split(':');
                        switch (inputInfo[1]) {
                            case 'date':
                                inputRow.push(
                                    {
                                        xtype: 'datefield',
                                        fieldLabel: inputInfo[0],
                                        itemId: inputInfo[2],
                                        name: inputInfo[2],
                                        allowBlank: true
                                    }
                                );
                                break;
                            case 'combo':
                                if (inputInfo[2] == 'BPProviderID') {
                                    inputRow.push(
                                        {
                                            xtype: 'combo',
                                            fieldLabel: inputInfo[0],
                                            reference: 'providerComboRef',
                                            name: 'provID',
                                            itemId: 'provID',
                                            displayField: 'key',
                                            valueField: 'value',
                                            queryMode: 'local',
                                            listeners: {
                                                afterRender: 'callProviderList',
                                                select: 'getProviderLocations'
                                            }
                                        }
                                    );
                                } else if (inputInfo[2] == 'BPLocationID') {
                                inputRow.push(
                                    {
                                        xtype: 'combo',
                                        fieldLabel: inputInfo[0],
                                        reference: 'locationComboRef',
                                        name: inputInfo[2],
                                        itemId: inputInfo[2],
                                        displayField: 'key',
                                        valueField: 'value',
                                        queryMode: 'local'
                                    }
                                );
                            }
                                break;
                            case 'decimal':
                                inputRow.push(
                                    {
                                        xtype: 'numberfield',
                                        fieldLabel: inputInfo[0],
                                        reference: inputInfo[2],
                                        name: inputInfo[2],
                                        minValue: 0,
                                        renderer: Ext.util.Format.numberRenderer('0.00'),
                                        allowBlank: true
                                    }
                                );
                                break;
                            case 'radio':
                                switch (inputInfo[2]) {
                                    case 'confirmHTN':
                                        inputRow.push(
                                            {
                                                xtype: 'radiogroup',
                                                fieldLabel: inputInfo[0],
                                                reference: inputInfo[2],
                                                items: [
                                                    {
                                                        boxLabel: 'Yes',
                                                        name: 'filterRadios',
                                                        inputValue: 'yes',
                                                        checked: true
                                                    },
                                                    {
                                                        boxLabel: 'No',
                                                        name: 'filterRadios',
                                                        inputValue: 'no'
                                                    }
                                                ],
                                                listeners: {
                                                    change: 'hideBPDropdowns'
                                                }
                                            }
                                        );
                                        break;
                                    default:
                                        inputRow.push(
                                            {
                                                xtype: 'radiogroup',
                                                fieldLabel: inputInfo[0],
                                                reference: inputInfo[2],
                                                items: [
                                                    {
                                                        boxLabel: 'Yes',
                                                        name: 'filterRadios',
                                                        inputValue: 'yes',
                                                        checked: true
                                                    },
                                                    {
                                                        boxLabel: 'No',
                                                        name: 'filterRadios',
                                                        inputValue: 'no'
                                                    }
                                                ]
                                            }
                                        );
                                        break;
                                }
                                break;
                        }
                    }
                    dynamicForm.setTitle(me.getViewModel().getData().measureDesc + ' - ' + me.getViewModel().getData().subMeasure);
                    dynamicForm.add(
                        {
                            xtype: 'toolbar',
                            items: inputRow
                        }
                    );
                }

            }
        });

    },

    submitHEDISUpdate: function () {
        var me = this,
            dynamicHEDISFormValues = this.lookup('dynamicHEDISForm').getValues(),
            bmiFormValues = this.lookup('bmiForm').getValues(),
            recipientId = this.getViewModel().getData().recipientId,
            requestModel = Ext.create('Atlas.portals.provider.model.MemberHybridDataWeb', {}),
            measure = this.getViewModel().getData().measure,
            measuredesc = this.getViewModel().getData().measureDesc,
            numerator = this.getViewModel().getData().numerator,
            trn = this.getViewModel().getData().trn,
            reportYear = this.getViewModel().getData().reportYear,
            currdate = Date.now(),
            ChPhysicalActDate,
            ChNutritionDate,
            BMIDate,
            d;

        if  ((this.getViewModel().get('memberAge')) >= 18)  {
                    var pFieldList = 'updateSource|measure|AdBMIDate|BMIheight|BMIweight|AdBMIValue';

                    if (this.lookupReference("BMIDate").getValue() != "" && this.lookupReference("BMIDate").getValue() != null)
                    {
                        d = Date.parse(this.lookupReference("BMIDate").getValue());

                        if (d)
                        {
                            if (d > currdate) {
                                Ext.Msg.alert('HEDIS Self Reporting Date Validation', 'One of the date provided is a future date');
                                return;
                            }
                            d = new Date(this.lookupReference("BMIDate").getValue()),
                                BMIDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
                        }
                        else {
                            Ext.Msg.alert('HEDIS Self Reporting Date Validation', 'Invalid date.');
                            return;
                        }
                    } else {
                        BMIDate = "";
                    }


                    var pFields = '1|26|' + BMIDate;
                    pFields = pFields + '|' + this.lookupReference("heightInches").getValue();
                    pFields = pFields + '|' + this.lookupReference("weight").getValue();
                    pFields = pFields + '|' + this.lookupReference("BMIValue").getValue();

                    var regex = new RegExp("null", 'g');
                    pFields =   pFields.replace(regex, '');
                }
                 else
                {
                    var pFieldList = 'updateSource|measure|ChBMIDate|BMIheight|BMIweight|ChBMIPercentile|ChBMIPlotted|ChNutritionDate|ChPhysicalActDate';

                    if (this.lookupReference("BMIDate").getValue() != "" && this.lookupReference("BMIDate").getValue() != null)
                    {
                        d = Date.parse(this.lookupReference("BMIDate").getValue());

                        if (d)
                        {
                            if (d > currdate) {
                                Ext.Msg.alert('HEDIS Self Reporting Date Validation', 'One of the date provided is a future date');
                                return;
                            }
                                d = new Date(this.lookupReference("BMIDate").getValue()),
                                BMIDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
                        }
                        else {
                            Ext.Msg.alert('HEDIS Self Reporting Date Validation', 'Invalid date.');
                            return;
                        }
                    } else {
                        BMIDate = "";
                    }
                    if (this.lookupReference("ChNutritionDate").getValue() != "" && this.lookupReference("ChNutritionDate").getValue() != null)
                    {
                        var d = Date.parse(this.lookupReference("ChNutritionDate").getValue());
                        if (d) {
                            if (d > currdate) {
                                Ext.Msg.alert('HEDIS Self Reporting Date Validation', 'One of the date provided is a future date');
                                return;
                            }
                                d = new Date(this.lookupReference("ChNutritionDate").getValue()),
                                ChNutritionDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
                        }
                        else {
                            Ext.Msg.alert('HEDIS Self Reporting Date Validation', 'Invalid date.');
                            return;
                        }
                    } else {
                        ChNutritionDate = "";
                    }
                    if (this.lookupReference("ChPhysicalActDate").getValue() != "" && this.lookupReference("ChPhysicalActDate").getValue() != null)
                    {
                        var d = Date.parse(this.lookupReference("ChPhysicalActDate").getValue());
                        if (d) {
                            if (d > currdate) {
                                Ext.Msg.alert('HEDIS Self Reporting Date Validation', 'One of the date provided is a future date');
                                return;
                            }
                                d = new Date(this.lookupReference("ChPhysicalActDate").getValue()),
                                ChPhysicalActDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
                        }
                        else {
                            Ext.Msg.alert('HEDIS Self Reporting Date Validation', 'Invalid date.');
                            return;
                        }
                    } else {
                        ChPhysicalActDate = "";
                }

                    var pFields = '1|27|' + BMIDate;
                        pFields = pFields + '|' + this.lookupReference("heightInches").getValue();
                        pFields = pFields + '|' + this.lookupReference("weight").getValue();
                        pFields = pFields + '|' + this.lookupReference("ChBMIPercentile").getValue();
                        pFields = pFields + '|' + this.lookupReference("ChBMIPlotted").getValue();
                        pFields = pFields + '|' + ChNutritionDate;
                        pFields = pFields + '|' + ChPhysicalActDate;
                    var regex = new RegExp("null", 'g');
                    pFields =   pFields.replace(regex, '');


                }




                requestModel.phantom = false;
                requestModel.getProxy().url = 'member/hp/memberhybriddataweb';
                requestModel.getProxy().setExtraParam('pRecipientID', recipientId);
                requestModel.getProxy().setExtraParam('pUserName', Atlas.user.un);
                requestModel.getProxy().setExtraParam('pFieldList', pFieldList);
                requestModel.getProxy().setExtraParam('pFields', pFields);
                requestModel.save({});

        if (measure == '7') {
            if (dynamicHEDISFormValues.BPDate == '' || dynamicHEDISFormValues.systolicBP <= 0 || dynamicHEDISFormValues.DiastolicBP <= 0) {
                Ext.Msg.alert('HEDIS - Error', 'BPDate, Systolic BP & Diastolic BP required to update High Blood Pressure Measure');
                return;
            } else if (dynamicHEDISFormValues.filterRadios == 'yes' && dynamicHEDISFormValues.BPLocationID == '') {
                Ext.Msg.alert('HEDIS - Error', 'If reading performed in office, please select provider and location');
                return;
            }
        }

        if (this.lookup('dynamicHEDISForm').isValid() == true) {
            var pFieldList = 'updateSource|measure',
                pFields = numerator + '|' + measure,
                requestModel = Ext.create('Atlas.portals.provider.model.MemberHybridDataWeb', {}),
                hedisSummaryModel = Ext.create('Atlas.portals.provider.model.MemberHedisSummary', {});

            for (var key in dynamicHEDISFormValues) {
                if (key != 'filterRadios') {
                    pFieldList += '|' + key;
                    pFields += '|' + dynamicHEDISFormValues[key];
                }
            }

            if (measure == '7' && dynamicHEDISFormValues.filterRadios == 'no') {
                pFieldList += '|BPLocationID';
                pFields += '|0';
            }

            hedisSummaryModel.phantom = false;
            hedisSummaryModel.getProxy().url = 'member/hp/memberhedissummary';
            hedisSummaryModel.getProxy().setExtraParam('pRecipientID', recipientId);
            hedisSummaryModel.getProxy().setExtraParam('pReportYear', reportYear);
            hedisSummaryModel.getProxy().setExtraParam('pMeasure', measure);
            hedisSummaryModel.getProxy().setExtraParam('pNumerator', numerator);
            hedisSummaryModel.getProxy().setExtraParam('pTrn', trn);

            hedisSummaryModel.save({});


            requestModel.phantom = false;
            requestModel.getProxy().url = 'member/hp/memberhybriddataweb';
            requestModel.getProxy().setExtraParam('pRecipientID', recipientId);
            requestModel.getProxy().setExtraParam('pUserName', Atlas.user.un);
            requestModel.getProxy().setExtraParam('pFieldList', pFieldList);
            requestModel.getProxy().setExtraParam('pFields', pFields);

            requestModel.save({
                success: function () {
                    me.getView().close()
                    Ext.Msg.alert('HEDIS - Update', 'Your HEDIS measure has been submitted. Your update should be posted within 5 business days.');
                }
            });
        }
    },

    callProviderList: function(){
        var providerListStore = Ext.create('Atlas.portals.provider.model.ProviderList', {}),
            me = this;
        providerListStore.getProxy().setExtraParam('pUserName', Atlas.user.un);
        providerListStore.load({
            scope: this,
            callback: function(record, operation) {
                var providerMap = [];
                var results = Ext.JSON.decode(operation.getResponse().responseText).data;
                if (results.length > 0) {

                    for (var i = 1; i < results.length; i++) {
                        providerMap.push({
                            key: results[i].lastName + ', '+ results[i].firstName,
                            value: results[i].provID
                        });
                    }
                    var providerStore = new Ext.data.ArrayStore({});
                    providerStore.add(providerMap);
                    me.lookupReference('providerComboRef').setStore(providerStore);
                }
            }
        });
    },

    getProviderLocations: function (combo , record , eOpts) {
        var providerLocationListStore = Ext.create('Atlas.portals.provider.model.GetProvLocationList', {}),
            providerId = record.getData().value,
            me = this;
        providerLocationListStore.getProxy().setExtraParam('pShowAll', 'false');
        providerLocationListStore.getProxy().setExtraParam('pCurrent', 'false');
        providerLocationListStore.getProxy().setExtraParam('pProvID', providerId);
        providerLocationListStore.getProxy().setExtraParam('pLocationID', 0);
        providerLocationListStore.getProxy().setExtraParam('pLobID', 'Medicaid');
        providerLocationListStore.load({
            scope: this,
            callback: function(record, operation) {
                var locationMap = [];
                var results = Ext.JSON.decode(operation.getResponse().responseText).metadata.pLocationList;
                if (results.length > 0) {
                    var locationStore = new Ext.data.ArrayStore({}),
                        locations = results.split('^');

                    for (var i = 0; i < locations.length; i++) {
                        var locationArray = locations[i].split(',');
                        if (locationArray[1]) {
                            locationMap.push({
                                key: locationArray[0] + ': ' + locationArray[1],
                                value: locationArray[0]
                            });
                        }
                    }
                    locationStore.add(locationMap);
                    me.lookupReference('locationComboRef').setStore(locationStore);
                }
            }
        });
    },

    hideBPDropdowns: function (radioGroup, newValue, oldValue, eOpts) {
        switch (newValue.filterRadios) {
            case 'no':
                this.lookup('providerComboRef').reset();
                this.lookup('locationComboRef').reset();
                this.lookup('providerComboRef').hide();
                this.lookup('locationComboRef').hide();
                break;
            case 'yes':
                this.lookup('providerComboRef').show();
                this.lookup('locationComboRef').show();
                break;
        }
    },

    calculateBMI: function () {
        var formValues = this.lookup('bmiForm').getValues(),
            height = formValues.heightInches,
            weight = formValues.weight;

        if (height == '' || height == null || weight == '' || weight == null) {
            Ext.Msg.alert('Input Error', 'Please enter a valid input for Height/Weight to calculate the BMI.');
        } else {
            var calculatedBMI = (weight*703)/(height*height);
            this.lookup('BMIValue').setValue(Ext.util.Format.number(calculatedBMI, '00.000'));
        }
    },

    calculateInches: function () {
        var formValues = this.lookup('bmiForm').getValues(),
            height = formValues.heightFeet,
            weight = formValues.weight;

        if (height == '' || height == null) {
            Ext.Msg.alert('Feet to Inches - Error', 'Please enter a valid height value in feet.');
        } else {
            var calculatedInches = height * 12;
            this.lookup('heightInches').setValue(Ext.util.Format.number(calculatedInches, '00.00'));

            if (weight) {
                this.calculateBMI();
            }
        }
    },

    clearButtonClicked: function() {
        this.lookupReference("heightInches").setRawValue('');
        this.lookupReference("BMIValue").setRawValue('');
        this.lookupReference("weight").setRawValue('');
        this.lookupReference("ChBMIPercentile").setRawValue('');
        this.lookupReference("ChBMIPlotted").setRawValue('');
        this.lookupReference("ChNutritionDate").setRawValue('');
        this.lookupReference("ChPhysicalActDate").setRawValue('');
        this.lookupReference("BMIDate").setRawValue('');
        this.lookupReference("heightFeet").setRawValue('');

    }

});