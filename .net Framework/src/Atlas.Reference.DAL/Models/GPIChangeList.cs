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
    
    public partial class GPIChangeList
    {
        public System.Guid BatchId { get; set; }
        public string GPI { get; set; }
        public string ChangeAction { get; set; }
        public string GPI_Name { get; set; }
        public string GPI_Parent { get; set; }
        public string Prev_GPI_Name { get; set; }
        public string PREV_GPI_Parent { get; set; }
    }
}
