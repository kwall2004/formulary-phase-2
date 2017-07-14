using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Models.Interfaces
{
    public interface ISmartSearchResult
    {
        int DrugListSK { get; set; }
        string NDC { get; set; }
        Nullable<int> NDC_Rank { get; set; }
        System.DateTime EffectiveDate { get; set; }
        Nullable<int> ETC_ID { get; set; }
        string ETC_NAME { get; set; }
        Nullable<int> ETC_NAME_Rank { get; set; }
        Nullable<int> HICL_SEQNO { get; set; }
        string BrandName { get; set; }
        Nullable<int> BrandName_Rank { get; set; }
        string GCN_SEQNO { get; set; }
        Nullable<int> GCN_SEQNO_Rank { get; set; }
        string LabelName { get; set; }
        Nullable<int> LabelName_Rank { get; set; }
        string MedId { get; set; }
        Nullable<int> MedId_Rank { get; set; }
        string DrugType { get; set; }
        Nullable<int> DrugType_Rank { get; set; }
        Nullable<bool> OTC { get; set; }
        string DrugStrength { get; set; }
        Nullable<int> DrugStrength_Rank { get; set; }
        string DosageForm { get; set; }
        Nullable<int> DosageForm_Rank { get; set; }
        string PackageSize { get; set; }
        Nullable<bool> IsObsolete { get; set; }
        Nullable<System.DateTime> ObsoleteDate { get; set; }
        string GenericName { get; set; }
        Nullable<int> GenericName_Rank { get; set; }
        Nullable<int> GTC { get; set; }
        string GTC_DESC { get; set; }
        Nullable<int> GTC_DESC_Rank { get; set; }
        string RouteAdministration { get; set; }
        Nullable<int> RouteAdministration_Rank { get; set; }
        Nullable<int> GPI_Rank { get; set; }
        string GPI { get; set; }
        Nullable<int> TotalRank { get; set; }
    }
}
