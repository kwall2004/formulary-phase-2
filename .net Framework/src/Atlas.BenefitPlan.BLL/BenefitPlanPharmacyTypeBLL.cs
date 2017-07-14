using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Atlas.BenefitPlan.BLL
{
    /// <summary>
    /// The Benefit Plan Pharmacy Type BLL for Benefit Plan
    /// </summary>
    /// <seealso cref="Atlas.BenefitPlan.BLL.Interfaces.IBenefitPlanPharmacyTypeBLL" />
    public class BenefitPlanPharmacyTypeBLL : IBenefitPlanPharmacyTypeBLL
    {
        /// <summary>
        /// the Benefit Plan Repository Factory
        /// </summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>
        /// The Constructor for the Pharmacy Type BLL for Benefit Plan
        /// </summary>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        public BenefitPlanPharmacyTypeBLL(IBenefitPlanRepositoryFactory repoFactory)
        {
            _repoFactory = repoFactory;
        }

        /// <summary>
        /// Adds Or Update all the Pharmacy Pricing Detail for a Benefit Plan
        /// </summary>
        /// <param name="item">The item.</param>
        /// <returns>PharmacyPricingDetailVM.</returns>
        public PharmacyPricingDetailVM AddOrUpdateAllBenefitPlanPharmPrcg(PharmacyPricingDetailVM item)
        {
            using (var repoBnftPlanPharmPrcg = _repoFactory.PlanPricing())
            {
                PlanPrcg planPrcg = item.PlanPrcgSK == 0
                                      ? new PlanPrcg()
                                      {
                                          CreatedBy = item.CurrentUser,
                                          CreatedTs = UtilityFunctions.GetTimeStamp()
                                      }
                                       : repoBnftPlanPharmPrcg.FindAll(k => k.PlanPrcgSK == item.PlanPrcgSK).First();
                planPrcg.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                planPrcg.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                planPrcg.DaySuplTypeSK = item.DaySuplTypeSK;
                planPrcg.BnftPlanSK = item.BnftPlanSK;
                planPrcg.PharmTypeSK = item.PharmTypeSK;
                planPrcg.CostBasisTypeSK = item.CostBasisTypeSK;
                planPrcg.DrugBrandTypeSK = item.DrugBrandTypeSK;
                planPrcg.DiscPct = item.DiscPct;
                planPrcg.DiscAmt = item.DiscAmt;
                planPrcg.MinDspnsgFeeAmt = item.MinDspnsgFeeAmt;
                planPrcg.MaxDspnsgFeeAmt = item.MaxDspnsgFeeAmt;
                planPrcg.GERDspnsgFeeAmt = item.GERDspnsgFeeAmt;
                planPrcg.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                planPrcg.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                planPrcg.LastModfdBy = item.CurrentUser;
                planPrcg.LastModfdTs = UtilityFunctions.GetTimeStamp();
                //Check if the record has to deleted
                if (item.IsDeleted)
                {
                    planPrcg.DelTs = UtilityFunctions.GetTimeStamp();
                }
                repoBnftPlanPharmPrcg.AddOrUpdate(planPrcg);
                repoBnftPlanPharmPrcg.SaveChanges();
                return item;
            }
        }

        #region " Benefit Plan Pharmacy Type "
        /// <summary>
        /// To Get the details of all Pharmacy Types - Day Supply for a Benefit Plan
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>List&lt;BenefitPlanPharmacyTypeVM&gt;.</returns>
        public List<BenefitPlanPharmacyTypeVM> GetBenefitPlanPharmTypes(long bnftPlanSK)
        {
            List<BenefitPlanPharmacyTypeVM> pharmacyTypes = new List<BenefitPlanPharmacyTypeVM>();

            pharmacyTypes = _repoFactory.BenefitPlanPharmacyType().FindAll(p => p.BnftPlanSK == bnftPlanSK)
                .Select(t => new BenefitPlanPharmacyTypeVM()
                {
                    BnftPlanSK = t.BnftPlanSK,
                    PharmTypeSK = t.PharmTypeSK,
                    BnftPlanPharmTypeSK = t.BnftPlanPharmTypeSK,
                    PharmTypeCode = t.PharmType.PharmTypeCode,
                    EarlyRefillPct = t.EarlyRefillPct,
                    MaxDaySuplMntncMedications = t.MaxDaySuplMntncMedications,
                    MaxDaySuplNonMntncMedications = t.MaxDaySuplNonMntncMedications,
                    MaxCostPerRx = t.MaxCostPerRx
                }).ToList();

            pharmacyTypes.ForEach(phrmType =>
            {
                phrmType.DaySupplyTypeList.AddRange(
                    _repoFactory.BenefitPlanPharmacyTypeDaySupply().FindAll(w => w.BnftPlanPharmTypeSK == phrmType.BnftPlanPharmTypeSK)
                        .Select(s => new BenefitPlanPharmacyTypeDaySupplyVM()
                        {
                            BnftPlanPharmTypeDaySuplSK = s.BnftPlanPharmTypeDaySuplSK,
                            DaySuplTypeSK = s.DaySuplTypeSK,
                            DaySuplTypeCode = s.DaySuplType.DaySuplTypeCode,
                            DaySuplTypeDesc = s.DaySuplType.DaySuplTypeDesc,
                            MaximumCost = s.MaxCost
                        })
                );
            });

            return pharmacyTypes;
        }

        /// <summary>
        /// To Get the details of all Pharmacy Types by Network Tier for a Benefit Plan
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <param name="ntwrkTierSK">The Ntwrk Tier sk.</param>
        /// <returns>List of PharmacyTypeWithNetworkTier.</returns>
        public List<PharmacyTypeWithNetworkTier> GetBenefitPlanPharmTypes(long bnftPlanSK, long ntwrkTierSK)
        {
            List<PharmacyTypeWithNetworkTier> pharmacyTypes = new List<PharmacyTypeWithNetworkTier>();

            IQueryable<CopaySetup> copaySetups = _repoFactory.CopaySetup()
                .FindAll(w => w.NtwrkTierSK == ntwrkTierSK)
                .AsQueryable();
            IQueryable<BnftPlanPharmType> bnftPlanPharmTypes = _repoFactory.BenefitPlanPharmacyType()
                .FindAll(w => w.BnftPlanSK == bnftPlanSK)
                .AsQueryable();
            IQueryable<BnftPlanPharmTypeDaySupl> bnftPlanPharmTypeDaySupls = _repoFactory.BenefitPlanPharmacyTypeDaySupply()
                .FindAll()
                .AsQueryable();
            IQueryable<PharmType> pharmTypes = _repoFactory.PharmacyType()
                .FindAll()
                .AsQueryable();

            var query = from cs in copaySetups
                      join bpt in bnftPlanPharmTypeDaySupls
                          on cs.BnftPlanPharmTypeDaySuplSK equals bpt.BnftPlanPharmTypeDaySuplSK
                      join bp in bnftPlanPharmTypes
                          on bpt.BnftPlanPharmTypeSK equals bp.BnftPlanPharmTypeSK
                      join pt in pharmTypes
                          on bp.PharmTypeSK equals pt.PharmTypeSK
                      orderby pt.PharmTypeCode
                      select new { bp.BnftPlanSK, cs.NtwrkTierSK, pt.PharmTypeSK, pt.PharmTypeCode};

            pharmacyTypes = query.GroupBy(n => new {n.BnftPlanSK, n.NtwrkTierSK, n.PharmTypeSK, n.PharmTypeCode })
                  .Select(nt => new PharmacyTypeWithNetworkTier()
                  {
                      BnftPlanSK = nt.Key.BnftPlanSK,
                      NtwrkTierSK = nt.Key.NtwrkTierSK ?? 0,
                      PharmTypeSK = nt.Key.PharmTypeSK,
                      PharmTypeCode = nt.Key.PharmTypeCode
                  }).ToList();

            return pharmacyTypes;
        }

        /// <summary>
        /// Add/Update Benefit Plan Pharmacy Type Day Supply
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>BenefitPlanPharmacyTypeVM.</returns>
        public BenefitPlanPharmacyTypeVM SetBenefitPlanPharmType(BenefitPlanPharmacyTypeVM itemToAddOrUpdate)
        {
            using (var repoBnftPlanPharmType = _repoFactory.BenefitPlanPharmacyType())
            using (var repoBnftPlanPharmTypeDaySupl = _repoFactory.BenefitPlanPharmacyTypeDaySupply())
            {
                BnftPlanPharmType bnftPlanPharmType = AddBenefitPlanPharmType(itemToAddOrUpdate);

                if (!itemToAddOrUpdate.IsDeleted)
                {
                    foreach (BenefitPlanPharmacyTypeDaySupplyVM item in itemToAddOrUpdate.DaySupplyTypeList)
                    {
                        item.IsDeleted = itemToAddOrUpdate.IsDeleted ? true : item.IsDeleted;
                        BnftPlanPharmTypeDaySupl bnftPlanPharmTypedaySupl = AddBenefitPlanPharmTypeDaySupply(item, bnftPlanPharmType);
                        repoBnftPlanPharmTypeDaySupl.AddOrUpdate(bnftPlanPharmTypedaySupl);
                    }
                }

                repoBnftPlanPharmType.AddOrUpdate(bnftPlanPharmType);
                repoBnftPlanPharmType.SaveChanges();

                itemToAddOrUpdate.BnftPlanPharmTypeSK = bnftPlanPharmType.BnftPlanPharmTypeSK;
            }

            return itemToAddOrUpdate;
        }
        #endregion " Benefit Plan Pharmacy Type "

        #region " Private - Benefit Plan Pharmacy Type "
        /// <summary>
        /// Add/Update Benefit Plan Pharmacy Type
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>BenefitPlanPharmacyTypeVM.</returns>
        public BnftPlanPharmType AddBenefitPlanPharmType(BenefitPlanPharmacyTypeVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            BnftPlanPharmType bnftPlanPharmType = itemToAddOrUpdate.BnftPlanPharmTypeSK != 0
                ? _repoFactory.BenefitPlanPharmacyType().FindAll(k => k.BnftPlanPharmTypeSK == itemToAddOrUpdate.BnftPlanPharmTypeSK).First()
                : new BnftPlanPharmType()
                {
                    BnftPlanSK = itemToAddOrUpdate.BnftPlanSK,
                    EfctvStartDt = UtilityFunctions.GetEffectiveStartDate(),
                    EfctvEndDt = UtilityFunctions.GetEffectiveEndDate(),
                    CreatedBy = itemToAddOrUpdate.CurrentUser,
                    CreatedTs = timeStamp
                };

            bnftPlanPharmType.PharmTypeSK = itemToAddOrUpdate.PharmTypeSK;
            bnftPlanPharmType.EarlyRefillPct = itemToAddOrUpdate.EarlyRefillPct;
            bnftPlanPharmType.MaxDaySuplMntncMedications = itemToAddOrUpdate.MaxDaySuplMntncMedications;
            bnftPlanPharmType.MaxDaySuplNonMntncMedications = itemToAddOrUpdate.MaxDaySuplNonMntncMedications;
            bnftPlanPharmType.MaxCostPerRx = itemToAddOrUpdate.MaxCostPerRx;
            bnftPlanPharmType.LastModfdBy = itemToAddOrUpdate.CurrentUser;
            bnftPlanPharmType.LastModfdTs = timeStamp;
            bnftPlanPharmType.DelTs = itemToAddOrUpdate.IsDeleted
                ? (DateTime?)CascadeDeleteBenefitPlanPharmType(bnftPlanPharmType, itemToAddOrUpdate, timeStamp)
                : null;

            return bnftPlanPharmType;
        }

        /// <summary>
        /// Add/Update Benefit Plan Pharmacy Type Day Supply
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <param name="bnftPlanPharmType">The Benefit Plan Pharmacy Type.</param>
        /// <returns>BnftPlanPharmTypeDaySupl.</returns>
        public BnftPlanPharmTypeDaySupl AddBenefitPlanPharmTypeDaySupply(BenefitPlanPharmacyTypeDaySupplyVM itemToAddOrUpdate, BnftPlanPharmType bnftPlanPharmType)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            BnftPlanPharmTypeDaySupl bnftPlanPharmTypeDaySupl = itemToAddOrUpdate.BnftPlanPharmTypeDaySuplSK != 0
                ? _repoFactory.BenefitPlanPharmacyTypeDaySupply().FindOne(s => s.BnftPlanPharmTypeDaySuplSK == itemToAddOrUpdate.BnftPlanPharmTypeDaySuplSK)
                : new BnftPlanPharmTypeDaySupl()
                {
                    CreatedBy = itemToAddOrUpdate.CurrentUser,
                    CreatedTs = timeStamp
                };

            bnftPlanPharmTypeDaySupl.BnftPlanPharmTypeSK = bnftPlanPharmType.BnftPlanPharmTypeSK;
            bnftPlanPharmTypeDaySupl.DaySuplTypeSK = itemToAddOrUpdate.DaySuplTypeSK;
            bnftPlanPharmTypeDaySupl.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
            bnftPlanPharmTypeDaySupl.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
            bnftPlanPharmTypeDaySupl.MaxCost = itemToAddOrUpdate.MaximumCost;
            bnftPlanPharmTypeDaySupl.LastModfdBy = itemToAddOrUpdate.CurrentUser;
            bnftPlanPharmTypeDaySupl.LastModfdTs = timeStamp;
            bnftPlanPharmTypeDaySupl.DelTs = itemToAddOrUpdate.IsDeleted
                ? (DateTime?)CascadeDeleteBenefitPlanPharmTypeDaySupply(bnftPlanPharmTypeDaySupl, itemToAddOrUpdate, timeStamp)
                : null;

            bnftPlanPharmTypeDaySupl.BnftPlanPharmType = bnftPlanPharmType;
            bnftPlanPharmType.BnftPlanPharmTypeDaySupl.Add(bnftPlanPharmTypeDaySupl);

            return bnftPlanPharmTypeDaySupl;
        }

        /// <summary>
        /// Cascade a Soft Delete of Benefit Plan Pharmacy Type
        /// </summary>
        /// <param name="bnftPlanPharmType">the Benefit Plan Pharmacy Type</param>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <param name="timeStamp">the Time Stamp</param>
        /// <returns>the TimeStamp</returns>
        private DateTime CascadeDeleteBenefitPlanPharmType(BnftPlanPharmType bnftPlanPharmType, BenefitPlanPharmacyTypeVM itemToAddOrUpdate, DateTime timeStamp)
        {
            bnftPlanPharmType = DeleteBenefitPlanPharmTypeDaySupply(bnftPlanPharmType, itemToAddOrUpdate.CurrentUser, timeStamp);
            bnftPlanPharmType = DeleteFillExceptions(bnftPlanPharmType, itemToAddOrUpdate.CurrentUser, timeStamp);
            bnftPlanPharmType = DeletePlanPricing(bnftPlanPharmType, itemToAddOrUpdate.CurrentUser, timeStamp);
            bnftPlanPharmType = DeleteLICS(bnftPlanPharmType, itemToAddOrUpdate.CurrentUser, timeStamp);
            return timeStamp;
        }

        /// <summary>
        /// Cascade a Soft Delete of Benefit Plan Pharmacy Type Day Supply
        /// </summary>
        /// <param name="bnftPlanPharmType">the Benefit Plan Pharmacy Type</param>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <param name="timeStamp">the Time Stamp</param>
        /// <returns>the TimeStamp</returns>
        private DateTime CascadeDeleteBenefitPlanPharmTypeDaySupply(BnftPlanPharmTypeDaySupl bnftPlanPharmTypeDaySupl, BenefitPlanPharmacyTypeDaySupplyVM itemToAddOrUpdate, DateTime timeStamp)
        {
            bnftPlanPharmTypeDaySupl = DeleteCopaySetup(bnftPlanPharmTypeDaySupl, itemToAddOrUpdate.CurrentUser, timeStamp);

            return timeStamp;
        }

        #endregion " Private - Benefit Plan Pharmacy Type "

        #region " Private - Soft Delete Entities "
        /// <summary>
        /// Soft Delete of Benefit Plan Pharmacy Type Day Supply by Benefit Plan Pharmacy Type SK
        /// </summary>
        /// <param name="bnftPlanPharmType">the Benefit Plan Pharmacy Type Record</param>
        /// <param name="currentUser">the Current User</param>
        /// <param name="timeStamp">the Time Stamp</param>
        /// <returns>the Benefit Plan Pharmacy Type Record</returns>
        private BnftPlanPharmType DeleteBenefitPlanPharmTypeDaySupply(BnftPlanPharmType bnftPlanPharmType, string currentUser, DateTime timeStamp)
        {
            foreach (BnftPlanPharmTypeDaySupl bnftPlanPharmTypeDaySupl in _repoFactory.BenefitPlanPharmacyTypeDaySupply()
                .FindAll(w => w.BnftPlanPharmTypeSK == bnftPlanPharmType.BnftPlanPharmTypeSK))
            {
                bnftPlanPharmTypeDaySupl.LastModfdBy = currentUser;
                bnftPlanPharmTypeDaySupl.LastModfdTs = timeStamp;
                bnftPlanPharmTypeDaySupl.DelTs = timeStamp;
                bnftPlanPharmTypeDaySupl.BnftPlanPharmType = bnftPlanPharmType;
                DeleteCopaySetup(bnftPlanPharmTypeDaySupl, currentUser, timeStamp);

                bnftPlanPharmType.BnftPlanPharmTypeDaySupl.Add(bnftPlanPharmTypeDaySupl);
                _repoFactory.BenefitPlanPharmacyTypeDaySupply().AddOrUpdate(bnftPlanPharmTypeDaySupl);
            }

            return bnftPlanPharmType;
        }

        /// <summary>
        /// Soft Delete of Copay Setup by Benefit Plan Pharmacy Type Day Supply SK
        /// </summary>
        /// <param name="bnftPlanPharmTypeDaySupl">the Benefit Plan Pharmacy Type Day Supply Record</param>
        /// <param name="currentUser">the Current User</param>
        /// <param name="timeStamp">the Time Stamp</param>
        /// <returns>the Benefit Plan Pharmacy Type Day Supply Record</returns>
        private BnftPlanPharmTypeDaySupl DeleteCopaySetup(BnftPlanPharmTypeDaySupl bnftPlanPharmTypeDaySupl, string currentUser, DateTime timeStamp)
        {
            foreach (CopaySetup copaySetup in _repoFactory.CopaySetup()
                .FindAll(w => w.BnftPlanPharmTypeDaySuplSK == bnftPlanPharmTypeDaySupl.BnftPlanPharmTypeDaySuplSK))
            {
                copaySetup.LastModfdBy = currentUser;
                copaySetup.LastModfdTs = timeStamp;
                copaySetup.DelTs = timeStamp;
                copaySetup.BnftPlanPharmTypeDaySupl = bnftPlanPharmTypeDaySupl;

                bnftPlanPharmTypeDaySupl.CopaySetup.Add(copaySetup);
                _repoFactory.CopaySetup().AddOrUpdate(copaySetup);
            }

            return bnftPlanPharmTypeDaySupl;
        }

        /// <summary>
        /// Soft Delete of Fill Exceptions by Benefit Plan SK and Pharmacy Type SK
        /// </summary>
        /// <param name="bnftPlanPharmType">the Benefit Plan Pharmacy Type Record</param>
        /// <param name="currentUser">the Current User</param>
        /// <param name="timeStamp">the Time Stamp</param>
        /// <returns>the Benefit Plan Pharmacy Type Record</returns>
        private BnftPlanPharmType DeleteFillExceptions(BnftPlanPharmType bnftPlanPharmType, string currentUser, DateTime timeStamp)
        {
            foreach (FillExcp fillExcp in _repoFactory.FillException()
                .FindAll(w => w.BnftPlanSK == bnftPlanPharmType.BnftPlanSK && w.PharmTypeSK == bnftPlanPharmType.PharmTypeSK))
            {
                fillExcp.LastModfdBy = currentUser;
                fillExcp.LastModfdTs = timeStamp;
                fillExcp.DelTs = timeStamp;

                _repoFactory.FillException().AddOrUpdate(fillExcp);
            }

            return bnftPlanPharmType;
        }

        /// <summary>
        /// Soft Delete of Plan Pricing by Benefit Plan SK and Pharmacy Type SK
        /// </summary>
        /// <param name="bnftPlanPharmType">the Benefit Plan Pharmacy Type Record</param>
        /// <param name="currentUser">the Current User</param>
        /// <param name="timeStamp">the Time Stamp</param>
        /// <returns>the Benefit Plan Pharmacy Type Record</returns>
        private BnftPlanPharmType DeletePlanPricing(BnftPlanPharmType bnftPlanPharmType, string currentUser, DateTime timeStamp)
        {
            foreach (PlanPrcg planPrcg in _repoFactory.PlanPricing()
                 .FindAll(w => w.BnftPlanSK == bnftPlanPharmType.BnftPlanSK && w.PharmTypeSK == bnftPlanPharmType.PharmTypeSK))
            {
                planPrcg.LastModfdBy = currentUser;
                planPrcg.LastModfdTs = timeStamp;
                planPrcg.DelTs = timeStamp;

                _repoFactory.PlanPricing().AddOrUpdate(planPrcg);
            }

            return bnftPlanPharmType;
        }

        /// <summary>		
        /// Soft Delete Medicare Configuration(LICSSetup and Copay Distribution LICS)		
        /// </summary>		
        /// <param name="bnftPlanPharmType"></param>		
        /// <param name="currentUser"></param>		
        /// <param name="timeStamp"></param>		
        /// <returns></returns>		
        private BnftPlanPharmType DeleteLICS(BnftPlanPharmType bnftPlanPharmType, string currentUser, DateTime timeStamp)
        {
            foreach (LICSSetup licsSetup in _repoFactory.LowIncomeCostSharingSubsidySetup()
                .FindAll(w => w.BnftPlanSK == bnftPlanPharmType.BnftPlanSK && w.PharmTypeSK == bnftPlanPharmType.PharmTypeSK))
            {
                licsSetup.LastModfdBy = currentUser;
                licsSetup.LastModfdTs = timeStamp;
                licsSetup.DelTs = timeStamp;
                _repoFactory.LowIncomeCostSharingSubsidySetup().AddOrUpdate(licsSetup);
                //If the deleting licsSetup -  only one having the licstype used then delete respective copay distribution		
                LICSSetup anotherRec = _repoFactory.LowIncomeCostSharingSubsidySetup().FindOne(s => s.LICSSetupSK != licsSetup.LICSSetupSK
               && s.BnftPlanSK == bnftPlanPharmType.BnftPlanSK && s.PharmTypeSK == bnftPlanPharmType.PharmTypeSK && s.LICSTypeSK == licsSetup.LICSTypeSK);
                if (anotherRec == null)
                {
                    //delete copay distribution of that licsTypeSK as it is not being used anymore		
                    foreach (CopayDist copayDist in _repoFactory.CopayDistribution().FindAll(k => k.CvrgPhase.BnftPlanSK == bnftPlanPharmType.BnftPlanSK
                    && k.LICSTypeSK == licsSetup.LICSTypeSK))
                    {
                        copayDist.LastModfdBy = currentUser;
                        copayDist.LastModfdTs = timeStamp;
                        copayDist.DelTs = timeStamp;
                        _repoFactory.CopayDistribution().AddOrUpdate(copayDist);
                    }                
             }
          }
          return bnftPlanPharmType;		           
        }
    #endregion " Public - Soft Delete Entities "

    #region " Copay Configuration "
    /// <summary>
    /// Get Method to Get all Copay Setup for a Benefit Plan
    /// </summary>
    /// <param name="bnftPlanSK">the Benefit Plan Key</param>
    /// <returns>List of Copay Setup View Models</returns>
    public List<CopaySetupVM> GetAllCopaySetup(long bnftPlanSK)
        {
            IQueryable<NtwrkTier> ntwrkTiers = _repoFactory.NetworkTier()
                .FindAll(w => w.BnftPlanSK == bnftPlanSK)
                .AsQueryable();
            IQueryable<NtwrkTierType> ntwrkTierTypes = _repoFactory.NetworkTierType()
                .FindAll()
                .AsQueryable();

            var query = from mstr in ntwrkTiers
                        join dtl in ntwrkTierTypes on mstr.NtwrkTierTypeSK equals dtl.NtwrkTierTypeSK into p
                        from rslt in p.DefaultIfEmpty()
                        select new { mstr.NtwrkTierSK, rslt.NtwrkTierName };

            List<CopaySetupVM> copaySetups = new List<CopaySetupVM>();
            _repoFactory.BenefitPlanPharmacyType().FindAll(w => w.BnftPlanSK == bnftPlanSK).ToList().ForEach(pt =>
            {
                _repoFactory.BenefitPlanPharmacyTypeDaySupply().FindAll(w => w.BnftPlanPharmTypeSK == pt.BnftPlanPharmTypeSK).ToList().ForEach(ds =>
                {
                    copaySetups.AddRange(_repoFactory.CopaySetup().FindAll(w => w.BnftPlanPharmTypeDaySuplSK == ds.BnftPlanPharmTypeDaySuplSK)
                        .Select(cs => new CopaySetupVM()
                        {
                            CopaySetupSK = cs.CopaySetupSK,
                            BnftPlanSK = pt.BnftPlanSK,
                            NtwrkTierSK = cs.NtwrkTierSK ?? 0,
                            NtwrkTierName = query.FirstOrDefault(w => w.NtwrkTierSK == cs.NtwrkTierSK).NtwrkTierName,
                            CvrgPhaseSK = cs.CvrgPhaseSK ?? 0,
                            FrmlryTierSK = cs.FrmlryTierSK ?? 0,
                            CopayCoinsuranceLogicTypeSK = cs.CopayCoinsuranceLogicTypeSK,
                            PharmTypeSK = pt.PharmTypeSK,
                            DaySuplTypeSK = ds.DaySuplTypeSK,
                            BnftPlanPharmTypeDaySuplSK = cs.BnftPlanPharmTypeDaySuplSK,
                            CopayAmt = cs.CopayAmt,
                            CoinsurnacePct = cs.CoinsurnacePct,
                            MaxMbrCostPerRx = cs.MaxMbrCostPerRx,
                            MbrMthlyCvrgMaxAmt = cs.MbrMthlyCvrgMaxAmt,
                            MbrYearlyCvrgMaxAmt = cs.MbrYearlyCvrgMaxAmt,
                            PlanMthlyCvrgMaxAmt = cs.PlanMthlyCvrgMaxAmt,
                            PlanYearlyCvrgMaxAmt = cs.PlanYearlyCvrgMaxAmt
                        }).ToList()
                    );
                });
            });

            return copaySetups;
        }

        /// <summary>
        /// Add or Update a Copay Setup for a Plan Benefit Package
        /// </summary>
        /// <param name="itemToAddOrUpdate">theCopay Setup to Add or Update</param>
        /// <returns>CopaySetupVM.</returns>
        public CopaySetupVM SetCopaySetup(CopaySetupVM itemToAddOrUpdate)
        {
            return AddorUpdateCopaySetup(itemToAddOrUpdate);
        }
        #endregion " Copay Configuration "

        #region " Private - Set Copay Configuration "
        /// <summary>
        /// Add or Update a Copay Setup for a Plan Benefit Package
        /// </summary>
        /// <param name="itemToAddOrUpdate">theCopay Setup to Add or Update</param>
        /// <returns>CopaySetupVM.</returns>
        private CopaySetupVM AddorUpdateCopaySetup(CopaySetupVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            using (var repository = _repoFactory.CopaySetup())
            {
                CopaySetup copaySetup = itemToAddOrUpdate.CopaySetupSK != 0
                    ? repository.FindOne(p => p.CopaySetupSK == itemToAddOrUpdate.CopaySetupSK)
                    : PopulateNewCopaySetup(itemToAddOrUpdate, timeStamp);

                //These values can be changed.
                if (itemToAddOrUpdate.CopaySetupSK != 0)
                {
                    copaySetup.BnftPlanPharmTypeDaySuplSK = itemToAddOrUpdate.BnftPlanPharmTypeDaySuplSK;
                    copaySetup.NtwrkTierSK = itemToAddOrUpdate.NtwrkTierSK;
                    copaySetup.CvrgPhaseSK = itemToAddOrUpdate.CvrgPhaseSK;
                    copaySetup.FrmlryTierSK = itemToAddOrUpdate.FrmlryTierSK;
                }

                copaySetup.CopayCoinsuranceLogicTypeSK = itemToAddOrUpdate.CopayCoinsuranceLogicTypeSK;
                copaySetup.CopayAmt = itemToAddOrUpdate.CopayAmt;
                copaySetup.CoinsurnacePct = itemToAddOrUpdate.CoinsurnacePct;
                copaySetup.MaxMbrCostPerRx = itemToAddOrUpdate.MaxMbrCostPerRx;
                copaySetup.MbrMthlyCvrgMaxAmt = itemToAddOrUpdate.MbrMthlyCvrgMaxAmt;
                copaySetup.MbrYearlyCvrgMaxAmt = itemToAddOrUpdate.MbrYearlyCvrgMaxAmt;
                copaySetup.PlanMthlyCvrgMaxAmt = itemToAddOrUpdate.PlanMthlyCvrgMaxAmt;
                copaySetup.PlanYearlyCvrgMaxAmt = itemToAddOrUpdate.PlanYearlyCvrgMaxAmt;
                copaySetup.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                copaySetup.LastModfdTs = timeStamp;
                copaySetup.DelTs = itemToAddOrUpdate.Deleted ? (DateTime?)timeStamp : null;

                repository.AddOrUpdate(copaySetup);
                repository.SaveChanges();

                itemToAddOrUpdate.CopaySetupSK = copaySetup.CopaySetupSK;
                return itemToAddOrUpdate;
            };
        }

        /// <summary>
        /// Add or Update a Copay Setup for a Plan Benefit Package
        /// </summary>
        /// <param name="itemToAddOrUpdate">theCopay Setup to Add or Update</param>
        /// <param name="timeStamp">The time stamp.</param>
        /// <returns>CopaySetup.</returns>
        private CopaySetup PopulateNewCopaySetup(CopaySetupVM itemToAddOrUpdate, DateTime timeStamp)
        {
            BnftPlan benefitPlan = _repoFactory.BenefitPlan().FindOne(w => w.BnftPlanSK == itemToAddOrUpdate.BnftPlanSK);
            return new CopaySetup()
            {
                NtwrkTierSK = itemToAddOrUpdate.NtwrkTierSK,
                CvrgPhaseSK = itemToAddOrUpdate.CvrgPhaseSK,
                FrmlryTierSK = itemToAddOrUpdate.FrmlryTierSK,
                BnftPlanPharmTypeDaySuplSK = itemToAddOrUpdate.BnftPlanPharmTypeDaySuplSK,
                EfctvStartDt = benefitPlan != null ? benefitPlan.EfctvStartDt : UtilityFunctions.GetEffectiveStartDate(),
                EfctvEndDt = benefitPlan != null ? benefitPlan.EfctvEndDt : UtilityFunctions.GetEffectiveEndDate(),
                CreatedBy = itemToAddOrUpdate.CurrentUser,
                CreatedTs = timeStamp
            };
        }
        #endregion " Private - Set Copay Configuration "
    }
}