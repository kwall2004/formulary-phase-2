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
    using System.Collections.Generic;
    
    public partial class PymtPrflDtl
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public PymtPrflDtl()
        {
            this.DeducblEpsd = new HashSet<DeducblEpsd>();
            this.DeducblEpsd1 = new HashSet<DeducblEpsd>();
        }
    
        public long PymtPrflDtlSK { get; set; }
        public long PymtPrflSK { get; set; }
        public Nullable<int> CopaymentFreqQulfrTypeSK { get; set; }
        public Nullable<decimal> CopayBfrDeducblAmt { get; set; }
        public Nullable<decimal> CopayAfterDeductableIsMetAmt { get; set; }
        public bool CopayCountsTowardsDeductableInd { get; set; }
        public bool CalcCoinsuranceBfrCopayIsApldInd { get; set; }
        public Nullable<int> CopayFreqVal { get; set; }
        public Nullable<decimal> CoinsurancePct { get; set; }
        public bool CntMbrRespTowardsMOOPInd { get; set; }
        public bool CopayCountsTowardsNtwrkLvlDeductableInd { get; set; }
        public bool CntMbrRespTowardsPlanLvlDeductableInd { get; set; }
        public System.DateTime EfctvStartDt { get; set; }
        public System.DateTime EfctvEndDt { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTimeOffset CreatedTs { get; set; }
        public string LastModfdBy { get; set; }
        public System.DateTimeOffset LastModfdTs { get; set; }
        public Nullable<System.DateTimeOffset> InctvTs { get; set; }
        public Nullable<System.DateTimeOffset> DelTs { get; set; }
        public bool ExclInd { get; set; }
        public Nullable<decimal> EpisodeCoinsuranceAmt { get; set; }
        public Nullable<decimal> EpisodeCopayAmt { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DeducblEpsd> DeducblEpsd { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DeducblEpsd> DeducblEpsd1 { get; set; }
        public virtual FreqQulfrType FreqQulfrType { get; set; }
        public virtual PymtPrfl PymtPrfl { get; set; }
    }
}
