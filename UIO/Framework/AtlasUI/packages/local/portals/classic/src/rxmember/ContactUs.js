Ext.define('Atlas.portals.view.rxmember.ContactUs',{
    extend: 'Ext.panel.Panel',
    xtype: 'portalsrxmembercontactus',
    controller: 'rxmembercontactusviewcontroller',
    title: 'Contact Us',

    viewModel: {
        stores: {
            'contacts': {
                model: 'Atlas.portals.rxmember.model.PlanAddresses'
            },

            'memberCoverages': {
                model: 'Atlas.portals.rxmember.model.MemberCoverage',
                filters: [
                    function(item) {
                        return item.get('TermDate') == '' || new Date(item.get('TermDate')).getTime() >= new Date().getTime();
                    }
                ]
            }
            
        },

        data: {
            Address: "",
            PlanPhone: "",
            WebAddress: "",
            Email: ""
        }
    },

    items: [{
        xtype: 'panel',
        title: 'Contact Us',
        cls: 'card-panel',
        defaults: {
            xtype: 'displayfield',
            labelWidth: 150
        },
        items: [
            {
                fieldLabel: 'Address',
                name: 'Address1',
                reference: 'Address1',
                bind: {
                    value: "{Address}"
                },
                cls: 'contactUsFont'
            },

            {
                fieldLabel: 'Phone',
                name: 'PlanPhone',
                reference: 'PlanPhone',
                bind: {
                    value: "{PlanPhone}"
                },
                cls: 'contactUsFont'
            },

            {
                fieldLabel: 'Web Address',
                bind: {
                    value: "{WebAddress}"
                },
                cls: 'contactUsFont'
            },
            {
                fieldLabel: 'Email',
                bind: {
                    value: "{Email}"
                },
                cls: 'contactUsFont'
            }
        ]
    }]
});