Ext.define('Atlas.portals.rxmember.model.PortalMemberCardRequest', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pSessionID: '',
            pFieldList: '',
            pRequestEmailType: ''
        },
        url: 'portal/{0}/portalmembercardrequest'
    }
});