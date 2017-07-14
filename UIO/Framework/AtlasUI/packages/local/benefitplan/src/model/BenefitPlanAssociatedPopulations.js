/**
 * Created by s6635 on 11/22/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitPlanAssociatedPopulations', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {
            name: 'name',
            convert: function (value, record) {

                var namePrefix = '';
                switch (record.get('EntityType')) {
                    case 10:
                        namePrefix = 'Tenant Family: ';
                        break;
                    case 20:
                        namePrefix = 'Tenant: ';
                        break;
                    case 30:
                        namePrefix = 'Account: ';
                        break;
                    case 40:
                        namePrefix = 'Group: ';
                }
                return namePrefix + record.get('EntityDescription');
            }
        }, {
            name: 'leaf',
            convert: function (value, record) {
                return record.get('EntityType') == 50;
            }
        }, {
            name: 'expanded',
            defaultValue: true
        }
    ],
    proxy: {
        url: '/TenantHierarchyBenefitPlanAssociatedPopulations'
    }
});
