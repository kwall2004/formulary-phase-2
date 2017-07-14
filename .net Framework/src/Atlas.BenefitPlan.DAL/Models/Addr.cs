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
    
    public partial class Addr
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Addr()
        {
            this.AcctAddr = new HashSet<AcctAddr>();
            this.GrpAddr = new HashSet<GrpAddr>();
            this.TenantFamAddr = new HashSet<TenantFamAddr>();
            this.PopGrpAddr = new HashSet<PopGrpAddr>();
            this.CntctPstlAddr = new HashSet<CntctPstlAddr>();
            this.TenantAddr = new HashSet<TenantAddr>();
        }
    
        public long AddrSK { get; set; }
        public long ISOCntryCodeSK { get; set; }
        public long StPrvncCodeSK { get; set; }
        public long PstlCodeSK { get; set; }
        public string AddrLine1 { get; set; }
        public string AddrLine2 { get; set; }
        public string City { get; set; }
        public Nullable<decimal> Lat { get; set; }
        public Nullable<decimal> Long { get; set; }
        public Nullable<long> FIPSCntyCodeSK { get; set; }
        public System.DateTime EfctvStartDt { get; set; }
        public System.DateTime EfctvEndDt { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTimeOffset CreatedTs { get; set; }
        public string LastModfdBy { get; set; }
        public System.DateTimeOffset LastModfdTs { get; set; }
        public Nullable<System.DateTimeOffset> InctvTs { get; set; }
        public Nullable<System.DateTimeOffset> DelTs { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AcctAddr> AcctAddr { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<GrpAddr> GrpAddr { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TenantFamAddr> TenantFamAddr { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PopGrpAddr> PopGrpAddr { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CntctPstlAddr> CntctPstlAddr { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TenantAddr> TenantAddr { get; set; }
        public virtual FIPSCntyCode FIPSCntyCode { get; set; }
        public virtual ISOCntryCode ISOCntryCode { get; set; }
        public virtual PstlCode PstlCode { get; set; }
        public virtual StPrvncCode StPrvncCode { get; set; }
    }
}