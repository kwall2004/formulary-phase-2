/**
 * Last Developer: Kevin Tabasan
 * Previous Developer: jagman bhullar
 * Last Worked On: 11/30/2016
 * Origin: MERLIN - Member
 * Description: Main page for Hedis
 **/

Ext.define('Atlas.member.view.HEDIS', {
    extend: 'Ext.grid.Panel',
    xtype: 'member-hedis',
    title: 'HEDIS',
    itemId:'gridHedis',
    forceFit: true,
    bind: {
        store: '{memberhedissummaryall}'

    },
    listeners:{
        itemmouseenter: function(view, record, item, index, e, options)
        {
            var rec = record.getData().measureDesc + ':'+ record.getData().helpText;
            Ext.fly(item).set({ 'data-qtip': rec });
        }
    },
    features: [{
        groupHeaderTpl: '{name}',
        ftype: 'groupingsummary'
    }],
    columns: [
        {
            dataIndex: 'complete',
            text: 'Completed',
            hidden: true,
            renderer : function(value, meta, record)
            {
                if(value)
                    return "<span style='color: green'>Measures Completed</span>";
                else
                    return "<span style='color: red'>Due</span>";
            }
        },
        {
            dataIndex: 'measureDesc',
            text: 'Measure',
            summaryType: 'count',
            summaryRenderer: function(value, summaryData, dataIndex)
            {
                return ((value === 0 || value > 1) ? '<b>(' + value + ' Measures)</b>' : '<b>(1 Measure)</b>');
            }
        },
        {
            dataIndex: 'subMeasure',
            text: 'Sub Measure'
        },
        {
            dataIndex: 'dueBy',
            text: 'Due By',
            formatter: 'date("m/d/Y")'
        },
        {
            dataIndex: 'lastSeen',
            text: 'HEDIS Hit Date',
            formatter: 'date("m/d/Y")'
        }
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        bind: '{memberhedissummaryall}',
        displayInfo: true,
        hideRefresh: true
    }
});
