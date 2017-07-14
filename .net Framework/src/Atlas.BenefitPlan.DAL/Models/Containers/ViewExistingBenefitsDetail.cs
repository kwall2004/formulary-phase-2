using System;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.DAL.Models.Containers
{
    /// <summary>
    /// Class ViewExistingBenefitsDetail.
    /// </summary>
    public class ViewExistingBenefitsDetail
    {
        /// <summary>the Benefit Name</summary>
        public string BnftName { get; set; }

        /// <summary>the Industry Standard Code</summary>
        public string SvcTypeCode { get; set; }

        /// <summary>the Industry Standard Description</summary>
        public string SvcTypeDesc { get; set; }

        /// <summary>the Network Tier Name</summary>
        public string NtwrkTierName { get; set; }

        /// <summary>the Coverage Set Name</summary>
        public string CvrgSetName { get; set; }

        /// <summary>the Copay Before Deductible Amount</summary>
        public Nullable<decimal> CopayBfrDeducblAmt { get; set; }

        /// <summary>the Copay After Deductible is Met Amount</summary>
        public Nullable<decimal> CopayAfterDeductableIsMetAmt { get; set; }

        /// <summary>the Coinsurance Percentage</summary>
        public Nullable<decimal> CoinsurancePct { get; set; }

        /// <summary>the Threshold Name</summary>
        public string ThresholdName { get; set; }

        /// <summary>the Threshold Qualifier Type Code</summary>
        public string ThresholdQulfrTypeCode { get; set; }

        /// <summary>the Threshold Limit Amount</summary>
        public Nullable<int> ThresholdLimAmt { get; set; }

        /// <summary>the Coverage Set Rule Text</summary>
        public string CoverageSetRule { get; set; }
    }
}