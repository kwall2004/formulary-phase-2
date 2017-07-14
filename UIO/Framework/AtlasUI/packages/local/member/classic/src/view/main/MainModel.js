Ext.define('Atlas.member.view.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.memberMainModel',
    //remove this when data is live
    stores: {
        sections: {
            data: [
                {
                    text: 'Demographics',
                    sectionId: 'Demographics'
                },
                {
                    text: 'Authorization',
                    sectionId: 'Authorization'
                },
                {
                    text: 'Contact Log',
                    sectionId: 'ContactLog'
                },
                {
                    text: 'Eligibility History',
                    sectionId: 'EligibilityHistory'
                },
                {
                    text: 'HRA',
                    sectionId: 'HRA'
                },
                {
                    text: 'CSHCS',
                    sectionId: 'CSHCS'
                }
            ]
        }
    }
});