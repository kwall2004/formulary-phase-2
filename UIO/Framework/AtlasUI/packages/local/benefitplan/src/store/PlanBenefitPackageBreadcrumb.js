/**
 * Created by s6393 on 9/19/2016.
 */
Ext.define('Atlas.benefitplan.store.PlanBenefitPackageBreadcrumb', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.packagebreadcrumb',

    rootData: {
        text: 'Tenant Family: Caidan',
        expanded: true,
        children: [
            {
                text: 'Tenant: MHP IL',
                expanded: true,
                children: [
                    {
                        text: 'Account : MeridianCare',
                        expanded: true,
                        children:[
                            {
                                text: 'Group: MeridianCare IL',
                                expanded: true,
                                children:[
                                    {
                                        text: 'Population Group :MeridianCare IL Memebers'
                                    }
                                    ]
                            }
                        ]
                    }
                ]
            }
        ]
    },

    constructor: function (config) {
        // Since records claim the data object given to them, clone the data
        // for each instance.
        config = Ext.apply({
            root: Ext.clone(this.rootData)
        }, config);

        this.callParent([config]);
    }
});