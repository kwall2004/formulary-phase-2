/**
 * Created by agupta on 11/30/2016.
 */


Ext.define('Atlas.admin.model.adminpartnerEDIPartnerModel', {
    extend: 'Atlas.common.model.Base',
    fields: [

    ],
    proxy: {
        url: 'system/{0}/edipartnersall'
    }

});



Ext.define('Atlas.admin.model.adminpartnergetContactInfo', {
    extend: 'Atlas.common.model.Base',

    fields: [

    ],
    proxy: {
        url: 'system/{0}/contactinfo'
    }

});


Ext.define('Atlas.admin.model.adminpartnergetEDIPartnerRelationMasterExt', {
    extend: 'Atlas.common.model.Base',
    fields: [

    ],
    proxy: {
        url: 'system/{0}/EDIPartnerRelationMasterExt'
    }

});
