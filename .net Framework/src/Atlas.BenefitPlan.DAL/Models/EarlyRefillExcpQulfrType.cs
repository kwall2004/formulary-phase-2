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
    
    public partial class EarlyRefillExcpQulfrType
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public EarlyRefillExcpQulfrType()
        {
            this.EarlyRefillExcp = new HashSet<EarlyRefillExcp>();
        }
    
        public long EarlyRefillExcpQulfrTypeSK { get; set; }
        public string EarlyRefillExcpQulfrTypeCode { get; set; }
        public string EarlyRefillExcpQulfrTypeDesc { get; set; }
        public System.DateTime EfctvStartDt { get; set; }
        public System.DateTime EfctvEndDt { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTimeOffset CreatedTs { get; set; }
        public string LastModfdBy { get; set; }
        public System.DateTimeOffset LastModfdTs { get; set; }
        public Nullable<System.DateTimeOffset> InctvTs { get; set; }
        public Nullable<System.DateTimeOffset> DelTs { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EarlyRefillExcp> EarlyRefillExcp { get; set; }
    }
}
