/**
 * Created by s6393 on 9/20/2016.
 */
Ext.define('Atlas.benefitplan.model.CostBasisType', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.costbasistypes',
    fields: [
        {name: 'CostBasisTypeSK', type: 'number'},
        {name: 'CostBasisTypeCode', type: 'string'},
        {name: 'CostBasisTypeDesc', type: 'string'}
    ],
    proxy: {
        url: '/CostBasisType'
    }
});