using Atlas.BenefitPlan.DAL.Models.DataCompare.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Atlas.BenefitPlan.DAL.Models.DataCompare.Merlin
{
    /// <summary>
    /// the Merlin Group Class for Data Compare
    /// </summary>
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

        /// <summary>
        /// the Children Nodes for Group
        /// </summary>
        public List<Benefit> Benefit { get; set; }
        public List<LocationCoverage> LocationCoverage { get; set; }
        public List<AllowedPrescriber> AllowedPrescriber { get; set; }

        /// <summary>
        /// the Constructor for Group
        /// </summary>
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

            results.AddRange(CompareAllowedPrescriber(another));
            results.AddRange(CompareLocationCoverage(another));
            results.AddRange(CompareBenefit(another));

            return results;
        }

        private List<CompareResults> CompareAllowedPrescriber(Group another)
        {
            List<CompareResults> results = new List<CompareResults>();

            if (this.AllowedPrescriber.Count() != another.AllowedPrescriber.Count())
            {
                results.Add(CompareFunctions.PopulateErrorMessage(
                    atlasRecordId: this.AtlasRecordId
                    , className: this.GetType().Name
                    , message: string.Format("AllowedPrescriber does not have the same number of entries ({0}) ({1})", this.AllowedPrescriber.Count().ToString(), another.AllowedPrescriber.Count().ToString())
                    , atlasValue: this.AllowedPrescriber.Count().ToString()
                    , systemValue: another.AllowedPrescriber.Count().ToString()));
            }

            // =============================================================================
            //  TODO:  Loop through all Allowed Prescriber's and compare the base and target
            //         Example (CompareBenefit)
            // =============================================================================

            return results;
        }

        private List<CompareResults> CompareBenefit(Group another)
        {
            List<CompareResults> results = new List<CompareResults>();

            if (this.Benefit.Count() != another.Benefit.Count())
            {
                results.Add(CompareFunctions.PopulateErrorMessage(
                    atlasRecordId: this.AtlasRecordId
                    , className: this.GetType().Name
                    , message: string.Format("Benefit does not have the same number of entries ({0}) ({1})", this.Benefit.Count().ToString(), another.Benefit.Count().ToString())
                    , atlasValue: this.Benefit.Count().ToString()
                    , systemValue: another.Benefit.Count().ToString()));
            }

            foreach (Benefit item in this.Benefit)
            {
                Benefit checkBenefit = another.Benefit.Where(s => s.PlanBenefitCode == item.PlanBenefitCode).First();

                item.BenefitStatus = item.BenefitStatus == "Approved" ? "A" : item.BenefitStatus;
                checkBenefit.BenefitStatus = checkBenefit.BenefitStatus == "Approved" ? "A" : checkBenefit.BenefitStatus;

                results.AddRange((checkBenefit != null)
                    ? item.CompareEx(checkBenefit)
                    : new List<CompareResults>() {
                            CompareFunctions.PopulateErrorMessage(
                                atlasRecordId: item.AtlasRecordId
                                , className: "Benefit"
                                , message: string.Format("{0} does not exists in Target Benefit Plan", item.PlanBenefitCode)) }
                    );
            }

            return results;
        }

        private List<CompareResults> CompareLocationCoverage(Group another)
        {
            List<CompareResults> results = new List<CompareResults>();

            if (this.LocationCoverage.Count() != another.LocationCoverage.Count())
            {
                results.Add(CompareFunctions.PopulateErrorMessage(
                    atlasRecordId: this.AtlasRecordId
                    , className: this.GetType().Name
                    , message: string.Format("LocationCoverage does not have the same number of entries ({0}) ({1})", this.LocationCoverage.Count().ToString(), another.LocationCoverage.Count().ToString())
                    , atlasValue: this.LocationCoverage.Count().ToString()
                    , systemValue: another.LocationCoverage.Count().ToString()));
            }

            // =============================================================================
            //  TODO:  Loop through all Location Coverage and compare the base and target
            //         Example (CompareBenefit)
            // =============================================================================

            // =============================================================================
            //  TODO:
            // =============================================================================

            return results;
        }
    }
}