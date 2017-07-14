/**
 * Created by j3703 on 10/10/2016.
 */
Ext.define('Atlas.benefitplan.view.contactdetails.ContactExportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ContactExportController',
    init: function() {
        //set test values, these can be replaced once the parent page is created and can pass these in
        var me=this,
            vm = me.getViewModel();
        me.setUserId(vm.get('user').un);
        var breadCrumbStore = vm.getStore('BreadCrumb');
        breadCrumbStore.getProxy().setExtraParam("EntityType", this.getView().EntityType);
        breadCrumbStore.getProxy().setExtraParam("EntityTypeSK", this.getView().EntityTypeSK);
        Ext.getBody().mask('Loading');
        breadCrumbStore.load( {callback: function(records){
            vm.set('TenantFamSK',records[0].get('TenantFamSK'));
            vm.set('TenantFamName',records[0].get('TenantFamName'));
            if (records[0].get('TenantFamSK') == 0) {
                vm.set('HideTenantFam',true);
            }
            vm.set('TenantSK',records[0].get('TenantSK'));
            vm.set('TenantName',records[0].get('TenantName'));
            if (records[0].get('TenantSK') == 0) {
                vm.set('HideTenant',true);
            }
            vm.set('AcctSK',records[0].get('AcctSK'));
            vm.set('AcctName',records[0].get('AcctName'));
            if (records[0].get('AcctSK') == 0) {
                vm.set('HideAcct',true);
            }
            vm.set('GrpSK',records[0].get('GrpSK'));
            vm.set('GrpName',records[0].get('GrpName'));
            if (records[0].get('GrpSK') == 0) {
                vm.set('HideGrp',true);
            }
            vm.set('PopGrpSK',records[0].get('PopGrpSK'));
            vm.set('PopGrpName',records[0].get('PopGrpName'));
            if (records[0].get('PopGrpSK') == 0) {
                vm.set('HidePopGrp',true);
            }
            Ext.getBody().unmask();
        }});
        //get the PBP and Userid variabes that were passed
        this.getView().show();
	},
    setEntityId: function(Id) {
        this.PBPSK = Id;
    },
    setUserId: function(Id) {
        this.UserId = Id;
    },
    onSelectAllClick: function(){
        var vm = this.getViewModel()
        if (!vm.get('HideTenantFam')){
            this.lookup('TenantFamExportCombo').setValue(true);
        }
        if (!vm.get('HideTenant')){
            this.lookup('TenantExportCombo').setValue(true);
        }
        if (!vm.get('HideAcct')){
            this.lookup('AcctExportCombo').setValue(true);
        }
        if (!vm.get('HideGrp')){
            this.lookup('GrpExportCombo').setValue(true);
        }
        if (!vm.get('HidePopGrp')){
            this.lookup('PopGrpExportCombo').setValue(true);
        }
    },
    onExportClick: function (){
        var vm = this.getViewModel(),
            url =  Atlas.apiReportServiceURL;
        url += "?%2fAtlas%2fBenefitPlan%2fExportContacts&rs:Format=";
        url += this.lookup('contactExportFormatCombo').getValue();
        if(this.lookup('TenantFamExportCombo').getValue())
        {
            url += '&TenantFamSK=' + vm.get('TenantFamSK')
        }
        else
        {
            url += '&TenantFamSK:IsNull=True';
        }
        if(this.lookup('TenantExportCombo').getValue())
        {
            url += '&TenantSK=' + vm.get('TenantSK')
        }
        else
        {
            url += '&TenantSK:IsNull=True';
        }
        if(this.lookup('AcctExportCombo').getValue())
        {
            url += '&AcctSK=' + vm.get('AcctSK')
        }
        else
        {
            url += '&AcctSK:IsNull=True';
        }
        if(this.lookup('GrpExportCombo').getValue())
        {
            url += '&GrpSK=' + vm.get('GrpSK');
        }
        else
        {
            url += '&GrpSK:IsNull=True';
        }
        if(this.lookup('PopGrpExportCombo').getValue())
        {
            url += '&PopGrpSK=' + vm.get('PopGrpSK')
        }
        else
        {
            url += '&PopGrpSK:IsNull=True';
        }
        url +=  "&rs:ClearSession=true";
        window.open(url, '_blank', 'width=150,height=150');
    },
    onCancelClick: function (){
        this.getView().close();
    }
});
