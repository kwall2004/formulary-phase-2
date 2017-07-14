/*
 Developer: Tremaine Grant
 Description: side panel that displays high level claim, medication, Member, prescriber, PCP, Pharmacy
 Origin: Merlin
 8/15/16

 */
Ext.define('Atlas.common.view.sharedviews.CMMPPPPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'CMMPPPPanel',
    viewModel: 'cmmppppanel',
    defaults: {
        collapsible: true
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        title: 'Claim Info',
        defaults: {
            xtype: 'label',
            layout: 'vbox'
        },
        items: [{
            text: 'Authe ID:'
        }, {
            text: 'Auth Date:'
        }, {
            text: 'Reviewer:'
        }, {
            text: 'Plan name:'
        }],
        bind: {
            hidden:'{!showClaim}'
        }
    },{
        title: 'Medication',
        defaults: {
            xtype: 'label',
            layout: 'vbox'
        },
        items: [{
            text: 'GCN:'
        }, {
            text: 'GPI Code:'
        }, {
            text: 'Drug:'
        }],
        bind: {
            hidden:'{!showMedication}'
        }
    },{
        title: 'Member',
        defaults: {
            xtype: 'label',
            layout: 'vbox'
        },
        items: [{
            text: 'ID:'
        }, {
            text: 'Name:'
        }, {
            text: 'LOB:'
        }, {
            text: 'Phone:'
        }, {
            text: 'DOB:'
        }, {
            text: 'Gender:'
        }],
        bind: {
            hidden:'{!showMember}'
        }
    },{
        title: 'PCP',
        defaults: {
            xtype: 'label',
            layout: 'vbox'
        },
        items: [{
            text: 'NPI:'
        }, {
            text: 'Name:'
        }, {
            text: 'Phone:'
        }, {
            text: 'Fax:'
        }],
        bind: {
            hidden:'{!showPCP}'
        }
    }, {
        title: 'Pharmacy',
        defaults: {
            xtype: 'label',
            layout: 'vbox'
        },
        items: [{
            text: 'NCPDP:'
        }, {
            text: 'Name:'
        }, {
            text: 'Phone:'
        }],
        bind: {
            hidden:'{!showPharmacy}'
        }
    }]
});