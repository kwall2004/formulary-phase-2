using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels.ProgramVM
{
    public class StepTherapyProgramVM
    {
        public long? StepThrpyPgmSK { get; set; }
        public long? CvrgPrptyPgmSK { get; set; }
        public long? DrugRefDbSK { get; set; }
        public string CvrgPrptyPgmName { get; set; }
        public string ClaimsMsgCode { get; set; }
        public string ClaimsMsgText { get; set; }
        public int? StepCnt { get; set; }

    }
}
