/**
 * Created by d3973 on 11/29/2016.
 */
Ext.define('Atlas.plan.model.GroupDetailNodesUnformatted', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'nodeName',
        type: 'string'
    }, {
        name: 'expanded',
        type: 'boolean'
    }, {
        name: 'nodeValue',
        type: 'string'
    }, {
        name: 'children'
    }, {
        name: 'leaf',
        type: 'boolean'
    }, {
        name: 'nodeChecked',
        type: 'number'
    }, {
        name: 'nodeId',
        type: 'number'
    }, {
        name: 'parentNodeId',
        type: 'number'/*
    }, {
        name: 'text',
        type: 'string',
        convert: function(value, record){
            return record.get('nodeValue');
        }*/
    }],

    proxy: {
        url: 'plan/{0}/copyPlanSetupTreeRest'
    }
});