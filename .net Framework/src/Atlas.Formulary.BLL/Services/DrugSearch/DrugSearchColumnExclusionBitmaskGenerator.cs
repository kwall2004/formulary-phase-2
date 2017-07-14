using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Atlas.Core.DAL.Models.Containers;

namespace Atlas.Formulary.BLL.Services.DrugSearch
{
    /// <summary>
    /// Utility service for drug search column exculsions bit mask generation. 
    /// </summary>
    public class DrugSearchColumnExclusionBitmaskGenerator : IDrugSearchColumnExclusionBitmaskGenerator
    {

        /// <summary>
        /// Generates bitmask that's passed to drug search stored proc to determine which columns
        /// group by. 
        /// </summary>
        /// <param name="queries"></param>
        /// <param name="defaultBitmask"></param>
        /// <returns></returns>
        /// <remarks>
        /// Removes all queries with operation exclude from passed in collection and returns mutated collection.
        /// </remarks>
        public long GenerateBitmask(List<Criteria> includes)
        {
            // TODO: Remove the logic that pulls out the excludes and expect that a colleciton of only excludes is passed in. 

            if (includes == null)
            {
                throw new ArgumentException("Argument queries cannot be null!");
            }

            long result = 0; // TODO: Address the fact that when columns are added this never gets updated.

            // Create bitmask
            foreach (var q in includes)
            {
                switch (q.Property)
                {
                    case "NDC":
                    case "DEA":
                    case "DateToMarket":
                    case "FedRebateDrug":
                    case "PriceAWPPkg":
                    case "PriceAWPUnit":
                    case "PriceFedUprLimit":
                    case "PriceSuqWhlPkg":
                    case "PriceSugWhlUnit":
                    case "PriceWACPkg":
                    case "PriceWACUnit":
                    case "Formulary":
                    case "MSGenericIndicator":
                    case "DrugCatgName":
                    case "DateAdded":
                    case "MarketCategory":
                    case "MarketEndDate":
                    case "MarketStartDate":
                    case "DrugLists":
                        result |= (1 << 0);
                        break;
                    case "IsObsolete":
                        result |= (1 << 1);
                        break;
                    case "ObsoleteDate":
                        result |= (1 << 2);
                        break;
                    case "IsCovered":
                        result |= (1 << 3);
                        break;
                    case "GCN_SEQNO":
                        result |= (1 << 4);
                        break;
                    case "MedId":
                        result |= (1 << 5);
                        break;
                    case "RxCUI":
                        result |= (1 << 6);
                        break;
                    case "NDDF_RxCUI":
                        result |= (1 << 7);
                        break;
                    case "LabelName":
                        result |= (1 << 8);
                        break;
                    case "BrandName":
                        result |= (1 << 9);
                        break;
                    case "OTC":
                        result |= (1 << 10);
                        break;
                    case "DrugType":
                        result |= (1 << 11);
                        break;
                    case "ETC_ID":
                        result |= (1 << 12);
                        break;
                    case "ETC_NAME":
                        result |= (1 << 13);
                        break;
                    case "GCDF_DESC":
                        result |= (1 << 14);
                        break;
                    case "RouteAdministration":
                        result |= (1 << 15);
                        break;
                    case "HICL_SEQNO":
                        result |= (1 << 16);
                        break;
                    case "GenericName":
                        result |= (1 << 17);
                        break;
                    case "GTC":
                        result |= (1 << 18);
                        break;
                    case "GTC_DESC":
                        result |= (1 << 19);
                        break;
                    case "IsSpecialtyDrug":
                        result |= (1 << 20);
                        break;
                    case "TierCode":
                        result |= (1 << 21);
                        break;
                    case "PartDExcludedDrug":
                        result |= (1 << 22);
                        break;
                    case "MedicaidCarveOutDrug":
                        result |= (1 << 23);
                        break;
                    case "IsMaintDrug":
                        result |= (1 << 24);
                        break;
                    case "MedicaidFeeScreen":
                        result |= (1 << 25);
                        break;
                    case "GPI":
                        result |= (1 << 26);
                        break;
                    case "DrugStrength":
                        result |= (1 << 27);
                        break;
                    case "DosageForm":
                        result |= (1 << 28);
                        break;
                    case "PackageSize":
                        result |= (1 << 29);
                        break;
                    case "AHFSCategoryClass":
                        result |= (1 << 30);
                        break;
                    case "USPCategoryClass":
                        result |= (1 << 31);
                        break;
                    default:
                        throw new ArgumentException(q.Property + " is not a valid value for column exclusion!");

                }
            }

            return result;
        }
    }
}
