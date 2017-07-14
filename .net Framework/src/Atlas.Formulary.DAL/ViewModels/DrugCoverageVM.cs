using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels
{
    public class DrugCoverageVM
    {
        public long? DrugCategorySK { get; set; }
        public bool? IsCovered { get; set; }
        public bool? IsOverrideGenericCheck { get; set; }
        public bool? IsSpecialtyDrug { get; set; }
        public bool? IsRestrictToPackageSize { get; set; }
        public bool? IsMedicareCarveOut { get; set; }
        public bool? IsMedicaidFeeScreen { get; set; }
        public bool? IsMaintenanceDrug { get; set; }
        public bool? IsExtendedDaysSupply { get; set; }
        public bool? IsPARequired { get; set; }
        public int? PAAgeLimitMin { get; set; }
        public int? PAAgeLimitMax { get; set; }
        public string PAAgeLimitType { get; set; }
        public string PAName { get; set; }
        public bool? IsSTRequired { get; set; }
        public string STName { get; set; }
        public int? MaxFillQty { get; set; }
        public int? MaxFillPerPeriod { get; set; }
        public string MaxFillPeriodType { get; set; }
        public int? QLFillQty { get; set; }
        public int? QLFillPerPeriod { get; set; }
        public string QLFillPeriodType { get; set; }
        public int? DaysSupplyFillQty { get; set; }
        public int? DaysSupplyFillPerPeriod { get; set; }
        public string DaysSupplyPeriodType { get; set; }
        public string Gender { get; set; }
        public int? AgeLimitMin { get; set; }
        public int? AgeLimitMax { get; set; }
        public string AgeLimitType { get; set; }
        public int? MaleAgeLimitMin { get; set; }
        public int? MaleAgeLimitMax { get; set; }
        public string MaleAgeLimitType { get; set; }
        public int? FemaleAgeLimitMin { get; set; }
        public int? FemaleAgeLimitMax { get; set; }
        public string FemaleAgeLimitType { get; set; }
        public string PDLStatus { get; set; }
        public string PDFMessage { get; set; }
        public string UserNotes { get; set; }
        public string UserId { get; set; }

    }
}
