/**
 * Created by T3852 on 10/26/2016.
 */
Ext.define('Atlas.portals.view.provider.HEDISPostcardsViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hedispostcards',

    beforeRender: function () {
        var user = Ext.first('viewport').getViewModel().get('user'),
            me = this,
            vm = me.getViewModel(),
            store = vm.getStore('providerlistweb'),
            obj,
            hedisMeasures = vm.getStore('hedismeasures');

        store.getProxy().setExtraParam('pUserName', user.un);

        store.load();

        // Keep a copy of the original data for reset:
        store.each(function (rec) {
            data.push(obj = Ext.apply({}, rec.data));
            delete obj.id;
        });

        hedisMeasures.getProxy().setExtraParam('pListName', 'providerdocuments');
        hedisMeasures.load({
            callback: function (response, operation) {
                var metadata = Ext.JSON.decode(operation._response.responseText).metadata,
                    measures = metadata.pListItems,
                    measuresArray = measures.split('^'),
                    mailMeasuresElement = me.lookup('mailMeasures');

                for (var i = 0; i < measuresArray.length; i += 2) {
                    var key = measuresArray[i],
                        value = measuresArray[i+1];
                    mailMeasuresElement.add({
                        boxLabel: key,
                        inputValue: value,
                        checked: false
                    })
                }
            }
        });
    },

    onResetClick: function () {
        var user = Ext.first('viewport').getViewModel().get('user'),
            me = this,
            vm = me.getViewModel(),
            store = vm.getStore('providerlistweb');
        store.getProxy().setExtraParam('pUserName', user.un);
        store.load();
        this.lookup('selectedProvidersGrid').getStore().removeAll();
        this.lookup('availableProvidersGrid').getStore().loadData(store);
    },

    onNameFilterKeyup: function() {
        var grid = this.lookup('availableProvidersGrid'),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('nameFilterField'),
            filters = grid.store.getFilters();

        if (filterField.value) {
            this.nameFilter = filters.add({
                id            : 'nameFilter',
                property      : 'name',
                value         : filterField.value,
                anyMatch      : true,
                caseSensitive : false
            });
        } else if (this.nameFilter) {
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    },

    onClearButtonClick: function() {
        if (this.lookupReference('nameFilterField').value != '') {
            var grid = this.lookup('availableProvidersGrid'),
                // Access the field using its "reference" property name.
                filterField = this.lookupReference('nameFilterField'),
                filters = grid.store.getFilters();
            filterField.setValue('');
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    },

    selectAll: function () {
        var checkboxes = this.lookup('mailMeasures').items.items;

        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].setValue(true);
        }
    },

    clearAll: function () {
        var checkboxes = this.lookup('mailMeasures').items.items;

        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].setValue(false);
        }
    },

    cancelForm: function () {
        var checkboxes = this.lookup('mailMeasures').items.items;

        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].setValue(false);
        }

        this.onClearButtonClick();

        var user = Ext.first('viewport').getViewModel().get('user'),
            me = this,
            vm = me.getViewModel(),
            store = vm.getStore('providerlistweb');
        store.getProxy().setExtraParam('pUserName', user.un);
        store.load();
        this.lookup('selectedProvidersGrid').getStore().removeAll();
        this.lookup('availableProvidersGrid').getStore().loadData(store);
    },

    onSubmit: function () {
        var vm = this.getViewModel(),
            gridData = this.lookup('selectedProvidersGrid').getStore().getData().items,
            checkedMeasures = this.lookup('mailMeasures').getChecked(),
            providerDocuments = vm.getStore('providerdocuments'),
            providersSelected = [],
            providerDocInfo = {},
            tMeasuresSelected = [];

        if (gridData.length < 1)
        {
            this.lookupReference('errorMessageRef').setValue('<font color="red">At least one provider must be selected.</font>');
            this.lookupReference('errorMessageRef').setHidden(false);
            return;
        }
        else
            this.lookupReference('errorMessageRef').setHidden(true);
        if (checkedMeasures.length < 1)
        {
            this.lookupReference('errorMessageRef2').setValue('<font color="red">At least one measure must be checked.</font>');
            this.lookupReference('errorMessageRef2').setHidden(false);
            return;
        }
        else
            this.lookupReference('errorMessageRef2').setHidden(true);

        for (var i = 0; i < gridData.length; i++) {
            providersSelected.push({
                provID: gridData[i].data.provID,
                lastName: gridData[i].data.lastName,
                firstName: gridData[i].data.firstName
            });
        }
        providerDocInfo.tProvidersSelected = providersSelected;
        providerDocuments.getProxy().setExtraParam('ipListName', 'ProviderDocuments');
        this.checkedMeasures(checkedMeasures, 0, tMeasuresSelected, providerDocuments, providerDocInfo);
    },

    checkedMeasures: function(checkedMeasures, index, tMeasuresSelected, providerDocuments, providerDocInfo) {
        var me = this;
        providerDocuments.getProxy().setExtraParam('ipListItem', checkedMeasures[index].inputValue);
        providerDocuments.load({
            callback: function (response, opts) {
                tMeasuresSelected.push({
                    tMeasure: response[3].data.value,
                    tParms: response[0].data.value + '^' + response[1].data.value + '^' + response[2].data.value
                    + '^' + response[3].data.value + '^' + response[4].data.value + '^' + response[5].data.value
                    + '^' + response[6].data.value + '^' + checkedMeasures[index].inputValue
                });
                if(checkedMeasures.length - 1 > index) {
                    me.checkedMeasures(checkedMeasures, ++index, tMeasuresSelected, providerDocuments, providerDocInfo);
                } else {
                    providerDocInfo.tMeasuresSelected = tMeasuresSelected;
                    me.getProviderDocInfo(providerDocInfo);
                }
            }
        });
    },

    getProviderDocInfo: function(providerDocInfo) {
        var user = Ext.first('viewport').getViewModel().get('user'),
            vm = this.getViewModel(),
            tProvidersSelected = {
                tProvidersSelected: providerDocInfo.tProvidersSelected
            },
            tMeasuresSelected = {
                tMeasuresSelected: providerDocInfo.tMeasuresSelected
            },
            docInfoModel = Ext.create('Atlas.portals.provider.model.ProviderDocInfo', {});
        docInfoModel.getProxy().setExtraParam('tProvidersSelected', tProvidersSelected);
        docInfoModel.getProxy().setExtraParam('tMeasuresSelected', tMeasuresSelected);
        docInfoModel.getProxy().setExtraParam('pReportYear', '0');
        docInfoModel.getProxy().setExtraParam('pParms', user.un + '|WebPortal|Yes');
        docInfoModel.phantom = false;
        docInfoModel.save({
            callback: function (response, opts) {
                Ext.MessageBox.alert('Message', Ext.JSON.decode(opts.getResponse().responseText).metadata.pResult, function(){});
            }
        });
    },

    viewHistory: function () {
        var gridData = this.lookup('selectedProvidersGrid').getStore().getData().items,
            checkedMeasures = this.lookup('mailMeasures').getChecked(),
            provIds,
            measures;

        if (gridData.length < 1)
        {
            this.lookupReference('errorMessageRef').setValue('<font color="red">At least one provider must be selected.</font>');
            this.lookupReference('errorMessageRef').setHidden(false);
            return;
        }
        else
            this.lookupReference('errorMessageRef').setHidden(true);
        if (checkedMeasures.length < 1)
        {
            this.lookupReference('errorMessageRef2').setValue('<font color="red">At least one measure must be checked.</font>');
            this.lookupReference('errorMessageRef2').setHidden(false);
            return;
        }
        else
            this.lookupReference('errorMessageRef2').setHidden(true);
        
        for (var i = 0; i < gridData.length; i++) {
            if (i > 0) {
                provIds += '^' + gridData[i].data.provID;
            } else {
                provIds = gridData[i].data.provID;
            }
        }

        this.getHedisMeasureIds(checkedMeasures, 0, measures, provIds);
    },

    getHedisMeasureIds: function (checkedMeasures, index, measures, provIds) {
        var providerDocuments = this.getViewModel().getStore('providerdocuments'),
            me = this,
            measureInfo;

        providerDocuments.getProxy().setExtraParam('ipListName', 'ProviderDocuments');
        providerDocuments.getProxy().setExtraParam('ipListItem', checkedMeasures[index].inputValue);
        providerDocuments.load({
            callback: function (response, opts) {
                measureInfo = response[3].data.value;
                if (response.length > 1)
                {
                    if(checkedMeasures.length - 1 > index) {
                        if (measures == "")
                            pParameters = Number(measureInfo);
                        else
                            pParameters = measures + "^" + Number(measureInfo);
                        me.getHedisMeasureIds(checkedMeasures, ++index, pParameters, provIds);
                    } else {
                        if (measures == "")
                            pParameters = Number(measureInfo);
                        else
                            pParameters = measures + "^" + Number(measureInfo);

                        pParameters = provIds + '!' + pParameters;
                        me.displayHistoryReport(pParameters);
                    }
                }

            }
        });
    },

    displayHistoryReport: function (pParameters) {
        var viewHistoryModel = Ext.create('Atlas.portals.hpmember.model.RunReport64', {});
        viewHistoryModel.getProxy().setExtraParam('pReportName', 'rpthstproviderdocs.p');
        viewHistoryModel.getProxy().setExtraParam('pParameters', pParameters);
        viewHistoryModel.getProxy().setExtraParam('pRegenReport', 2);
        viewHistoryModel.getProxy().setExtraParam('pOutputType', 'pdf');
        viewHistoryModel.getProxy().setExtraParam('pJobNum', 0);
        viewHistoryModel.phantom = false;

        viewHistoryModel.save({
            success: function (response, operation) {
                var obj = Ext.JSON.decode(operation._response.responseText),
                    base64EncodedPDF = obj.data;

                if (base64EncodedPDF == "" || base64EncodedPDF == null) {
                    Ext.MessageBox.alert('Error', 'We are working on creating your report. Please check back in a few minutes. If the problem continues please call Provider/Member Services.', function(){});
                } else {
                    Atlas.common.utility.Utilities.displayDocument('pdf', base64EncodedPDF);
                }
            }
        });

    }


});