/**
 * Created by agupta on 11/8/2016.
 */

Ext.define('Atlas.authorization.model.cdag.OutreachEntityModelMemberAppeal', {
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
        url: 'claims/{0}/outreachentity',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                if(payload.data.length > 0) {
                    payload.data.forEach(function (item, index) {
                        if (item.DeterminationType == 'CD' || item.DeterminationType == 'DMR' || (item.Description.indexOf('Provider') > -1)) {
                            //objRespLinkedDeterminationStore.data.remove(item);
                            payload.data.splice(index, 1);
                        }
                    });
                    return payload.data;
                }
            }
        }
    }
});