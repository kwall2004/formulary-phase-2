/**
 * Created by p3946 on 8/2/2016.
 */
Ext.define('Atlas.member.view.DemographicsCoverageHistroy', {
    extend: 'Ext.panel.Panel',

    xtype: 'member-demographicscoveragehistroy',

    initComponent: function () {
        Ext.apply(this, {
            width: 500,
            height: 400,
            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },

            bodyPadding: 10,

            defaults: {
                frame: true,
                bodyPadding: 10
            },
            items: [
                {
                    xtype: 'grid',
                    title: 'Change History',
                    flex: 1,
                    margin: '0 0 10 0',
                    bind: {
                        store: '{auditmaster}'
                    },
                    columns: [
                        {
                            text: 'Action'
                        },
                        {
                            text: 'Audit Date'
                        },
                        {
                            text: 'Modified By'
                        },
                        {
                            text: 'Source'
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    title: 'Fields Changed',
                    flex: 1,
                    margin: '0 0 10 0',
                    bind: {
                        store: '{auditmaster}'
                    },
                    columns: [
                        {
                            text: 'Field Name'
                        },
                        {
                            text: 'Old Value'
                        },
                        {
                            text: 'New Value'
                        }
                    ]
                }
            ]
        });
        this.callParent();
    }
});