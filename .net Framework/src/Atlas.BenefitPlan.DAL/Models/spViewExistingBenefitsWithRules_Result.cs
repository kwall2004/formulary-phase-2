//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Atlas.BenefitPlan.DAL.Models
{
    using System;
    
    public partial class spViewExistingBenefitsWithRules_Result
    {
        public long TempTblSK { get; set; }
        public Nullable<long> BnftSK { get; set; }
        public Nullable<long> SvcTypeSK { get; set; }
        public Nullable<long> NtwrkTierSK { get; set; }
        public Nullable<long> NtwrkTierTypeSK { get; set; }
        public Nullable<long> CvrgSetSK { get; set; }
        public string BnftName { get; set; }
        public string SvcTypeCode { get; set; }
        public string SvcTypeDesc { get; set; }
        public string NtwrkTierName { get; set; }
        public string CvrgSetName { get; set; }
        public Nullable<decimal> CopayBfrDeducblAmt { get; set; }
        public Nullable<decimal> CopayAfterDeductableIsMetAmt { get; set; }
        public Nullable<decimal> CoinsurancePct { get; set; }
        public string ThresholdName { get; set; }
        public string ThresholdQulfrTypeCode { get; set; }
        public Nullable<int> ThresholdLimAmt { get; set; }
        public string CoverageSetRule { get; set; }
    }
}
