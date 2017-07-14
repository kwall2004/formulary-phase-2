/**
 * Created by b6636 on 11/10/2016.
 */
Ext.define('Atlas.common.hra.model.AssessmentAnswerIO', {
    extend: 'Ext.data.Model',

    fields: [
        'assessmentID',
        'questionID',
        'answerID',
        'answerSeq',
        'answerDescription',
        'answerValue',
        'effectiveDate',
        'termDate',
        'systemID',
        'createUser',
        'createDateTIme',
        'createDate',
        'createTime',
        'termUser',
        'WrdIdx',
        'answerscore',
        'freeTextInd',
        'prepopulateLocation',
        'lookupID',
        'browseID',
        'columnOrder',
        'pixelWidth',
        'rowNum',
        'dbRowID',
        'questionSeq',
        'memberAnswerValue'
    ],

    getControlInfo: function(question) {
        var dateFormat = 'm/d/y';
        if (question.webControlName.indexOf('Date') != -1)
        {
            // this is a date picker - include the format
            if (question.questionDescription.indexOf('MM/YYYY') != -1) {
                dateFormat = 'm/Y';
            }

            return {
                controlType: 'datefield',
                dateFormat: dateFormat
            };
        }
        if (question.webControlName == 'TalkToDoctor') // there is nothing in the question metadata that indicates a text area
        {
            var width = 500;
            if (question.webFieldWidth) {
                width = question.webFieldWidth;
            }
            return {controlType: 'textareafield', width: width};
        }
        if (this.data.freeTextInd == 1) {
            return {controlType: 'textfield'};
        }
        else if (question.maximumAnswers > 1 && this.data.freeTextInd == 0) {
            return {controlType: 'checkbox'};
        }
        else if (this.data.freeTextInd == 0) {
            return {controlType: 'radio'};
        }
        else {
            return {controlType: 'datefield', dateFormat: dateFormat};
        }
    }

    /*
    Uncomment to add validation rules
    validators: {
        age: 'presence',
        name: { type: 'length', min: 2 },
        gender: { type: 'inclusion', list: ['Male', 'Female'] },
        username: [
            { type: 'exclusion', list: ['Admin', 'Operator'] },
            { type: 'format', matcher: /([a-z]+)[0-9]{2,3}/i }
        ]
    }
    */

    /*
    Uncomment to add a rest proxy that syncs data with the back end.
    proxy: {
        type: 'rest',
        url : '/users'
    }
    */
});