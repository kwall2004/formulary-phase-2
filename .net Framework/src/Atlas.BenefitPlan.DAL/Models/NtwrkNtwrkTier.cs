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
    
    public partial class NtwrkNtwrkTier
    {
        public long NtwrkNtwrkTierSK { get; set; }
        public long PopGrpBnftPlanSK { get; set; }
        public long NtwrkTierSK { get; set; }
        public long NtwrkSK { get; set; }
        public Nullable<long> MACListSK { get; set; }
        public System.DateTime EfctvStartDt { get; set; }
        public System.DateTime EfctvEndDt { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTimeOffset CreatedTs { get; set; }
        public string LastModfdBy { get; set; }
        public System.DateTimeOffset LastModfdTs { get; set; }
        public Nullable<System.DateTimeOffset> InctvTs { get; set; }
        public Nullable<System.DateTimeOffset> DelTs { get; set; }
    
        public virtual MACList MACList { get; set; }
        public virtual Ntwrk Ntwrk { get; set; }
        public virtual NtwrkTier NtwrkTier { get; set; }
        public virtual PopGrpBnftPlan PopGrpBnftPlan { get; set; }
    }
}
