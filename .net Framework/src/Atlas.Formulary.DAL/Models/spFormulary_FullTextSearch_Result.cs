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
    
    public partial class spFormulary_FullTextSearch_Result
    {
        public Nullable<long> FrmlrySK { get; set; }
        public string TenantOwner { get; set; }
        public Nullable<int> TenantOwner_Rank { get; set; }
        public string FrmlryName { get; set; }
        public Nullable<int> FrmlryName_Rank { get; set; }
        public string FrmlryId { get; set; }
        public Nullable<int> FrmlryVer { get; set; }
        public Nullable<System.DateTime> EfctvStartDt { get; set; }
        public string LOBName { get; set; }
        public Nullable<int> LOBName_Rank { get; set; }
        public string StatDesc { get; set; }
        public Nullable<int> StatDesc_Rank { get; set; }
        public Nullable<int> CalendarYear { get; set; }
        public Nullable<int> TotalRank { get; set; }
    }
}