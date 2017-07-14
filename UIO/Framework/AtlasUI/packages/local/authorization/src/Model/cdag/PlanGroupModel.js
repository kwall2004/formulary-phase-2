/**
 * Created by agupta on 10/5/2016.
 */
Ext.define('Atlas.authorization.model.cdag.PlanGroupModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        { name: 'SystemID', type : 'string'},
        { name: 'PlanGroupID', type : 'string'},
        { name: 'CarrierID', type : 'string'},
        { name: 'CarrierName', type : 'string'},
        { name: 'AccountNumber', type : 'string'},
        { name: 'AccountName', type : 'string'},
        { name: 'LOBID', type : 'string'},
        { name: 'LOBName', type : 'string'},
        { name: 'PlanGroupCode', type : 'string'},
        { name: 'PlanGroupName', type : 'string'},
        { name: 'EffectiveDate', type : 'string'},
        { name: 'RenewalDate', type : 'string'},
        { name: 'TerminationDate', type : 'string'},
        { name: 'PlanGroupStatus', type : 'string'},
        { name: 'PlanGroupStatusCode', type : 'string'},
        { name: 'exclFormularyId', type : 'string'},
        { name: 'FormularyID', type : 'string'},
        { name: 'MACListID', type : 'string'},
        { name: 'allowMemberLocks', type : 'string'},
        { name: 'processMTMCase', type : 'string'},
        { name: 'processMAPCase', type : 'string'},
        { name: 'PharmacyNetworkID', type : 'string'},
        { name: 'nonPrefPharmNetworkId', type : 'string'},
        { name: 'PlanFaxLogo', type : 'string'},
        { name: 'AllowMedAdminFee', type : 'string'},
        { name: 'MedAdminFeeAmt', type : 'string'},
        { name: 'PayablePatRespCodes', type : 'string'},
        { name: 'PartBPCN', type : 'string'},
        { name: 'pcnCodeList', type : 'string'},
        { name: 'MandatoryGenric', type : 'string'},
        { name: 'cmsPBPid', type : 'string'},
        { name: 'CMSPlanId', type : 'string'},
        { name: 'CMSFormularyId', type : 'string'},
        { name: 'CMSCntrID', type : 'string'},
        { name: 'CMSPlanType', type : 'string'},
        { name: 'asthmaHEDISAlert', type : 'string'},
        { name: 'copayCalcFunction', type : 'string'},
        { name: 'defMemberEnollAddrType', type : 'string'},
        { name: 'MbrCardFrontImage', type : 'string'},
        { name: 'MbrCardFrontCSS', type : 'string'},
        { name: 'MbrCardBackImage', type : 'string'},
        { name: 'MbrCardBackCSS', type : 'string'},
        { name: 'Plans', type : 'string'},
        { name: '@DrugDataSource', type : 'string'},
        { name: 'PDEPlanType', type : 'string'},
        { name: 'UseAllowedPrescribers', type : 'string'},
        { name: 'PayNonPartDIngredients', type : 'string'}
    ],

    proxy: {
        extraParams: {
            pplanGroupId: '',
            pFieldList :''
        },
        url: 'plan/{0}/plangroupinfo',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                var result = '{"result":[{ "data" : '+ JSON.stringify(payload.data) +' } , { "otherData" : ' + JSON.stringify(payload.metadata) + '  }]}';
                //return payload.data;
                var jsonResult=JSON.parse(result);
                return jsonResult;
            }
        }
    }
});
