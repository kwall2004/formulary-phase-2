Ext.define('Atlas.portals.hpmember.model.MemberProgramEnrollment', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            notes: ''
        },

        url: 'portal/{0}/memberprogramenrollment'
    }
});