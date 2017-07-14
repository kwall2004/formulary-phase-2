/*
 * Last Developer: Srujith Cheruku
 * Date: 10-26-2016
 * Previous Developers: []
 * Origin: MHP Member - Services Needed and Completed
 * Description: Controller for the Services Needed Information Page
 */
Ext.define('Atlas.portals.view.hpmember.ServicesNeededController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsMemberMHPServicesNeededController',

    init: function () {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user');

        this.callFamilyMember(user.recipientId);
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

    onFamilySelected: function (combo, record) {
        this.callFamilyMember(record.get('value'));
    },

    callFamilyMember: function (recipientId) {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            familydropdisable = false;
        servicesneededmodel = Ext.create('Atlas.portals.hpmember.model.MemberDataWeb', {});

        servicesneededmodel.getProxy().setExtraParam('pSessionID', user.sessionId);
        servicesneededmodel.getProxy().setExtraParam('pRecipientID', recipientId);
        servicesneededmodel.getProxy().setExtraParam('pFieldList', "birthDate,home.State,firstName,lastName,@Age,@enrollmentStatus,recipientID,@familyList,@subscriberId,@primaryLOB");
        servicesneededmodel.getProxy().setExtraParam('portalPlan', "");
        servicesneededmodel.load({
            callback: function (record) {
                //parse familyList
                var String = record.get('@familyList');
                if (String != null || String != undefined) {
                    var parts = String.split('^');

                    var answer = [];

                    for (var i = 0; i < parts.length; i++) {
                        if (i < 1) continue;
                        if (i % 2 == 1) {
                            answer.push(parts[i - 1] + '^' + parts[i]);
                        }
                    }

                    var familyArray = [];

                    for (var i = 0; i < answer.length; i++) {
                        individualArray = [];
                        var arraySplit = answer[i].split("^");
                        individualArray.push(arraySplit[0]);
                        individualArray.push(arraySplit[1]);
                        familyArray.push(individualArray);
                    }

                    var familyStore = new Ext.data.ArrayStore({
                        fields: ['name', 'value'],
                        data: familyArray
                    });

                    var familyCombo = me.lookupReference('familyCombo');
                    familyCombo.setStore(familyStore);
                    if (familyCombo.getValue() == null || familyCombo.getValue() == '') {
                        // familyCombo.setRawValue(recipientId+ " "+ user.lastName+", "+user.firstName);
                        familyCombo.setValue(recipientId);
                    }
                    if (familyArray.length == 1) {
                        familydropdisable = true;
                    } else {
                        if (record.get('@primaryLOB') == 'Comm-HMO') {
                            if ((record.get('@subscriberId') == recipientId) || (record.get('@subscriberId') == user.recipientId)) {
                                familydropdisable = false;
                            } else {
                                familydropdisable = true;
                            }
                        }
                    }
                } else {
                    familydropdisable = true;
                }


                me.lookupReference('statusRef').setValue(record.get('@enrollmentStatus'));
                me.lookupReference('familyCombo').setDisabled(familydropdisable);
                me.callYearsSelected(recipientId, new Date().getFullYear());
            }
        });

    },

    onYearSelected: function () {
        this.callYearsSelected('', '');
    },
    callYearsSelected: function (recipientId, year) {
        var vm = this.getViewModel(),
            me = this;
        var servicesNeededStore = vm.getStore('servicesNeededStore');
        var pWhere = '';
        if (year != null && year != '') {
            pWhere = pWhere + 'reportYear = ' + year;
        } else {
            year = me.lookupReference('yearCombo').getValue();
            pWhere = pWhere + 'reportYear = ' + year;
        }
        if (recipientId != null && recipientId != '') {
            pWhere = pWhere + ' and recipientID = ' + recipientId;
        } else {
            recipientId = me.lookupReference('familyCombo').getValue();
            pWhere = pWhere + ' and recipientID = ' + recipientId;
        }
        servicesNeededStore.removeAll();
        servicesNeededStore.getProxy().setExtraParam("pSort", 'measure by subMeasure by trn');
        servicesNeededStore.getProxy().setExtraParam("pWhere", pWhere);
        servicesNeededStore.load();
    },

    onGridClick: function (component, record, item, index, e, eOpts) {
        this.lookupReference('infoDisplayRef').setValue(record.data.helpText);
    }

});