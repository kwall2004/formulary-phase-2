/**
 * Created by t3852 on 10/18/2016.
 */
Ext.define('Atlas.portals.view.hpmember.ContactUs', {
    extend: 'Ext.container.Container',
    xtype: 'portalshpmembercontactus',
    title: 'Contact Us',
    controller: 'hpmembercontactusviewcontroller',
    scrollable: 'horizontal',

    defaults: {
        width: 700
    },

    viewModel: {
        stores: {
            'contacts': {
                model: 'Atlas.portals.hpmember.model.BpcContactDetails'
            }
        }
    },

    items: [
        {
            defaults: {
                xtype: 'textfield',
                width: 400,
                labelWidth: 145,
                readOnly: true,
                style: {
                    padding: '5px'
                }
            },
            title: 'By Phone',
            cls: 'card-panel',
            items: [
                {
                    fieldLabel: 'Member Services',
                    bind: '{userRecord.memberService}'
                },
                {
                    fieldLabel: 'Behavioral Services',
                    bind: '{userRecord.behavorialService}'
                },
                {
                    fieldLabel: 'Transportation',
                    bind: '{userRecord.transportation}'
                },
                {
                    fieldLabel: 'TTY',
                    bind: '{userRecord.tty}'
                }
            ]
        },
        {
            defaults: {
                xtype: 'displayfield',
                style: {
                    padding: '5px'
                }
            },
            title: 'By Email',
            cls: 'card-panel',
            items: [
                {
                    bind: '{userRecord.serviceEmail}'
                }
            ]
        },
        {
            defaults: {
                xtype: 'displayfield',
                style: {
                    padding: '5px'
                }
            },
            title: 'By Mail',
            cls: 'card-panel',
            items: [
                {
                    bind: '{userRecord.address.planname}'
                },
                {
                    bind: '{userRecord.address.address1}, {userRecord.address.address2}'
                },
                {
                    bind: '{userRecord.address.city}, {userRecord.address.state} {userRecord.address.zip}'
                }
            ]
        }

    ]
});