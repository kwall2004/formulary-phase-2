/**
 * Created by s6393 on 9/22/2016.
 */
Ext.define('Atlas.benefitplan.model.ExistingBenefit', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
/*        {name: 'BnftSK', type: 'number'},
        {name: 'Benefit Name', type: 'string'},
        {
            name: 'Industry Standard Name',
            convert : function(value, record) {
                return Ext.util.Format.nl2br(value);
            }
        },
        {
            name: 'Network Tier 1',
            convert : function(value, record) {
                return Ext.util.Format.nl2br(value);
            }
        },
        {name: 'Network Tier 4',
            convert : function(value, record) {
                return Ext.util.Format.nl2br(value);
            }
        },
        {name: 'Network Tier 3',
            convert : function(value, record) {
                return Ext.util.Format.nl2br(value);
            }
        },
        {name: 'Out of Network Tier ',
            convert : function(value, record) {
                return Ext.util.Format.nl2br(value);
            }
        }*/
    ],
    proxy: {
        url: '/BenefitPlanViewExisting'
    }
});

