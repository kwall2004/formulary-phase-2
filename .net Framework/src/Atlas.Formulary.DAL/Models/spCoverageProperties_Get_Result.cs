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
    
    public partial class spCoverageProperties_Get_Result
    {
        public long DrugCatgSK { get; set; }
        public long FrmlrySK { get; set; }
        public Nullable<long> FrmlryTierSK { get; set; }
        public string DrugCatgName { get; set; }
        public Nullable<int> TierCode { get; set; }
        public bool IsCovered { get; set; }
        public Nullable<bool> IsOverrideGenericCheck { get; set; }
        public Nullable<bool> IsSpeciality { get; set; }
        public Nullable<bool> IsRestrictToPkgSize { get; set; }
        public Nullable<bool> IsMedicaidCarveOut { get; set; }
        public Nullable<bool> IsMedicaidFeeScreen { get; set; }
        public Nullable<bool> IsMaintenanceDrug { get; set; }
        public Nullable<int> ExtendedDaysSupply { get; set; }
        public Nullable<bool> PAInd { get; set; }
        public string PAName { get; set; }
        public Nullable<int> PAMinAge { get; set; }
        public Nullable<int> PAMaxAge { get; set; }
        public string PAAgeLimitType { get; set; }
        public Nullable<bool> IsSTRequired { get; set; }
        public string StepTherapyName { get; set; }
        public Nullable<int> MaxFillQty { get; set; }
        public Nullable<int> MaxFillPerPeriod { get; set; }
        public string MaxFillPeriodType { get; set; }
        public Nullable<int> QLFillQty { get; set; }
        public Nullable<int> QLFillPerPeriod { get; set; }
        public string QLFillPeriodType { get; set; }
        public Nullable<int> DaysSupplyFillQty { get; set; }
        public Nullable<int> DaysSupplyFillPerPeriod { get; set; }
        public string DaysSupplyPeriodType { get; set; }
        public string Gender { get; set; }
        public Nullable<int> AgeLimitMin { get; set; }
        public Nullable<int> AgeLimitMax { get; set; }
        public string AgeLimitType { get; set; }
        public Nullable<int> MaleAgeLimitMin { get; set; }
        public Nullable<int> MaleAgeLimitMax { get; set; }
        public string MaleAgeLimitType { get; set; }
        public Nullable<int> FemaleAgeLimitMin { get; set; }
        public Nullable<int> FemaleAgeLimitMax { get; set; }
        public string FemaleAgeLimitType { get; set; }
        public string PDLStatus { get; set; }
        public string PDFMessage { get; set; }
        public string UserNotes { get; set; }
        public string UserId { get; set; }
    }
}
