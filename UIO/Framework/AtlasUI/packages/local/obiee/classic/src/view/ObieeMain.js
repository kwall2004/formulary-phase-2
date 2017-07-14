/**
 * Created by g2304 on 10/28/2016.
 */
Ext.define('Atlas.obiee.view.ObieeMain', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Atlas.obiee.view.ObieeMainController'
    ],
    viewModel:{
        data: {
            url: null
        }
    },
    controller: 'obieemain',

    layout: {type:'fit', align: 'stretch'},

    xtype: 'cmc.merlin.obieemain',
    items: [{
        xtype: 'box',
        autoEl: {
            tag: 'iframe',
            src: ''
        }
    }]
});