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
    
    public partial class MedispanBrandProb
    {
        public string NDC { get; set; }
        public string MultiSourceInd { get; set; }
        public string BrandNameInd { get; set; }
        public string ApplTypeInd { get; set; }
        public string RefListedInd { get; set; }
        public string DrugCatgInd { get; set; }
        public Nullable<decimal> BrandProbPctVal { get; set; }
        public Nullable<System.DateTime> BrandProbEffDt { get; set; }
        public string BrandProbRelvInd { get; set; }
        public string DistrCode { get; set; }
        public string LabelerTypeInd { get; set; }
        public string IsClinicPack { get; set; }
        public string InnerPack { get; set; }
        public string RXOTC { get; set; }
        public string restricted { get; set; }
        public string TEE { get; set; }
        public string PriceSpreadInd { get; set; }
        public Nullable<System.DateTime> DeleteDate { get; set; }
        public Nullable<System.Guid> BatchId { get; set; }
    }
}
