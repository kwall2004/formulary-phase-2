using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.BLL.Utility;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Atlas.BenefitPlan.BLL
{
    /// <summary>
    /// The Plan Benefit Package Service Area BLL for Benefit Plan
    /// </summary>
    /// <seealso cref="Atlas.BenefitPlan.BLL.Interfaces.IPlanBenefitPackageServiceAreaBLL" />
    public class PlanBenefitPackageServiceAreaBLL : IPlanBenefitPackageServiceAreaBLL
    {
        /// <summary>
        /// the Benefit Plan Repository Factory
        /// </summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>
        /// The Constructor for the Plan Benefit Package Service Area BLL for Benefit Plan
        /// </summary>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        public PlanBenefitPackageServiceAreaBLL(IBenefitPlanRepositoryFactory repoFactory)
        {
            _repoFactory = repoFactory;
        }

        /// <summary>
        /// Get a Plan Benefit Package Service Areas
        /// </summary>
        /// <param name="pbpSK">the Plan Benefit Package ID</param>
        /// <returns>List of Service Area View Models</returns>
        public List<ServiceAreaGetVM> GetPlanBenefitPackageServiceAreas(long pbpSK)
        {
            List<ServiceAreaGetVM> serviceAreaViewModels = new List<ServiceAreaGetVM>();

            serviceAreaViewModels = _repoFactory.ServiceArea().FindAll(w => w.PBPSK == pbpSK)
                .Select(s => new ServiceAreaGetVM() { SvcAreaSK = s.SvcAreaSK, PBPSK = s.PBPSK, SvcAreaName = s.SvcAreaName, EfctvStartDt = s.EfctvStartDt, EfctvEndDt = s.EfctvEndDt }).ToList();

            serviceAreaViewModels.ForEach(f =>
            {
                f.CountryLookup = GetServiceAreaLookup(ServiceAreaAddressHierarchy.Country, f.SvcAreaSK);
                f.ServiceAreaHierarchy = GetServiceAreaForSvcAreaSK(f.SvcAreaSK);
            });

            return serviceAreaViewModels;
        }

        #region " PBP Service Area "

        /// <summary>
        /// Get Service Area hierarchy by SvcAreaSK
        /// </summary>
        /// <param name="svcAreaSK">the id of the package</param>
        /// <returns>a Hierarchy Tree Node with all children for the family</returns>
        public List<HierarchyTreeNode> GetServiceAreaForSvcAreaSK(long svcAreaSK)
        {
            List<HierarchyTreeNode> hierarchyTreeNodes = new List<HierarchyTreeNode>();

            //GetAccount PBP and then load associated hierarchy

            //if it is a country just load it

            IQueryable<spSvcAreaHierarchyGetBySvcAreaSK_Result> svcAreaItemsCountry = _repoFactory.AtlasBenefitPlanStoredProcs().GetSvcAreaHierarchyGetBySvcAreaSK(svcAreaSK);
            foreach (spSvcAreaHierarchyGetBySvcAreaSK_Result country in svcAreaItemsCountry.Where(c => c.StPrvncCodeSK == null))
            {
                HierarchyTreeNode countryToLoad = LoadFindOrCreateCountry(hierarchyTreeNodes, country.ISOCntryCodeSK, country.ISOCntryCode, DateTime.MinValue, DateTime.MaxValue);
            }

            IQueryable<spSvcAreaHierarchyGetBySvcAreaSK_Result> svcAreaItemsState = _repoFactory.AtlasBenefitPlanStoredProcs().GetSvcAreaHierarchyGetBySvcAreaSK(svcAreaSK);
            //if it is a State you might have to load country first
            foreach (spSvcAreaHierarchyGetBySvcAreaSK_Result state in svcAreaItemsState.Where(c => c.StPrvncCodeSK != null && c.FIPSCntyCodeSK == null))
            {
                HierarchyTreeNode countryForThisState = LoadFindOrCreateCountry(hierarchyTreeNodes, state.ISOCntryCodeSK, state.ISOCntryCode, DateTime.MinValue, DateTime.MaxValue);
                LoadFindOrCreateState(countryForThisState, state.StPrvncCodeSK.Value, state.StPrvncDesc, DateTime.MinValue, DateTime.MaxValue); //HierarchyTreeNode stateToLoad =
            }

            IQueryable<spSvcAreaHierarchyGetBySvcAreaSK_Result> svcAreaItemsCounty = _repoFactory.AtlasBenefitPlanStoredProcs().GetSvcAreaHierarchyGetBySvcAreaSK(svcAreaSK);
            //if it is a State you might have to load country first
            foreach (spSvcAreaHierarchyGetBySvcAreaSK_Result county in svcAreaItemsCounty.Where(c => c.FIPSCntyCodeSK != null))
            {
                HierarchyTreeNode countryForThisCounty = LoadFindOrCreateCountry(hierarchyTreeNodes, county.ISOCntryCodeSK, county.ISOCntryCode, DateTime.MinValue, DateTime.MaxValue);
                HierarchyTreeNode stateForThisCounty = LoadFindOrCreateState(countryForThisCounty, county.StPrvncCodeSK.Value, county.StPrvncDesc, DateTime.MinValue, DateTime.MaxValue);
                LoadFindOrCreateCounty(stateForThisCounty, county.FIPSCntyCodeSK.Value, county.FIPSCntyCodeDesc, DateTime.MinValue, DateTime.MaxValue);
            }

            IQueryable<spSvcAreaHierarchyGetBySvcAreaSK_Result> svcAreaItemsPostalCode = _repoFactory.AtlasBenefitPlanStoredProcs().GetSvcAreaHierarchyGetBySvcAreaSK(svcAreaSK);
            //if it is a State you might have to load country first
            foreach (spSvcAreaHierarchyGetBySvcAreaSK_Result postalCode in svcAreaItemsPostalCode.Where(c => c.SvcAreaPstlCodeSK != null))
            {
                HierarchyTreeNode countryForThisPostalCode = LoadFindOrCreateCountry(hierarchyTreeNodes, postalCode.ISOCntryCodeSK, postalCode.ISOCntryCode, DateTime.MinValue, DateTime.MaxValue);
                HierarchyTreeNode stateForThisPostalCode = LoadFindOrCreateState(countryForThisPostalCode, postalCode.StPrvncCodeSK.Value, postalCode.StPrvncDesc, DateTime.MinValue, DateTime.MaxValue);
                LoadFindOrCreatePostalCode(stateForThisPostalCode, postalCode.SvcAreaPstlCodeSK.Value, postalCode.PstlCode, DateTime.MinValue, DateTime.MaxValue);
            }
            return hierarchyTreeNodes;
        }

        /// <summary>
        /// Get the Service Area Lookup Class for a Service area and ID
        /// </summary>
        /// <param name="hierarchyType">the Service Area Hierarchy Type</param>
        /// <param name="svcAreaSK">the Service Area SK</param>
        /// <param name="lookupSK">the Lookup SK (Country = 0)</param>
        /// <returns>the Service Area Lookup object</returns>
        public ServiceAreaLookup GetServiceAreaLookup(ServiceAreaAddressHierarchy hierarchyType, long svcAreaSK, long lookupSK = 0)
        {
            ServiceAreaLookup serviceAreaLookup = new ServiceAreaLookup();
            serviceAreaLookup.SvcAreaSK = svcAreaSK;
            serviceAreaLookup.LookupType = hierarchyType;

            switch (hierarchyType)
            {
                case ServiceAreaAddressHierarchy.Country:
                    serviceAreaLookup.LookupDetails.AddRange(GetCountryServiceAreas(svcAreaSK));
                    break;

                case ServiceAreaAddressHierarchy.StateProvince:
                    IQueryable<StPrvncCode> stPrvncCodeQuery = _repoFactory.StateProvinceCode().FindAll(w => w.ISOCntryCodeSK == lookupSK);
                    serviceAreaLookup.ServiceAreaBreadCrumb = _repoFactory.ISOCountryCode().FindAll(w => w.ISOCntryCodeSK == lookupSK)
                        .Select(s => new ServiceAreaNodeDetail()
                        {
                            ISOCntryCodeSK = s.ISOCntryCodeSK,
                            ISOCntryCode1 = s.ISOCntryCode1
                        }).FirstOrDefault();
                    serviceAreaLookup.LookupDetails.AddRange(GetStateProvinceServiceAreas(stPrvncCodeQuery, svcAreaSK));
                    break;

                case ServiceAreaAddressHierarchy.County:
                    IQueryable<FIPSCntyCode> fipsCntyCodeQuery = _repoFactory.FIPSCountyCode().FindAll(w => w.StPrvncCodeSK == lookupSK);
                    serviceAreaLookup.ServiceAreaBreadCrumb = _repoFactory.StateProvinceCode().FindAll(w => w.StPrvncCodeSK == lookupSK)
                        .Select(s => new ServiceAreaNodeDetail()
                        {
                            ISOCntryCodeSK = s.ISOCntryCode.ISOCntryCodeSK,
                            ISOCntryCode1 = s.ISOCntryCode.ISOCntryCode1,
                            StPrvncCodeSK = s.StPrvncCodeSK,
                            StPrvncDesc = s.StPrvncDesc
                        }).FirstOrDefault();
                    serviceAreaLookup.LookupDetails.AddRange(GetCountyServiceAreas(fipsCntyCodeQuery, svcAreaSK));
                    break;

                case ServiceAreaAddressHierarchy.PostalCode:
                    IQueryable<CntyPstlCode> pstlCodeQuery = _repoFactory.CountyPostalCode().FindAll(w => w.FIPSCntyCodeSK == lookupSK);
                    serviceAreaLookup.ServiceAreaBreadCrumb = _repoFactory.FIPSCountyCode().FindAll(w => w.FIPSCntyCodeSK == lookupSK)
                        .Select(s => new ServiceAreaNodeDetail()
                        {
                            ISOCntryCodeSK = s.StPrvncCode.ISOCntryCode.ISOCntryCodeSK,
                            ISOCntryCode1 = s.StPrvncCode.ISOCntryCode.ISOCntryCode1,
                            StPrvncCodeSK = s.StPrvncCodeSK,
                            StPrvncDesc = s.StPrvncCode.StPrvncDesc,
                            FIPSCntyCodeSK = s.FIPSCntyCodeSK,
                            FIPSCntyCodeDesc = s.FIPSCntyCodeDesc
                        }).FirstOrDefault();
                    serviceAreaLookup.LookupDetails.AddRange(GetPostalCodeServiceAreas(pstlCodeQuery, svcAreaSK));
                    break;

                default:
                    break;
            }

            return serviceAreaLookup;
        }

        /// <summary>
        /// Add or Update a Service Area Configuration for a Plan Benefit Package
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Service Area Configuration to Add or Update</param>
        /// <returns>ServiceAreaUpdateVM.</returns>
        public ServiceAreaUpdateVM SetServiceAreaConfiguration(ServiceAreaUpdateVM itemToAddOrUpdate)
        {
            return SetServiceArea(itemToAddOrUpdate);
        }
        #endregion " PBP Service Area "

        #region private Service area hierarchy methods

        /// <summary>
        /// Load the node for country
        /// </summary>
        /// <param name="hierarchyTreeNodes">The hierarchy tree nodes.</param>
        /// <param name="iSOCntryCodeSK">The i so cntry code sk.</param>
        /// <param name="iSOCntryCodeDesc">The i so cntry code desc.</param>
        /// <param name="efctvStartDt">The efctv start dt.</param>
        /// <param name="efctvEndDt">The efctv end dt.</param>
        /// <returns>return found or loaded country</returns>
        private HierarchyTreeNode LoadFindOrCreateCountry(List<HierarchyTreeNode> hierarchyTreeNodes, long iSOCntryCodeSK, string iSOCntryCodeDesc, DateTime efctvStartDt, DateTime efctvEndDt)
        {
            //Find the acct. If there move on else add
            HierarchyTreeNode country = hierarchyTreeNodes.FirstOrDefault<HierarchyTreeNode>(htn => htn.EntitySK == iSOCntryCodeSK);
            if (country == null)
            {
                HierarchyTreeNode nodeCountry = UtilityBll.loadHierarchyNode(iSOCntryCodeSK, TenantFamilyHierarchy.Country, iSOCntryCodeDesc, efctvStartDt, efctvEndDt, null);
                hierarchyTreeNodes.Add(nodeCountry);
                country = hierarchyTreeNodes.FirstOrDefault<HierarchyTreeNode>(htn => htn.EntitySK == iSOCntryCodeSK);
            }
            //else do nothing because this account has been added
            return country;
        }

        /// <summary>
        /// Load the state or create if not there
        /// </summary>
        /// <param name="countryNode">The country node.</param>
        /// <param name="stPrvncCodeSK">The st PRVNC code sk.</param>
        /// <param name="stPrvncDesc">The st PRVNC desc.</param>
        /// <param name="efctvStartDt">The efctv start dt.</param>
        /// <param name="efctvEndDt">The efctv end dt.</param>
        /// <returns>HierarchyTreeNode.</returns>
        private HierarchyTreeNode LoadFindOrCreateState(HierarchyTreeNode countryNode, long stPrvncCodeSK, string stPrvncDesc, DateTime efctvStartDt, DateTime efctvEndDt)
        {
            //Find the acct. If there move on else add
            HierarchyTreeNode state = countryNode.ChildrenNodes.FirstOrDefault<HierarchyTreeNode>(htn => htn.EntitySK == stPrvncCodeSK);
            if (state == null)
            {
                HierarchyTreeNode nodeState = UtilityBll.loadHierarchyNode(stPrvncCodeSK, TenantFamilyHierarchy.State, stPrvncDesc, efctvStartDt, efctvEndDt, null);
                countryNode.ChildrenNodes.Add(nodeState);
                state = countryNode.ChildrenNodes.FirstOrDefault<HierarchyTreeNode>(htn => htn.EntitySK == stPrvncCodeSK);
            }
            //else do nothing because this account has been added
            return state;
        }

        /// <summary>
        /// Loads the find or create county.
        /// </summary>
        /// <param name="stateNode">The state node.</param>
        /// <param name="fIPSCntyCodeSK">The f ips cnty code sk.</param>
        /// <param name="fIPSCntyCodeDesc">The f ips cnty code desc.</param>
        /// <param name="efctvStartDt">The efctv start dt.</param>
        /// <param name="efctvEndDt">The efctv end dt.</param>
        /// <returns>HierarchyTreeNode.</returns>
        private HierarchyTreeNode LoadFindOrCreateCounty(HierarchyTreeNode stateNode, long fIPSCntyCodeSK, string fIPSCntyCodeDesc, DateTime efctvStartDt, DateTime efctvEndDt)
        {
            //Find the acct. If there move on else add
            HierarchyTreeNode county = stateNode.ChildrenNodes.FirstOrDefault<HierarchyTreeNode>(htn => htn.EntitySK == fIPSCntyCodeSK && htn.EntityDescription == fIPSCntyCodeDesc);
            if (county == null)
            {
                HierarchyTreeNode nodeState = UtilityBll.loadHierarchyNode(fIPSCntyCodeSK, TenantFamilyHierarchy.County, fIPSCntyCodeDesc, efctvStartDt, efctvEndDt, null);
                stateNode.ChildrenNodes.Add(nodeState);
                county = stateNode.ChildrenNodes.FirstOrDefault<HierarchyTreeNode>(htn => htn.EntitySK == fIPSCntyCodeSK && htn.EntityDescription == fIPSCntyCodeDesc);
            }
            //else do nothing because this account has been added
            return county;
        }

        /// <summary>
        /// Loads the find or create postal code.
        /// </summary>
        /// <param name="stateNode">The state node.</param>
        /// <param name="pstlCodeSK">The PSTL code sk.</param>
        /// <param name="PstlCode">The PSTL code.</param>
        /// <param name="efctvStartDt">The efctv start dt.</param>
        /// <param name="efctvEndDt">The efctv end dt.</param>
        /// <returns>HierarchyTreeNode.</returns>
        private HierarchyTreeNode LoadFindOrCreatePostalCode(HierarchyTreeNode stateNode, long pstlCodeSK, string PstlCode, DateTime efctvStartDt, DateTime efctvEndDt)
        {
            //Find the acct. If there move on else add
            HierarchyTreeNode postalCode = stateNode.ChildrenNodes.FirstOrDefault<HierarchyTreeNode>(htn => htn.EntitySK == pstlCodeSK && htn.EntityDescription == PstlCode);
            if (postalCode == null)
            {
                HierarchyTreeNode nodeState = UtilityBll.loadHierarchyNode(pstlCodeSK, TenantFamilyHierarchy.PostalCode, PstlCode, efctvStartDt, efctvEndDt, null);
                stateNode.ChildrenNodes.Add(nodeState);
                postalCode = stateNode.ChildrenNodes.FirstOrDefault<HierarchyTreeNode>(htn => htn.EntitySK == pstlCodeSK && htn.EntityDescription == PstlCode);
            }
            //else do nothing because this account has been added
            return postalCode;
        }

        #endregion private Service area hierarchy methods

        #region " Private Methods - Service Area Lookup "

        /// <summary>
        /// Get the Countries for the Service Area Lookup Details
        /// </summary>
        /// <param name="svcAreaSK">the Service Area Key</param>
        /// <returns>List of Service Area Lookup Detail</returns>
        private List<ServiceAreaLookupDetail> GetCountryServiceAreas(long svcAreaSK)
        {
            List<ServiceAreaLookupDetail> details = new List<ServiceAreaLookupDetail>();

            Dictionary<long, ServiceAreaLookupDetail> countries = _repoFactory.ISOCountryCode().FindAll()
               .Select(s => new ServiceAreaLookupDetail() { LookupTypeSK = s.ISOCntryCodeSK, LookupTypeDescription = s.ISOCntryCode1, LookupTypeChild = ServiceAreaAddressHierarchy.StateProvince })
               .ToDictionary(d => d.LookupTypeSK);

            _repoFactory.ServiceAreaCountry().FindAll(w => w.SvcAreaSK == svcAreaSK).ToList().ForEach(f =>
            {
                if (countries.ContainsKey(f.ISOCntryCodeSK))
                {
                    countries[f.ISOCntryCodeSK].SvcAreaTypeSK = f.SvcAreaCntryCodeSK;
                    countries[f.ISOCntryCodeSK].Selected = true;
                }
            });

            return countries.Select(s => s.Value).ToList();
        }

        /// <summary>
        /// Get the State Provinces for the Service Area Lookup Details
        /// </summary>
        /// <param name="query">the State Province Query for the ISO Country Code</param>
        /// <param name="svcAreaSK">the Service Area Key</param>
        /// <returns>List of Service Area Lookup Detail</returns>
        private List<ServiceAreaLookupDetail> GetStateProvinceServiceAreas(IQueryable<StPrvncCode> query, long svcAreaSK)
        {
            List<ServiceAreaLookupDetail> details = new List<ServiceAreaLookupDetail>();

            Dictionary<long, ServiceAreaLookupDetail> stateProvinces = query
              .Select(s => new ServiceAreaLookupDetail() { LookupTypeSK = s.StPrvncCodeSK, LookupTypeDescription = s.StPrvncDesc, LookupTypeChild = ServiceAreaAddressHierarchy.County })
              .ToDictionary(d => d.LookupTypeSK);

            _repoFactory.ServiceAreaStateProvince().FindAll(w => w.SvcAreaSK == svcAreaSK).ToList().ForEach(f =>
            {
                if (stateProvinces.ContainsKey(f.StPrvncCodeSK))
                {
                    stateProvinces[f.StPrvncCodeSK].SvcAreaTypeSK = f.SvcAreaStPrvncCodeSK;
                    stateProvinces[f.StPrvncCodeSK].Selected = true;
                }
            });

            return stateProvinces.Select(s => s.Value).ToList();
        }

        /// <summary>
        /// Get the FIPS County for the Service Area Lookup Details
        /// </summary>
        /// <param name="query">the FIPS County Code Query for the ISO Country Code</param>
        /// <param name="svcAreaSK">the Service Area Key</param>
        /// <returns>List of Service Area Lookup Detail</returns>
        private List<ServiceAreaLookupDetail> GetCountyServiceAreas(IQueryable<FIPSCntyCode> query, long svcAreaSK)
        {
            List<ServiceAreaLookupDetail> details = new List<ServiceAreaLookupDetail>();

            Dictionary<long, ServiceAreaLookupDetail> counties = query
              .Select(s => new ServiceAreaLookupDetail() { LookupTypeSK = s.FIPSCntyCodeSK, LookupTypeDescription = s.FIPSCntyCodeDesc, LookupTypeChild = ServiceAreaAddressHierarchy.PostalCode })
              .ToDictionary(d => d.LookupTypeSK);

            _repoFactory.ServiceAreaCounty().FindAll(w => w.SvcAreaSK == svcAreaSK).ToList().ForEach(f =>
            {
                if (counties.ContainsKey(f.FIPSCntyCodeSK))
                {
                    counties[f.FIPSCntyCodeSK].SvcAreaTypeSK = f.SvcAreaCntyCodeSK;
                    counties[f.FIPSCntyCodeSK].Selected = true;
                }
            });

            return counties.Select(s => s.Value).ToList();
        }

        /// <summary>
        /// Get the FIPS County for the Service Area Lookup Details
        /// </summary>
        /// <param name="query">the FIPS County Code Query for the ISO Country Code</param>
        /// <param name="svcAreaSK">the Service Area Key</param>
        /// <returns>List of Service Area Lookup Detail</returns>
        private List<ServiceAreaLookupDetail> GetPostalCodeServiceAreas(IQueryable<CntyPstlCode> query, long svcAreaSK)
        {
            List<ServiceAreaLookupDetail> details = new List<ServiceAreaLookupDetail>();

            Dictionary<long, ServiceAreaLookupDetail> pstlCodes = query
              .Select(s => new ServiceAreaLookupDetail() { LookupTypeSK = s.PstlCodeSK, LookupTypeDescription = s.PstlCode.PstlCode1, USZipPlus4Ind = s.PstlCode.USZipPlus4Ind, LookupTypeChild = ServiceAreaAddressHierarchy.Leaf })
              .ToDictionary(d => d.LookupTypeSK);

            _repoFactory.ServiceAreaPostalCode().FindAll(w => w.SvcAreaSK == svcAreaSK).ToList().ForEach(f =>
            {
                if (pstlCodes.ContainsKey(f.PstlCodeSK))
                {
                    pstlCodes[f.PstlCodeSK].SvcAreaTypeSK = f.SvcAreaPstlCodeSK;
                    pstlCodes[f.PstlCodeSK].Selected = true;
                }
            });

            return pstlCodes.Select(s => s.Value).ToList();
        }

        #endregion " Private Methods - Service Area Lookup "

        #region " Private Methods - Set "

        /// <summary>
        /// Add or Update a Set Service Area
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Service Area to Add or Update</param>
        /// <returns>ServiceAreaUpdateVM.</returns>
        private ServiceAreaUpdateVM SetServiceArea(ServiceAreaUpdateVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            using (var repository = _repoFactory.ServiceArea())
            using (var repoCountry = _repoFactory.ServiceAreaCountry())
            using (var repoStProvince = _repoFactory.ServiceAreaStateProvince())
            using (var repoCounty = _repoFactory.ServiceAreaCounty())
            using (var repoPstlCode = _repoFactory.ServiceAreaPostalCode())
            {
                SvcArea serviceArea = itemToAddOrUpdate.SvcAreaSK != 0
                    ? repository.FindOne(p => p.SvcAreaSK == itemToAddOrUpdate.SvcAreaSK)
                    : new SvcArea()
                    {
                        PBPSK = itemToAddOrUpdate.PBPSK,
                        CreatedBy = itemToAddOrUpdate.CurrentUser,
                        CreatedTs = timeStamp
                    };

                serviceArea.SvcAreaName = itemToAddOrUpdate.SvcAreaName;
                serviceArea.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
                serviceArea.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
                serviceArea.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                serviceArea.LastModfdTs = timeStamp;
                serviceArea.DelTs = itemToAddOrUpdate.Deleted ? (DateTime?)timeStamp : null;

                foreach (ServiceAreaUpdateListVM item in itemToAddOrUpdate.Transactions)
                {
                    switch (item.TransactionType)
                    {
                        case ServiceAreaAddressHierarchy.Country:
                            SetServiceAreaCountry(repoCountry, serviceArea, item);
                            break;
                        case ServiceAreaAddressHierarchy.StateProvince:
                            SetServiceAreaStateProvince(repoStProvince, serviceArea, item);
                            break;
                        case ServiceAreaAddressHierarchy.County:
                            SetServiceAreaCounty(repoCounty, serviceArea, item);
                            break;
                        case ServiceAreaAddressHierarchy.PostalCode:
                            SetServiceAreaPostalCode(repoPstlCode, serviceArea, item);
                            break;
                        default:
                            break;
                    }
                }

                repository.AddOrUpdate(serviceArea);
                repository.SaveChanges();

                itemToAddOrUpdate.SvcAreaSK = serviceArea.SvcAreaSK;
                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Add or Update a Set Service Area Country
        /// </summary>
        /// <param name="repository">the Service Area Country Repository</param>
        /// <param name="serviceArea">the Service Area to Associate the Country to</param>
        /// <param name="itemToAddOrUpdate">the Service Area Transaction to Add or Update</param>
        /// <returns>ServiceAreaUpdateListVM.</returns>
        private ServiceAreaUpdateListVM SetServiceAreaCountry(IServiceAreaCountryRepository repository, SvcArea serviceArea, ServiceAreaUpdateListVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            SvcAreaCntryCode serviceAreaCountry = itemToAddOrUpdate.SvcAreaTypeSK != 0
                 ? repository.FindOne(p => p.SvcAreaCntryCodeSK == itemToAddOrUpdate.SvcAreaTypeSK)
                 : new SvcAreaCntryCode() { CreatedBy = serviceArea.LastModfdBy, CreatedTs = timeStamp };

            serviceAreaCountry.ISOCntryCodeSK = itemToAddOrUpdate.TransactionTypeSK;
            serviceAreaCountry.EfctvStartDt = serviceArea.EfctvStartDt;
            serviceAreaCountry.EfctvEndDt = serviceArea.EfctvEndDt;
            serviceAreaCountry.LastModfdBy = serviceArea.LastModfdBy;
            serviceAreaCountry.LastModfdTs = timeStamp;
            serviceAreaCountry.DelTs = itemToAddOrUpdate.Deleted ? (DateTime?)timeStamp : null;

            serviceAreaCountry.SvcArea = serviceArea;
            serviceArea.SvcAreaCntryCode.Add(serviceAreaCountry);

            repository.AddOrUpdate(serviceAreaCountry);
            return itemToAddOrUpdate;
        }

        /// <summary>
        /// Add or Update a Set Service Area State Province
        /// </summary>
        /// <param name="repository">the Service Area State Province Repository</param>
        /// <param name="serviceArea">the Service Area to Associate the State Province too</param>
        /// <param name="itemToAddOrUpdate">the Service Area Transaction to Add or Update</param>
        /// <returns>ServiceAreaUpdateListVM.</returns>
        private ServiceAreaUpdateListVM SetServiceAreaStateProvince(IServiceAreaStateProvinceRepository repository, SvcArea serviceArea, ServiceAreaUpdateListVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            SvcAreaStPrvncCode serviceAreaStateProvince = itemToAddOrUpdate.SvcAreaTypeSK != 0
                 ? repository.FindOne(p => p.SvcAreaStPrvncCodeSK == itemToAddOrUpdate.SvcAreaTypeSK)
                 : new SvcAreaStPrvncCode() { CreatedBy = serviceArea.LastModfdBy, CreatedTs = timeStamp };

            serviceAreaStateProvince.StPrvncCodeSK = itemToAddOrUpdate.TransactionTypeSK;
            serviceAreaStateProvince.EfctvStartDt = serviceArea.EfctvStartDt;
            serviceAreaStateProvince.EfctvEndDt = serviceArea.EfctvEndDt;
            serviceAreaStateProvince.LastModfdBy = serviceArea.LastModfdBy;
            serviceAreaStateProvince.LastModfdTs = timeStamp;
            serviceAreaStateProvince.DelTs = itemToAddOrUpdate.Deleted ? (DateTime?)timeStamp : null;

            serviceAreaStateProvince.SvcArea = serviceArea;
            serviceArea.SvcAreaStPrvncCode.Add(serviceAreaStateProvince);

            repository.AddOrUpdate(serviceAreaStateProvince);
            return itemToAddOrUpdate;
        }

        /// <summary>
        /// Add or Update a Set Service Area County
        /// </summary>
        /// <param name="repository">the Service Area County Repository</param>
        /// <param name="serviceArea">the Service Area to Associate the County too</param>
        /// <param name="itemToAddOrUpdate">the Service Area Transaction to Add or Update</param>
        /// <returns>ServiceAreaUpdateListVM.</returns>
        private ServiceAreaUpdateListVM SetServiceAreaCounty(IServiceAreaCountyRepository repository, SvcArea serviceArea, ServiceAreaUpdateListVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            SvcAreaCntyCode serviceAreaCounty = itemToAddOrUpdate.SvcAreaTypeSK != 0
                 ? repository.FindOne(p => p.SvcAreaCntyCodeSK == itemToAddOrUpdate.SvcAreaTypeSK)
                 : new SvcAreaCntyCode() { CreatedBy = serviceArea.LastModfdBy, CreatedTs = timeStamp };

            serviceAreaCounty.FIPSCntyCodeSK = itemToAddOrUpdate.TransactionTypeSK;
            serviceAreaCounty.EfctvStartDt = serviceArea.EfctvStartDt;
            serviceAreaCounty.EfctvEndDt = serviceArea.EfctvEndDt;
            serviceAreaCounty.LastModfdBy = serviceArea.LastModfdBy;
            serviceAreaCounty.LastModfdTs = timeStamp;
            serviceAreaCounty.DelTs = itemToAddOrUpdate.Deleted ? (DateTime?)timeStamp : null;

            serviceAreaCounty.SvcArea = serviceArea;
            serviceArea.SvcAreaCntyCode.Add(serviceAreaCounty);

            repository.AddOrUpdate(serviceAreaCounty);
            return itemToAddOrUpdate;
        }

        /// <summary>
        /// Add or Update a Set Service Area Postal Code
        /// </summary>
        /// <param name="repository">the Service Area Postal Code Repository</param>
        /// <param name="serviceArea">the Service Area to Associate the Postal Code too</param>
        /// <param name="itemToAddOrUpdate">the Service Area Transaction to Add or Update</param>
        /// <returns>ServiceAreaUpdateListVM.</returns>
        private ServiceAreaUpdateListVM SetServiceAreaPostalCode(IServiceAreaPostalCodeRepository repository, SvcArea serviceArea, ServiceAreaUpdateListVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            SvcAreaPstlCode serviceAreaPostalCode = itemToAddOrUpdate.SvcAreaTypeSK != 0
                 ? repository.FindOne(p => p.SvcAreaPstlCodeSK == itemToAddOrUpdate.SvcAreaTypeSK)
                 : new SvcAreaPstlCode() { CreatedBy = serviceArea.LastModfdBy, CreatedTs = timeStamp };

            serviceAreaPostalCode.PstlCodeSK = itemToAddOrUpdate.TransactionTypeSK;
            serviceAreaPostalCode.EfctvStartDt = serviceArea.EfctvStartDt;
            serviceAreaPostalCode.EfctvEndDt = serviceArea.EfctvEndDt;
            serviceAreaPostalCode.LastModfdBy = serviceArea.LastModfdBy;
            serviceAreaPostalCode.LastModfdTs = timeStamp;
            serviceAreaPostalCode.DelTs = itemToAddOrUpdate.Deleted ? (DateTime?)timeStamp : null;

            serviceAreaPostalCode.SvcArea = serviceArea;
            serviceArea.SvcAreaPstlCode.Add(serviceAreaPostalCode);

            repository.AddOrUpdate(serviceAreaPostalCode);
            return itemToAddOrUpdate;
        }

        #endregion " Private Methods - Set "
    }
}