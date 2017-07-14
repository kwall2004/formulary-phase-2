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
    
    public partial class spReportFormularyExportNDC_Result
    {
        public string Formulary_ID { get; set; }
        public Nullable<int> Formulary_Version { get; set; }
        public string Drug_Code { get; set; }
        public string Covered { get; set; }
        public string OTC { get; set; }
        public string Override_Generic_Check { get; set; }
        public string PDL_Flag { get; set; }
        public string MedicaidCarveOutDrug { get; set; }
        public string Medicaid_Fee_Screen { get; set; }
        public string Part_D_Drug { get; set; }
        public string PartDExcludedDrug { get; set; }
        public string restrictToPkgSize { get; set; }
        public Nullable<System.DateTime> Drug_Code_Obsolete_Date { get; set; }
        public string Maint { get; set; }
        public string HCFA_FDA { get; set; }
        public Nullable<int> GenericMedID { get; set; }
        public string LN { get; set; }
        public string BN { get; set; }
        public string DEA { get; set; }
        public string Drug_Type { get; set; }
        public Nullable<int> ETC_ID { get; set; }
        public string ETC_NAME { get; set; }
        public Nullable<int> Parent_ETC_ID { get; set; }
        public string Parent_ETC_Name { get; set; }
        public Nullable<long> Ultimiate_Parent_ETC_Id { get; set; }
        public string Ultimiate_Parent_ETC_Name { get; set; }
        public string GCDF_DESC { get; set; }
        public string GCRT_DESC { get; set; }
        public Nullable<int> HICL_SEQNO { get; set; }
        public string GNN { get; set; }
        public Nullable<int> GTC { get; set; }
        public string GTC_DESC { get; set; }
        public Nullable<bool> Speciality_Drug_Indicator { get; set; }
        public string Step_Therapy_Name { get; set; }
        public int MedicareSTGrpCount { get; set; }
        public string MedicareSTGrpDesc1 { get; set; }
        public int MedicareSTStepValue1 { get; set; }
        public string MedicareSTGrpDesc2 { get; set; }
        public int MedicareSTStepValue2 { get; set; }
        public string PAName { get; set; }
        public int MedicarePAType { get; set; }
        public string Notes { get; set; }
        public Nullable<int> Tier_Code { get; set; }
        public string Gender_Restriction { get; set; }
        public Nullable<int> Minimum_Age { get; set; }
        public Nullable<int> Maximum_Age { get; set; }
        public string AgeType { get; set; }
        public Nullable<int> Days_Supply { get; set; }
        public Nullable<int> Days_Supply_Time_Period { get; set; }
        public Nullable<int> Fills { get; set; }
        public Nullable<int> Fills_Time_Period { get; set; }
        public Nullable<int> Qty_Limit { get; set; }
        public Nullable<int> QuantityLimitTimePeriod { get; set; }
        public string Resource_Link { get; set; }
        public Nullable<System.DateTime> DeletedDate { get; set; }
        public string fedRebateDrug { get; set; }
        public string DesiDrug { get; set; }
        public int CMS_RxCUI { get; set; }
        public string PA_Indicator { get; set; }
        public Nullable<int> Extended_Days_Supply { get; set; }
        public string GPI_Code { get; set; }
        public string GPIName { get; set; }
        public string AHFS_Category { get; set; }
        public string AHFS_Class { get; set; }
        public Nullable<decimal> MAC_Unit_Price { get; set; }
    }
}
