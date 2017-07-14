/**
 * Created by g2304 on 10/27/2016.
 */
Ext.define('Atlas.common.ux.grid.PageGrid', {
    extend: 'Ext.panel.Panel',
    xtype:'pagegrid',
    gridConfig: null,
    paginationConfig: null,
    store:null,
    layout: {
        type: 'fit',
        align: 'stretch'
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    },
    items:[
        {xtype: 'grid'}
    ],

    listeners:{
        boxready: function(thePanel){
            Ext.MessageBox.alert('hi');
        }
    }
});