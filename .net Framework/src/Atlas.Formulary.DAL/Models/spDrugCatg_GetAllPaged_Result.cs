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
    
    public partial class spDrugCatg_GetAllPaged_Result
    {
        public Nullable<long> DrugCatgSK { get; set; }
        public string DrugCatgName { get; set; }
        public Nullable<bool> CvrdInd { get; set; }
        public Nullable<long> FrmlryTierSK { get; set; }
        public string FrmlryTierName { get; set; }
        public Nullable<int> NDCCount { get; set; }
        public Nullable<long> FrmlrySK { get; set; }
        public Nullable<int> TotalCount { get; set; }
        public Nullable<long> CacheStatusSK { get; set; }
        public string CacheStatusDesc { get; set; }
    }
}
