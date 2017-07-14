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
    
    public partial class PBPBnftPlan
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public PBPBnftPlan()
        {
            this.PBPBnftPlanConfgPrpty = new HashSet<PBPBnftPlanConfgPrpty>();
            this.PopGrpBnftPlan = new HashSet<PopGrpBnftPlan>();
        }
    
        public long PBPBnftPlanSK { get; set; }
        public long PBPSK { get; set; }
        public long BnftPlanSK { get; set; }
        public bool PayasScndInd { get; set; }
        public bool CombinedPlanLvlDeducblInd { get; set; }
        public bool CombinedPlanMOOPInd { get; set; }
        public System.DateTime EfctvStartDt { get; set; }
        public System.DateTime EfctvEndDt { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTimeOffset CreatedTs { get; set; }
        public string LastModfdBy { get; set; }
        public System.DateTimeOffset LastModfdTs { get; set; }
        public Nullable<System.DateTimeOffset> InctvTs { get; set; }
        public Nullable<System.DateTimeOffset> DelTs { get; set; }
    
        public virtual BnftPlan BnftPlan { get; set; }
        public virtual PBP PBP { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PBPBnftPlanConfgPrpty> PBPBnftPlanConfgPrpty { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PopGrpBnftPlan> PopGrpBnftPlan { get; set; }
    }
}
