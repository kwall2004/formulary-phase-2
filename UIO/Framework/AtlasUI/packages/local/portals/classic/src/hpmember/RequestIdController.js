/**
 * Created by m4542 on 10/13/2016.
 */
Ext.define('Atlas.portals.hpmember.RequestIdController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.requestIdController',

    /**
     * Called when the view is created
     */
    init: function() {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user');

        this.callFamilyMember(user.recipientId);
    },

    requestIdCard: function() {
        var me = this,
            form = me.getView().down('form'),
            parameters = form.getValues(),
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            cardRequest = Ext.create('Atlas.portals.hpmember.model.OrderIdCardWeb');

        cardRequest.phantom = false;
        cardRequest.getProxy().url = 'portal/hp/orderidcardweb';
        cardRequest.getProxy().setExtraParam('pSessionID', user.sessionId);
        cardRequest.getProxy().setExtraParam('pRecipientID', user.recipientId);
        cardRequest.getProxy().setExtraParam('pLOBID', parameters['@primaryLOB']);
        cardRequest.save({
            callback: function(record, operation) {
                var message = Ext.JSON.decode(operation._response.responseText).message[0];

                if (message.code === 0) {
                    if (message.message) {
                        me.getViewModel().set('statusMessage', message.message);
                    }
                    me.getViewModel().set('statusMessage', 'Your new ID card request has been submitted successfully. Please wait at least 2 weeks to receive your new ID card in mail.');
                    return;
                }
                me.getViewModel().set('statusMessage', message.message);
            }
        });

    },

    onFamilySelected: function(combo, record){
        this.getView().getViewModel().set('familySelected', true);
        this.callFamilyMember(record.get('value'));
    },

    callFamilyMember: function(recipientId) {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            requestidmodel = Ext.create('Atlas.portals.hpmember.model.MemberDataWeb', {});

        requestidmodel.getProxy().setExtraParam('pSessionID', user.sessionId);
        requestidmodel.getProxy().setExtraParam('pRecipientID', recipientId);
        requestidmodel.getProxy().setExtraParam('pFieldList', "birthDate,home.State,firstName,lastName,@primaryLOB,@dispMemberID,recipientID,@familyList");
        requestidmodel.getProxy().setExtraParam('portalPlan', "");
        requestidmodel.load({
            callback: function(record) {
                if (vm.get('familySelected')) {
                    vm.set('familySelected', false);
                } else {
                    me.setFamilyList(record);
                    me.lookupReference('familyCombo').setValue(record.get('@dispMemberID') + ' ' + record.get('lastName') + ', ' + record.get('firstName'));
                }
                me.setLobList(record);
                me.lookupReference('requestidcard').loadRecord(record);
            }
        });
    },

    setFamilyList: function(record) {
        var String = record.get('@familyList'),
            me = this;
        if(String != null || String != undefined) {
            var parts = String.split('^');

            var answer = [];

            for (var i=0; i<parts.length; i++) {
                if (i < 1) continue;
                if (i % 2 == 1) {
                    answer.push(parts[i-1] + '^' + parts[i]);
                }
            }

            var familyArray = [];

            for(var i = 0; i < answer.length; i++) {
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
        }
    },

    setLobList: function(record) {
        var lobModel = Ext.create('Atlas.portals.hpmember.model.MemberLobList', {}),
            me = this;

        lobModel.getProxy().setExtraParam('pRecipientID', record.get('recipientID'));
        lobModel.load({
            callback: function(){
                var lobObject = this.getProxy().getReader().metaData,
                    storeData = [],
                    tempArray = [],
                    store = {},
                    names = {},
                    values = {};

                if (!lobObject) { return; }

                names = me.parseDelimitedString(lobObject.pLOBList, ',');
                values = me.parseDelimitedString(lobObject.pMemberIDList, ',');

                for (var i = 0; i < names.length; i++) {
                    tempArray = [];
                    if (i > values.length - 1) { return; }
                    if (names[i].toLowerCase() === 'all') { continue; }
                    tempArray.push(names[i]);
                    tempArray.push(values[i]);
                    storeData.push(tempArray);
                }

                store = new Ext.data.ArrayStore({
                    fields: ['name', 'value'],
                    data: storeData
                });

                me.lookupReference('lob').setStore(store);
                if (storeData && storeData.length === 1) {
                    me.lookupReference('lob').select(storeData[0]);
                }
            }
        });
    },

    parseDelimitedString: function(value, delimiter) {
        var array = [],
            splitValue = value.split(delimiter);

        for (var i = 0; i < splitValue.length; i++) {
            array.push(splitValue[i]);
        }

        return array;
    }
});