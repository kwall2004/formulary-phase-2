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
    
    public partial class spSumRptCfg_Get_Result
    {
        public string SumRptCfgName { get; set; }
        public string SumRptCfgDesc { get; set; }
        public Nullable<long> FileFmtSK { get; set; }
        public Nullable<long> LangSK { get; set; }
        public Nullable<long> FontSizeSK { get; set; }
        public Nullable<bool> InclUMInd { get; set; }
        public Nullable<bool> InclNotCvrdInd { get; set; }
        public Nullable<long> TierDisplSK { get; set; }
        public string FileFmtName { get; set; }
        public string FileFmtExt { get; set; }
        public string LangName { get; set; }
        public string FontSizeName { get; set; }
        public Nullable<int> FontSizeValue { get; set; }
        public string TierDisplName { get; set; }
        public string Status { get; set; }
    }
}
