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
    
    public partial class CvrgSetThreshold
    {
        public long CvrgSetThresholdSK { get; set; }
        public long CvrgSetSK { get; set; }
        public long ThresholdSK { get; set; }
        public bool ApplyToBnftThresholdInd { get; set; }
        public bool LimByBnftThresholdInd { get; set; }
        public System.DateTime EfctvStartDt { get; set; }
        public System.DateTime EfctvEndDt { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTimeOffset CreatedTs { get; set; }
        public string LastModfdBy { get; set; }
        public System.DateTimeOffset LastModfdTs { get; set; }
        public Nullable<System.DateTimeOffset> InctvTs { get; set; }
        public Nullable<System.DateTimeOffset> DelTs { get; set; }
    
        public virtual CvrgSet CvrgSet { get; set; }
        public virtual Threshold Threshold { get; set; }
    }
}