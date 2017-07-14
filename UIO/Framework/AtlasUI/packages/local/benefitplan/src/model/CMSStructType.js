/**
 * Created by s6393 on 9/20/2016.
 */
Ext.define('Atlas.benefitplan.model.CMSStructType', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.cmsstructtypes',
    fields: [
        {name: 'CMSBnftStructTypeSK', type: 'number'},
        {name: 'CMSBnftStructTypeCode', type: 'string'},
        {name: 'CMSBnftStructTypeDesc', type: 'string'}
    ],
    proxy: {
        url: '/CMSBenefitStructureType'
    }
});