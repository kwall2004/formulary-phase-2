Ext.define('Atlas.portals.view.prescriber.ContactUs',{
    extend: 'Ext.panel.Panel',
    xtype: 'portalsrxprescribercontactus',
    title: 'Contact Us',

    defaults: {
        xtype: 'panel',
        cls: 'card-panel',
        width: 600

    },
    items: [{
        title : "Medicaid",
        defaults: {
            xtype: 'displayfield',
            labelWidth: '10%',
            width: '90%'
        },
        items:[{
            fieldLabel: 'Phone',
            value: "866-984-6462"
        }, {
            fieldLabel: 'Fax',
            value: "877-355-8070"
        }, {
            fieldLabel: 'Address',
            value: "1 Campus Martius #700, Detroit, MI 48226"
        }]
    }, {
        title : "Medicare",
        defaults: {
            xtype: 'displayfield',
            labelWidth: '10%',
            width: '90%'
        },
        items:[{
            fieldLabel: 'Phone',
            value: "855-323-4585"
        }, {
            fieldLabel: 'Fax',
            value: "313-324-1881"
        }, {
            fieldLabel: 'Address',
            value: "1 Campus Martius #700, Detroit, MI 48226"
        }]
    }, {
        title : "Commercial",

        defaults: {
            xtype: 'displayfield',
            labelWidth: '10%',
            width: '90%'
        },
        items:[{
            fieldLabel: 'Phone',
            value: "1-855-291-5226"
        }, {
            fieldLabel: 'Fax',
            value: "1-855-291-5227"
        }, {
            fieldLabel: 'Address',
            value: "1 Campus Martius #700, Detroit, MI 48226"
        }]
    }]
});