Ext.define('Atlas.portals.hpmember.RequestMemberHandbookViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.portalshpmemberrequestmemberhandbook',

    stores: {
        languages: {
            data: [
                {langCode: 'EN', lang: 'English'},
                {langCode: 'ESP', lang: 'Spanish'}
            ]
        }
    },

    data: {
        planTitle: '',
        statusMessage: '',
        familySelected: false
    }
});