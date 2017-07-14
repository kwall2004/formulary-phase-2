Ext.define('Atlas.benefitplan.view.benefitplanprogress.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.benefitplan-mainbenefitplanprogresscontroller',
    listen : {
        //listen to events using GlobalEvents
        controller : {
            '*': {
                proceedWithProgressNavigation : 'proceedWithProgressNavigation'
            }
        }
    },
    getProgressItem: function(viewnumber, whichnumber, viewclass, viewlabel, lastclass) {
        var thisclass='';
        if(viewnumber == whichnumber) {
            thisclass='is-active';
        } else if(viewnumber > whichnumber) {
            thisclass='is-complete';
        }
        return'<li class="'+lastclass+thisclass+'" data-step="'+whichnumber+'" view-class="'+viewclass+'">'+viewlabel+'</li>';
    },
    afterRender: function() {
        var me = this,
            vm = me.getViewModel(),
            LOBName = vm.get('LOBName'),
            viewnumber = vm.get('viewnumber'),
            progresscode = '';
        Ext.suspendLayouts();
        if(vm.get('cmbBenefitType') != 2) {//medical
            progresscode = '<ol class="atlasprogress atlasprogress--medium">';
            progresscode += me.getProgressItem(viewnumber, 1, "benefitplandetailconfiguration.Main", "Benefit Plan Configuration", '');
            progresscode += me.getProgressItem(viewnumber, 2, "costsharemaximums.CostShareMaximums", "Cost Share Configuration", '');
            progresscode += me.getProgressItem(viewnumber, 3, "coveragesetconfiguration.Main", "Coverage Set Configuration", '');
            progresscode += me.getProgressItem(viewnumber, 4, "benefitconfiguration.Main", "Benefit Configuration", 'progress__last ');
        }
        else {//rx
            progresscode = '<ol class="atlasprogress">';
            progresscode += me.getProgressItem(viewnumber, 1, "benefitplandetailconfiguration.Main", "Benefit Plan Configuration", '');
            progresscode += me.getProgressItem(viewnumber, 2, "coveragephase.Main", "Coverage Phase Configuration", '');
            progresscode += me.getProgressItem(viewnumber, 3, "costsharemaximums.CostShareMaximums", "Cost Share Configuration", '');
            progresscode += me.getProgressItem(viewnumber, 4, "PharmacyTypes.Main", "Pharmacy Types", '');
            progresscode += me.getProgressItem(viewnumber, 5, "planexceptionlimits.PlanExceptionLimits", "Plan Exception Limits", '');
            progresscode += me.getProgressItem(viewnumber, 6, "copayconfiguration.Main", "Plan Copay Configuration", '');
            progresscode += me.getProgressItem(viewnumber, 7, "costsharingexceptions.Main", "Cost Sharing Exceptions", '');
           if(LOBName == 3 || LOBName == 4 ) //  LICS Config is needed only for LOB = Medicaid or Medicare
            {
                progresscode += me.getProgressItem(viewnumber, 8, "planpricingconfiguration.Main", "Pricing", '');
                progresscode += me.getProgressItem(viewnumber, 9, "transitionconfiguration.Main", "Transition Configuration", '');
                progresscode += me.getProgressItem(viewnumber, 10, "medicareconfiguration.Main", "Medicare Configuration", '');
                progresscode += me.getProgressItem(viewnumber, 11, "copaydistribution.Main", "Copay Distribution", 'progress__last ');
            }
            else
            {
                progresscode += me.getProgressItem(viewnumber, 8, "planpricingconfiguration.Main", "Pricing");
                progresscode += me.getProgressItem(viewnumber, 9, "transitionconfiguration.Main", "Transition Configuration", 'progress__last ');
            }
        }
        progresscode+='</ol>';
        me.getView().down('[itemId="progressbar"]').update(progresscode);
        Ext.resumeLayouts(true);
    },
    onProgressClick: function(e, t){
        if(t.getAttribute('view-class')) {
            var me = this,
                onPricingValue = Ext.util.Cookies.get('onPricingValue');
            if (!((onPricingValue == 2 || onPricingValue == 3) && t.getAttribute('view-class') == 'planpricingconfiguration.Main')) {
                var cmbBenefitPlanSK = me.getViewModel().get('cmbBenefitPlanSK'),
                    iscopy = (me.getViewModel().get('isCopy') == undefined) ? false : me.getViewModel().get('isCopy');
                if (me.getViewModel().get('viewclass').indexOf(t.getAttribute('view-class')) == -1) {
                    me.fireEvent('benefitPlanHasUnsavedRecords', {
                        t: t.getAttribute('view-class'),
                        atlasId: cmbBenefitPlanSK,
                        LOBName: me.getViewModel().get('LOBName'),
                        cmbBenefitType: me.getViewModel().get('cmbBenefitType'),
                        cmbBenefitPlanSK: cmbBenefitPlanSK,
                        iscopy: iscopy
                    });
                }
            } else {
                Ext.Msg.show({
                    title: 'Info',
                    msg: 'Pricing on Plan Configuration is not "Spread", so Pricing is not available for this plan.',
                    buttons: Ext.Msg.OK,
                    closable: false,
                    draggable: false,
                    resizable: false
                });
            }
        }
    },
    proceedWithProgressNavigation: function(args) {
        var me = this;
        me.fireEvent('openView', 'merlin', 'benefitplan', args.t, {
            menuId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            PId: Atlas.common.Util.menuIdFromRoute('merlin/benefitplan/benefitplan_Main'),
            atlasId: args.cmbBenefitPlanSK,
            cmbBenefitPlanSK: args.cmbBenefitPlanSK,
            cmbBenefitType: args.cmbBenefitType,
            LOBName: args.LOBName,
            isCopy: args.iscopy
        });
        me.fireEvent('onCloseBenefitPlanDetailConfiguration', {viewclass: args.t, atlasId: args.atlasId});
    }
});
