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
    
    public partial class DAWCopay
    {
        public long DAWCopaySK { get; set; }
        public long DAWTypeSK { get; set; }
        public long BnftPlanSK { get; set; }
        public bool BrandGenrcDifferenceInd { get; set; }
        public Nullable<decimal> PctofDrugCost { get; set; }
        public bool ApplyCopayInd { get; set; }
        public bool ApplyDifferencetoOOPInd { get; set; }
        public System.DateTime EfctvStartDt { get; set; }
        public System.DateTime EfctvEndDt { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTimeOffset CreatedTs { get; set; }
        public string LastModfdBy { get; set; }
        public System.DateTimeOffset LastModfdTs { get; set; }
        public Nullable<System.DateTimeOffset> InctvTs { get; set; }
        public Nullable<System.DateTimeOffset> DelTs { get; set; }
    
        public virtual BnftPlan BnftPlan { get; set; }
        public virtual DAWType DAWType { get; set; }
    }
}
