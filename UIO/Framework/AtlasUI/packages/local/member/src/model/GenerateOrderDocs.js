/**
 * Created by p3946 on 8/24/2016.
 */
Ext.define('Atlas.member.model.GenerateOrderDocs', {
    extend: 'Atlas.common.model.Base',

    fields: [
        'jobId'
    ],

    proxy: {
        url: 'member/{0}/generateorderdocs'
    }

});