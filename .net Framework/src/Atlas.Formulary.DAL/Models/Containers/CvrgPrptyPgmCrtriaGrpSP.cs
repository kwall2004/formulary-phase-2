using EntityFrameworkExtras.EF6;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Models.Containers
{
    [StoredProcedure("spCvrgPrptyPgmCrtriaGrp_Put")]
    public class CvrgPrptyPgmCrtriaGrpSP
    {
        [StoredProcedureParameter(SqlDbType.BigInt, ParameterName = "CvrgPrptyPgmSK")]
        public long CvrgPrptyPgmSK { get; set; }

        [StoredProcedureParameter(SqlDbType.BigInt, ParameterName = "CvrgPrptyPgmDtlSK")]
        public long CvrgPrptyPgmDtlSK { get; set; }

        [StoredProcedureParameter(SqlDbType.Int, ParameterName = "StepNbr")]
        public int StepNbr { get; set; }

        [StoredProcedureParameter(SqlDbType.Int, ParameterName = "LookBackPerDays")]
        public int LookBackPerDays { get; set; }

        [StoredProcedureParameter(SqlDbType.Int, ParameterName = "NbrFills")]
        public int NbrFills { get; set; }

        [StoredProcedureParameter(SqlDbType.Int, ParameterName = "TrialDaysMin")]
        public int TrialDaysMin { get; set; }

        [StoredProcedureParameter(SqlDbType.VarChar, ParameterName = "UserId")]
        public string UserId { get; set; }

        [StoredProcedureParameter(SqlDbType.Udt, ParameterName = "tblRules")]
        public List<CriteriaDetailTableType> tblRules { get; set; }

        [StoredProcedureParameter(SqlDbType.BigInt, Direction = ParameterDirection.Output, ParameterName = "CvrgPrptyPgmSK_Upd")]
        public long CvrgPrptyPgmSK_Upd { get; set; }
    }
}
