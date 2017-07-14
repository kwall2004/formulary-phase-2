using EntityFrameworkExtras.EF6;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Models.Containers
{
    [StoredProcedure("spDrugListDtlCrtriaGrp_Put")]
    public class DrugListDtlCrtriaGrpSP
    {
        [StoredProcedureParameter(SqlDbType.BigInt, ParameterName = "DrugListDtlSK")]
        public long? DrugListDtlSK { get; set; }

        [StoredProcedureParameter(SqlDbType.BigInt, ParameterName = "DrugListSk")]
        public long DrugListSk { get; set; }

        [StoredProcedureParameter(SqlDbType.NVarChar, ParameterName = "CriteriaName")]
        public string CriteriaName { get; set; }

        [StoredProcedureParameter(SqlDbType.NVarChar, ParameterName = "UserId")]
        public string UserId { get; set; }

        [StoredProcedureParameter(SqlDbType.Udt, ParameterName = "tblRules")]
        public List<CriteriaDetailTableType> tblRules { get; set; }
    }
}