/**
 * Created by b6636 on 11/10/2016.
 */
Ext.define('Atlas.common.hra.model.MemberAssessmentQA', {
    extend: 'Ext.data.Model',

    fields: [
        'assessmentID',
        'questionID',
        'questionSeq',
        'questionDescription',
        'effectiveDate',
        'termDate',
        {name: 'dependancyLocation', type: 'array', delimiter: '^'},
        'minimumAnswers',
        'maximumAnswers',
        'sectionHeader',
        'displayOrder',
        'systemID',
        'createUser',
        'createDateTIme',
        'createDate',
        'createTime',
        'termUser',
        'WrdIdx',
        'textfont',
        'textbgcolor',
        'textfgcolor',
        'tooltip',
        'maxscore',
        'questionGroupID',
        'xPosition',
        'yPosition',
        'webShow',
        'webFieldWidth',
        'webQuestionLabelWidth',
        'webQuestionPanelWidth',
        'webRadioColumns',
        'webControlName',
        'questionFieldName',
        'rowNum',
        'dbRowID'
    ],

    getControlName: function(sectionId) {
        if (this.data.webControlName) {
            return this.data.webControlName;
        }
        else {
            return '' + sectionId + '_' + this.data.questionID;
        }
    },

    isSubQuestion: function() {
        if (this.data.dependancyLocation.length > 0){
            return true;
        }
        else {
            return false;
        }
    },

    dependencyQuestionId: function() {
        if (this.data.dependancyLocation) {
            return parseInt(this.data.dependancyLocation[1]);
        }
        else {
            return null;
        }
    },

    dependencyEnableValue: function() {
        if (this.data.dependancyLocation) {
            return this.data.dependancyLocation[2];
        }
        else {
            return null;
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