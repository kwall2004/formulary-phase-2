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
    
    public partial class DrugListAccessCtl
    {
        public long DrugListAccessCtlSK { get; set; }
        public long DrugListSK { get; set; }
        public long UserGrpSK { get; set; }
        public bool OwnerInd { get; set; }
        public bool WriteAccessInd { get; set; }
        public bool DelAccessInd { get; set; }
        public System.DateTime EfctvStartDt { get; set; }
        public System.DateTime EfctvEndDt { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTimeOffset CreatedTs { get; set; }
        public string LastModfdBy { get; set; }
        public System.DateTimeOffset LastModfdTs { get; set; }
        public Nullable<System.DateTimeOffset> InctvTs { get; set; }
        public Nullable<System.DateTimeOffset> DelTs { get; set; }
    
        public virtual DrugList DrugList { get; set; }
        public virtual UserGrp UserGrp { get; set; }
    }
}
