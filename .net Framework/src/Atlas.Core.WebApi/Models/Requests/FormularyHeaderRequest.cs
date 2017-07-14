using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Atlas.Core.WebApi.Models.Requests
{
    public class FormularyHeaderRequest
    {
        public Nullable<long> frmlrySK { get; set; }
        public Nullable<long> lOBSK { get; set; }
        public Nullable<long> drugThrputcClsTypeSK { get; set; }
        public Nullable<long> drugRefDbSK { get; set; }
        public Nullable<int> drugPostObsltAlwdDays { get; set; }
        public string frmlryName { get; set; }
        public Nullable<System.DateTime> efctvStartDt { get; set; }
        public Nullable<System.DateTime> efctvEndDt { get; set; }
        public string planType { get; set; }
        public string drugTypeFn { get; set; }
        public string userId { get; set; }
        public string drugListName_List { get; set; }
        public string tierName_List { get; set; }
        public Nullable<long> ownerUserGrpSk { get; set; }
        public string accessUserGrpSk_List { get; set; }
        public Nullable<System.DateTimeOffset> inctvTs { get; set; }
        public Nullable<System.DateTimeOffset> delTs { get; set; }
    }
}