/**
 * Created by j2560 on 7/11/2016.
 */
Ext.define('Atlas.casemanagement.view.ContactLog', {
    extend: 'Ext.Container',
    alias: 'widget.casemanagement-contactlog',
    xtype: 'casemanagement-contactlog',
    controller: 'contactlogcontroller',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        flex: 1,
        xtype: 'common-contactlog',
        dialogxtypecontroller: 'addcontactcontroller'
    }]
})
