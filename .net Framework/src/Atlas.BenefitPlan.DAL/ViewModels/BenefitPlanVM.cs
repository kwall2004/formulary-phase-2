using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Benefit Plan View Model for Benefit Plan with benefit plan details
    /// </summary>
    public class BenefitPlanVM : BaseViewModel
    {
        #region " Constructors "

        /// <summary>
        /// the Constructor for the BenefitPlanWithDetailVM
        /// </summary>
        public BenefitPlanVM()
        {
            this.TmpltInd = false;
            this.GrandfatheredPlanInd = false;
            this.AllowMnlEnrlmtInd = false;
            this.COBRABnftOfferedInd = false;
            this.OnHIEInd = false;
        }

        #endregion " Constructors "

        #region benefit plan common fields

        /// <summary>
        /// the Benefit plan SK
        /// </summary>
        public long BnftPlanSK { get; set; }

        /// <summary>
        /// The product type of the BP PPO, HMO, etc)</summary>
        public Nullable<long> PrdctTypeSK { get; set; }

        /// <summary>
        /// The Plan classification Type of the BP (Gold, Silver, etc)</summary>
        [Range(1, double.MaxValue, ErrorMessage = "PlanClsfcnTypeSK field is required.")]
        public Nullable<long> PlanClsfcnTypeSK { get; set; }

        /// <summary>
        /// The plan type of the BP (medical, pharmacy, etc)</summary>
        [Range(1, double.MaxValue, ErrorMessage = "BnftPlanTypeSK field is required.")]
        public long BnftPlanTypeSK { get; set; }

        /// <summary>
        /// The line of business of the BP (commercial, hix, medicare, medicaid)</summary>
        [Range(1, double.MaxValue, ErrorMessage = "LOBSK field is required.")]
        public long LOBSK { get; set; }

        /// <summary>
        /// The size classification of the BP (large population group or small population group)</summary>
        [Range(1, double.MaxValue, ErrorMessage = "BnftPlanSizeClsfcnTypeSK field is required.")]
        public Nullable<long> BnftPlanSizeClsfcnTypeSK { get; set; }

        /// <summary>
        /// the Benefit Plan ID
        /// </summary>
        [MaxLength(80)]
        public string BnftPlanID { get; set; }

        /// <summary>
        /// Benefit Plan Name
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        [MaxLength(80)]
        public string BnftPlanName { get; set; }

        /// <summary>
        /// Create as template flag; default to false in constructor
        /// </summary>
        public Boolean TmpltInd { get; set; }

        /// <summary>
        /// Benefit Plan Year
        /// </summary>
        [MaxLength(4)]
        [MinLength(4)]
        public string BnftPlanYr { get; set; }

        /// <summary>
        /// The Effective Start Date
        /// </summary>
        [DateRequired]
        public System.DateTime EfctvStartDt { get; set; }

        /// <summary>
        /// The Effective End Date
        /// </summary>
        [DateRequired]
        [CompareEffectiveDates("EfctvStartDt")]
        public System.DateTime EfctvEndDt { get; set; }

        #endregion benefit plan common fields

        #region benefit plan optional fields

        /// <summary>
        /// grandfathered flag; default to false in constructor
        /// COMMERCIAL MEDICAL
        /// </summary>
        public Boolean GrandfatheredPlanInd { get; set; }

        /// <summary>
        /// Allow Manual Enrollment flag; default to false in constructor
        /// COMMERCIAL MEDICAL
        /// HIX MEDICAL
        /// </summary>
        public Boolean AllowMnlEnrlmtInd { get; set; }

        /// <summary>
        /// Select Number of Network Tiers field
        /// COMMERCIAL MEDICAL
        /// HIX MEDICAL
        /// MEDICARE MEDICAL
        /// MEDICAID MEDICAL
        /// </summary>
        public int NbrofNtwrkTiers { get; set; }

        /// <summary>
        /// Maximum Days Allowed on COBRA field
        /// COMMERCIAL MEDICAL
        /// </summary>
        public Nullable<int> MaxNbrofDaysAlwdonCOBRAAmt { get; set; }

        /// <summary>
        /// COBRA Benefits Offered field; default to false in constructor
        /// COMMERCIAL MEDICAL
        /// </summary>
        public Boolean COBRABnftOfferedInd { get; set; }

        /// <summary>
        /// On/Off Exchange field; default to false in constructor
        /// COMMERCIAL MEDICAL
        /// HIX MEDICAL
        /// </summary>
        public Boolean OnHIEInd { get; set; }

        /// <summary>
        /// HIOS Plan Variant ID field
        /// HIX MEDICAL
        /// </summary>
        [MaxLength(20)]
        public string HIOSPlanVarntID { get; set; }

        /// <summary>
        /// Default Vaccine Admin Fee
        /// COMMERCIAL/HIX PHARMACY
        /// MEDICARE PHARMACY
        /// MEDICAID PHARMACY
        /// </summary>
        [RegularExpression(@"\d+(\.\d{1,2})?")]
        [Range(0, 9999999999.99)]
        public decimal? DefaultVaccineAdmnstnFeeAmt { get; set; } // decimal(10,2)

        /// <summary>
        /// Speciality Drug at Speciality Pharmacy
        /// COMMERCIAL/HIX PHARMACY
        /// MEDICARE PHARMACY
        /// MEDICAID PHARMACY
        /// </summary>
        public Boolean RequireSpcltyPharmforSpcltyDrugsInd { get; set; }

        /// <summary>
        /// Mandatory Generic Plan
        /// COMMERCIAL/HIX PHARMACY
        /// MEDICARE PHARMACY
        /// MEDICAID PHARMACY
        /// </summary>
        public Boolean MndtryGenrcDrugPlanInd { get; set; }

        /// <summary>
        /// reject All Claims
        /// COMMERCIAL/HIX PHARMACY
        /// MEDICARE PHARMACY
        /// </summary>
        public Boolean RejAllClaimsInd { get; set; }

        /// <summary>
        /// Allow Member Locks
        /// COMMERCIAL/HIX PHARMACY
        /// MEDICARE PHARMACY
        /// MEDICAID PHARMACY
        /// </summary>
        public Boolean AllowMbrLocksInd { get; set; }

        /// <summary>
        /// Allow Emergency Fills Indicator
        /// </summary>
        public Boolean AllowEmrgyFillsInd { get; set; }

        /// <summary>
        /// Select Number of Formulary tiers
        ///
        /// COMMERCIAL/HIX PHARMACY
        /// MEDICARE PHARMACY
        /// MEDICAID PHARMACY
        /// </summary>
        public Nullable<int> NbrofFrmlryTiers { get; set; }

        /// <summary>
        /// 1 month Supply equals
        ///
        /// COMMERCIAL/HIX PHARMACY
        /// MEDICARE PHARMACY
        /// MEDICAID PHARMACY
        /// </summary>
        public int? OneMthDaySuplAmt { get; set; }

        /// <summary>
        /// Prescriber Drug Override Plan
        ///
        /// COMMERCIAL/HIX PHARMACY
        /// MEDICARE PHARMACY
        /// MEDICAID PHARMACY
        /// </summary>
        public Nullable<long> PrescbrDrugOvrrdListSK { get; set; }

        /// <summary>
        /// Allowed Prescribers
        ///
        /// COMMERCIAL/HIX PHARMACY
        /// MEDICARE PHARMACY
        /// MEDICAID PHARMACY
        /// </summary>
        public Nullable<long> AlwdPrescribersListSK { get; set; }

        /// <summary>
        /// Formulary
        ///
        /// COMMERCIAL/HIX PHARMACY
        /// MEDICARE PHARMACY
        /// MEDICAID PHARMACY
        /// </summary>
        public Nullable<long> FrmlrySK { get; set; }

        /// <summary>
        /// Pricing (RX)
        ///
        /// COMMERCIAL/HIX PHARMACY
        /// MEDICARE PHARMACY
        /// MEDICAID PHARMACY
        /// </summary>
        public Nullable<long> RxPrcgTypeSK { get; set; }

        /// <summary>
        /// Data Source (RX)
        ///
        /// COMMERCIAL/HIX PHARMACY
        /// MEDICARE PHARMACY
        /// MEDICAID PHARMACY
        /// </summary>
        public Nullable<long> DrugRefDbSK { get; set; }

        /// <summary>
        /// Copay Function
        ///
        /// COMMERCIAL/HIX PHARMACY
        /// MEDICARE PHARMACY
        /// MEDICAID PHARMACY
        /// </summary>
        public Nullable<long> CopayFuncTypeSK { get; set; }

        /// <summary>
        /// CMS Benefit Structure
        ///
        /// MEDICARE PHARMACY
        /// </summary>
        public Nullable<long> CMSBnftStructTypeSK { get; set; }

        #endregion benefit plan optional fields

        /// <summary>
        /// Coverage Gap-Generic
        ///
        /// MEDICARE PHARMACY
        /// </summary>
        public Nullable<decimal> McrCvrgGapGenrcPct { get; set; }

        /// <summary>
        /// Coverage Gap-Brand
        ///
        /// MEDICARE PHARMACY
        /// </summary>
        public Nullable<decimal> McrCvrgGapBrandPct { get; set; }

        /// <summary>
        /// Part B Coinsurance
        ///
        /// MEDICARE PHARMACY
        /// </summary>
        public Nullable<decimal> McrPartBCoinsurancePct { get; set; }

        /// <summary>
        /// Process Part B Claims
        ///
        /// MEDICARE PHARMACY
        /// </summary>
        public Boolean PrcsMcrPartBClaimsInd { get; set; }

        /// <summary>
        /// The Standard Deductible Amount</summary>
        public Nullable<decimal> StdDeducblAmt { get; set; }

        /// <summary>
        /// The PHI Data In Reports indicator</summary>
        public bool ExclPHIDataInReports { get; set; }

        /// <summary>
        /// The Pay Non MCR Part D Ingredients Indicator</summary>
        public bool PayNonMcrPartDIngredients { get; set; }

        /// <summary>
        /// The Non MCR Part D Indicator</summary>
        public bool InclNonMcrPartDonPDE { get; set; }

        /// <summary>
        /// The Benefit Plan Abbreviation</summary>
        public string BnftPlanAbbr { get; set; }

        /// <summary>
        /// List of BenefitPlanWaiverRiders
        ///// Waiver Services IDs
        ///// MEDICARE MEDICAL
        ///// MEDICAID MEDICAL
        /// </summary>
        public IEnumerable<BenefitPlanWaiverRiderVM> BenefitPlanWaiverRiders { get; set; }
    }
}