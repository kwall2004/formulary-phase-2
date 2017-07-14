using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Coverage Set Configuration View Model
    /// </summary>
    public class CoverageSetConfigurationVM : BaseViewModel
    {
        /// <summary>
        /// a Coverage Set
        /// </summary>
        public CoverageSetVM coverageSet { get; set; }

        /// <summary>
        /// List of Coverage Set Rule Sets
        /// </summary>
        public List<RuleSetVM> RuleSets { get; set; }

        /// <summary>
        /// List of Coverage Set Thresholds
        /// </summary>
        public List<ThresholdVM> Thresholds { get; set; }

        // Payment Profile Information from here down.

        /// <summary>
        /// a PymtPrflSK
        /// </summary>
        [Range(0, double.MaxValue, ErrorMessage = "PymtPrflSK field is required.")]
        public long PymtPrflSK { get; set; }

        /// <summary>
        /// a PymtPrflDtlSK
        /// </summary>
        [Range(0, double.MaxValue, ErrorMessage = "PymtPrflDtlSK field is required.")]
        public long PymtPrflDtlSK { get; set; }

        /// <summary>
        /// the Copay Before the DeductibleAmt Is Met
        /// </summary>
        [DataType(DataType.Currency)]
        [Range(0, 9999999999.99, ErrorMessage = "Co-payment Amount Before Deductible is Met has to be a positive amount.")]
        public decimal? CopayBeforeDeductibleAmtIsMet { get; set; }

        /// <summary>
        /// the Copay After the DeductibleAmt Is Met
        /// </summary>
        [DataType(DataType.Currency)]
        [Range(0, 9999999999.99, ErrorMessage = "Co-payment Amount After Deductible is Met has to be a positive amount.")]
        public decimal? CopayAfterDeductibleAmtIsMet { get; set; }

        /// <summary>
        /// the Copay Counts Towards Deductible
        /// </summary>
        public Boolean CopayCountsTowardsDeductable { get; set; }

        /// <summary>
        /// the Coinsurance Calculated Before Co-payment is Applied
        /// </summary>
        public Boolean CoinsuranceCalculatedBeforeCopayIsApplied { get; set; }

        /// <summary>
        /// a CopaymentFreqQulfrTypeSK
        /// </summary>
        [Range(0, double.MaxValue, ErrorMessage = "CopaymentFreqQulfrTypeSK field is required.")]
        public int? CopaymentFreqQulfrTypeSK { get; set; }

        /// <summary>
        /// a Co-payment Frequency Value
        /// </summary>
        [Range(0, double.MaxValue, ErrorMessage = "Co-payment Frequency Value field is required.")]
        public int? CopayFrequencyValue { get; set; }

        /// <summary>
        /// the CoinsurancePct
        /// </summary>
        [Range(0, 100, ErrorMessage = "Coinsurance is not required.  If entered it must be between 0 and 100")]
        public decimal? CoinsurancePct { get; set; }

        /// <summary>
        /// the CoinsuranceEpisodeAmt
        /// </summary>
        [Range(0, 99999.99, ErrorMessage = "Coinsurance Episode Amount is not required.  If entered it must be between 0 and 99999.99")]
        public decimal? CoinsuranceEpisodeAmt { get; set; }

        /// <summary>
        /// the CopaymentEpisodeAmt
        /// </summary>
        [Range(0, 99999.99, ErrorMessage = "Copayment Episode Amount is not required.  If entered it must be between 0 and 99999.99")]
        public decimal? CopaymentEpisodeAmt { get; set; }

        /// <summary>
        /// the CountMemberRespTowardsMOOP
        /// </summary>
        public Boolean CountMemberRespTowardsMOOP { get; set; }

        /// <summary>
        /// the CopayCountsTowardsNetworkLevelDeductible
        /// </summary>
        public Boolean CopayCountsTowardsNetworkLevelDeductible { get; set; }

        /// <summary>
        /// the CountMemberRespTowardsPlanLevelDeductible
        /// </summary>
        public Boolean CountMemberRespTowardsPlanLevelDeductible { get; set; }

        /// <summary>
        /// the Excluded indicator
        /// </summary>
        public bool Excluded { get; set; }

        /// <summary>
        /// a DeducblEpsdSK
        /// </summary>
        public long? DeducblEpsdSK { get; set; }

        /// <summary>
        /// the DeducblAmt
        /// </summary>
        public decimal? DeducblAmt { get; set; }
    }
}