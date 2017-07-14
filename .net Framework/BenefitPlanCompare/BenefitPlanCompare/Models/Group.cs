using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BenefitPlanCompare.Models
{
    public class Group : CompareEntity
    {
        public string AtlasRecordId { get; set; }
        public long? AtlasPlanGroupId { get; set; }
        public string PlanGroupCode { get; set; }
        public string PlanGroupName { get; set; }
        public string PlanGroupStatus { get; set; }
        public string PCNCodeList { get; set; }
        public DateTime? EffDate { get; set; }
        public DateTime? TermDate { get; set; }
        public long? CarrierId { get; set; }
        public string CarrierName { get; set; }
        public int? CarrierLOBId { get; set; }
        public string LOBName { get; set; }
        public string CarrierAcctNumber { get; set; }
        public string AccountName { get; set; }
        public string CMSCntrID { get; set; }
        public string CMSPBPid { get; set; }
        public string CMSPlanId { get; set; }
        public string CMSPlanType { get; set; }
        public bool? AllowMedAdminFee { get; set; }
        public bool? AllowMemberLocks { get; set; }
        public bool? AsthmaHEDISAlert { get; set; }
        public string CMSFormularyId { get; set; }
        public string CMSSubmitterId { get; set; }
        public string CopayCalcFunction { get; set; }
        public string DefaultPlanCode { get; set; }
        public string DefMemberEnollAddrType { get; set; }
        public int? ExclFormularyId { get; set; }
        public bool? ExclPHIInReports { get; set; }
        public bool? FmlyCoverage { get; set; }
        public string FormularyId { get; set; }
        public string MACListID { get; set; }
        public string MailPlanType { get; set; }
        public string MailServCompany { get; set; }
        public bool? MandatoryGeneric { get; set; }
        public string MbrCardBackCSS { get; set; }
        public string MbrCardBackImage { get; set; }
        public string MbrCardFrontCSS { get; set; }
        public string MbrCardFrontImage { get; set; }
        public decimal? MedAdminFeeAmt { get; set; }
        public int? NonPrefPharmNetworkId { get; set; }
        public string PartBPCN { get; set; }
        public string PayablePatRespCodes { get; set; }
        public string PDEPlanType { get; set; }
        public string PharmNetworkId { get; set; }
        public string PlanFaxLogo { get; set; }
        public bool? ProcessMAPCase { get; set; }
        public bool? ProcessMTMCase { get; set; }
        public DateTime? RenewalDate { get; set; }
        public string ServiceLocation { get; set; }
        public bool? UseAllowedPrescribers { get; set; }
        public bool? PayNonPartDIngredients { get; set; }
        public bool? IncludeNonPartDOnPDE { get; set; }

        public List<Benefit> Benefit { get; set; }
        public List<LocationCoverage> LocationCoverage { get; set; }
        public List<AllowedPrescriber> AllowedPrescriber { get; set; }

        public Group()
        {
            this.Benefit = new List<Benefit>();
            this.LocationCoverage = new List<LocationCoverage>();
            this.AllowedPrescriber = new List<AllowedPrescriber>();
            this.ExcludedEntity.AddRange(new List<string>() { "Benefit", "LocationCoverage", "AllowedPrescriber" });
            this.ExcludedEntity.AddRange(new List<string>() { "CarrierId" }); 
        }

        public List<CompareResults> Compare(Group another)
        {
            List<CompareResults> results = new List<CompareResults>();

            if (this.Benefit.Count() != another.Benefit.Count())
            {
                results.Add(PopulateErrorMessage(
                    atlasRecordId: this.AtlasRecordId
                    , className: this.GetType().Name
                    , message: string.Format("{0} does not have the same number of entries ({1}) ({2})", "Benefit", this.Benefit.Count().ToString(), another.Benefit.Count().ToString())
                    , atlasValue: this.Benefit.Count().ToString()
                    , systemValue: another.Benefit.Count().ToString()));
            }

            if (this.LocationCoverage.Count() != another.LocationCoverage.Count())
            {
                results.Add(PopulateErrorMessage(
                    atlasRecordId: this.AtlasRecordId
                    , className: this.GetType().Name
                    , message: string.Format("{0} does not have the same number of entries ({1}) ({2})", "LocationCoverage", this.LocationCoverage.Count().ToString(), another.LocationCoverage.Count().ToString())
                    , atlasValue: this.LocationCoverage.Count().ToString()
                    , systemValue: another.LocationCoverage.Count().ToString()));
            }

            if (this.AllowedPrescriber.Count() != another.AllowedPrescriber.Count())
            {
                results.Add(PopulateErrorMessage(
                    atlasRecordId: this.AtlasRecordId
                    , className: this.GetType().Name
                    , message: string.Format("{0} does not have the same number of entries ({1}) ({2})", "AllowedPrescriber", this.AllowedPrescriber.Count().ToString(), another.AllowedPrescriber.Count().ToString())
                    , atlasValue: this.AllowedPrescriber.Count().ToString()
                    , systemValue: another.AllowedPrescriber.Count().ToString()));
            }

            foreach (Benefit item in this.Benefit)
            {
                Benefit checkBenefit = another.Benefit.Where(s => s.PlanBenefitCode == item.PlanBenefitCode).First();

                item.BenefitStatus = item.BenefitStatus == "Approved" ? "A" : item.BenefitStatus;
                checkBenefit.BenefitStatus = checkBenefit.BenefitStatus == "Approved" ? "A" : checkBenefit.BenefitStatus;

                results.AddRange((checkBenefit != null)
                    ? item.CompareEx(checkBenefit)
                    : new List<CompareResults>() {
                        PopulateErrorMessage(
                            atlasRecordId: item.AtlasRecordId
                            , className: "Benefit"
                            , message: string.Format("{0} does not exists in Target Benefit Plan", item.PlanBenefitCode)) }
                    );
            }

            return results;
        }

        // TODO:  Move Population Error Message to a Common File
        private CompareResults PopulateErrorMessage(string atlasRecordId = null, string className = null, string fieldName = null, string message = null, string atlasValue = null, string systemValue = null)
        {
            return new CompareResults()
            {
                AtlasRecordId = atlasRecordId,
                ClassName = className,
                FieldName = fieldName,
                Message = message,
                AtlasValue = atlasValue,
                SystemValue = systemValue
            };
        }
    }
}