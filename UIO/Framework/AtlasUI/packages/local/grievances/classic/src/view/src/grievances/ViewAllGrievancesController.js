Ext.define('Atlas.grievances.view.grievances.ViewAllGrievancesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ViewAllGrievancesController',

    InitiatedBy_Renderer : function (item, record) {
        var res = (record.record.data.InitType == null ? "" : record.record.data.InitType) + " (" + (record.record.data.initiatedByID == null ? "" : record.record.data.initiatedByID) + ")";
        return res;
    },

    InitiatorFullName_Renderer : function(item, record){
        var res = record.record.data.InitiatorFName + " " + record.record.data.InitiatorLName;
        return res;
    },

    ReportingOn_Renderer : function(item, record){
        var res = (record.record.data.ReptType == null ? "" : record.record.data.ReptType) + " (" + (record.record.data.ReportingOnId == null ? "" : record.record.data.ReportingOnId) + ")";
        return res;
    },

    Status_Renderer : function(item, record){
        var res = '';
        switch(record.record.data.Stat){
            case 'O':
                res = 'Open';
                break;
            case 'C':
                res = 'Closed';
                break;
            case 'E':
                res = 'Extension Requested';
                break;
            case 'D':
                res = 'Canceled';
                break;
        }
        return res;
    },

    DaysOpen_Renderer  : function(item, record){
        var res = '';
        if(record.record.data.Stat == 'O' || record.record.data.Stat == 'E'){
            var sInitDate = record.record.data.GrievanceInitDate != null ?  record.record.data.GrievanceInitDate : '';
            if(sInitDate != '') {
                var days = Math.ceil((Math.abs((Atlas.common.utility.Utilities.getLocalDateTime()).getTime() - new Date(sInitDate).getTime())) / (1000 * 3600 * 24));
                res = days;
            }
        }
        else {
            res = '';
        }
        return res;
    },


    gpGrievance_ItemClick: function (dv, record, item, index, e) {
        var grievanceId = record.data.GrievanceID;
        this.fireEvent('parentEventGetGrievanceDetails', grievanceId);
        var win = Ext.WindowManager.getActive();
        if (win) {
            win.close();
        }
    },

    //initViewModel: function () {
    init:function(){
        var view = this.getView(),atlasId='';

        if(view.atlasId)
         atlasId = view.atlasId;
        if(atlasId !== null) {
            this.getGrievanceSummary(atlasId);
        } else {
            this.getGrievanceSummary(null);
        }
    },

    getGrievanceSummary: function (stat) {
        var statPassed;
        if(stat === null){
            statPassed = '';
        } else {
            statPassed = stat;
        }
        var view = this.getView();
        var vm = this.getViewModel();
        var storeGrievances = vm.getStore('StoreGrievances');
        storeGrievances.getProxy().setExtraParam('pStat', statPassed);
        storeGrievances.load();
    },


    levelRenderer:function(value)
    {
        //debugger;
        if(value) {
            if (value == "1")
                return "Level 1 (Non-Expedited)";
            else if (value =="2")
                return "Level 1 (Expedited)";
            else if (value == "3")
                return "Level 2";
        }
        return '';
    }
});