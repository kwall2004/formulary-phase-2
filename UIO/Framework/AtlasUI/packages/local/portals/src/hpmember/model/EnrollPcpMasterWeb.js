/**
 * Created by b6636 on 11/7/2016.
 */
Ext.define('Atlas.portals.hpmember.model.EnrollPcpMasterWeb', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'recipientID',
        'pcpID',
        'pcpName',
        'capitated',
        'sourceCode',
        'sDate',
        'eDate',
        'termreason',
        'systemid',
        'dbRowID',
        'rowNUm'
        ],

    proxy: {
        url : 'portal/hp/enrollpcpmasterweb'
    }
});