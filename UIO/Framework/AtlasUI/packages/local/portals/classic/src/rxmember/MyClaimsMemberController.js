/*
 * Last Developer: Srujith Cheruku
 * Date: 09-26-2016
 * Previous Developers: []
 * Origin: RxMember - Claims Search
 * Description: Gives users a place to view their claims
 */
Ext.define('Atlas.portals.view.rxmember.MyClaimsMemberController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.myClaimsMemberController',

    init: function () {
        if (!this.getView().isRedirect) {
            return;
        }
        var dateFrom = this.getView().dateFrom,
            dateTo = this.getView().dateTo;
        this.onMemberGridClick();
    },

    initializeYears: function () {
        var currentYear = new Date().getFullYear(),
            combo = this.lookupReference('yearCombo'),
            year = [],
            years = [],
            yearsStore = {};

        for (currentYear; currentYear >= 2010; currentYear--) {
            year = [];
            year.push(currentYear);
            years.push(year);
        }

        yearsStore = new Ext.data.ArrayStore({
            fields: ['value'],
            data: years
        });

        combo.setStore(yearsStore);
        combo.setValue(new Date().getFullYear());
    },


    onSearchClick: function (component, eOpts) {
        var vm = this.getViewModel();
        var year = this.lookupReference('yearCombo').getRawValue();
        var groupBy = this.lookupReference('groupBySelected').getRawValue();
        var groupBySelected = "";
        if (groupBy.search("Year") >= 0) {
            groupBySelected = "Y";
        } else if (groupBy.search("Quarter") >= 0) {
            groupBySelected = "Q";
        } else {
            groupBySelected = "M";
        }

        var user = vm.get("user");
        var recipientID = user.retRecipientID;
        var myClaimsMemberStore = vm.getStore('myClaimsMemberStore');
        var claimSearchStore = vm.getStore('claimSearchStore');
        claimSearchStore.removeAll();
        myClaimsMemberStore.getProxy().setExtraParam("pYear", parseInt(year));
        myClaimsMemberStore.getProxy().setExtraParam("pType", groupBySelected);
        myClaimsMemberStore.getProxy().setExtraParam("pRecipientID", recipientID);
        myClaimsMemberStore.load();

    },

    onMemberGridClick: function (rowNode, record, expandbody, component) {
        var vm = this.getViewModel();
        var dateFrom = this.getView().dateFrom;
        var dateTo = this.getView().dateTo;
        var year = this.lookupReference('yearCombo').getRawValue();
        var groupBy = this.lookupReference('groupBySelected').getRawValue();
        if (!this.getView().isRedirect) {
            if (groupBy.search("Month") >= 0) {
                var monthString = record.data.itemDescription + "/01/2015";
                var date = Ext.Date.parse(monthString, 'F/d/Y');
                var month = date.getMonth() + 1;
                dateFrom = month + '/1/' + year;
                var daysInMonthDate = new Date(year, month, 0);
                var daysInMonth = daysInMonthDate.getDate();
                dateTo = month + '/' + daysInMonth + '/' + year;
            } else if (groupBy.search("Year") >= 0) {
                dateFrom = '1/1/' + year;
                dateTo = '12/31/' + year;
            } else {
                var pieces = record.data.itemDescription.split('-');
                dateFrom = pieces[0];
                dateTo = pieces[1];
            }
        } else {
            this.getView().isRedirect = false;
        }
        var searchFilter = "respStatus = 'P' ";
        if (dateFrom != null && dateFrom != "") {
            var dateFromSearch = " AND serviceDate >='" + dateFrom + "'";
            searchFilter = searchFilter + dateFromSearch;
        }
        if (dateTo != null && dateTo != "") {
            var dateToSearch = " AND serviceDate <='" + dateTo + "'";
            searchFilter = searchFilter + dateToSearch;
        }

        var recipientID = vm.get("user").retRecipientID;
        var claimSearchStore = vm.getStore('claimSearchStore');
        claimSearchStore.getProxy().setExtraParam("pWhere", searchFilter);
        claimSearchStore.getProxy().setExtraParam("pKeyValue", recipientID);
        claimSearchStore.getProxy().setExtraParam("pKeyType", "recipientID");
        claimSearchStore.getProxy().setExtraParam("pOverdueAlert", "No");
        claimSearchStore.load();
    },

    onDrugSearchClick: function (component, eOpts) {
        var brandName = component.getWidgetRecord().data.brandname;
        var medication = component.getWidgetRecord().data.medication;
        this.fireEvent('openView', 'rxmember', 'portals', 'rxmember_DrugSearch', {
            brand: brandName,
            medication: medication,
            atlasId: brandName
        })
    },
    onPharmacyClick: function (component, eOpts, record) {
        var vm = this.getViewModel();
        var pharmacyInfoStore = vm.getStore('pharmacyInfoStore');
        pharmacyInfoStore.getProxy().setExtraParam('pKeyType', "NCPDPID");
        pharmacyInfoStore.getProxy().setExtraParam('pKeyValue', component.getWidgetRecord().data.ncpdpid);
        pharmacyInfoStore.getProxy().setExtraParam('pFieldList', "ncpdpid,name,locCity,locState,locAddress1,locAddress2,locZip,locPhone,locPhoneExt,locFax");
        pharmacyInfoStore.load(
            {
                scope: this,
                failure: function (record, operation) {
                    //do something if the load failed
                },
                success: function (record, operation) {

                },
                callback: function (records, operation, success) {
                    var window = Ext.ComponentQuery.query('window[itemId=viewPharmacyWindow]')[0];
                    if (!window) {
                        Ext.create('Ext.window.Window', {
                            itemId: 'viewPharmacyWindow',
                            width: 400,
                            autoheight: true,
                            modal: true,
                            layout: 'fit',
                            closable: false,
                            session: {
                                schema: 'atlas'
                            },
                            viewModel: {
                                links: {
                                    modalRecord: records[0]
                                }
                            },
                            items: [{
                                xtype: 'portalsrxmemberpharmacyinfo'
                            }]
                        }).show();
                    } else {
                        window.show();
                    }
                }
            }
        );

    },
    onPrescriberClick: function (component, eOpts) {
        var vm = this.getViewModel();
        var prescriberInfoStore = vm.getStore('prescriberInfoStore');
        prescriberInfoStore.getProxy().setExtraParam('pKeyType', "npi");
        prescriberInfoStore.getProxy().setExtraParam('pKeyValue', component.getWidgetRecord().data.npi);
        prescriberInfoStore.getProxy().setExtraParam('pFieldList', "npi,firstname,lastname,locaddr1,locaddr2,loccity,locfax,locname,locphone,locstate,loczip,specialty");
        prescriberInfoStore.load(
            {
                scope: this,
                failure: function (record, operation) {
                    //do something if the load failed
                },
                success: function (record, operation) {

                },
                callback: function (records, operation, success) {
                    var me = this;
                    var window = Ext.ComponentQuery.query('window[itemId=viewPrescriberWindow]')[0];
                    if (!window) {
                        var window = Ext.create('Ext.window.Window', {
                            reference: 'viewPrescriberWindow',
                            autoheight: true,
                            width: 400,
                            modal: true,
                            layout: 'fit',
                            closable: false,
                            session: {
                                schema: 'atlas'
                            },
                            viewModel: {
                                links: {
                                    modalRecord: records[0]
                                }
                            },
                            items: [{
                                xtype: 'portalsrxmemberprescriberinfo'
                            }]
                        }).show();
                    } else {
                        window.show();
                    }
                }
            }
        );
    }
});