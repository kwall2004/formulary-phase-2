/*
 * Last Developer: Srujith Cheruku
 * Date: 10-26-2016
 * Previous Developers: []
 * Origin: MHP Member - Services Needed and Completed
 * Description: Store for the Services Needed Information Page
 */
Ext.define('Atlas.portals.hpmember.model.ServicesNeededStore', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: "measureDesc", type: "string"},
        {name: "subMeasure", type: "string"},
        {name: "dueBy", type: "date"},
        {name: "lastSeen", type: "date"},
        {name: "complete", type: "boolean"},
        {name: "measure", type: "number"},
        {name: "numerator", type: "number"},
        {name: "trn", type: "number"},
        {name: "helpText", type: "string"},
        {name: "recipientID", type: "number"},
        {name: "population1", type: "number"},
        {name: "population2", type: "number"},
        {name: "population3", type: "number"},
        {name: "population4", type: "number"},
        {name: "population5", type: "number"},
        {name: "population6", type: "number"},
        {name: "population7", type: "number"},
        {name: "population8", type: "number"},
        {name: "population9", type: "number"},
        {name: "reportYear", type: "number"},
        {name: "systemID", type: "number"},
        {name: "pending", type: "string"},
        {name: "appointmentDate", type: "date"},
        {name: "futureAppointmentDate", type: "date"},
        {name: "provId", type: "number"},
        {name: "createUser", type: "string"},
        {name: "memberReported", type: "boolean"},
        {name: "dbRowID", type: "string"},
        {name: "rowNUm", type: "number"},
        {name: "picknum", type: "number"},
        {name: "mmsystemID", type: "number"}

    ],

    proxy: {
        extraParams: {
            pRows: 200,
            pRowNum: 0
        },
        url: 'portal/hp/memberhedissummarymaster'
    }

});