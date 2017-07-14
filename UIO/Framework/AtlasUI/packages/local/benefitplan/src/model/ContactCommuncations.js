/**
 * Created by j2560 on 9/27/2016.
 */
Ext.define('Atlas.benefitplan.model.ContactCommunications', {
    extend: 'Atlas.benefitplan.model.Base',
    proxy: {
        type: 'memory'
    },
    fields: [
        {name: 'CommunicationSK', type: 'int'},
        {name: 'Value', type: 'string'},
        {name: 'CommunicationTypeRaw', type: 'string'},
        {name: 'IsDeleted', type: 'boolean'},
        {name: 'CommunicationType', type: 'int'}
    ],
    validators: {
        Value: [
            {type: 'presence'}
            //{type: 'format', matcher: /^\d{3}-?\d{3}-?\d{4}$/, message: 'Must be in the format xxx-xxx-xxxx'}
        ]
    }
});