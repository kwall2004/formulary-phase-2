using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Atlas.BenefitPlan.BLL
{
    /// <summary>
    /// The Benefit Plan BLL for Benefit Plan
    /// </summary>
    /// <seealso cref="Atlas.BenefitPlan.BLL.Interfaces.IBenefitPlanBLL" />
    public class BenefitPlanBLL : IBenefitPlanBLL
    {

        /// <summary>
        /// The out of network tier
        /// </summary>
        private const string OutOfNetworkTier = "Out of Network Tier";

        /// <summary>
        /// The network tier prefix
        /// </summary>
        private const string NetworkTierPrefix = "Network Tier ";

        /// <summary>
        /// the Benefit Plan Repository Factory
        /// </summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>
        /// The Constructor for the Entity BLL for Benefit Plan
        /// </summary>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        public BenefitPlanBLL(IBenefitPlanRepositoryFactory repoFactory)
        {
            _repoFactory = repoFactory;
        }

        /// <summary>
        /// Get all benefit plans
        /// </summary>
        /// <returns>List of Benefit Plans</returns>
        public IEnumerable<BnftPlan> GetAllBenefitPlans()
        {
            IEnumerable<BnftPlan> bnftPlans = _repoFactory.BenefitPlan().FindAll();
            return bnftPlans;
        }

        /// <summary>
        /// Copy a benefit Plan by bnftPlanSK
        /// </summary>
        /// <param name="bnftPlanSKToCopy">the Benefit Plan ID to copy</param>
        /// <param name="currentUser">the current user to save</param>
        /// <returns>bnftPlanSK for new benefit plan</returns>
        public long CopyBenefitPlan(long bnftPlanSKToCopy, string currentUser)
        {
            long? returnCode = _repoFactory.AtlasBenefitPlanStoredProcs().CopyBenefitPlan(bnftPlanSKToCopy, currentUser);
            return returnCode.Value;
        }

        /// <summary>
        /// Get a benefit Plan by ID
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>Benefit Plan View Model</returns>
        public BenefitPlanVM GetBenefitPlanVM(long bnftPlanSK)
        {
            BenefitPlanVM benefitPlanVM = new BenefitPlanVM();
            BnftPlan bnftPlan = _repoFactory.BenefitPlan().FindOne(c => c.BnftPlanSK == bnftPlanSK);

            if (bnftPlan != null)
            {
                benefitPlanVM.BnftPlanSK = bnftPlan.BnftPlanSK;
                benefitPlanVM.PrdctTypeSK = bnftPlan.PrdctTypeSK;
                benefitPlanVM.PlanClsfcnTypeSK = bnftPlan.PlanClsfcnTypeSK;
                benefitPlanVM.BnftPlanTypeSK = bnftPlan.BnftPlanTypeSK;
                benefitPlanVM.LOBSK = bnftPlan.LOBSK;
                benefitPlanVM.BnftPlanSizeClsfcnTypeSK = bnftPlan.BnftPlanSizeClsfcnTypeSK;
                benefitPlanVM.BnftPlanID = bnftPlan.BnftPlanID;
                benefitPlanVM.BnftPlanName = bnftPlan.BnftPlanName;
                benefitPlanVM.TmpltInd = bnftPlan.TmpltInd;
                benefitPlanVM.BnftPlanYr = bnftPlan.BnftPlanYr;
                benefitPlanVM.EfctvStartDt = bnftPlan.EfctvStartDt;
                benefitPlanVM.EfctvEndDt = bnftPlan.EfctvEndDt;
                benefitPlanVM.PrescbrDrugOvrrdListSK = bnftPlan.PrescbrDrugOvrrdListSK;
                benefitPlanVM.AlwdPrescribersListSK = bnftPlan.AlwdPrescribersListSK;
                benefitPlanVM.FrmlrySK = bnftPlan.FrmlrySK;
                benefitPlanVM.RxPrcgTypeSK = bnftPlan.RxPrcgTypeSK;
                benefitPlanVM.DrugRefDbSK = bnftPlan.DrugRefDbSK;
                benefitPlanVM.CopayFuncTypeSK = bnftPlan.CopayFuncTypeSK;
                benefitPlanVM.CMSBnftStructTypeSK = bnftPlan.CMSBnftStructTypeSK;
                benefitPlanVM.NbrofNtwrkTiers = bnftPlan.NbrofNtwrkTiers;
                benefitPlanVM.RejAllClaimsInd = bnftPlan.RejAllClaimsInd;
                benefitPlanVM.AllowMnlEnrlmtInd = bnftPlan.AllowMnlEnrlmtInd;
                benefitPlanVM.COBRABnftOfferedInd = bnftPlan.COBRABnftOfferedInd;
                benefitPlanVM.MaxNbrofDaysAlwdonCOBRAAmt = bnftPlan.MaxNbrofDaysAlwdonCOBRAAmt;
                benefitPlanVM.OnHIEInd = bnftPlan.OnHIEInd;
                benefitPlanVM.HIOSPlanVarntID = bnftPlan.HIOSPlanVarntID;
                benefitPlanVM.GrandfatheredPlanInd = bnftPlan.GrandfatheredPlanInd;
                benefitPlanVM.NbrofFrmlryTiers = bnftPlan.NbrofFrmlryTiers;
                benefitPlanVM.DefaultVaccineAdmnstnFeeAmt = bnftPlan.DefaultVaccineAdmnstnFeeAmt;
                benefitPlanVM.McrCvrgGapGenrcPct = bnftPlan.McrCvrgGapGenrcPct;
                benefitPlanVM.McrCvrgGapBrandPct = bnftPlan.McrCvrgGapBrandPct;
                benefitPlanVM.AllowMbrLocksInd = bnftPlan.AllowMbrLocksInd;
                benefitPlanVM.AllowEmrgyFillsInd = bnftPlan.AllowEmrgyFillsInd;
                benefitPlanVM.MndtryGenrcDrugPlanInd = bnftPlan.MndtryGenrcDrugPlanInd;
                benefitPlanVM.RequireSpcltyPharmforSpcltyDrugsInd = bnftPlan.RequireSpcltyPharmforSpcltyDrugsInd;
                benefitPlanVM.PrcsMcrPartBClaimsInd = bnftPlan.PrcsMcrPartBClaimsInd;
                benefitPlanVM.McrPartBCoinsurancePct = bnftPlan.McrPartBCoinsurancePct;
                benefitPlanVM.EfctvStartDt = bnftPlan.EfctvStartDt;
                benefitPlanVM.EfctvEndDt = bnftPlan.EfctvEndDt;
                benefitPlanVM.OneMthDaySuplAmt = bnftPlan.OneMthDaySuplAmt;
                benefitPlanVM.StdDeducblAmt = bnftPlan.StdDeducblAmt;
                benefitPlanVM.ExclPHIDataInReports = bnftPlan.ExclPHIDataInReports;
                benefitPlanVM.PayNonMcrPartDIngredients = bnftPlan.PayNonMcrPartDIngredients;
                benefitPlanVM.InclNonMcrPartDonPDE = bnftPlan.InclNonMcrPartDonPDE;
                benefitPlanVM.BnftPlanAbbr = bnftPlan.BnftPlanAbbr;
                benefitPlanVM.BenefitPlanWaiverRiders = GetAllBnftPlanWvrRiderByBnftPlanSK(bnftPlanSK).ToList<BenefitPlanWaiverRiderVM>();
            }

            return benefitPlanVM;
        }

        /// <summary>
        /// Set the Benefit Plan and Benefit Plan Details
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Benefit plan View Model to Update</param>
        /// <returns>BenefitPlanVM.</returns>
        public BenefitPlanVM SetBenefitPlanAndDetail(BenefitPlanVM itemToAddOrUpdate)
        {
            //save benefit plan
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            BnftPlan bnftPlan = itemToAddOrUpdate.BnftPlanSK != 0
                ? _repoFactory.BenefitPlan().FindOne(c => c.BnftPlanSK == itemToAddOrUpdate.BnftPlanSK)
                : new BnftPlan() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

            int originalNumberOfFrmlryTiers = 0;
            int originalNumberOfNtwrkTiers = 0;
            if (itemToAddOrUpdate.BnftPlanSK != 0)
            {
                if (bnftPlan.NbrofFrmlryTiers.HasValue)
                {
                    originalNumberOfFrmlryTiers = bnftPlan.NbrofFrmlryTiers.Value;
                }
                originalNumberOfNtwrkTiers = bnftPlan.NbrofNtwrkTiers;
            }

            FillBnftPlan(bnftPlan, itemToAddOrUpdate, timeStamp);
            _repoFactory.BenefitPlan().AddOrUpdate(bnftPlan);

            //Set waiver riders
            SetBenefitPlanWaiverrider(itemToAddOrUpdate, bnftPlan);

            //add network tiers and formulary tiers for new plans
            if (itemToAddOrUpdate.BnftPlanSK == 0)
            {
                for (int networkTierNum = 1; networkTierNum <= bnftPlan.NbrofNtwrkTiers; networkTierNum++)
                {
                    NtwrkTier ntwrkTier = new NtwrkTier();
                    ntwrkTier.BnftPlanSK = itemToAddOrUpdate.BnftPlanSK;

                    //find the correct tier type id by name
                    NtwrkTierType ntwrkTierType = _repoFactory.NetworkTierType().FindOne(c => c.NtwrkTierName == (NetworkTierPrefix + networkTierNum.ToString()));
                    ntwrkTier.NtwrkTierTypeSK = ntwrkTierType.NtwrkTierTypeSK;
                    ntwrkTier.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                    ntwrkTier.LastModfdTs = timeStamp;
                    ntwrkTier.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                    ntwrkTier.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                    ntwrkTier.CreatedBy = itemToAddOrUpdate.CurrentUser;
                    ntwrkTier.CreatedTs = timeStamp;
                    _repoFactory.NetworkTier().AddOrUpdate(ntwrkTier);
                }

                NtwrkTier ntwrkTierOutOfNetwork = new NtwrkTier();
                ntwrkTierOutOfNetwork.BnftPlanSK = itemToAddOrUpdate.BnftPlanSK;

                //find the correct tier type id by name
                NtwrkTierType ntwrkTierTypeOutOfnetowrk = _repoFactory.NetworkTierType().FindOne(c => c.NtwrkTierName == (OutOfNetworkTier));
                ntwrkTierOutOfNetwork.NtwrkTierTypeSK = ntwrkTierTypeOutOfnetowrk.NtwrkTierTypeSK;
                ntwrkTierOutOfNetwork.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                ntwrkTierOutOfNetwork.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                ntwrkTierOutOfNetwork.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                ntwrkTierOutOfNetwork.LastModfdTs = timeStamp;
                ntwrkTierOutOfNetwork.CreatedBy = itemToAddOrUpdate.CurrentUser;
                ntwrkTierOutOfNetwork.CreatedTs = timeStamp;
                _repoFactory.NetworkTier().AddOrUpdate(ntwrkTierOutOfNetwork);

                //formulary tiers
                for (int formularyTierNum = 1; formularyTierNum <= bnftPlan.NbrofFrmlryTiers; formularyTierNum++)
                {
                    FrmlryTier frmlryTier = new FrmlryTier();
                    frmlryTier.BnftPlanSK = itemToAddOrUpdate.BnftPlanSK;
                    frmlryTier.FrmlryTierNbr = formularyTierNum;
                    frmlryTier.FrmlryTierName = "Formulary " + formularyTierNum.ToString();
                    frmlryTier.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                    frmlryTier.LastModfdTs = timeStamp;
                    frmlryTier.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                    frmlryTier.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                    frmlryTier.CreatedBy = itemToAddOrUpdate.CurrentUser;
                    frmlryTier.CreatedTs = timeStamp;
                    _repoFactory.FormularyTier().AddOrUpdate(frmlryTier);
                }
            }
            else //only check this for non-new ones
            {
                //If a change has been made in the number of formulary or network tiers then add them
                if (itemToAddOrUpdate.NbrofNtwrkTiers > originalNumberOfNtwrkTiers)
                {
                    for (int networkTierNum = originalNumberOfNtwrkTiers + 1; networkTierNum <= itemToAddOrUpdate.NbrofNtwrkTiers; networkTierNum++)
                    {
                        NtwrkTier ntwrkTier = new NtwrkTier();
                        ntwrkTier.BnftPlanSK = itemToAddOrUpdate.BnftPlanSK;

                        //find the correct tier type id by name
                        NtwrkTierType ntwrkTierType = _repoFactory.NetworkTierType().FindOne(c => c.NtwrkTierName == (NetworkTierPrefix + networkTierNum.ToString()));
                        ntwrkTier.NtwrkTierTypeSK = ntwrkTierType.NtwrkTierTypeSK;
                        ntwrkTier.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                        ntwrkTier.LastModfdTs = timeStamp;
                        ntwrkTier.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                        ntwrkTier.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                        ntwrkTier.CreatedBy = itemToAddOrUpdate.CurrentUser;
                        ntwrkTier.CreatedTs = timeStamp;
                        _repoFactory.NetworkTier().AddOrUpdate(ntwrkTier);
                    }
                }

                if (itemToAddOrUpdate.NbrofFrmlryTiers > originalNumberOfFrmlryTiers)
                {
                    //formulary tiers
                    for (int formularyTierNum = originalNumberOfFrmlryTiers + 1; formularyTierNum <= itemToAddOrUpdate.NbrofFrmlryTiers; formularyTierNum++)
                    {
                        FrmlryTier frmlryTier = new FrmlryTier();
                        frmlryTier.BnftPlanSK = itemToAddOrUpdate.BnftPlanSK;
                        frmlryTier.FrmlryTierNbr = formularyTierNum;
                        frmlryTier.FrmlryTierName = "Formulary " + formularyTierNum.ToString();
                        frmlryTier.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                        frmlryTier.LastModfdTs = timeStamp;
                        frmlryTier.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                        frmlryTier.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                        frmlryTier.CreatedBy = itemToAddOrUpdate.CurrentUser;
                        frmlryTier.CreatedTs = timeStamp;
                        _repoFactory.FormularyTier().AddOrUpdate(frmlryTier);
                    }
                }
            }

            //if the number of network tiers or formulary tiers has decreased then delete them starting from the end and working way towards the correct number
            if (originalNumberOfNtwrkTiers > itemToAddOrUpdate.NbrofNtwrkTiers)
            {
                for (int networkTierNum = originalNumberOfNtwrkTiers; networkTierNum > itemToAddOrUpdate.NbrofNtwrkTiers; networkTierNum--)
                {
                    NtwrkTier ntwrkTier = _repoFactory.NetworkTier().FindOne(f => f.BnftPlanSK == itemToAddOrUpdate.BnftPlanSK && f.NtwrkTierType.NtwrkTierName == (NetworkTierPrefix + networkTierNum.ToString()));
                    if(ntwrkTier != null)
                    { 
                        _repoFactory.AtlasBenefitPlanStoredProcs().DeleteNetworkTier(ntwrkTier.NtwrkTierSK, itemToAddOrUpdate.CurrentUser);
                    }
                }
            }

            if (originalNumberOfFrmlryTiers > itemToAddOrUpdate.NbrofFrmlryTiers)
            {
                for (int formularyTierNum = originalNumberOfFrmlryTiers; formularyTierNum > itemToAddOrUpdate.NbrofFrmlryTiers; formularyTierNum--)
                {
                    FrmlryTier frmlryTier = _repoFactory.FormularyTier().FindOne(f => f.BnftPlanSK == itemToAddOrUpdate.BnftPlanSK && f.FrmlryTierNbr == formularyTierNum);
                    if (frmlryTier != null)
                    {
                        _repoFactory.AtlasBenefitPlanStoredProcs().DeleteFormularyTier(frmlryTier.FrmlryTierSK, itemToAddOrUpdate.CurrentUser);
                    }
                }
            }

            _repoFactory.BenefitPlan().SaveChanges();
            itemToAddOrUpdate.BnftPlanSK = bnftPlan.BnftPlanSK;

            return itemToAddOrUpdate;
        }

        /// <summary>
        /// Fill Bnft Plan
        /// </summary>
        /// <param name="bnftPlan">The BNFT plan.</param>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <param name="timeStamp">The time stamp.</param>
        private void FillBnftPlan(BnftPlan bnftPlan, BenefitPlanVM itemToAddOrUpdate, DateTime timeStamp)
        {
            bnftPlan.PrdctTypeSK = itemToAddOrUpdate.PrdctTypeSK;
            bnftPlan.PlanClsfcnTypeSK = itemToAddOrUpdate.PlanClsfcnTypeSK;
            bnftPlan.BnftPlanTypeSK = itemToAddOrUpdate.BnftPlanTypeSK;
            bnftPlan.LOBSK = itemToAddOrUpdate.LOBSK;
            bnftPlan.BnftPlanSizeClsfcnTypeSK = itemToAddOrUpdate.BnftPlanSizeClsfcnTypeSK;
            bnftPlan.BnftPlanID = itemToAddOrUpdate.BnftPlanID;
            bnftPlan.BnftPlanName = itemToAddOrUpdate.BnftPlanName;
            bnftPlan.TmpltInd = itemToAddOrUpdate.TmpltInd;
            bnftPlan.BnftPlanYr = itemToAddOrUpdate.BnftPlanYr;
            bnftPlan.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
            bnftPlan.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
            bnftPlan.LastModfdBy = itemToAddOrUpdate.CurrentUser;
            bnftPlan.LastModfdTs = timeStamp;
            bnftPlan.PrescbrDrugOvrrdListSK = itemToAddOrUpdate.PrescbrDrugOvrrdListSK;
            bnftPlan.AlwdPrescribersListSK = itemToAddOrUpdate.AlwdPrescribersListSK;
            bnftPlan.FrmlrySK = itemToAddOrUpdate.FrmlrySK;
            bnftPlan.RxPrcgTypeSK = itemToAddOrUpdate.RxPrcgTypeSK;
            bnftPlan.DrugRefDbSK = itemToAddOrUpdate.DrugRefDbSK;
            bnftPlan.CopayFuncTypeSK = itemToAddOrUpdate.CopayFuncTypeSK;
            bnftPlan.CMSBnftStructTypeSK = itemToAddOrUpdate.CMSBnftStructTypeSK;
            bnftPlan.NbrofNtwrkTiers = itemToAddOrUpdate.NbrofNtwrkTiers;
            bnftPlan.RejAllClaimsInd = itemToAddOrUpdate.RejAllClaimsInd;
            bnftPlan.AllowMnlEnrlmtInd = itemToAddOrUpdate.AllowMnlEnrlmtInd;
            bnftPlan.COBRABnftOfferedInd = itemToAddOrUpdate.COBRABnftOfferedInd;
            bnftPlan.MaxNbrofDaysAlwdonCOBRAAmt = itemToAddOrUpdate.MaxNbrofDaysAlwdonCOBRAAmt;
            bnftPlan.OnHIEInd = itemToAddOrUpdate.OnHIEInd;
            bnftPlan.HIOSPlanVarntID = itemToAddOrUpdate.HIOSPlanVarntID;
            bnftPlan.GrandfatheredPlanInd = itemToAddOrUpdate.GrandfatheredPlanInd;
            bnftPlan.NbrofFrmlryTiers = itemToAddOrUpdate.NbrofFrmlryTiers;
            bnftPlan.DefaultVaccineAdmnstnFeeAmt = itemToAddOrUpdate.DefaultVaccineAdmnstnFeeAmt;
            bnftPlan.McrCvrgGapGenrcPct = itemToAddOrUpdate.McrCvrgGapGenrcPct;
            bnftPlan.McrCvrgGapBrandPct = itemToAddOrUpdate.McrCvrgGapBrandPct;
            bnftPlan.AllowMbrLocksInd = itemToAddOrUpdate.AllowMbrLocksInd;
            bnftPlan.AllowEmrgyFillsInd = itemToAddOrUpdate.AllowEmrgyFillsInd;
            bnftPlan.MndtryGenrcDrugPlanInd = itemToAddOrUpdate.MndtryGenrcDrugPlanInd;
            bnftPlan.RequireSpcltyPharmforSpcltyDrugsInd = itemToAddOrUpdate.RequireSpcltyPharmforSpcltyDrugsInd;
            bnftPlan.PrcsMcrPartBClaimsInd = itemToAddOrUpdate.PrcsMcrPartBClaimsInd;
            bnftPlan.McrPartBCoinsurancePct = itemToAddOrUpdate.McrPartBCoinsurancePct;
            bnftPlan.OneMthDaySuplAmt = itemToAddOrUpdate.OneMthDaySuplAmt;
            bnftPlan.StdDeducblAmt = itemToAddOrUpdate.StdDeducblAmt;
            bnftPlan.ExclPHIDataInReports = itemToAddOrUpdate.ExclPHIDataInReports;
            bnftPlan.PayNonMcrPartDIngredients = itemToAddOrUpdate.PayNonMcrPartDIngredients;
            bnftPlan.InclNonMcrPartDonPDE = itemToAddOrUpdate.InclNonMcrPartDonPDE;
            bnftPlan.BnftPlanAbbr = itemToAddOrUpdate.BnftPlanAbbr;
        }

        /// <summary>
        /// set the waiver rider values for a benefit plan
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <param name="bnftPlan">The BNFT plan.</param>
        private void SetBenefitPlanWaiverrider(BenefitPlanVM itemToAddOrUpdate, BnftPlan bnftPlan)
        {
            if (itemToAddOrUpdate.BenefitPlanWaiverRiders.IsAny())
            {
                DateTime timeStamp = UtilityFunctions.GetTimeStamp();

                foreach (BenefitPlanWaiverRiderVM waiverRider in itemToAddOrUpdate.BenefitPlanWaiverRiders)
                {
                    BnftPlanWvrRider bnftPlanWvrRider = new BnftPlanWvrRider();

                    bnftPlanWvrRider = new BnftPlanWvrRider() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };
                    bnftPlanWvrRider.BnftPlanSK = bnftPlan.BnftPlanSK;
                    bnftPlanWvrRider.BnftPlan = bnftPlan;
                    bnftPlanWvrRider.WvrRiderTypeSK = waiverRider.WvrRiderTypeSK;
                    bnftPlanWvrRider.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                    bnftPlanWvrRider.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                    bnftPlanWvrRider.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                    bnftPlanWvrRider.LastModfdTs = timeStamp;

                    _repoFactory.BenefitPlanWaiverRider().AddOrUpdate(bnftPlanWvrRider);
                }
            }
        }

        /// <summary>
        /// Gets all BNFT plan WVR rider by BNFT plan sk.
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>IEnumerable&lt;BenefitPlanWaiverRiderVM&gt;.</returns>
        private IEnumerable<BenefitPlanWaiverRiderVM> GetAllBnftPlanWvrRiderByBnftPlanSK(long bnftPlanSK)
        {
            return _repoFactory.BenefitPlanWaiverRider().FindAll(c => c.BnftPlanSK == bnftPlanSK).Select(s => new BenefitPlanWaiverRiderVM()
            {
                BnftPlanWvrRiderSK = s.BnftPlanWvrRiderSK,
                WvrRiderTypeSK = s.WvrRiderTypeSK,
            }).ToList<BenefitPlanWaiverRiderVM>();
        }

        /// <summary>
        /// Benefits the plan search.
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <param name="LOBSK">The lobsk.</param>
        /// <param name="pBPSK">The p BPSK.</param>
        /// <param name="bnftPlanTypeSK">The BNFT plan type sk.</param>
        /// <param name="tmpltInd">The TMPLT ind.</param>
        /// <param name="efctvStartDt">The efctv start dt.</param>
        /// <param name="efctvEndDt">The efctv end dt.</param>
        /// <returns>List&lt;spBenefitPlanSearch_Result&gt;.</returns>
        public List<spBenefitPlanSearch_Result> BenefitPlanSearch(long? bnftPlanSK = null, long? LOBSK = null, long? pBPSK = null, long? bnftPlanTypeSK = null, Boolean? tmpltInd = null, DateTime? efctvStartDt = null, DateTime? efctvEndDt = null)
        {
            using (var repo = _repoFactory.AtlasBenefitPlanStoredProcs())
            {
                return repo.GetBenefitPlanSearch(bnftPlanSK, LOBSK, pBPSK, bnftPlanTypeSK, tmpltInd, efctvStartDt, efctvEndDt).ToList();
            }
        }

        /// <summary>
        /// Benefits the plan search by Text.
        /// </summary>
        /// <param name="bnftPlanName">The BNFT plan Name.</param>
        /// <param name="LOBSK">The lobsk.</param>
        /// <param name="pBPSK">The p BPSK.</param>
        /// <param name="bnftPlanTypeSK">The BNFT plan type sk.</param>
        /// <param name="tmpltInd">The TMPLT ind.</param>
        /// <param name="efctvStartDt">The efctv start dt.</param>
        /// <param name="efctvEndDt">The efctv end dt.</param>
        /// <returns>List&lt;spBenefitPlanSearch_Result&gt;.</returns>
        public List<spBenefitPlanSearchByText_Result> BenefitPlanSearchByText(string bnftPlanName, long? LOBSK = null, long? pBPSK = null, long? bnftPlanTypeSK = null, bool? tmpltInd = null, DateTime? efctvStartDt = null, DateTime? efctvEndDt = null)
        {
            return _repoFactory.AtlasBenefitPlanStoredProcs().GetBenefitPlanSearchByText(bnftPlanName, LOBSK, pBPSK, bnftPlanTypeSK, tmpltInd, efctvStartDt, efctvEndDt).ToList();
        }

        /// <summary>
        /// Set All Copay Distribution
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
        public bool AddOrUpdateCostShareMaximum(BenefitPlanCostShareMaximumsVM itemToAddOrUpdate)
        {
                //Multiple updates per row
                //network tier deductibles
                //MaxOutofPocket
                //PlanYearMaxBenefit
                //MaxLifetimeBenefit
                //Max out of pocket
                //RX Deductible
                long planLevelDeducblTypeSK = FindDeducblTypeSKByName("Plan Level Deductible");
                long maxOOPDeducblTypeSK = FindDeducblTypeSKByName("Max Out of Pocket");
                long planYearMaxBenefitDeducblTypeSK = FindDeducblTypeSKByName("Plan Year Max Benefit");
                long maxLifetimeBenefitDeducblTypeSK = FindDeducblTypeSKByName("Max Lifetime Benefit");
                long rxDeducblTypeSK = FindDeducblTypeSKByName("RX Deductible");
                long networkTierDeducblTypeSK = FindDeducblTypeSKByName("Network Tier");

                Deducbl deducblPlanLevel;
                deducblPlanLevel = _repoFactory.Deductible().FindOne
                    (c => c.BnftPlanSK == itemToAddOrUpdate.BnftPlanSK && c.DeducblTypeSK == planLevelDeducblTypeSK && c.DeducblScopeTypeSK == itemToAddOrUpdate.DeducblScopeTypeSK
                    && c.BnftPlanBnftSK == null && c.CvrgPhaseSK == null && c.LICSSetupSK == null);

                if (deducblPlanLevel == null)
                {
                    deducblPlanLevel = FillNewDeductibleForCostShareMaximums(itemToAddOrUpdate.CurrentUser, itemToAddOrUpdate.BnftPlanSK, itemToAddOrUpdate.DeducblScopeTypeSK, planLevelDeducblTypeSK, null);
                }
                FillCommonDeductibleInfo(itemToAddOrUpdate.CurrentUser, deducblPlanLevel, itemToAddOrUpdate.Deleted, itemToAddOrUpdate.PlanLevelDeductible);
                _repoFactory.Deductible().AddOrUpdate(deducblPlanLevel);


                Deducbl deducblMaxOutOfPocket;
                deducblMaxOutOfPocket = _repoFactory.Deductible().FindOne
                    (c => c.BnftPlanSK == itemToAddOrUpdate.BnftPlanSK && c.DeducblTypeSK == maxOOPDeducblTypeSK && c.DeducblScopeTypeSK == itemToAddOrUpdate.DeducblScopeTypeSK
                    && c.BnftPlanBnftSK == null && c.CvrgPhaseSK == null && c.LICSSetupSK == null);

                if (deducblMaxOutOfPocket == null)
                {
                    deducblMaxOutOfPocket = FillNewDeductibleForCostShareMaximums(itemToAddOrUpdate.CurrentUser, itemToAddOrUpdate.BnftPlanSK, itemToAddOrUpdate.DeducblScopeTypeSK, maxOOPDeducblTypeSK, null);
                }
                FillCommonDeductibleInfo(itemToAddOrUpdate.CurrentUser, deducblMaxOutOfPocket, itemToAddOrUpdate.Deleted, itemToAddOrUpdate.MaxOutofPocket);
                _repoFactory.Deductible().AddOrUpdate(deducblMaxOutOfPocket);

                Deducbl deducblPlanYearMaxBenefit;
                deducblPlanYearMaxBenefit = _repoFactory.Deductible().FindOne
                    (c => c.BnftPlanSK == itemToAddOrUpdate.BnftPlanSK && c.DeducblTypeSK == planYearMaxBenefitDeducblTypeSK && c.DeducblScopeTypeSK == itemToAddOrUpdate.DeducblScopeTypeSK
                    && c.BnftPlanBnftSK == null && c.CvrgPhaseSK == null && c.LICSSetupSK == null);

                if (deducblPlanYearMaxBenefit == null)
                {
                    deducblPlanYearMaxBenefit = FillNewDeductibleForCostShareMaximums(itemToAddOrUpdate.CurrentUser, itemToAddOrUpdate.BnftPlanSK, itemToAddOrUpdate.DeducblScopeTypeSK, planYearMaxBenefitDeducblTypeSK, null);
                }
                FillCommonDeductibleInfo(itemToAddOrUpdate.CurrentUser, deducblPlanYearMaxBenefit, itemToAddOrUpdate.Deleted, itemToAddOrUpdate.PlanYearMaxBenefit);
                _repoFactory.Deductible().AddOrUpdate(deducblPlanYearMaxBenefit);

                Deducbl deducblMaxLifetimeBenefit;
                deducblMaxLifetimeBenefit = _repoFactory.Deductible().FindOne
                    (c => c.BnftPlanSK == itemToAddOrUpdate.BnftPlanSK && c.DeducblTypeSK == maxLifetimeBenefitDeducblTypeSK && c.DeducblScopeTypeSK == itemToAddOrUpdate.DeducblScopeTypeSK
                    && c.BnftPlanBnftSK == null && c.CvrgPhaseSK == null && c.LICSSetupSK == null);

                if (deducblMaxLifetimeBenefit == null)
                {
                    deducblMaxLifetimeBenefit = FillNewDeductibleForCostShareMaximums(itemToAddOrUpdate.CurrentUser, itemToAddOrUpdate.BnftPlanSK, itemToAddOrUpdate.DeducblScopeTypeSK, maxLifetimeBenefitDeducblTypeSK, null);
                }
                FillCommonDeductibleInfo(itemToAddOrUpdate.CurrentUser, deducblMaxLifetimeBenefit, itemToAddOrUpdate.Deleted, itemToAddOrUpdate.MaxLifetimeBenefit);
                _repoFactory.Deductible().AddOrUpdate(deducblMaxLifetimeBenefit);


            long bnftPlanType = _repoFactory.BenefitPlan().FindOne(c => c.BnftPlanSK == itemToAddOrUpdate.BnftPlanSK).BnftPlanTypeSK;

            if (bnftPlanType == (int)BenefitPlanType.Medical)
            {
                Deducbl rxDeductible;
                rxDeductible = _repoFactory.Deductible().FindOne
                    (c => c.BnftPlanSK == itemToAddOrUpdate.BnftPlanSK && c.DeducblTypeSK == rxDeducblTypeSK && c.DeducblScopeTypeSK == itemToAddOrUpdate.DeducblScopeTypeSK
                    && c.BnftPlanBnftSK == null && c.CvrgPhaseSK == null && c.LICSSetupSK == null);

                if (rxDeductible == null)
                {
                    rxDeductible = FillNewDeductibleForCostShareMaximums(itemToAddOrUpdate.CurrentUser, itemToAddOrUpdate.BnftPlanSK, itemToAddOrUpdate.DeducblScopeTypeSK, rxDeducblTypeSK, null);
                }
                FillCommonDeductibleInfo(itemToAddOrUpdate.CurrentUser, rxDeductible, itemToAddOrUpdate.Deleted, itemToAddOrUpdate.RXDeductible);
                _repoFactory.Deductible().AddOrUpdate(rxDeductible);
            }


            foreach (CostShareMaximumsNetworkDetail ntwrkTier in itemToAddOrUpdate.NetworkTiers)//_repoFactory.NetworkTier().FindAll(s => s.BnftPlanSK == itemToAddOrUpdate.BnftPlanSK))
                {
                    Deducbl deducblCurrentNetworktier;
                    deducblCurrentNetworktier = _repoFactory.Deductible().FindOne
                        (c => c.BnftPlanSK == itemToAddOrUpdate.BnftPlanSK && c.DeducblTypeSK == networkTierDeducblTypeSK && c.DeducblScopeTypeSK == itemToAddOrUpdate.DeducblScopeTypeSK
                        && c.NtwrkTierSK == ntwrkTier.NtwrkTierSK
                        && c.BnftPlanBnftSK == null && c.CvrgPhaseSK == null && c.LICSSetupSK == null);

                    if (deducblCurrentNetworktier == null)
                    {
                        deducblCurrentNetworktier = FillNewDeductibleForCostShareMaximums(itemToAddOrUpdate.CurrentUser, itemToAddOrUpdate.BnftPlanSK, itemToAddOrUpdate.DeducblScopeTypeSK, networkTierDeducblTypeSK, ntwrkTier.NtwrkTierSK);
                    }
                    FillCommonDeductibleInfo(itemToAddOrUpdate.CurrentUser, deducblCurrentNetworktier, itemToAddOrUpdate.Deleted, ntwrkTier.DeductibleAmt);
                    _repoFactory.Deductible().AddOrUpdate(deducblCurrentNetworktier);
                }

                _repoFactory.Deductible().SaveChanges();
           
                //save benefit plan embedded indicator
                BnftPlan bnftPlan = _repoFactory.BenefitPlan().FindOne(c => c.BnftPlanSK == itemToAddOrUpdate.BnftPlanSK);
                if (bnftPlan.EmbeddedDeductiblesInd != itemToAddOrUpdate.EmbeddedDeductiblesInd)
                {
                    bnftPlan.EmbeddedDeductiblesInd = itemToAddOrUpdate.EmbeddedDeductiblesInd;
                _repoFactory.BenefitPlan().SaveChanges();
                }
            
            return true;
        }

        /// <summary>
        /// Fill New Deductible For Cost Share Maximums
        /// </summary>
        /// <param name="currentUser">The current user.</param>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <param name="deducblScopeTypeSK">The deducbl scope type sk.</param>
        /// <param name="deducblTypeSK">The deducbl type sk.</param>
        /// <param name="ntwrkTierSK">The NTWRK tier sk.</param>
        /// <returns>Deducbl.</returns>
        private Deducbl FillNewDeductibleForCostShareMaximums(string currentUser, long bnftPlanSK, long deducblScopeTypeSK, long deducblTypeSK, long? ntwrkTierSK)
        {
            Deducbl deducblToFill = new Deducbl()
            {
                CreatedBy = currentUser,
                CreatedTs = UtilityFunctions.GetTimeStamp()
            };
            deducblToFill.BnftPlanSK = bnftPlanSK;
            deducblToFill.DeducblTypeSK = deducblTypeSK;
            deducblToFill.DeducblScopeTypeSK = deducblScopeTypeSK;
            if (ntwrkTierSK.HasValue)
            {
                deducblToFill.NtwrkTierSK = ntwrkTierSK;
            }
            deducblToFill.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
            deducblToFill.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
            deducblToFill.LastModfdBy = UtilityFunctions.GetCurrentUser(currentUser);
            deducblToFill.LastModfdTs = UtilityFunctions.GetTimeStamp();

            return deducblToFill;
        }

        /// <summary>
        /// Fill Common Deductible Info
        /// </summary>
        /// <param name="currentUser">The current user.</param>
        /// <param name="deducblToFill">The deducbl to fill.</param>
        /// <param name="deleted">if set to <c>true</c> [deleted].</param>
        /// <param name="deducblAmt">The deducbl amt.</param>
        private void FillCommonDeductibleInfo(string currentUser, Deducbl deducblToFill, bool deleted, decimal? deducblAmt)
        {
            deducblToFill.DeducblAmt = deducblAmt;
            deducblToFill.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
            deducblToFill.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
            deducblToFill.LastModfdBy = UtilityFunctions.GetCurrentUser(currentUser);
            deducblToFill.LastModfdTs = UtilityFunctions.GetTimeStamp();

            if (deleted)
            {
                deducblToFill.DelTs = UtilityFunctions.GetTimeStamp();
            }
        }

        /// <summary>
        /// find the Id by Name for deductible type code
        /// </summary>
        /// <param name="deducblTypeCode">The deducbl type code.</param>
        /// <returns>System.Int64.</returns>
        private long FindDeducblTypeSKByName(string deducblTypeCode)
        {
            long deducblTypeSK = 0;
            DeducblType deducblType = _repoFactory.DeductibleType().FindOne(c => c.DeducblTypeCode == deducblTypeCode);
            if (deducblType != null)
            {
                deducblTypeSK = deducblType.DeducblTypeSK;
            }
            return deducblTypeSK;
        }

        /// <summary>
        /// Gets the list of Copay Distribution
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>List&lt;CopayDistributionVM&gt;.</returns>
        public List<CopayDistributionVM> GetAllCopayDistribution(long bnftPlanSK)
        {
            return _repoFactory.CopayDistribution().FindAll().Where(k => k.CvrgPhase.BnftPlanSK == bnftPlanSK)
                .Select(m => new CopayDistributionVM
                {
                    CopayDistSK = m.CopayDistSK,
                    FrmlryTierNbr = m.FrmlryTier.FrmlryTierNbr,
                    FrmlryTierSK = m.FrmlryTierSK,
                    CvrgPhaseSK = m.CvrgPhaseSK,
                    CvrgPhaseTypeSK = m.CvrgPhase.CvrgPhaseTypeSK,
                    MbrRespAmt = m.MbrRespAmt,
                    MbrRespPct = m.MbrRespPct,
                    MfgRespPct = m.MfgRespPct,
                    LICSSubsidyAppliesInd = m.LICSSubsidyAppliesInd,
                    LICSTypeSK = m.LICSTypeSK
        }).ToList();
        }

        /// <summary>
        /// Set All Copay Distribution
        /// </summary>
        /// <param name="item">The item.</param>
        /// <returns>CopayDistributionVM.</returns>
        public CopayDistributionVM AddOrUpdateCopayDistribution(CopayDistributionVM item)
        {
            using (var repoCopayDist = _repoFactory.CopayDistribution())
            using (var repoCvrgPhase = _repoFactory.CoveragePhase())
            {
                CopayDist copayDist = item.CopayDistSK == 0
                                      ? new CopayDist()
                                      {
                                          CreatedBy = item.CurrentUser,
                                          CreatedTs = UtilityFunctions.GetTimeStamp()
                                      }
                                       : repoCopayDist.FindOne(k => k.CopayDistSK == item.CopayDistSK);
                copayDist.FrmlryTierSK = item.FrmlryTierSK;
                copayDist.CvrgPhaseSK = repoCvrgPhase.FindOne(k => k.CvrgPhaseTypeSK == item.CvrgPhaseTypeSK && k.BnftPlanSK == item.BnftPlanSK).CvrgPhaseSK;
                copayDist.MbrRespAmt = item.MbrRespAmt;
                copayDist.MbrRespPct = item.MbrRespPct;
                copayDist.MfgRespPct = item.MfgRespPct;
                copayDist.LICSSubsidyAppliesInd = item.LICSSubsidyAppliesInd;
                copayDist.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                copayDist.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                copayDist.LastModfdBy = UtilityFunctions.GetCurrentUser(item.CurrentUser);
                copayDist.LastModfdTs = UtilityFunctions.GetTimeStamp();
                if (item.IsDeleted)
                {
                    copayDist.DelTs = UtilityFunctions.GetTimeStamp();
                }
                copayDist.LICSTypeSK = item.LICSTypeSK;
                repoCopayDist.AddOrUpdate(copayDist);
                repoCopayDist.SaveChanges();
                item.CopayDistSK = copayDist.CopayDistSK;
            }
            return item;
        }

        /// <summary>
        /// Get all DAW copays for a given bnftplanSK
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>List&lt;DispenseAsWrittenCopayVM&gt;.</returns>
        public List<DispenseAsWrittenCopayVM> GetAllDAWCopay(long bnftPlanSK)
        {
            using (var repository = _repoFactory.DispenseAsWrittenCopay())
            {
                return repository.FindAll(c => c.BnftPlanSK == bnftPlanSK).Select(s => new DispenseAsWrittenCopayVM()
                {
                    DAWCopaySK = s.DAWCopaySK,
                    DAWTypeSK = s.DAWTypeSK,
                    BnftPlanSK = s.BnftPlanSK,
                    PctofDrugCost = s.PctofDrugCost,
                    BrandGenrcDifferenceInd = s.BrandGenrcDifferenceInd,
                    ApplyCopayInd = s.ApplyCopayInd,
                    ApplyDifferencetoOOPInd = s.ApplyDifferencetoOOPInd
                }).ToList();
            }
        }

        /// <summary>
        /// Add or update a DAW copay
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>DispenseAsWrittenCopayVM.</returns>
        public DispenseAsWrittenCopayVM AddorUpdateDAWCopay(DispenseAsWrittenCopayVM itemToAddOrUpdate)
        {
            using (var repository = _repoFactory.DispenseAsWrittenCopay())
            {
                DAWCopay dawCopay = itemToAddOrUpdate.DAWCopaySK != 0
                   ? repository.FindOne(c => c.DAWCopaySK == itemToAddOrUpdate.DAWCopaySK)  // Update record
                   : new DAWCopay()
                   {
                       CreatedBy = itemToAddOrUpdate.CurrentUser,
                       CreatedTs = UtilityFunctions.GetTimeStamp()
                   }; // Insert new record

                dawCopay.BnftPlanSK = itemToAddOrUpdate.BnftPlanSK;
                dawCopay.DAWTypeSK = itemToAddOrUpdate.DAWTypeSK;
                dawCopay.BrandGenrcDifferenceInd = itemToAddOrUpdate.BrandGenrcDifferenceInd;
                dawCopay.PctofDrugCost = itemToAddOrUpdate.PctofDrugCost;
                dawCopay.ApplyCopayInd = itemToAddOrUpdate.ApplyCopayInd;
                dawCopay.ApplyDifferencetoOOPInd = itemToAddOrUpdate.ApplyDifferencetoOOPInd;
                dawCopay.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                dawCopay.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                dawCopay.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                dawCopay.LastModfdTs = UtilityFunctions.GetTimeStamp();

                if (itemToAddOrUpdate.isDeleted == true)
                {
                    dawCopay.DelTs = UtilityFunctions.GetTimeStamp();
                }

                repository.AddOrUpdate(dawCopay);
                repository.SaveChanges();

                itemToAddOrUpdate.DAWCopaySK = dawCopay.DAWCopaySK;
                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Get All  Deductible Exceptions
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>List&lt;DeductibleExceptionVM&gt;.</returns>
        public List<DeductibleExceptionVM> GetAllDeductibleExceptions(long bnftPlanSK)
        {
            using (var repoDeducblExclQulfrType = _repoFactory.DeductibleExclusionQualifierType())
            using (var repoDeductibleExclusion = _repoFactory.DeductibleExclusion())
            {
                IQueryable<DeducblExcl> deductibleExclusions = repoDeductibleExclusion.FindAll(a => a.BnftPlanSK == bnftPlanSK);

                List<DeductibleExceptionVM> allDeductibleExclusions = deductibleExclusions.Select(b => new DeductibleExceptionVM()
                {
                    BnftPlanSK = b.BnftPlanSK,
                    DeducbleExclSK = b.DeducblExclSK,
                    DeducblExclQulfrTypeSK = b.DeducblExclQulfrTypeSK,
                    DeducbleExclVal = b.DeducblExclVal,
                    CntTowardsMOOPInd = b.CntTowardsMOOPInd,
                }).ToList();

                foreach (DeductibleExceptionVM item in allDeductibleExclusions)
                {
                    DeducblExclQulfrType dedExclQualType;
                    dedExclQualType = repoDeducblExclQulfrType.FindOne(c => c.DeducblExclQulfrTypeSK == item.DeducblExclQulfrTypeSK);
                    item.DeducbleExclQulfrTypeCode = dedExclQualType.DeducblExclQulfrTypeCode;
                }

                return allDeductibleExclusions;
            }
        }

        /// <summary>
        /// Add Or Update Deductible Exception
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>DeductibleExceptionVM.</returns>
        public DeductibleExceptionVM AddOrUpdateDeductibleException(DeductibleExceptionVM itemToAddOrUpdate)
        {
            using (var repoDeductibleExclusion = _repoFactory.DeductibleExclusion())
            {
                DeducblExcl dedExclusion = itemToAddOrUpdate.DeducbleExclSK != 0
                ? repoDeductibleExclusion.FindOne(c => c.BnftPlanSK == itemToAddOrUpdate.BnftPlanSK)  // Update record
                : new DeducblExcl()
                {
                    CreatedBy = itemToAddOrUpdate.CurrentUser,
                    CreatedTs = UtilityFunctions.GetTimeStamp()
                }; // Insert new record

                dedExclusion.BnftPlanSK = itemToAddOrUpdate.BnftPlanSK;
                dedExclusion.DeducblExclQulfrTypeSK = itemToAddOrUpdate.DeducblExclQulfrTypeSK;
                dedExclusion.DeducblExclVal = itemToAddOrUpdate.DeducbleExclVal;
                dedExclusion.CntTowardsMOOPInd = itemToAddOrUpdate.CntTowardsMOOPInd;
                dedExclusion.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                dedExclusion.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                dedExclusion.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                dedExclusion.LastModfdTs = UtilityFunctions.GetTimeStamp();

                if (itemToAddOrUpdate.isDeleted == true)
                {
                    dedExclusion.DelTs = UtilityFunctions.GetTimeStamp();
                }

                repoDeductibleExclusion.AddOrUpdate(dedExclusion);
                repoDeductibleExclusion.SaveChanges();

                itemToAddOrUpdate.DeducbleExclSK = dedExclusion.DeducblExclSK;
                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Get All Fill Exceptions
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>List&lt;FillExceptionVM&gt;.</returns>
        public List<FillExceptionVM> GetAllFillExceptions(long bnftPlanSK)
        {
            using (var repository = _repoFactory.FillException())
            {
                return repository.FindAll(c => c.BnftPlanSK == bnftPlanSK).Select(s => new FillExceptionVM()
                {
                    FillExcpSK = s.FillExcpSK,
                    BnftPlanSK = s.BnftPlanSK,
                    DrugClsTypeSK = s.DrugClsTypeSK,
                    FillExcpChngQulfrTypeSK = s.FillExcpChngQulfrTypeSK,
                    PharmTypeSK = s.PharmTypeSK,
                    FillRngMinAmt = s.FillRngMinAmt,
                    FillRngMaxAmt = s.FillRngMaxAmt,
                    MultiplierAmt = s.MultiplierAmt
                }).ToList();
            }
        }

        /// <summary>
        /// Add Or Update Fill Exception
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>FillExceptionVM.</returns>
        public FillExceptionVM AddOrUpdateFillException(FillExceptionVM itemToAddOrUpdate)
        {
            using (var repository = _repoFactory.FillException())
            {
                FillExcp fillExcp = itemToAddOrUpdate.FillExcpSK != 0
                   ? repository.FindOne(c => c.FillExcpSK == itemToAddOrUpdate.FillExcpSK)  // Update record
                   : new FillExcp()
                   {
                       CreatedBy = itemToAddOrUpdate.CurrentUser,
                       CreatedTs = UtilityFunctions.GetTimeStamp()
                   }; // Insert new record

                fillExcp.BnftPlanSK = itemToAddOrUpdate.BnftPlanSK;
                fillExcp.DrugClsTypeSK = itemToAddOrUpdate.DrugClsTypeSK;
                fillExcp.FillExcpChngQulfrTypeSK = itemToAddOrUpdate.FillExcpChngQulfrTypeSK;
                fillExcp.PharmTypeSK = itemToAddOrUpdate.PharmTypeSK;
                fillExcp.FillRngMinAmt = itemToAddOrUpdate.FillRngMinAmt;
                fillExcp.FillRngMaxAmt = itemToAddOrUpdate.FillRngMaxAmt;
                fillExcp.MultiplierAmt = itemToAddOrUpdate.MultiplierAmt;
                fillExcp.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                fillExcp.LastModfdTs = UtilityFunctions.GetTimeStamp();

                if (itemToAddOrUpdate.isDeleted == true)
                {
                    fillExcp.DelTs = UtilityFunctions.GetTimeStamp();
                }

                repository.AddOrUpdate(fillExcp);
                repository.SaveChanges();

                itemToAddOrUpdate.FillExcpSK = fillExcp.FillExcpSK;
                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Get All Copay Exclusions
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>List&lt;CopayExclusionVM&gt;.</returns>
        public List<CopayExclusionVM> GetAllCopayExclusions(long bnftPlanSK)
        {
            using (var repository = _repoFactory.CopayExclusion())
            {
                return repository.FindAll(c => c.BnftPlanSK == bnftPlanSK).Select(s => new CopayExclusionVM()
                {
                    CopayOvrrdSK = s.CopayOvrrdSK,
                    BnftPlanSK = s.BnftPlanSK,
                    CopayCoinsuranceLogicTypeSK = s.CopayCoinsuranceLogicTypeSK,
                    CopayOvrrdVal = s.CopayOvrrdVal,
                    CopayAmt = s.CopayAmt,
                    CoinsurancePct = s.CoinsurancePct,
                    CopayOvrrdQulfrTypeSK = s.CopayOvrrdQulfrTypeSK
                }).ToList();
            }
        }

        /// <summary>
        /// Add Or Update Copay Exclusion
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>CopayExclusionVM.</returns>
        public CopayExclusionVM AddOrUpdateCopayExclusion(CopayExclusionVM itemToAddOrUpdate)
        {
            using (var repoCopayExclusion = _repoFactory.CopayExclusion())
            {
                CopayOvrrd copayExclusion = itemToAddOrUpdate.CopayOvrrdSK != 0
                   ? repoCopayExclusion.FindOne(c => c.CopayOvrrdSK == itemToAddOrUpdate.CopayOvrrdSK)  // Update record
                   : new CopayOvrrd()
                   {
                       CreatedBy = itemToAddOrUpdate.CurrentUser,
                       CreatedTs = UtilityFunctions.GetTimeStamp()
                   }; // Insert new record

                copayExclusion.BnftPlanSK = itemToAddOrUpdate.BnftPlanSK;
                copayExclusion.CopayCoinsuranceLogicTypeSK = itemToAddOrUpdate.CopayCoinsuranceLogicTypeSK;
                copayExclusion.CopayOvrrdQulfrTypeSK = itemToAddOrUpdate.CopayOvrrdQulfrTypeSK;
                copayExclusion.CopayOvrrdVal = itemToAddOrUpdate.CopayOvrrdVal;
                copayExclusion.CopayAmt = itemToAddOrUpdate.CopayAmt;
                copayExclusion.CoinsurancePct = itemToAddOrUpdate.CoinsurancePct;
                copayExclusion.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                copayExclusion.LastModfdTs = UtilityFunctions.GetTimeStamp();

                if (itemToAddOrUpdate.isDeleted == true)
                {
                    copayExclusion.DelTs = UtilityFunctions.GetTimeStamp();
                }

                repoCopayExclusion.AddOrUpdate(copayExclusion);
                repoCopayExclusion.SaveChanges();

                itemToAddOrUpdate.CopayOvrrdSK = copayExclusion.CopayOvrrdSK;
                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Get All Early Refill Exceptions
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>List&lt;EarlyRefillExceptionsVM&gt;.</returns>
        public List<EarlyRefillExceptionsVM> GetAllEarlyRefillExceptions(long bnftPlanSK)
        {
            using (var repository = _repoFactory.EarlyRefillExcption())
            {
                return repository.FindAll(c => c.BnftPlanSK == bnftPlanSK).Select(s => new EarlyRefillExceptionsVM()
                {
                    EarlyRefillExcpSK = s.EarlyRefillExcpSK,
                    BnftPlanSK = s.BnftPlanSK,
                    EarlyRefillExcpQulfrTypeSK = s.EarlyRefillExcpQulfrTypeSK,
                    EarlyRefillVal = s.EarlyRefillVal,
                    EarlyRefillPct = s.EarlyRefillPct
                }).ToList();
            }
        }

        /// <summary>
        /// Add Or Update Early Refill Exception
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>EarlyRefillExceptionsVM.</returns>
        public EarlyRefillExceptionsVM AddOrUpdateEarlyRefillException(EarlyRefillExceptionsVM itemToAddOrUpdate)
        {
            using (var repoEarlyRefillExcp = _repoFactory.EarlyRefillExcption())
            {
                EarlyRefillExcp earlyRefillExcp = itemToAddOrUpdate.EarlyRefillExcpSK != 0
                   ? repoEarlyRefillExcp.FindOne(c => c.EarlyRefillExcpSK == itemToAddOrUpdate.EarlyRefillExcpSK)  // Update record
                   : new EarlyRefillExcp()
                   {
                       CreatedBy = itemToAddOrUpdate.CurrentUser,
                       CreatedTs = UtilityFunctions.GetTimeStamp()
                   }; // Insert new record

                earlyRefillExcp.BnftPlanSK = itemToAddOrUpdate.BnftPlanSK;
                earlyRefillExcp.EarlyRefillExcpQulfrTypeSK = itemToAddOrUpdate.EarlyRefillExcpQulfrTypeSK;
                earlyRefillExcp.EarlyRefillVal = itemToAddOrUpdate.EarlyRefillVal;
                earlyRefillExcp.EarlyRefillPct = itemToAddOrUpdate.EarlyRefillPct;
                earlyRefillExcp.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                earlyRefillExcp.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                earlyRefillExcp.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                earlyRefillExcp.LastModfdTs = UtilityFunctions.GetTimeStamp();

                if (itemToAddOrUpdate.isDeleted == true)
                {
                    earlyRefillExcp.DelTs = UtilityFunctions.GetTimeStamp();
                }

                repoEarlyRefillExcp.AddOrUpdate(earlyRefillExcp);
                repoEarlyRefillExcp.SaveChanges();

                itemToAddOrUpdate.EarlyRefillExcpSK = earlyRefillExcp.EarlyRefillExcpSK;

                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Get All Plan Cap Limits
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>List&lt;PlanCapLimitsVM&gt;.</returns>
        public List<PlanCapLimitsVM> GetAllPlanCapLimits(long bnftPlanSK)
        {
            using (var repository = _repoFactory.PlanCapLimit())
            {
                return repository.FindAll(c => c.BnftPlanSK == bnftPlanSK).Select(s => new PlanCapLimitsVM()
                {
                    PlanCapLimSK = s.PlanCapLimSK,
                    BnftPlanSK = s.BnftPlanSK,
                    PlanCapLimQulfrTypeSK = s.PlanCapLimQulfrTypeSK,
                    PlanCapLimPerQulfrTypeSK = s.PlanCapLimPerQulfrTypeSK,
                    PlanCapLimVal = s.PlanCapLimVal,
                    PlanCapLimAmt = s.PlanCapLimAmt
                }).ToList();
            }
        }

        /// <summary>
        /// Add Or Update Plan Cap Limits
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>PlanCapLimitsVM.</returns>
        public PlanCapLimitsVM AddOrUpdatePlanCapLimits(PlanCapLimitsVM itemToAddOrUpdate)
        {
            using (var repoPlanCapLimit = _repoFactory.PlanCapLimit())
            {
                PlanCapLim planCapLimit = itemToAddOrUpdate.PlanCapLimSK != 0
                   ? repoPlanCapLimit.FindOne(c => c.PlanCapLimSK == itemToAddOrUpdate.PlanCapLimSK)  // Update record
                   : new PlanCapLim()
                   {
                       CreatedBy = itemToAddOrUpdate.CurrentUser,
                       CreatedTs = UtilityFunctions.GetTimeStamp()
                   }; // Insert new record

                planCapLimit.BnftPlanSK = itemToAddOrUpdate.BnftPlanSK;
                planCapLimit.PlanCapLimQulfrTypeSK = itemToAddOrUpdate.PlanCapLimQulfrTypeSK;
                planCapLimit.PlanCapLimVal = itemToAddOrUpdate.PlanCapLimVal;
                planCapLimit.PlanCapLimPerQulfrTypeSK = itemToAddOrUpdate.PlanCapLimPerQulfrTypeSK;
                planCapLimit.PlanCapLimAmt = itemToAddOrUpdate.PlanCapLimAmt;
                planCapLimit.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                planCapLimit.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                planCapLimit.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                planCapLimit.LastModfdTs = UtilityFunctions.GetTimeStamp();

                if (itemToAddOrUpdate.isDeleted == true)
                {
                    planCapLimit.DelTs = UtilityFunctions.GetTimeStamp();
                }

                repoPlanCapLimit.AddOrUpdate(planCapLimit);
                repoPlanCapLimit.SaveChanges();

                itemToAddOrUpdate.PlanCapLimSK = planCapLimit.PlanCapLimSK;

                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Get Copay Distribution LICSVM
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>List&lt;CopayDistributionLICSVM&gt;.</returns>
        public CopayDistributionLICSVM GetCopayDistributionLICSVM(long bnftPlanSK)
        {
            CopayDistributionLICSVM copayDistributionLICSVM = new CopayDistributionLICSVM() { BnftPlanSK = bnftPlanSK };
            BnftPlan bnftPlan = _repoFactory.BenefitPlan().FindOne(c => c.BnftPlanSK == bnftPlanSK);
            LICSSetup lics4 = _repoFactory.LowIncomeCostSharingSubsidySetup()
                .FindOne(c => c.BnftPlanSK == bnftPlanSK && c.LICSType.LICSTypeCode == "LICS 4");

            copayDistributionLICSVM.isEnabled = lics4 != null;
            copayDistributionLICSVM.LICS4DeducblAmt = (copayDistributionLICSVM.isEnabled && bnftPlan != null) ? bnftPlan.LICS4DeducblAmt : null;

            return copayDistributionLICSVM;
        }

        /// <summary>
        /// Save LICS4DeducblAmt
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>List&lt;CopayDistributionLICSVM&gt;.</returns>
        public CopayDistributionLICSVM SetCopayDistributionLICSVM(CopayDistributionLICSVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            using (var repository = _repoFactory.BenefitPlan())
            {
                BnftPlan bnftPlan = repository.FindOne(c => c.BnftPlanSK == itemToAddOrUpdate.BnftPlanSK);

                if (bnftPlan != null)
                {
                    bnftPlan.LICS4DeducblAmt = itemToAddOrUpdate.LICS4DeducblAmt;
                    bnftPlan.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                    bnftPlan.LastModfdTs = UtilityFunctions.GetTimeStamp();
                }

                repository.AddOrUpdate(bnftPlan);
                repository.SaveChanges();
            }

            return itemToAddOrUpdate;
        }
        #region " Public - Coverage Phase "
        /// <summary>
        /// Get all coverage phase for a given The Benefit plan Key
        /// </summary>
        /// <param name="bnftPlanSK">The Benefit plan Key</param>
        /// <returns>List of Coverage Phase VM</returns>
        public List<CoveragePhaseVM> GetAllCoveragePhase(long bnftPlanSK)
        {
            return _repoFactory.CoveragePhase().FindAll(c => c.BnftPlanSK == bnftPlanSK)
                .Select(s => new CoveragePhaseVM()
                {
                    CvrgPhaseSK = s.CvrgPhaseSK,
                    BnftPlanSK = s.BnftPlanSK,
                    CvrgPhaseTypeSK = s.CvrgPhaseTypeSK,
                    CvrgPhaseSeq = s.CvrgPhaseSeq,
                    CvrgPhaseTotalDrugSpend = s.CvrgPhaseTotalDrugSpend,
                    CvrgPhaseTrOOPMax = s.CvrgPhaseTrOOPMax
                }).OrderBy(o => o.CvrgPhaseSeq).ToList();
        }

        /// <summary>
        /// add or update coverage phase
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>CoveragePhaseVM.</returns>
        public CoveragePhaseVM AddOrUpdateCoveragePhase(CoveragePhaseVM itemToAddOrUpdate)
        {
            using (var repository = _repoFactory.CoveragePhase())
            {
                DateTime timeStamp = UtilityFunctions.GetTimeStamp();

                CvrgPhase cvrgPhase = itemToAddOrUpdate.CvrgPhaseSK != 0
                    ? repository.FindOne(c => c.CvrgPhaseSK == itemToAddOrUpdate.CvrgPhaseSK)
                    : new CvrgPhase()
                    {
                        BnftPlanSK = itemToAddOrUpdate.BnftPlanSK,
                        CreatedBy = itemToAddOrUpdate.CurrentUser,
                        CreatedTs = timeStamp
                    };

                cvrgPhase.CvrgPhaseTypeSK = itemToAddOrUpdate.CvrgPhaseTypeSK;
                cvrgPhase.CvrgPhaseSeq = itemToAddOrUpdate.CvrgPhaseSeq;
                cvrgPhase.CvrgPhaseTotalDrugSpend = itemToAddOrUpdate.CvrgPhaseTotalDrugSpend;
                cvrgPhase.CvrgPhaseTrOOPMax = itemToAddOrUpdate.CvrgPhaseTrOOPMax;
                cvrgPhase.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                cvrgPhase.LastModfdTs = timeStamp;
                cvrgPhase.DelTs = itemToAddOrUpdate.IsDeleted
                    ? (DateTime?)CascadeDeleteCoveragePhase(cvrgPhase, itemToAddOrUpdate, timeStamp)
                    : null;

                repository.AddOrUpdate(cvrgPhase);
                repository.SaveChanges();

                itemToAddOrUpdate.CvrgPhaseSK = cvrgPhase.CvrgPhaseSK;
                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Cascade a Soft Delete of Coverage Phase
        /// </summary>
        /// <param name="cvrgPhase">the Coverage Phase</param>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <param name="timeStamp">the Time Stamp</param>
        /// <returns>the TimeStamp</returns>
        private DateTime CascadeDeleteCoveragePhase(CvrgPhase cvrgPhase, CoveragePhaseVM itemToAddOrUpdate, DateTime timeStamp)
        {
            cvrgPhase = DeleteCopayDistribution(cvrgPhase, itemToAddOrUpdate.CurrentUser, timeStamp);
            cvrgPhase = DeleteCopaySetup(cvrgPhase, itemToAddOrUpdate.CurrentUser, timeStamp);
            cvrgPhase = DeleteLICSSetup(cvrgPhase, itemToAddOrUpdate, timeStamp);
            cvrgPhase = DeleteDeductible(cvrgPhase, itemToAddOrUpdate.CurrentUser, timeStamp);

            return timeStamp;
        }
        #endregion " Public - Coverage Phase "

        #region " Private - Soft Delete Entities "
        /// <summary>
        /// Soft Delete of CopayDistribution by Coverage Phase Key
        /// </summary>
        /// <param name="cvrgPhase">the Coverage Phase</param>
        /// <param name="currentUser">the Current User</param>
        /// <param name="timeStamp">the Time Stamp</param>
        /// <returns>the Coverage Phase Record</returns>
        private CvrgPhase DeleteCopayDistribution(CvrgPhase cvrgPhase, string currentUser, DateTime timeStamp)
        {
            foreach (CopayDist copayDistItem in _repoFactory.CopayDistribution().FindAll(w => w.CvrgPhaseSK == cvrgPhase.CvrgPhaseSK))
            {
                copayDistItem.LastModfdBy = currentUser;
                copayDistItem.LastModfdTs = timeStamp;
                copayDistItem.DelTs = timeStamp;
                copayDistItem.CvrgPhase = cvrgPhase;
                cvrgPhase.CopayDist.Add(copayDistItem);

                _repoFactory.CopayDistribution().AddOrUpdate(copayDistItem);
            }

            return cvrgPhase;
        }

        /// <summary>
        /// Soft Delete of CopayDistribution by Coverage Phase Key
        /// </summary>
        /// <param name="cvrgPhase">the Coverage Phase</param>
        /// <param name="currentUser">the Current User</param>
        /// <param name="timeStamp">the Time Stamp</param>
        /// <returns>the Coverage Phase Record</returns>
        private CvrgPhase DeleteCopaySetup(CvrgPhase cvrgPhase, string currentUser, DateTime timeStamp)
        {
            foreach (CopaySetup copaySetupItem in _repoFactory.CopaySetup().FindAll(w => w.CvrgPhaseSK == cvrgPhase.CvrgPhaseSK))
            {
                copaySetupItem.LastModfdBy = currentUser;
                copaySetupItem.LastModfdTs = timeStamp;
                copaySetupItem.DelTs = timeStamp;
                copaySetupItem.CvrgPhase = cvrgPhase;
                cvrgPhase.CopaySetup.Add(copaySetupItem);

                _repoFactory.CopaySetup().AddOrUpdate(copaySetupItem);
            }

            return cvrgPhase;
        }

        /// <summary>
        /// Soft Delete of Deductible by Coverage Phase Key
        /// </summary>
        /// <param name="cvrgPhase">the Coverage Phase</param>
        /// <param name="currentUser">the Current User</param>
        /// <param name="timeStamp">the Time Stamp</param>
        /// <returns>the Coverage Phase Record</returns>
        private CvrgPhase DeleteDeductible(CvrgPhase cvrgPhase, string currentUser, DateTime timeStamp)
        {
            foreach (Deducbl deducblItem in _repoFactory.Deductible().FindAll(w => w.CvrgPhaseSK == cvrgPhase.CvrgPhaseSK))
            {
                deducblItem.LastModfdBy = currentUser;
                deducblItem.LastModfdTs = timeStamp;
                deducblItem.DelTs = timeStamp;
                deducblItem.CvrgPhase = cvrgPhase;
                cvrgPhase.Deducbl.Add(deducblItem);

                _repoFactory.Deductible().AddOrUpdate(deducblItem);
            }

            return cvrgPhase;
        }

        /// <summary>
        /// Soft Delete of Deductible by LICS Setup Key
        /// </summary>
        /// <param name="LICSSetup">the LICS Setup</param>
        /// <param name="currentUser">the Current User</param>
        /// <param name="timeStamp">the Time Stamp</param>
        /// <returns>the Coverage Phase Record</returns>
        private LICSSetup DeleteDeductible(LICSSetup licsSetupItem, string currentUser, DateTime timeStamp)
        {
            foreach (Deducbl deducblItem in _repoFactory.Deductible().FindAll(w => w.LICSSetupSK == licsSetupItem.LICSSetupSK))
            {
                deducblItem.LastModfdBy = currentUser;
                deducblItem.LastModfdTs = timeStamp;
                deducblItem.DelTs = timeStamp;
                deducblItem.LICSSetup = licsSetupItem;
                licsSetupItem.Deducbl.Add(deducblItem);

                _repoFactory.Deductible().AddOrUpdate(deducblItem);
            }

            return licsSetupItem;
        }

        /// <summary>
        /// Soft Delete of LICS Setup  by Coverage Phase Key
        /// </summary>
        /// <param name="cvrgPhase">the Coverage Phase</param>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <param name="timeStamp">the Time Stamp</param>
        /// <returns>the Coverage Phase Record</returns>
        private CvrgPhase DeleteLICSSetup(CvrgPhase cvrgPhase, CoveragePhaseVM itemToAddOrUpdate, DateTime timeStamp)
        {
            foreach (LICSSetup licsSetupItem in _repoFactory.LowIncomeCostSharingSubsidySetup().FindAll(w => w.CvrgPhaseSK == cvrgPhase.CvrgPhaseSK))
            {
                licsSetupItem.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                licsSetupItem.LastModfdTs = timeStamp;
                licsSetupItem.DelTs = timeStamp;
                licsSetupItem.CvrgPhase = cvrgPhase;
                DeleteDeductible(licsSetupItem, itemToAddOrUpdate.CurrentUser, timeStamp);

                cvrgPhase.LICSSetup.Add(licsSetupItem);
                _repoFactory.LowIncomeCostSharingSubsidySetup().AddOrUpdate(licsSetupItem);
            }

            return cvrgPhase;
        }
        #endregion " Public - Soft Delete Entities "
    }
}