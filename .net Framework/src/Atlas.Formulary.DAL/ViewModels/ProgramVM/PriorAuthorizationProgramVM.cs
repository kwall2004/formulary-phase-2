using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels.ProgramVM
{
    public class PriorAuthorizationProgramVM
    {
        public long? PAPgmSK { get; set; }
        public long? CvrgPrptyPgmSK { get; set; }
        public long? FrmlrySK { get; set; }
        public long? DrugRefDbSK { get; set; }
        public string CvrgPrptyPgmName { get; set; }
        public string ClaimsMsgCode { get; set; }
        public string ClaimsMsgText { get; set; }
        public string CvrgDurn { get; set; }
        public string CvrdUses { get; set; }
        public string ExclCrtria { get; set; }
        public string ReqMedclInfo { get; set; }
        public string AgeRstrctn { get; set; }
        public string PrescbrRstrctn { get; set; }
        public string OthCrtria { get; set; }
    }
}
