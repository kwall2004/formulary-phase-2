Ext.define('Atlas.portals.provider.MemberHEDISHistoricalEntriesViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.memberhedishistoricalentries',

    afterRender: function () {
        var vm = this.getViewModel();

        this.loadHistoryGrid();

        if  ((this.getViewModel().get('memberAge')) >= 18)  {
            vm.set('title', "Adult BMI Information");
        } else {
            vm.set('title', "Child BMI Information");
        }
    },

    loadHistoryGrid: function () {
        this.lookup('memberId').setValue(this.getViewModel().getData().memberId);
        this.lookup('measureText').setValue(this.getViewModel().getData().measureDesc);
        this.lookup('serviceDueText').setValue(this.getViewModel().getData().dueBy);
        this.lookup('subMeasureText').setValue(this.getViewModel().getData().subMeasure);
    }
});