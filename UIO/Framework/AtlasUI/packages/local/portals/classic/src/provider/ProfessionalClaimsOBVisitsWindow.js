/**
 * Created by c4539 on 11/22/2016.
 */
Ext.define('Atlas.portals.view.provider.ProfessionalClaimsOBVisitsWindow', {
    extend: 'Ext.Container',
    xtype: 'portalsproviderprofessionalclaimsobvisitswindow',
    controller: 'portalsproviderprofessionalclaimsobvisitswindow',
    items: [
        {
            xtype: 'form',
            reference: 'obVisitsForm',
            layout: 'hbox',
            bbar: {
                xtype: 'toolbar',
                layout: {
                    pack: 'center',
                    align: 'center'
                },
                items: [
                    { xtype: 'button', text: 'Update OB Visits', handler: 'updateOBVisits' },
                    { xtype: 'button', text: 'Clear', handler: 'clearOBVisits' }
                ]
            },
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        xtype: 'datefield',
                        format: 'm/d/y',
                        labelWidth: 20
                    },
                    items: [
                        { fieldLabel: '1',reference: 'obVisit1', name: 'obVisit1' },
                        { fieldLabel: '2',reference: 'obVisit2', name: 'obVisit2' },
                        { fieldLabel: '3',reference: 'obVisit3', name: 'obVisit3' },
                        { fieldLabel: '4',reference: 'obVisit4', name: 'obVisit4' },
                        { fieldLabel: '5',reference: 'obVisit5', name: 'obVisit5' }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        xtype: 'datefield',
                        format: 'm/d/y',
                        labelWidth: 20
                    },
                    items: [
                        { fieldLabel: '6',reference: 'obVisit6', name: 'obVisit6' },
                        { fieldLabel: '7',reference: 'obVisit7', name: 'obVisit7' },
                        { fieldLabel: '8',reference: 'obVisit8', name: 'obVisit8' },
                        { fieldLabel: '9',reference: 'obVisit9', name: 'obVisit9' },
                        { fieldLabel: '10',reference: 'obVisit10', name: 'obVisit10' }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        xtype: 'datefield',
                        format: 'm/d/y',
                        labelWidth: 20
                    },
                    items: [
                        { fieldLabel: '11',reference: 'obVisit11', name: 'obVisit11' },
                        { fieldLabel: '12',reference: 'obVisit12', name: 'obVisit12' },
                        { fieldLabel: '13',reference: 'obVisit13', name: 'obVisit13' },
                        { fieldLabel: '14',reference: 'obVisit14', name: 'obVisit14' },
                        { fieldLabel: '15',reference: 'obVisit15', name: 'obVisit15' }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        xtype: 'datefield',
                        format: 'm/d/y',
                        labelWidth: 20
                    },
                    items: [
                        { fieldLabel: '16',reference: 'obVisit16', name: 'obVisit16' },
                        { fieldLabel: '17',reference: 'obVisit17', name: 'obVisit17' },
                        { fieldLabel: '18',reference: 'obVisit18', name: 'obVisit18' },
                        { fieldLabel: '19',reference: 'obVisit19', name: 'obVisit19' },
                        { fieldLabel: '20',reference: 'obVisit20', name: 'obVisit20' }
                    ]
                }
            ]
        }
    ]
});