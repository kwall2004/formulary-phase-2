/**
 * Created by j2560 on 11/2/2016.
 */
/**
 * Created by j2560 on 10/27/2016.
 */
Ext.define('Atlas.benefitplan.model.servicearea.ServiceAreaBreadCrumb', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'FIPSCntyCodeDesc', type: 'string'},
        {name: 'FIPSCntyCodeSK', type: 'int'},
        {name: 'ISOCntryCode1', type: 'string'},
        {name: 'ISOCntryCodeSK', type: 'int'},
        {name: 'StPrvncCodeSK', type: 'int'},
        {name: 'StPrvncDesc', type: 'string'}
    ]
});