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
    
    public partial class FillExcp
    {
        public long FillExcpSK { get; set; }
        public long BnftPlanSK { get; set; }
        public long DrugClsTypeSK { get; set; }
        public long FillExcpChngQulfrTypeSK { get; set; }
        public long PharmTypeSK { get; set; }
        public Nullable<int> FillRngMinAmt { get; set; }
        public Nullable<int> FillRngMaxAmt { get; set; }
        public Nullable<decimal> MultiplierAmt { get; set; }
        public System.DateTime EfctvStartDt { get; set; }
        public System.DateTime EfctvEndDt { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTimeOffset CreatedTs { get; set; }
        public string LastModfdBy { get; set; }
        public System.DateTimeOffset LastModfdTs { get; set; }
        public Nullable<System.DateTimeOffset> InctvTs { get; set; }
        public Nullable<System.DateTimeOffset> DelTs { get; set; }
    
        public virtual BnftPlan BnftPlan { get; set; }
        public virtual DrugClsType DrugClsType { get; set; }
        public virtual FillExcpChngQulfrType FillExcpChngQulfrType { get; set; }
        public virtual PharmType PharmType { get; set; }
    }
}