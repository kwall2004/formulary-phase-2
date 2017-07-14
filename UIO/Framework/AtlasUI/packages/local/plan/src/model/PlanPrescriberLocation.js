/**
 * Created by S4505 on 11/7/2016.
 */

Ext.define('Atlas.plan.model.PlanPrescriberLocation', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'NPI', type: 'number'},
        {name: 'Prescribername', type: 'string'},
        {name: 'Address', type: 'string'},
        {name: 'Address2', type: 'string'},
        {name: 'City', type: 'string'},
        {name: 'State', type: 'string'},
        {name: 'Zip', type: 'zipcode'}  //validator is on this type
    ],
    proxy: {
        url: 'prescriber/{0}/prescriberlocationdetail'
    }
});
