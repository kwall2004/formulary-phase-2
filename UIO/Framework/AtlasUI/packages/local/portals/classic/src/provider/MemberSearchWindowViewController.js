/**
 * Created by c4539 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.MemberSearchWindowViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsprovidermembersearchwindow',

    memberSearch: function() {
        var memberInput = this.lookupReference('memberInput').value,
            user = Ext.first('viewport').getViewModel().get('user'),
            pWhere = user.un + '|',
            memberSearchStore = this.getView().getViewModel().getStore('memberSearch'),
            me = this;

        if (memberInput !== '') {
            memberInput = this.replaceAllSpecialCharacters(memberInput);
            pWhere += 'wrdIdx contains "' + memberInput + '*"';
        }

        memberSearchStore.getProxy().setExtraParam('pWhere', pWhere);
        memberSearchStore.load({
            callback: function(records) {
                if (records && records.length > 0) {
                    me.getView().getViewModel().set('errorMessage', '');
                    return;
                }
                me.getView().getViewModel().set('errorMessage', 'No results found for the search criteria. Please refine your search.');
            }
        });
    },
    
    replaceAllSpecialCharacters: function (value) {
        if(value != null && value !== '') {
            value = value.replace("[^A-Za-z0-9- ]", "");
        }
        return value;
    },

    onRowClick: function(grid, record) {
        console.log('RowClick fired');
        this.getViewModel().set('memberId', record.get('membeRID'));
    },

    onRowDblClick: function(grid, record) {
        console.log('RowDoubleClick fired');
        this.getViewModel().set('memberId', record.get('membeRID'));
        this.notifyMemberSelected(true);
    },

    onOKClick: function() {
        this.notifyMemberSelected(true);
    },

    onCancelClick: function() {
        this.closeWindow();
    },

    closeWindow: function() {
        this.getView().up().destroy();
    },

    notifyMemberSelected: function(action) {
        var memberId = this.getViewModel().get('memberId');

        if (memberId) {
            this.fireEvent('providerMemberSelected', {
                memberId: memberId,
                action: action
            });
        }

        this.closeWindow();
    }
});