/**
 * Created by T4317 on 11/7/2016.
 */
Ext.define('Atlas.claims.view.UCFClaimProcessingModel', {
    extend: 'Ext.app.ViewModel',
    alias:'viewmodel.claims-ucfprocess',
    stores:{
        ucfclaim:{
            model:'Atlas.common.model.UCFClaim',
            autoLoad:true
        },
        dawcode:{
            model:'Atlas.common.model.DawCode',
            autoLoad:true
        },
        residencecode:{
            model:'Atlas.common.model.ResidenceCode',
            autoLoad:true
        },
        rxorigin:{
            model:'Atlas.common.model.RxOrigin',
            autoLoad:true
        },
        qualifiedfac: {
            model:'Atlas.common.model.UCFPatRespAmtQualifier',
            autoLoad:true
        },
        othercoverage:{
            model:'Atlas.common.model.OtherCoverage',
            autoLoad:true
        },
        ucfcostbasis:{
            model:'Atlas.common.model.UCFCostBasis',
            autoLoad:true
        },
        dispensertype:{
            model:'Atlas.common.model.DispenserType',
            autoLoad:true
        },
        dosageform:{
            model:'Atlas.common.model.CompoundDosageForm',
            autoLoad:true
        },
        dispunit:{
            model:'Atlas.common.model.CompoundDispUnit',
            autoLoad:true
        },
        pcnlist:{
            model:'Atlas.common.model.PCN',
            autoLoad:true
        },
        ucfimage: {
            model: 'Atlas.common.model.UCFImage',
            remoteSort:true
        },
        FaxQStore:{
            model: 'Atlas.common.model.FaxQModel',
            remoteSort:true
        },
        ucfclaimdiagdetail:{
            model: 'Atlas.common.model.UCFClaimDiagDetailModel',
            remoteSort:true
        },
        ucfclaimspps:{
            model: 'Atlas.common.model.UCFClaimPPSModel',
            remoteSort:true
        },
        durType: {
            model: 'Atlas.common.model.shared.ListModel'
        },
        tdoverrideServiceCodes:{
            model: 'Atlas.common.model.shared.ListModel'
        },
        durResultOfService:{
            model: 'Atlas.common.model.shared.ListModel'
        },
        prescriber:{
            model: 'Atlas.common.model.Prescriber'
        },
        pharmacy:{
            model: 'Atlas.common.model.Pharmacy'
        },
        dmedruginfo:{
            model:'Atlas.common.model.DMRDrugInfo'
        },
        drugpricing:{
            model:'Atlas.common.model.DrugPricing'
        },
        ufcclaimcob:{
            model:'Atlas.common.model.UFCClaimCOB'
        },
        ufcpatrespqual:{
            model:'Atlas.common.model.UFCPatRespQual'
        },
        notes:{
            model:'Atlas.common.model.Notes'
        },
        memberinfo:{
            model:'Atlas.common.model.MemberInfo'
        },
        ucfclaimcompound:{
            model:'Atlas.common.model.UCFClaimCompoundModel'
        }
    }
});