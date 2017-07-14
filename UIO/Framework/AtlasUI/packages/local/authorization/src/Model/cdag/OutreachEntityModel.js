/**
 * Created by agupta on 10/15/2016.
 */
Ext.define('Atlas.authorization.model.cdag.OutreachEntityModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'OutreachEntity', type : 'number'},
        { name: 'DeterminationType', type : 'string'},
        { name: 'Description', type : 'string'},
        { name: 'AppealStatus', type : 'string'}

    ],
    proxy: {
        extraParams: {
            pAuthID : '',
            pIncCanceled : ''
        },
        url: 'claims/{0}/outreachentity'
    }
});