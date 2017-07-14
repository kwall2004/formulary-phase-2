/*
 * Last Developer: Srujith Cheruku
 * Date: 10-26-2016
 * Previous Developers: []
 * Origin: MHP Member - View SBC
 * Description: View for the View SBC Page
 */
Ext.define('Atlas.portals.view.hpmember.ViewSBC', {
    extend: 'Ext.container.Container',
    xtype: 'portalsmembermhpviewsbc',
  //  title: 'Summary of Benefits and Coverage',
    controller: 'portalsMemberViewSBCController',
    viewModel: 'portalsMemberViewSBCModel',
    items: [{
        xtype: 'panel',
        cls: 'card-panel',
        title: 'Summary of Benefits and Coverage',
        width: 680,
        bodyPadding: '15 50 15 15',
        items: [{
            xtype: 'fieldset',
            title: 'Member Info',
            width: 600,
            defaults: {
                xtype: 'textfield',
                readOnly: true,
                labelWidth: 110,
                width: 500,
                style: {
                    padding: '5px'
                }
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Member Name',
                    reference: 'memberNameRef'
                },
                {
                    fieldLabel: 'Plan Type',
                    reference: 'memberPlanTypeRef'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Plan Variant',
                    reference: 'memberPlanVariantRef'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Policy Number',
                    reference: 'memberPolicyNumberRef'
                },
                {
                    fieldLabel: 'Subscriber ID',
                    reference: 'memberSubscriberIdRef'
                },
                {
                    xtype: 'displayfield',
                    reference: 'memberPlanPdfRef',
                    margin: '0 0 3px 7px'
                }],
            listeners: {
                beforerender: 'dispMemberData'
            }

        }]
    }]

});