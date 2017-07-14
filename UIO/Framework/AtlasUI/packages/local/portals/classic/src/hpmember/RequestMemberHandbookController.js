Ext.define('Atlas.portals.hpmember.RequestMemberHandbookController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalshpmemberrequestmemberhandbook',

    init: function() {
        var user = Ext.first('viewport').getViewModel().get('user');

        this.callFamilyMember(user.recipientId);
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
                me.lookupReference('requestForm').loadRecord(record);
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
                if (storeData) {
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
    },

    submitRequest: function() {
        var user = Ext.first('viewport').getViewModel().get('user'),
            parameters = this.lookupReference('requestForm').getValues(),
            requestModel = Ext.create('Atlas.portals.hpmember.model.MemberRequestHandbookWeb', {}),
            me = this;

        this.getViewModel().set('statusMessage', '');
        if (!parameters.language) {
            Ext.Msg.alert('Missing Field', 'Please, choose a language before submitting the request.');
            return;
        }
        if (!parameters.firstName || !parameters.lastName) {
            this.getViewModel().set('statusMessage', 'First Name, Last Name, E-Mail Address and Phone Number are mandatory. Please update your profile.');
            return;
        }


        requestModel.phantom = false;
        requestModel.getProxy().setExtraParam('pSessionID', user.sessionId);
        requestModel.getProxy().setExtraParam('pRecipientID', parameters.recipientID);
        requestModel.getProxy().setExtraParam('pLanguage', parameters.language);
        requestModel.getProxy().setExtraParam('pLOBID', parameters.lob);
        requestModel.save({
            callback: function(record, operation) {
                var message = Ext.JSON.decode(operation._response.responseText).message[0];

                if (message.code === 0) {
                    if (message.message) {
                        me.getViewModel().set('statusMessage', message.message);
                        return;
                    }
                    me.getViewModel().set('statusMessage', 'Request for Member Handbook has been submitted successfully. Please wait at least 2 weeks to receive your new handbook in mail.');
                    return;
                }
                me.getViewModel().set('statusMessage', message.message);
            }
        });
    }
});