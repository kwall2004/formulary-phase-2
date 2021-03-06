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
    
    public partial class Frmlry
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Frmlry()
        {
            this.BnftPlan = new HashSet<BnftPlan>();
            this.FrmlryTierName = new HashSet<FrmlryTierName>();
        }
    
        public long FrmlrySK { get; set; }
        public long LOBSK { get; set; }
        public long DrugRefDbSK { get; set; }
        public string FrmlryName { get; set; }
        public string FrmlryID { get; set; }
        public int NbrofFrmlryTiers { get; set; }
        public System.DateTime EfctvStartDt { get; set; }
        public System.DateTime EfctvEndDt { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTimeOffset CreatedTs { get; set; }
        public string LastModfdBy { get; set; }
        public System.DateTimeOffset LastModfdTs { get; set; }
        public Nullable<System.DateTimeOffset> InctvTs { get; set; }
        public Nullable<System.DateTimeOffset> DelTs { get; set; }
        public string FrmlryVerNbr { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<BnftPlan> BnftPlan { get; set; }
        public virtual DrugRefDb DrugRefDb { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FrmlryTierName> FrmlryTierName { get; set; }
        public virtual LOB LOB { get; set; }
    }
}
