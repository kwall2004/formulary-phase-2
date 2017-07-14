Ext.define('Atlas.plan.store.BenefitDetailTree', {
    alias: 'store.plan-benefitdetailtree',
    extend: 'Ext.data.TreeStore',
    root: {
        text: 'All Criteria',
        iconCls: 'x-fa fa-home',
        expanded: true,
        checked: false,
        children: [
            {text: 'Benefit DUR', leaf: true, checked: false},
            {text: 'Plan DUR Rules', leaf: true, checked: false},
            {text: 'Plan Letter Info', leaf: true, checked: false},
            {text: 'Plan Letter Detail', leaf: true, checked: false},
            {
                text: 'Plan Benefit Setup',
                expanded: true,
                checked: false,
                children: [
                    {text: 'Plan Benefit Limits', leaf: true, checked: false},
                    {text: 'Plan Pharma Limits', leaf: true, checked: false},
                    {text: 'Plan Fees', leaf: true, checked: false},
                    {
                        text: 'Plan Coverage Phase',
                        expanded: true,
                        checked: false,
                        children: [
                            {

                                text: 'Plan Copay',
                                expanded: true, checked: false,
                                children: [
                                    {text: 'Plan Copay Distribution', leaf: true, checked: false}
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
    /*autoLoad: true,
     proxy: {
     type: 'ajax',
     url: 'resources/data/groupdetailtree',
     useDefaultXhrHeader: false
     }*/
});