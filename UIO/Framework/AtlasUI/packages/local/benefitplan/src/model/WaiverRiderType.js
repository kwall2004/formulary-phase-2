/**
 * Created by s6393 on 9/20/2016.
 */
Ext.define('Atlas.benefitplan.model.WaiverRiderType', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.benefitplanwaiverridertypes',
    fields: [
        {name: 'WvrRiderTypeSK', type: 'number'},
        {name: 'WvrRiderCode', type: 'string'}
    ],
    proxy: {
        url: '/WaiverRiderType'
    }
});