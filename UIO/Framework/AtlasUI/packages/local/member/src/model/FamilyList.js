/**
 * Created by p3946 on 8/30/2016.
 */
Ext.define('Atlas.member.model.FamilyList', {
    extend: 'Atlas.common.model.Base',

    fields: [

    ],

    proxy: {
        url: 'member/{0}/memberfamilylist'
    }
});