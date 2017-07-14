/**
 * Created by s6393 on 9/19/2016.
 */
Ext.define('Atlas.benefitplan.view.planbenefitpackage.PackageBreadcrumb', {
    extend: 'Ext.panel.Panel',
    xtype: 'pacakge-breadcrumb-toolbar',

    defaults: {
        labelWidth: 90,
        anchor: '100%',
        layout: 'vbox'
    },
    overflowHandler: 'scroller',
    bodyPadding: 10,

    tbar: [{
        xtype: 'breadcrumb',
        store: {
            type: 'packagebreadcrumb'
        }
    }]
});