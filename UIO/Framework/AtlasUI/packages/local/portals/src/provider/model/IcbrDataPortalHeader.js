/**
 * Created by m4542 on 11/15/2016.
 */
Ext.define('Atlas.portals.provider.model.IcbrDataPortalHeader', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'receiveTime', type: 'string' },
        { name: 'sentDate', type: 'date', dateFormat: 'Y-m-d'},
        { name: 'ICBRControlNum', type: 'int' },
        { name: 'receiveDate', type: 'date', dateFormat: 'Y-m-d'},
        { name: 'recipientID', type: 'int' },
        { name: 'receiveDateTime', type: 'date'},
        { name: 'source', type: 'string' },
        { name: 'ICBRFileName', type: 'string'},
        { name: 'memberID', type: 'string'}
    ],


    proxy: {
        url: 'caremanagement/hp/icbrdataportalheader'
    }
});