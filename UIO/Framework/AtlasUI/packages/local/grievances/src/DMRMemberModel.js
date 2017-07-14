/**
 * Created by agupta on 11/22/2016.
 */

Ext.define('Atlas.grievances.model.DMRMemberModel', {
    extend: 'Atlas.common.model.Base',

    fields: [

    ],
    proxy: {
        extraParams: {
            pID: '',
            pType: '',
            pDOS: ''
        },
        url: 'member/{0}/dmrmember'
    }

});