using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntityFrameworkExtras.EF6;
using System.Data;

namespace Atlas.Formulary.DAL.Models.Containers
{
    [StoredProcedure("spDrugCatgCrtriaGrp_Put")]
    public class DrugCatgCrtriaGrpSP
    {
        [StoredProcedureParameter(SqlDbType.BigInt, ParameterName = "DrugCatgSK")]
        public long DrugCatgSK { get; set; }

        [StoredProcedureParameter(SqlDbType.BigInt, ParameterName = "FrmlrySK")]
        public long FrmlrySK { get; set; }

        [StoredProcedureParameter(SqlDbType.BigInt, ParameterName = "FrmlryTierSK")]
        public long FrmlryTierSK { get; set; }

        [StoredProcedureParameter(SqlDbType.NVarChar, ParameterName = "CriteriaName")]
        public string CriteriaName { get; set; }

        [StoredProcedureParameter(SqlDbType.NVarChar, ParameterName = "UserId")]
        public string UserId { get; set; }

        [StoredProcedureParameter(SqlDbType.Udt, ParameterName = "tblRules")]
        public List<CriteriaDetailTableType> tblRules { get; set; }

        [StoredProcedureParameter(SqlDbType.Bit, ParameterName = "CvrdInd")]
        public bool CvrdInd { get; set; }

        [StoredProcedureParameter(SqlDbType.BigInt, Direction = ParameterDirection.Output, ParameterName = "DrugCatgSK_Upd")]
        public long DrugCatgSK_Upd { get; set; }
    }
}
