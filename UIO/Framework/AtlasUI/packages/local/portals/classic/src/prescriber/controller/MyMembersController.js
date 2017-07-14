/**
 * Created by m4542 on 10/3/2016.
 */
Ext.define('Atlas.portals.prescriber.controller.MyMembersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.myMembersController',

    addUser: function (view, record) {
        var me = this;
            user = Ext.first('viewport').getViewModel().get('user');

        var window = Ext.create('Ext.window.Window', {
            modal: true,
            title: 'Member Access',
            items: [{
                xtype: 'newmemberwindow'
            }]
        }).show();
    },
/**
     * Called when the view is created
     */
    init: function() {
        var me = this,
        vm = me.getViewModel(),
        user = Ext.first('viewport').getViewModel().get('user'),
        myMembers = vm.getStore('membersstore');

        myMembers.getProxy().setExtraParam('pSessionID', user.retSessionID);
        myMembers.getProxy().setExtraParam('pKeyType', "Prescriber");
        myMembers.getProxy().setExtraParam('pKeyValue', user.un);
        myMembers.load();
    },

    myMembersSearch: function() {
        var me = this,
            form = me.getView().down('form'),
            parameters = form.getValues(),
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            myMembers = vm.getStore('membersstore');

            myMembers.filter('RecipientId',parameters.member);
            myMembers.filter('Plan',parameters.plan);
    },

    resetFields: function (view, record) {
        var myMembersForm = this.lookupReference('membersform');
        myMembersForm.reset();

        this.getViewModel().getStore('membersstore').clearFilter();

    },

    exportToExcel: function() {
        var gridPanelRef = this.lookupReference('myMemberGrid');
        gridPanelRef.saveDocumentAs({
            type: 'xlsx',
            title: 'My Members',
            fileName: 'MyMembers.xlsx'
        });
    },

    onMemberGridClick: function(grid, index) {
        var record = grid.eventPosition.record;
        var me = this,
            form = me.getView().down('form'),
            parameters = form.getValues(),
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            memberGridModel = Ext.create('Atlas.portals.prescriber.model.PortalMemberDetailsP', {});
        memberGridModel.getProxy().setExtraParam('pSessionID', user.retSessionID);
        memberGridModel.getProxy().setExtraParam('pSessionId', user.retSessionID);
        memberGridModel.getProxy().setExtraParam('ipiRecipientId', record.get('RecipientId'));
       // memberGridModel.getProxy().setExtraParam('pFieldList', 'recipientID,firstname,middlename,lastname,suffix,gender,birthDate,socSecNum,@languageDescription,race,deathDate,Home.Address1,Home.Address2,Home.City,home.zipCode,Home.State,@countyDescription,homephone.ContactInfo,workphone.ContactInfo,cell.ContactInfo,email.ContactInfo,@alerts,hedisMessage,@enrollmentStatus,respFirstName,respMiddleName,respLastName,resp.address1,resp.address2,resp.state,resp.city,resp.ZipCode,respHomePhone.ContactInfo,respWorkPhone.ContactInfo,complianceAlert,CarrierName,AccountName,@CoCMember,primRecipientId,@mcsProgGroupCode,@medicarePlanGroupId,PlangroupName,@pcpNPI');
        memberGridModel.load({
            callback: function(record) {
                var recipId = record.get('recipientID');
                me.fireEvent('openView', 'rxprescriber', 'portals', 'prescriber_MemberInformation', {
                    atlasId: recipId,
                    isMemberPassed: true,
                    myMemberDetailRecord: record
                });
            }
        });



    }
});
