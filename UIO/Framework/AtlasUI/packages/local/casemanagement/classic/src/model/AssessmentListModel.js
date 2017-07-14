Ext.define('Atlas.casemanagement.model.AssessmentListModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'assesmentListDescription', type: 'string'},
        {name: 'assesmentListItem', type: 'int'},
        {name: 'answer'},
        {
            name: 'AnswerTest', mapping: function (data) {
            if (data.answer == 'Y') {
                return true;
            }
            else {
                return false;
            }
        }
        },
        {name: 'systemId', type: 'int'}
    ],
    proxy: {
        url: 'member/{0}/assessmentmasterdetail',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        extraParams: {
            pAssesmentListName: "",
            pParentSystemId: "0"
        }
    }
})