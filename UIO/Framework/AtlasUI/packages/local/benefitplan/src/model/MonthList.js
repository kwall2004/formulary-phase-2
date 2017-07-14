/**
 * Created by n6570 on 10/31/2016.
 */
Ext.define('Atlas.benefitplan.model.MonthList', {
    extend: 'Atlas.benefitplan.model.Base',

    fields: [
        {name: 'Text',type:'string'},
        {name: 'Value',type:'string'}
    ],
    proxy: {
        url: '/Month'
    }
});


