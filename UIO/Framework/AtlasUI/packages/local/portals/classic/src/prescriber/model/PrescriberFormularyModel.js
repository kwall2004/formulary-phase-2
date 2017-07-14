Ext.define('Atlas.portals.view.prescriber.model.PrescriberFormularyModel', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'planGroupName', type: 'string'},
        {name: 'planGroupId', type: 'int'}
    ],

    proxy: {
        url: 'portal/{0}/allactiveplangroups'
    }

});