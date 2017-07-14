/**
 * Created by t3852 on 11/9/2016.
 */
Ext.define('Atlas.portals.hpmember.model.States', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'name', type: 'string'},
        {name: 'value', type: 'string'}
    ],

    data: [
        {name: 'IL', value: 'IL'},
        {name: 'MI', value: 'MI'}
    ]
});