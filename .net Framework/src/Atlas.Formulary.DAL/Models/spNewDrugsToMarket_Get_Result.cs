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
    
    public partial class spNewDrugsToMarket_Get_Result
    {
        public int DrugListSK { get; set; }
        public string NDC { get; set; }
        public string LabelName { get; set; }
        public string BrandName { get; set; }
        public string MedId { get; set; }
        public string GenericName { get; set; }
        public string DrugStrength { get; set; }
        public Nullable<System.DateTime> DateToMarket { get; set; }
        public string LinkToFormularies { get; set; }
    }
}
