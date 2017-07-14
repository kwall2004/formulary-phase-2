/**
 * Created by j2560 on 10/27/2016.
 */
Ext.define('Atlas.benefitplan.model.servicearea.ServiceAreaHierarchy', {
    extend: 'Ext.data.TreeModel',
    fields: [
        {name: 'Active'},
        {name: 'ChildrenNodes'},
        {name: 'EntityDescription', type: 'string'},
        {name: 'EntitySK', type: 'int'},
        {name: 'EntityType', type: 'int'}
    ]
});