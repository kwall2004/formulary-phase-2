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
    
    public partial class PopGrpBnftPlan
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public PopGrpBnftPlan()
        {
            this.NtwrkNtwrkTier = new HashSet<NtwrkNtwrkTier>();
            this.PopGrpBnftPlanConfgPrpty = new HashSet<PopGrpBnftPlanConfgPrpty>();
        }
    
        public long PopGrpBnftPlanSK { get; set; }
        public long PopGrpPBPSK { get; set; }
        public long PBPBnftPlanSK { get; set; }
        public Nullable<long> AcctRXBINSK { get; set; }
        public Nullable<long> AcctPCNSK { get; set; }
        public Nullable<byte> AccumtrRestartMth { get; set; }
        public Nullable<byte> AccumtrRestartDay { get; set; }
        public Nullable<System.DateTime> DOSProcsngStartDt { get; set; }
        public Nullable<System.DateTime> DOSProcsngEndDt { get; set; }
        public Nullable<int> DMRProcsngDayLim { get; set; }
        public Nullable<int> UCFProcsngWindowDayLim { get; set; }
        public Nullable<int> PaperProcsngDayLim { get; set; }
        public Nullable<int> ElctrncProcsngDayLim { get; set; }
        public Nullable<int> ClmReversalDayLim { get; set; }
        public bool PrcsOutofNtwrkClaimsInd { get; set; }
        public System.DateTime EfctvStartDt { get; set; }
        public System.DateTime EfctvEndDt { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTimeOffset CreatedTs { get; set; }
        public string LastModfdBy { get; set; }
        public System.DateTimeOffset LastModfdTs { get; set; }
        public Nullable<System.DateTimeOffset> InctvTs { get; set; }
        public Nullable<System.DateTimeOffset> DelTs { get; set; }
        public string PayblPatRespCodes { get; set; }
    
        public virtual AcctPCN AcctPCN { get; set; }
        public virtual AcctRXBIN AcctRXBIN { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NtwrkNtwrkTier> NtwrkNtwrkTier { get; set; }
        public virtual PBPBnftPlan PBPBnftPlan { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PopGrpBnftPlanConfgPrpty> PopGrpBnftPlanConfgPrpty { get; set; }
        public virtual PopGrpPBP PopGrpPBP { get; set; }
    }
}
