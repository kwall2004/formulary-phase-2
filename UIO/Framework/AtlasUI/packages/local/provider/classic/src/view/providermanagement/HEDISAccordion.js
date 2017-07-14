Ext.define('Atlas.provider.view.providermanagement.HEDISAccordion', {
    extend: 'Ext.panel.Panel',
    
    requires: [
        'Ext.layout.container.Accordion'
    ],
    xtype: 'x-layout-accordion',
    layout: 'accordion',
    initComponent: function() {
        Ext.apply(this, {
            items: [{
                title: '1 - Childhood Immunization Status',
                html: 'Empty'
            }, {
                title: '2 - Adolescent Immunization Status',
                html: 'Empty'
            }, {
                title: '3 - Breast Cancer Screening',
                html: 'Empty'
            }, {
                title: '4 - Cervical Cancer Screening',
                html: 'Empty'
            }, {
                title: '5 - Prenatal and Postpartum Care',
                html: 'Empty'
            }, {
                title: '10 - Comprehensive Diabetes Care',
                html: 'Empty'
            }]
        });
        this.callParent();
    }
});