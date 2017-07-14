/**
 * Created by n6684 on 12/5/2016.
 */

Ext.define('Atlas.admin.model.EDIPartnerInfoForm', {
    extend: 'Atlas.common.model.Base',
    fields: [

    ],
    proxy: {
        url: 'system/{0}/edipartnersall'
    }
});

Ext.define('Atlas.admin.model.setpartnerEDIPartnerDetails', {
    extend: 'Atlas.common.model.Base',
    fields: [

    ],
    proxy: {
        url: 'system/{0}/edipartnerdetails'
    }
});




Ext.define('Atlas.admin.model.setpartnerContactInfo', {
    extend: 'Atlas.common.model.Base',
    fields: [

    ],
    proxy: {
        url: 'system/{0}/contactinfo'
    }
});


Ext.define('Atlas.admin.model.setadminPartnerEDIPatnerRelationMaster', {
    extend: 'Atlas.common.model.Base',
    fields: [

    ],
    proxy: {
        url: 'system/{0}/edipatnerrelationmaster'
    }
});
