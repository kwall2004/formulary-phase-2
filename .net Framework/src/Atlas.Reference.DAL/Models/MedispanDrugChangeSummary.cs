//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Atlas.Reference.DAL.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class MedispanDrugChangeSummary
    {
        public long MedispanDrugChangeSK { get; set; }
        public System.Guid BatchId { get; set; }
        public string NDC { get; set; }
        public string ChangeList { get; set; }
    }
}
