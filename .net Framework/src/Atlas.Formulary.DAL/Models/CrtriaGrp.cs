//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Atlas.Formulary.DAL.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class CrtriaGrp
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public CrtriaGrp()
        {
            this.DrugListDtlCrtriaGrp = new HashSet<DrugListDtlCrtriaGrp>();
            this.CrtriaGrpCrtriaSet = new HashSet<CrtriaGrpCrtriaSet>();
            this.DrugCatgCrtriaGrp = new HashSet<DrugCatgCrtriaGrp>();
            this.CvrgPrptyPgmDtlCrtriaGrp = new HashSet<CvrgPrptyPgmDtlCrtriaGrp>();
        }
    
        public long CrtriaGrpSK { get; set; }
        public long CrtriaGrpTypeSK { get; set; }
        public string CrtriaGrpName { get; set; }
        public System.DateTime EfctvStartDt { get; set; }
        public System.DateTime EfctvEndDt { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTimeOffset CreatedTs { get; set; }
        public string LastModfdBy { get; set; }
        public System.DateTimeOffset LastModfdTs { get; set; }
        public Nullable<System.DateTimeOffset> InctvTs { get; set; }
        public Nullable<System.DateTimeOffset> DelTs { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DrugListDtlCrtriaGrp> DrugListDtlCrtriaGrp { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CrtriaGrpCrtriaSet> CrtriaGrpCrtriaSet { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DrugCatgCrtriaGrp> DrugCatgCrtriaGrp { get; set; }
        public virtual CrtriaGrpType CrtriaGrpType { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CvrgPrptyPgmDtlCrtriaGrp> CvrgPrptyPgmDtlCrtriaGrp { get; set; }
    }
}
