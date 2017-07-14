/**
 * Created by agupta on 12/7/2016.
 */

Ext.define('Atlas.member.model.TermMembersModel', {
    extend: 'Atlas.common.model.Base',

    fields: [

    ],

    proxy: {
        extraParams: {
            pOutFileName: '',
            pParameters : ''
        },
        url: 'member/{0}/termmembers'
    }

});