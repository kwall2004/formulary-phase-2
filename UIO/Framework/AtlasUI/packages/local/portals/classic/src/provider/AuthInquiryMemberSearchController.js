/*
 * Last Developer: Srujith Cheruku
 * Date: 11-21-2016
 * Previous Developers: []
 * Origin: Provider - Authorization Inquiry Member Search
 * Description: Controller for Authorization Inquiry Member Search
 */
Ext.define('Atlas.portals.provider.AuthInquiryMemberSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsProviderAuthInquiryMemberSearchController',

    onMemberKeyPress: function(field, event) {
        if (event.getKey() === event.ENTER) {
            this.onSearchClick();
        }
    },

    onSearchClick : function(){
        var me = this,
            memberSearchStore = this.getView().getViewModel().getStore('memberDetailStore'),
            memberName = this.lookupReference('memberNameRef').getValue();
        if((memberName !== '' )&& (memberName.length >= 4)){
            Ext.MessageBox.show({
                title: 'Searching',
                msg: 'Please Wait...',
                closable:false
            });

            memberSearchStore.getProxy().setExtraParam('pSearch', memberName);
            memberSearchStore.getProxy().setExtraParam('pLobID', 'All');
            memberSearchStore.load({
                callback: function(records) {
                    if (records !== null) {
                        if (records.length === 0) {
                            Ext.Msg.alert('Alert','No members found!');
                        } else {
                            for (var x = 0; x < records.length; x++) {
                                if (records[x].data.memberID != "")
                            for (var i = x + 1; i < records.length; i++) {
                                if (records[i].data.memberID != "")
                                if (records[i].data.memberID == records[x].data.memberID) {
                                    records[i].data.memberID = "";
                                }
                            }
                            }
                            var x = 0;
                            for (var i = 0; i < records.length; i++) {
                                if (records[i].data.memberID == "") {
                                        this.removeAt(i - x);
                                        x = x + 1;
                                }
                            }
                            console.log(records);
                            Ext.MessageBox.hide();
                        }
                    } else {
                        Ext.Msg.alert('Request Failed','Please try again.');
                    }
                }
            });
        } else {
            Ext.Msg.alert('Error','Please enter at least 4 characters.');
        }
    },

    onSelectAction: function(grid, colIndex, rowIndex, row, event, record) {
        this.fireEvent('authInquiryMemberSelected', {
            memberId: record.get('memberID'),
            action: true
        });
        this.getView().up().destroy();
    },

    onSelectClick: function () {
        var selectedRec = this.lookupReference('memberGridRef').getSelection()[0];

        if (!selectedRec) {
            Ext.Msg.alert('Error', 'Please select a record from the search result.');
            return;
        }

        this.fireEvent('authInquiryMemberSelected', {
            memberId: selectedRec.data.memberID,
            action: true
        });
        this.getView().up().destroy();
    },

    onRowDblClick: function(grid, record) {
        this.fireEvent('authInquiryMemberSelected', {
            memberId: record.get('memberID'),
            action: true
        });
        this.getView().up().destroy();
    }
});