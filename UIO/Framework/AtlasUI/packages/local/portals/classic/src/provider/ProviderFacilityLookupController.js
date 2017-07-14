/*
 * Last Developer: Srujith Cheruku
 * Date: 11-21-2016
 * Previous Developers: []
 * Origin: Provider - Provider Main
 * Description: Provider Main controller
 */
Ext.define('Atlas.portals.provider.ProviderFacilityLookupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsProviderFacilityLookupController',

    init: function() {
        this.getViewModel().set('labelName',this.getViewModel().get('labelInput'));
    },

    onSearchKeyPress: function(field, event) {
        if (event.getKey() === event.ENTER) {
            this.onProviderSearchButtonClick();
        }
    },

    onProviderSearchButtonClick: function () {
        var providerSearchTextDlg = this.lookupReference('providerNameRef').getValue();
        if ((providerSearchTextDlg !== "") && (providerSearchTextDlg.length >= 4 )) {
            var providerMasterAuthStore = this.getView().getViewModel().getStore('providerMasterAuthStore');

            var value = providerSearchTextDlg;
            if (this.getViewModel().get('searchFrom') == 'ServicingProvider') {
                var valueArray = value.split(" ");
                var vWhere = '';
                vWhere = '((firstName BEGINS "' + valueArray[0] + '"';
                if ((valueArray[1] !== '') && (valueArray[1] !== undefined)) {
                    vWhere = vWhere + ' AND lastname BEGINS "' + valueArray[1] + '")';
                } else {
                    vWhere = vWhere + ' OR lastname BEGINS "' + valueArray[0] + '")';
                }

                if ((valueArray[1] !== '') && (valueArray[1] !== undefined)) {
                    vWhere = vWhere + ' OR (firstName BEGINS "' + valueArray[1] + '" AND lastname BEGINS "' + valueArray[0] + '")';
                }
                vWhere = vWhere + ')';

                if (this.lookupReference('InNetworkProviderRef').getValue() === false){
                    vWhere = vWhere+' AND (provType="PCP" OR provType="PRA" OR provType="ANC" OR provType="PHA")';
                } else {
                    vWhere = vWhere+' AND (provType="PCP" OR provType="PRA" OR provType="ANC" OR provType="PHA") AND inNetwork="true"';
                }


            } else if (this.getViewModel().get('searchFrom') == 'ServicingFacility') {
                var vWhere = '(lastName BEGINS "' + value + '")';

                if (this.lookupReference('InNetworkProviderRef').getValue() === false){
                    vWhere = vWhere+' AND (provType="HOS" OR provType="ANC" OR provType="PHA")';
                } else {
                    vWhere = vWhere+' AND (provType="HOS" OR provType="ANC" OR provType="PHA") AND inNetwork="true"';
                }
            }

            providerMasterAuthStore.getProxy().setExtraParam('pRowid', 0);
            providerMasterAuthStore.getProxy().setExtraParam('pRowNum', 0);
            providerMasterAuthStore.getProxy().setExtraParam('pRows', 0);
            providerMasterAuthStore.getProxy().setExtraParam('pWhere', vWhere);
            providerMasterAuthStore.getProxy().setExtraParam('pSort', 'lastname');
            providerMasterAuthStore.load();

        } else {
            Ext.Msg.alert('Error','Please enter at least 4 characters.');
        }
    },

    onProviderSelectButtonClick: function () {
        var selectedRec = this.lookupReference('providerGridRef').getSelection()[0];

        if (!selectedRec) {
            Ext.Msg.alert('Error', 'Please select a record from the search result.');
            return;
        }

        if (this.getViewModel().get('searchFrom') == 'ServicingProvider'){
            this.fireEvent('servicingProviderSelected', {
                providerName: selectedRec.data.firstName+ ' '+ selectedRec.data.lastName,
                action: true
            });

            if (selectedRec.get('inNetwork') === 'false') {
                this.onOONProviderClick(selectedRec);
            }

            this.getView().up().destroy();
        } else {
            this.fireEvent('servicingFacilitySelected', {
                facilityName: selectedRec.data.firstName + ' ' + selectedRec.data.lastName,
                action: true
            });


            if (selectedRec.get('inNetwork') === 'false') {
                this.onOONProviderClick(selectedRec);
            }

            this.getView().up().destroy();
        }
    },

    onOONProviderClick: function(record) {
        var window = Ext.ComponentQuery.query('window[itemId=viewOONProviderWindow]')[0];
        if(!window){
            var window = Ext.create('Ext.window.Window', {
                title: 'OON Provider Entry',
                reference: 'viewOONProviderWindow',
                modal: true,
                height: 437,
                width: 600,
                viewModel: {
                    data: {
                        searchFrom: 'ServicingProvider',
                        providerRecord: record
                    }
                },
                session:{
                    schema:'atlas'
                },
                items:[{
                    xtype:'portalsProviderOONEntry'
                }]
            }).show();
        }else{
            window.show();
        }
    },

    onRowDblClickProvider: function(grid, record) {
        if (this.getViewModel().get('searchFrom') == 'ServicingProvider'){
            this.fireEvent('servicingProviderSelected', {
                providerName: record.data.firstName+ ' '+ record.data.lastName,
                providerId: record.data.provId,
                action: true
            });

            if (record.get('inNetwork') === 'false') {
                this.onOONProviderClick(record);
            }

            this.getView().up().destroy();
        } else {
            this.fireEvent('servicingFacilitySelected', {
                facilityName: record.data.firstName + ' ' + record.data.lastName,
                providerId: record.data.provId,
                action: true
            });


            if (record.get('inNetwork') === 'false') {
                this.onOONProviderClick(record);
            }

            this.getView().up().destroy();
        }
    },

    onNPISearchKeyPress: function(field, event) {
        if (event.getKey() === event.ENTER) {
            this.onProviderNPISearchButtonClick();
        }
    },

    onProviderNPISearchButtonClick: function () {
        var providerSearchTextDlg = this.lookupReference('NpiRef').getValue();
        var NPI = providerSearchTextDlg.toString();
        var validNPI = false;
        if ((providerSearchTextDlg !== "") && (NPI.length === 10 )) {
            var i;
            var tmpSum = 0;
            var alternateDig;
            var checkDigit;

            for (i=0;i<9; i=i+2) {
                alternateDig = parseInt(NPI.substring(i, i+1))*2;
                if (alternateDig < 10) {
                    tmpSum = tmpSum + alternateDig;
                } else {
                    tmpSum = tmpSum + parseInt(alternateDig.toString().substring(0, 1)) + parseInt(alternateDig.toString().substring(1,2));
                }
            }
            for (i =1; i<8; i=i+2) {
                tmpSum = tmpSum + parseInt (NPI.substring(i,i+1));
            }
            tmpSum = tmpSum + 24;
            if (parseInt(tmpSum.toString().substring(1,2)) !== 0) {
                checkDigit = ((parseInt(tmpSum.toString().substring(0,1))+1 )*10)-tmpSum;
            } else {
                checkDigit = 0;
            }
            if (parseInt(NPI.substring(9,10)) === checkDigit) {
                validNPI = true;
            }
        }
        if ((providerSearchTextDlg !== "") && validNPI) {
            var providerMasterAuthStore = this.getView().getViewModel().getStore('providerSelectNPIStore');

            var value = providerSearchTextDlg;
            if (this.getViewModel().get('searchFrom') == 'ServicingProvider') {
                var vWhere = '(provNPI BEGINS "' + value + '")';


                if (this.lookupReference('InNetworkNPIRef').getValue() === false){
                    vWhere = vWhere+' AND (provType="PCP" OR provType="PRA" OR provType="ANC" OR provType="PHA")';
                } else {
                    vWhere = vWhere+' AND (provType="PCP" OR provType="PRA" OR provType="ANC" OR provType="PHA") AND inNetwork="true"';
                }


            } else if (this.getViewModel().get('searchFrom') == 'ServicingFacility') {
                var vWhere = '(provNPI BEGINS "' + value + '")';

                if (this.lookupReference('InNetworkNPIRef').getValue() === false){
                    vWhere = vWhere+' AND (provType="HOS" OR provType="ANC" OR provType="PHA")';
                } else {
                    vWhere = vWhere+' AND (provType="HOS" OR provType="ANC" OR provType="PHA") AND inNetwork="true"';
                }
            }

            providerMasterAuthStore.getProxy().setExtraParam('pRowid', 0);
            providerMasterAuthStore.getProxy().setExtraParam('pRowNum', 0);
            providerMasterAuthStore.getProxy().setExtraParam('pRows', 0);
            providerMasterAuthStore.getProxy().setExtraParam('pWhere', vWhere);
            providerMasterAuthStore.getProxy().setExtraParam('pSort', 'lastname');
            providerMasterAuthStore.load();

        } else {
            Ext.Msg.alert('Error','Please enter a valid NPI number.');
        }
    },

    onProviderNPISelectButtonClick: function () {
        var selectedRec = this.lookupReference('NPIGridRef').getSelection()[0];

        if (!selectedRec) {
            Ext.Msg.alert('Error', 'Please select a record from the search result.');
            return;
        }

        if (this.getViewModel().get('searchFrom') == 'ServicingFacility'){
            this.fireEvent('servicingFacilitySelected', {
                facilityName: selectedRec.data.firstName+ ' '+ selectedRec.data.lastName,
                action: true
            });

            if (selectedRec.get('inNetwork') === 'false') {
                this.onOONProviderClick(selectedRec);
            }

            this.getView().up().destroy();
        } else {
            this.fireEvent('servicingProviderSelected', {
                providerName: selectedRec.data.firstName+ ' '+ selectedRec.data.lastName,
                action: true
            });

            if (selectedRec.get('inNetwork') === 'false') {
                this.onOONProviderClick(selectedRec);
            }

            this.getView().up().destroy();
        }
    },

    onRowDblClickNPI: function(grid, record) {
        if (this.getViewModel().get('searchFrom') == 'ServicingFacility'){
            this.fireEvent('servicingFacilitySelected', {
                facilityName: record.get('firstName')+' '+ record.get('lastName'),
                action: true
            });

            if (record.get('inNetwork') === 'false') {
                this.onOONProviderClick(record);
            }

            this.getView().up().destroy();
        } else {
            this.fireEvent('servicingProviderSelected', {
                providerName: record.get('firstName')+' '+ record.get('lastName'),
                action: true
            });

            if (record.get('inNetwork') === 'false') {
                this.onOONProviderClick(record);
            }

            this.getView().up().destroy();
        }

    }
});