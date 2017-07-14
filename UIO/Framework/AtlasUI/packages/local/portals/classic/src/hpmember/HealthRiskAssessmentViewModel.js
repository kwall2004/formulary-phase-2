/**
 * Created by b6636 on 10/18/2016.
 */
Ext.define('Atlas.portals.hpmember.HealthRiskAssessmentViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.healthriskassessment',

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
        primaryLanguagesVM : [
                { "boxLabel": "French", "name": "whatIsPrimaryLanguage", "inputValue": "F" },
                { "boxLabel": "Russian", "name": "whatIsPrimaryLanguage", "inputValue": "R" },
                { "boxLabel": "Spanish", "name": "whatIsPrimaryLanguage", "inputValue": "S" },
                { "boxLabel": "Japaneese", "name": "whatIsPrimaryLanguage", "inputValue": "J" },
                { "boxLabel": "Chinese", "name": "whatIsPrimaryLanguage", "inputValue": "C" },
                { "boxLabel": "Arabic", "name": "whatIsPrimaryLanguage", "inputValue": "A" },
                { "boxLabel": "Italian", "name": "whatIsPrimaryLanguage", "inputValue": "I" }
            ],
            englishPrimaryVM : [
                { "name": "englishPrimaryLanguage", "boxLabel": "Yes", "inputValue": "Y" },
                { "name": "englishPrimaryLanguage", "boxLabel": "No", "inputValue": "N" }
            ]
    }
});