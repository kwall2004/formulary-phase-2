using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using Atlas.BenefitPlan.BLL.Utility;

namespace Atlas.BenefitPlan.BLL
{
    /// <summary>
    /// Class AdminConfigBLL.
    /// </summary>
    public class AdminConfigBLL : IAdminConfigBLL
    {
        /// <summary>
        /// The Pending Benefit Status.
        /// </summary>
        private const string PendingStatus = "Pending";

        /// <summary>
        /// the Benefit Plan Repository Factory
        /// </summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>
        /// Criteria Group BLL
        /// </summary>
        private ICriteriaGroupBLL _criteriaGroupBLL;

        /// <summary>
        /// The Constructor for the Entity BLL for Benefit Plan
        /// </summary>
        /// <param name="criteriaGroupBLL">The criteria group BLL.</param>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        public AdminConfigBLL(ICriteriaGroupBLL criteriaGroupBLL, IBenefitPlanRepositoryFactory repoFactory)
        {
            _criteriaGroupBLL = criteriaGroupBLL;
            _repoFactory = repoFactory;
        }

        #region "Allowed Prescriber"

        /// <summary>
        /// Add or Update an AllowedPrescriber
        /// </summary>
        /// <param name="itemToAddOrUpdate">the AllowedPrescriber to Add or Update</param>
        /// <returns>AllowedPrescribersVM.</returns>
        public AllowedPrescribersVM SetAllowedPrescriberList(AllowedPrescribersVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            using (var repoPresList = _repoFactory.AllowedPrescribersList())
            using (var repoPresDtl = _repoFactory.AllowedPrescribersDetail())
            {
                AlwdPrescribersList alwdPrescribersList = itemToAddOrUpdate.AlwdPrescribersListSK != 0
                ? repoPresList.FindOne(c => c.AlwdPrescribersListSK == itemToAddOrUpdate.AlwdPrescribersListSK)
                : new AlwdPrescribersList() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

                alwdPrescribersList.AlwdPrescribersListName = itemToAddOrUpdate.AlwdPrescribersListName;
                alwdPrescribersList.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
                alwdPrescribersList.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
                alwdPrescribersList.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                alwdPrescribersList.LastModfdTs = timeStamp;

                repoPresList.AddOrUpdate(alwdPrescribersList);

                if (itemToAddOrUpdate.AllowedPrescribers.IsAny())
                {
                    foreach (AllowedPrescribersDetailVM allowedPrescribersDetail in itemToAddOrUpdate.AllowedPrescribers)
                    {
                        AlwdPrescribersDtl alwdPrescribersDtl = allowedPrescribersDetail.AlwdPrescribersDtlSK != 0
                        ? repoPresDtl.FindOne(c => c.AlwdPrescribersDtlSK == allowedPrescribersDetail.AlwdPrescribersDtlSK)
                        : new AlwdPrescribersDtl() { CreatedBy = allowedPrescribersDetail.CurrentUser, CreatedTs = timeStamp };

                        alwdPrescribersDtl.AlwdPrescribersListSK = alwdPrescribersList.AlwdPrescribersListSK;
                        alwdPrescribersDtl.AlwdPrescribersList = alwdPrescribersList;
                        alwdPrescribersDtl.PrescbrSK = allowedPrescribersDetail.PrescbrSK;

                        alwdPrescribersDtl.EfctvStartDt = allowedPrescribersDetail.EfctvStartDt;
                        alwdPrescribersDtl.EfctvEndDt = allowedPrescribersDetail.EfctvEndDt;
                        alwdPrescribersDtl.LastModfdBy = allowedPrescribersDetail.CurrentUser;
                        alwdPrescribersDtl.LastModfdTs = timeStamp;

                        repoPresDtl.AddOrUpdate(alwdPrescribersDtl);
                    }
                }

                repoPresList.SaveChanges();

                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Validate PrescriberList
        /// </summary>
        /// <param name="itemToValidate">the AllowedPrescriber List to Validate</param>
        /// <returns>List&lt;Message&gt;.</returns>
        public List<Message> ValidateAllowedPrescriberList(AllowedPrescribersVM itemToValidate)
        {
            List<Message> result = new List<Message>();
            return result;
        }

        /// <summary>
        /// Gets the Prescribers from Prescribers List
        /// </summary>
        /// <returns>List&lt;AllowedPrescribersVM&gt;.</returns>
        public List<AllowedPrescribersVM> GetAllAllowedPrescriberLists()
        {
            using (var repoPresList = _repoFactory.AllowedPrescribersList())
            using (var repoPresDtl = _repoFactory.AllowedPrescribersDetail())
            using (var repoPrescriber = _repoFactory.Prescriber())
            {
                List<AllowedPrescribersVM> allowedPrescribers = new List<AllowedPrescribersVM>();

                IQueryable<AlwdPrescribersList> presList = repoPresList.FindAll() as IQueryable<AlwdPrescribersList>;

                foreach (AlwdPrescribersList prescriberList in presList)
                {
                    List<AllowedPrescribersDetailVM> allowedPrescribersDetail = new List<AllowedPrescribersDetailVM>();

                    IQueryable<AlwdPrescribersDtl> presDetail = repoPresDtl.FindAll(d => d.AlwdPrescribersListSK == prescriberList.AlwdPrescribersListSK) as IQueryable<AlwdPrescribersDtl>;
                    IQueryable<Prescbr> prescriber = repoPrescriber.FindAll() as IQueryable<Prescbr>;

                    var query = from mstr in presDetail
                                join dtl in prescriber on mstr.PrescbrSK equals dtl.PrescbrSK into p
                                from rslt in p.DefaultIfEmpty()
                                select new { mstr, rslt };

                    allowedPrescribersDetail = query
                        .Select(bp => new AllowedPrescribersDetailVM
                        {
                            AlwdPrescribersDtlSK = bp.mstr.AlwdPrescribersDtlSK,
                            PrescbrSK = bp.mstr.PrescbrSK,
                            EfctvStartDt = bp.mstr.EfctvStartDt,
                            EfctvEndDt = bp.mstr.EfctvEndDt,
                            PrescbrFirstName = bp.rslt.PrescbrFirstName,
                            PrescbrLastName = bp.rslt.PrescbrLastName,
                            PrescbrNPI = bp.rslt.PrescbrNPI
                        }).ToList();

                    allowedPrescribers.Add(new AllowedPrescribersVM
                    {
                        AlwdPrescribersListSK = prescriberList.AlwdPrescribersListSK,
                        AlwdPrescribersListName = prescriberList.AlwdPrescribersListName,
                        EfctvStartDt = prescriberList.EfctvStartDt,
                        EfctvEndDt = prescriberList.EfctvEndDt,
                        AllowedPrescribers = allowedPrescribersDetail
                    });
                }
                return allowedPrescribers;
            }
        }

        #endregion "Allowed Prescriber"

        #region "Prescriber Drug Override"

        /// <summary>
        /// Add or Update an PrescriberDrugOverride List
        /// </summary>
        /// <param name="itemToAddOrUpdate">the PrescriberDrugOverride List to Add or Update</param>
        /// <returns>PrescriberDrugOverrideVM.</returns>
        public PrescriberDrugOverrideVM SetPrescriberDrugOverrideList(PrescriberDrugOverrideVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            using (var repoPresDrugOverList = _repoFactory.PrescriberDrugOverrideList())
            using (var repoPresDrugOverDtl = _repoFactory.PrescriberDrugOverrideDetail())
            {
                PrescbrDrugOvrrdList prescriberDrugOverrideList = itemToAddOrUpdate.PrescbrDrugOvrrdListSK != 0
                ? repoPresDrugOverList.FindOne(c => c.PrescbrDrugOvrrdListSK == itemToAddOrUpdate.PrescbrDrugOvrrdListSK)
                : new PrescbrDrugOvrrdList() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

                prescriberDrugOverrideList.PrescbrDrugOvrrdListName = itemToAddOrUpdate.PrescbrDrugOvrrdListName;
                prescriberDrugOverrideList.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
                prescriberDrugOverrideList.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
                prescriberDrugOverrideList.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                prescriberDrugOverrideList.LastModfdTs = timeStamp;

                repoPresDrugOverList.AddOrUpdate(prescriberDrugOverrideList);

                if (itemToAddOrUpdate.PrescriberDrugOverrides.IsAny())
                {
                    foreach (PrescriberDrugOverrideDetailVM prescriberDrugOverrideDetail in itemToAddOrUpdate.PrescriberDrugOverrides)
                    {
                        PrescbrDrugOvrrdDtl prescbrDrugOvrrdDtl = prescriberDrugOverrideDetail.PrescbrDrugOvrrdDtlSK != 0
                        ? repoPresDrugOverDtl.FindOne(c => c.PrescbrDrugOvrrdDtlSK == prescriberDrugOverrideDetail.PrescbrDrugOvrrdDtlSK)
                        : new PrescbrDrugOvrrdDtl() { CreatedBy = prescriberDrugOverrideDetail.CurrentUser, CreatedTs = timeStamp };

                        prescbrDrugOvrrdDtl.PrescbrDrugOvrrdListSK = prescriberDrugOverrideList.PrescbrDrugOvrrdListSK;
                        prescbrDrugOvrrdDtl.PrescbrDrugOvrrdList = prescriberDrugOverrideList;
                        prescbrDrugOvrrdDtl.PrescbrSK = prescriberDrugOverrideDetail.PrescbrSK;

                        prescbrDrugOvrrdDtl.NDC = prescriberDrugOverrideDetail.NDC;
                        prescbrDrugOvrrdDtl.DrugLblName = prescriberDrugOverrideDetail.DrugLblName;
                        prescbrDrugOvrrdDtl.EfctvStartDt = prescriberDrugOverrideDetail.EfctvStartDt;
                        prescbrDrugOvrrdDtl.EfctvEndDt = prescriberDrugOverrideDetail.EfctvEndDt;
                        prescbrDrugOvrrdDtl.LastModfdBy = prescriberDrugOverrideDetail.CurrentUser;
                        prescbrDrugOvrrdDtl.LastModfdTs = timeStamp;

                        repoPresDrugOverDtl.AddOrUpdate(prescbrDrugOvrrdDtl);
                    }
                }

                repoPresDrugOverList.SaveChanges();

                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Validate PrescriberDrugOverride List
        /// </summary>
        /// <param name="itemToValidate">thePrescriberDrugOverride List to Validate</param>
        /// <returns>List&lt;Message&gt;.</returns>
        public List<Message> ValidatePrescriberDrugOverrideList(PrescriberDrugOverrideVM itemToValidate)
        {
            List<Message> result = new List<Message>();
            List<PrescriberDrugOverrideDetailVM> qry = (from dtl in itemToValidate.PrescriberDrugOverrides
                                                        group dtl by new { dtl.PrescbrSK, dtl.NDC, dtl.DrugLblName, dtl.EfctvStartDt, dtl.EfctvEndDt } into grp
                                                        where grp.Count() > 1
                                                        select new PrescriberDrugOverrideDetailVM() { PrescbrSK = grp.Key.PrescbrSK, NDC = grp.Key.NDC, DrugLblName = grp.Key.DrugLblName }).ToList();

            qry.ForEach(r =>
            {
                result.Add(new Message()
                {
                    Fieldname = "PrescbrDrugOvrrdDtlSK",
                    MessageText = string.Format("Duplicate entry Prescriber: {0} NDC: {1} Drug: {2}.", r.PrescbrSK, r.NDC, r.DrugLblName)
                });
            });
            return result;
        }

        /// <summary>
        /// Gets the Prescribers from PrescriberDrugOverride List
        /// </summary>
        /// <returns>List&lt;PrescriberDrugOverrideVM&gt;.</returns>
        public List<PrescriberDrugOverrideVM> GetAllPrescriberDrugOverrideLists()
        {
            using (var repoPresDrugOverList = _repoFactory.PrescriberDrugOverrideList())
            using (var repoPresDrugOverDtl = _repoFactory.PrescriberDrugOverrideDetail())
            using (var repoPrescriber = _repoFactory.Prescriber())
            {
                List<PrescriberDrugOverrideVM> prescriberDrugOverrides = new List<PrescriberDrugOverrideVM>();

                IQueryable<PrescbrDrugOvrrdList> prescbrDrugOvrrdList = repoPresDrugOverList.FindAll() as IQueryable<PrescbrDrugOvrrdList>;

                foreach (PrescbrDrugOvrrdList prescriberList in prescbrDrugOvrrdList)
                {
                    List<PrescriberDrugOverrideDetailVM> prescriberDrugOverrideDetail = new List<PrescriberDrugOverrideDetailVM>();

                    IQueryable<PrescbrDrugOvrrdDtl> prescbrDrugOvrrdDtl = repoPresDrugOverDtl.FindAll(d => d.PrescbrDrugOvrrdListSK == prescriberList.PrescbrDrugOvrrdListSK) as IQueryable<PrescbrDrugOvrrdDtl>;
                    IQueryable<Prescbr> prescriber = repoPrescriber.FindAll() as IQueryable<Prescbr>;

                    var query = from mstr in prescbrDrugOvrrdDtl
                                join dtl in prescriber on mstr.PrescbrSK equals dtl.PrescbrSK into p
                                from rslt in p.DefaultIfEmpty()
                                select new { mstr, rslt };

                    prescriberDrugOverrideDetail = query
                        .Select(bp => new PrescriberDrugOverrideDetailVM
                        {
                            PrescbrDrugOvrrdDtlSK = bp.mstr.PrescbrDrugOvrrdDtlSK,
                            PrescbrSK = bp.mstr.PrescbrSK,
                            EfctvStartDt = bp.mstr.EfctvStartDt,
                            EfctvEndDt = bp.mstr.EfctvEndDt,
                            PrescbrFirstName = bp.rslt.PrescbrFirstName,
                            PrescbrLastName = bp.rslt.PrescbrLastName,
                            PrescbrNPI = bp.rslt.PrescbrNPI,
                            NDC = bp.mstr.NDC,
                            DrugLblName = bp.mstr.DrugLblName
                        }).ToList();

                    prescriberDrugOverrides.Add(new PrescriberDrugOverrideVM
                    {
                        PrescbrDrugOvrrdListSK = prescriberList.PrescbrDrugOvrrdListSK,
                        PrescbrDrugOvrrdListName = prescriberList.PrescbrDrugOvrrdListName,
                        EfctvStartDt = prescriberList.EfctvStartDt,
                        EfctvEndDt = prescriberList.EfctvEndDt,
                        PrescriberDrugOverrides = prescriberDrugOverrideDetail
                    });
                }
                return prescriberDrugOverrides;
            }
        }

        #endregion "Prescriber Drug Override"

        #region "Benefits"

        #region "Public Methods"

        /// <summary>
        /// Get all Benefits with or without Service Types
        /// </summary>
        /// <param name="bnftName">the bnft name</param>
        /// <param name="bnftCode">the bnft Code</param>
        /// <param name="svcTypeSK">The SVC type sk.</param>
        /// <param name="efctvStartDt">The efctv start dt.</param>
        /// <param name="efctvEndDt">The efctv end dt.</param>
        /// <returns>List of Benefits and Service Types</returns>
        public List<spBenefitDefinitionSearch_Result> BenefitDefinitionSearch(string bnftName = null, string bnftCode = null, long? svcTypeSK = null, DateTime? efctvStartDt = null, DateTime? efctvEndDt = null)
        {
            using (var repo = _repoFactory.AtlasBenefitPlanStoredProcs())
            {
                return repo.BenefitDefinitionSearch(bnftName, bnftCode, svcTypeSK, efctvStartDt, efctvEndDt).ToList();
            }
        }

        /// <summary>
        /// Get all Benefits with or without Service Types
        /// </summary>
        /// <returns>List of Benefits and Service Types</returns>
        public List<BenefitServiceTypeVM> GetAllBenefitServiceTypes()
        {
            IQueryable<Bnft> bnfts = _repoFactory.Benefit().FindAll().AsQueryable();
            return GetAllBenefitServiceTypes(bnfts);
        }

        /// <summary>
        /// Get all Benefits with or without Service Types by Search Text
        /// </summary>
        /// <param name="searchText">searchText</param>
        /// <returns>List of Benefits and Service Types</returns>
        public List<BenefitServiceTypeVM> GetAllBenefitServiceTypes(string searchText)
        {
            IQueryable<Bnft> bnfts = _repoFactory.Benefit().FindAll(b => b.BnftName.ToLower().StartsWith(searchText.ToLower())).AsQueryable();
            return GetAllBenefitServiceTypes(bnfts);
        }

        /// <summary>
        /// Get all Benefits with or without Service Types by BnftSK
        /// </summary>
        /// <param name="BnftSK">BnftSK</param>
        /// <returns>List of Benefits and Service Types</returns>
        public List<BenefitServiceTypeVM> GetAllBenefitServiceTypes(long BnftSK)
        {
            IQueryable<Bnft> bnfts = _repoFactory.Benefit().FindAll(b => b.BnftSK == BnftSK).AsQueryable();
            return GetAllBenefitServiceTypes(bnfts);
        }

        /// <summary>
        /// Get all Benefits
        /// </summary>
        /// <returns>List of Benefits</returns>
        public List<Bnft> GetAllBenefits()
        {
            List<Bnft> bnfts = _repoFactory.Benefit().FindAll().ToList();
            return bnfts;
        }

        /// <summary>
        /// Get a Benefit by Benefit ID
        /// </summary>
        /// <param name="BnftSK">BnftSK</param>
        /// <returns>List of Benefits and Service Types</returns>
        public List<Bnft> GetAllBenefits(long BnftSK)
        {
            List<Bnft> bnfts = _repoFactory.Benefit().FindAll(b => b.BnftSK == BnftSK).ToList();
            return bnfts;
        }

        /// <summary>
        /// Get Benefit Definition by Benefit SK
        /// </summary>
        /// <param name="BnftSK">BnftSK</param>
        /// <returns>Benefit Definition</returns>
        public BenefitDefinitionVM GetBenefitDefinition(long BnftSK)
        {
            return GetABenefitDefinition(BnftSK);
        }

        /// <summary>
        /// Set BenefitDefinition
        /// </summary>
        /// <param name="itemToAddOrUpdate">benefitDefinition to Add or Update</param>
        /// <returns>BenefitDefinitionVM.</returns>
        public BenefitDefinitionVM SetBenefitDefinition(BenefitDefinitionVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            using (var repository = _repoFactory.Benefit())
            using (var repoBnftSvcType = _repoFactory.BenefitServiceType())
            using (var repoBnftCrtriaSet = _repoFactory.BnftCrtriaSet())
            using (var repoCrtriaSet = _repoFactory.CriteriaSet())
            using (var repoCrtriaDtl = _repoFactory.CriteriaDetail())
            using (var repoBnftStat = _repoFactory.BnftStat())
            using (var repoStatus = _repoFactory.StatusType())
            {
                Bnft benefit = itemToAddOrUpdate.BnftSK != 0
                ? repository.FindOne(c => c.BnftSK == itemToAddOrUpdate.BnftSK)
                : new Bnft() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

                benefit.BnftName = itemToAddOrUpdate.BenefitName;
                benefit.BnftOrder = itemToAddOrUpdate.BnftOrder;
                benefit.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
                benefit.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
                benefit.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                benefit.LastModfdTs = timeStamp;

                repository.AddOrUpdate(benefit);

                if (itemToAddOrUpdate.BnftSK == 0)
                {
                    benefit.LastPblshTs = null;
                    benefit.LastSubmtdForTestingTs = null;
                    StatType statType = repoStatus.FindOne(s => s.StatDesc == PendingStatus);

                    BnftStat benefitStatus = new BnftStat()
                    {
                        BnftSK = benefit.BnftSK,
                        StatTypeSK = statType.StatTypeSK,
                        CreatedBy = itemToAddOrUpdate.CurrentUser,
                        CreatedTs = timeStamp,
                        EfctvStartDt = itemToAddOrUpdate.EfctvStartDt,
                        EfctvEndDt = itemToAddOrUpdate.EfctvEndDt,
                        LastModfdBy = itemToAddOrUpdate.CurrentUser,
                        LastModfdTs = timeStamp
                    };

                    repoBnftStat.AddOrUpdate(benefitStatus);
                }

                SetBenefitServiceTypes(itemToAddOrUpdate, benefit, repoBnftSvcType);

                if (itemToAddOrUpdate.RuleSets.Count() > 0)
                {
                    itemToAddOrUpdate.RuleSets = SetBenefitCriteriaSets(itemToAddOrUpdate.RuleSets, benefit, repoBnftCrtriaSet, repoCrtriaSet, repoCrtriaDtl);
                }

                repository.SaveChanges();

                //autogenerate a unique BnftCode on the backend when it is null.
                if (benefit.BnftCode == null)
                {
                    benefit.BnftCode = benefit.BnftSK.ToString();
                    repository.AddOrUpdate(benefit);
                    repository.SaveChanges();
                }

                itemToAddOrUpdate.BnftSK = benefit.BnftSK;

                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Validate BenefitDefinition
        /// </summary>
        /// <param name="itemToValidate">the BenefitDefinition to Validate</param>
        /// <returns>List of Messages</returns>
        public List<Message> ValidateBenefitDefinition(BenefitDefinitionVM itemToValidate)
        {
            List<Message> result = new List<Message>();
            IQueryable<Bnft> benefits = _repoFactory.Benefit()
                .FindAll(t => t.BnftSK != itemToValidate.BnftSK && t.BnftName == itemToValidate.BenefitName);

            if (!(benefits.Count() == 0))
            {
                result.Add(new Message() { MessageText = string.Format("Benefit: ({0}) already exists.", itemToValidate.BenefitName), Fieldname = "benefit.BenefitName" });
            }

            IQueryable<Bnft> benefits2 = _repoFactory.Benefit()
                .FindAll(t => t.BnftSK != itemToValidate.BnftSK && t.BnftOrder == itemToValidate.BnftOrder);

            if (!(benefits2.Count() == 0))
            {
                result.Add(new Message() { MessageText = string.Format("Benefit Order: ({0}) already exists.", itemToValidate.BnftOrder), Fieldname = "itemToValidate.BnftOrder" });
            }

            if (itemToValidate.RuleSets.IsAny())
            {

                int? priority = itemToValidate.RuleSets.GroupBy(c => new { c.CrtriaSetPrity }).Where(x => x.Count() > 1).Select(g => g.Key.CrtriaSetPrity).FirstOrDefault();

                if (priority != null && priority > 0)
                {
                    result.Add(new Message() { MessageText = string.Format("Priority: ({0}) already exists on a Rule Set.", priority), Fieldname = "priority" });
                }

                foreach (RuleSetVM ruleSetVM in itemToValidate.RuleSets)

                {
                    BnftCrtriaSet bnftCrtriaSet = _repoFactory.BnftCrtriaSet().FindOne(c => c.CrtriaSetName == ruleSetVM.CriteriaSetName && c.BnftSK == ruleSetVM.BnftSK && c.CrtriaSetSK != ruleSetVM.CrtriaSetSK);
                    if (bnftCrtriaSet != null)
                    {
                        result.Add(new Message() { MessageText = string.Format("Rule Name: ({0}) already exists on this benefit.", ruleSetVM.CriteriaSetName), Fieldname = "ruleSetVM.CriteriaSetName" });
                    }

                    BnftCrtriaSet bnftCrtriaSet2 = _repoFactory.BnftCrtriaSet().FindOne(c => c.BnftSK == ruleSetVM.BnftSK && c.CrtriaSetPrity == ruleSetVM.CrtriaSetPrity && c.CrtriaSetSK != ruleSetVM.CrtriaSetSK);
                    if (bnftCrtriaSet2 != null)
                    {
                        result.Add(new Message() { MessageText = string.Format("Rule Set: ({0}) has the same priority as another rule set.", ruleSetVM.CriteriaSetName), Fieldname = "ruleSetVM.CrtriaSetPrity" });
                    }

                    if (ruleSetVM.CrtriaSetTypeSK != (long)CriteriaSetType.BenefitDefinition)
                    {
                        result.Add(new Message() { MessageText = string.Format("Rule Set: ({0}) must be a Benefit Definition criteria set type.", ruleSetVM.CriteriaSetName), Fieldname = "ruleSetVM.CrtriaSetTypeSK" });
                    }

                    if (ruleSetVM.CriteriaDetails.IsAny())
                    {

                        foreach (CriteriaDetailVM criteriaDetailVM in ruleSetVM.CriteriaDetails)
                        {
                            CrtriaDtl crtriaDtl = _repoFactory.CriteriaDetail().FindOne(c => c.CrtriaSetSK == criteriaDetailVM.CrtriaSetSK && c.CrtriaPrity == criteriaDetailVM.CrtriaPrity && c.CrtriaDtlSK != criteriaDetailVM.CrtriaDtlSK);
                            if (crtriaDtl != null)
                            {
                                result.Add(new Message() { MessageText = string.Format("Rule Detail: ({0}) has the same priority as another rule detail.", criteriaDetailVM.CrtriaPrity), Fieldname = "criteriaDetailVM.CrtriaPrity" });
                            }
                        }
                    }
                }
            }

            return result;
        }

        /// <summary>
        /// Get Benefit Detail by Benefit SK
        /// </summary>
        /// <param name="BnftSK">BnftSK</param>
        /// <returns>BenefitDetail</returns>
        public BenefitDetailVM GetBenefitDetail(long BnftSK)
        {
            return GetABenefitDetail(BnftSK);
        }

        /// <summary>
        /// Set BenefitDetail
        /// </summary>
        /// <param name="itemToAddOrUpdate">BenefitDetail to Add or Update</param>
        /// <returns>BenefitDetailVM.</returns>
        public BenefitDetailVM SetBenefitDetail(BenefitDetailVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            using (var repository = _repoFactory.Benefit())
            using (var repoBnftSvcType = _repoFactory.BenefitServiceType())
            using (var repoBnftStat = _repoFactory.BnftStat())
            using (var repoStatus = _repoFactory.StatusType())
            {
                Bnft benefit = itemToAddOrUpdate.BnftSK != 0
                ? repository.FindOne(c => c.BnftSK == itemToAddOrUpdate.BnftSK)
                : new Bnft() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

                benefit.BnftName = itemToAddOrUpdate.BenefitName;
                benefit.BnftOrder = itemToAddOrUpdate.BnftOrder;
                benefit.BnftCode = itemToAddOrUpdate.BnftCode;
                benefit.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
                benefit.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
                benefit.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                benefit.LastModfdTs = timeStamp;

                repository.AddOrUpdate(benefit);

                if (itemToAddOrUpdate.BnftSK == 0)
                {
                    benefit.LastPblshTs = null;
                    benefit.LastSubmtdForTestingTs = null;
                    StatType statType = repoStatus.FindOne(s => s.StatDesc == PendingStatus);

                    BnftStat benefitStatus = new BnftStat()
                    {
                        BnftSK = benefit.BnftSK,
                        StatTypeSK = statType.StatTypeSK,
                        CreatedBy = itemToAddOrUpdate.CurrentUser,
                        CreatedTs = timeStamp,
                        EfctvStartDt = itemToAddOrUpdate.EfctvStartDt,
                        EfctvEndDt = itemToAddOrUpdate.EfctvEndDt,
                        LastModfdBy = itemToAddOrUpdate.CurrentUser,
                        LastModfdTs = timeStamp
                    };

                    repoBnftStat.AddOrUpdate(benefitStatus);
                }

                List<ServiceTypeVM> serviceTypes = itemToAddOrUpdate.ServiceTypes.ToList();
                SetBenefitServiceTypesGeneric(serviceTypes, benefit, repoBnftSvcType);

                repository.SaveChanges();

                //autogenerate a unique BnftCode on the backend when it is null.
                if (benefit.BnftCode == null)
                {
                    benefit.BnftCode = benefit.BnftSK.ToString();
                    repository.AddOrUpdate(benefit);
                    repository.SaveChanges();
                }

                itemToAddOrUpdate.BnftSK = benefit.BnftSK;

                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Validate BenefitDetail
        /// </summary>
        /// <param name="itemToValidate">the BenefitDetail to Validate</param>
        /// <returns>List of Messages</returns>
        public List<Message> ValidateBenefitDetail(BenefitDetailVM itemToValidate)
        {
            List<Message> result = new List<Message>();
            IQueryable<Bnft> benefits = _repoFactory.Benefit()
                .FindAll(t => t.BnftSK != itemToValidate.BnftSK && t.BnftName == itemToValidate.BenefitName);

            if (!(benefits.Count() == 0))
            {
                result.Add(new Message() { MessageText = string.Format("Benefit: ({0}) already exists.", itemToValidate.BenefitName), Fieldname = "benefit.BenefitName" });
            }

            IQueryable<Bnft> benefits2 = _repoFactory.Benefit()
                .FindAll(t => t.BnftSK != itemToValidate.BnftSK && t.BnftOrder == itemToValidate.BnftOrder);

            if (!(benefits2.Count() == 0))
            {
                result.Add(new Message() { MessageText = string.Format("Benefit Order: ({0}) already exists.", itemToValidate.BnftOrder), Fieldname = "itemToValidate.BnftOrder" });
            }

            //Pull Benefits even if the Benefit has been deleted or inactivated.  Accomplished by making Benefit the secondary table.
            BnftStat benefitStat = _repoFactory.BnftStat().FindOne(t => t.BnftSK != itemToValidate.BnftSK && t.Bnft.BnftCode == itemToValidate.BnftCode);

            if (!(benefitStat == null))
            {
                result.Add(new Message() { MessageText = string.Format("Benefit Code: ({0}) has been used previously and cannot be reused.", itemToValidate.BnftCode), Fieldname = "itemToValidate.BnftCode" });
            }

            return result;
        }


        #endregion "Public Methods"

        #region "Private Methods"

        /// <summary>
        /// Add ServiceTypes to a Benefit
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Benefit Definition</param>
        /// <param name="benefit">benefit</param>
        /// <param name="repoBnftSvcType">repoBnftSvcType</param>
        private void SetBenefitServiceTypes(BenefitDefinitionVM itemToAddOrUpdate, Bnft benefit, IBenefitServiceTypeRepository repoBnftSvcType)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            IEnumerable<BnftSvcType> bnftSvcTypes = repoBnftSvcType.FindAll(s => s.BnftSK == benefit.BnftSK).AsEnumerable();

            if (itemToAddOrUpdate.ServiceTypes.IsAny())
            {
                foreach (ServiceTypeVM serviceType in itemToAddOrUpdate.ServiceTypes)
                {
                    BnftSvcType bnftSvcType = repoBnftSvcType.FindOne(b => b.BnftSK == benefit.BnftSK && b.SvcTypeSK == serviceType.SvcTypeSK);

                    // If the Service Type already exists on the Benefit, make sure its active.
                    if (bnftSvcType != null)
                    {
                        bnftSvcType.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
                        bnftSvcType.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
                        bnftSvcType.InctvTs = null;
                        bnftSvcType.DelTs = null;
                        bnftSvcType.LastModfdBy = UtilityFunctions.GetCurrentUser(itemToAddOrUpdate.CurrentUser);
                        bnftSvcType.LastModfdTs = timeStamp;
                    }
                    // If the Service Type does not exist on the Benefit, add it.
                    else
                    {
                        bnftSvcType = new BnftSvcType()
                        {
                            BnftSK = itemToAddOrUpdate.BnftSK,
                            SvcTypeSK = serviceType.SvcTypeSK,
                            BnftPlanBnftSK = null,
                            EfctvStartDt = itemToAddOrUpdate.EfctvStartDt,
                            EfctvEndDt = itemToAddOrUpdate.EfctvEndDt,
                            CreatedBy = UtilityFunctions.GetCurrentUser(itemToAddOrUpdate.CurrentUser),
                            CreatedTs = timeStamp,
                            LastModfdBy = UtilityFunctions.GetCurrentUser(itemToAddOrUpdate.CurrentUser),
                            LastModfdTs = timeStamp
                        };
                    }

                    repoBnftSvcType.AddOrUpdate(bnftSvcType);
                }
            }

            // If Service Types previously existed on the Benefit and no longer do, delete it.

            if (bnftSvcTypes.IsAny())
            {
                if (itemToAddOrUpdate.ServiceTypes.IsAny())
                {
                    foreach (BnftSvcType bnftSvctype in bnftSvcTypes)
                    {
                        if (!itemToAddOrUpdate.ServiceTypes.Exists(x => x.SvcTypeSK == bnftSvctype.SvcTypeSK))
                        {
                            bnftSvctype.DelTs = timeStamp;
                            bnftSvctype.LastModfdBy = UtilityFunctions.GetCurrentUser(itemToAddOrUpdate.CurrentUser);
                            bnftSvctype.LastModfdTs = timeStamp;
                            repoBnftSvcType.AddOrUpdate(bnftSvctype);
                        }
                    }
                }
                else
                {
                    foreach (BnftSvcType bnftSvctype in bnftSvcTypes)
                    {
                        bnftSvctype.DelTs = timeStamp;
                        bnftSvctype.LastModfdBy = UtilityFunctions.GetCurrentUser(itemToAddOrUpdate.CurrentUser);
                        bnftSvctype.LastModfdTs = timeStamp;
                        repoBnftSvcType.AddOrUpdate(bnftSvctype);
                    }
                }
            }

        }

        /// <summary>
        /// Add ServiceTypes to a Benefit
        /// </summary>
        /// <param name="serviceTypes">list of ServiceTypeVM</param>
        /// <param name="benefit">benefit</param>
        /// <param name="repoBnftSvcType">repoBnftSvcType</param>
        private void SetBenefitServiceTypesGeneric(List<ServiceTypeVM> serviceTypes, Bnft benefit, IBenefitServiceTypeRepository repoBnftSvcType)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();
            string CurrentUser = benefit.LastModfdBy;

            IEnumerable<BnftSvcType> bnftSvcTypes = repoBnftSvcType.FindAll(s => s.BnftSK == benefit.BnftSK).AsEnumerable();

            if (serviceTypes.IsAny())
            {
                foreach (ServiceTypeVM serviceType in serviceTypes)
                {
                    BnftSvcType bnftSvcType = repoBnftSvcType.FindOne(b => b.BnftSK == benefit.BnftSK && b.SvcTypeSK == serviceType.SvcTypeSK);

                    // If the Service Type already exists on the Benefit, make sure its active.
                    if (bnftSvcType != null)
                    {
                        bnftSvcType.EfctvStartDt = benefit.EfctvStartDt;
                        bnftSvcType.EfctvEndDt = benefit.EfctvEndDt;
                        bnftSvcType.InctvTs = null;
                        bnftSvcType.DelTs = null;
                        bnftSvcType.LastModfdBy = UtilityFunctions.GetCurrentUser(CurrentUser);
                        bnftSvcType.LastModfdTs = timeStamp;
                    }
                    // If the Service Type does not exist on the Benefit, add it.
                    else
                    {
                        bnftSvcType = new BnftSvcType()
                        {
                            BnftSK = benefit.BnftSK,
                            SvcTypeSK = serviceType.SvcTypeSK,
                            BnftPlanBnftSK = null,
                            EfctvStartDt = benefit.EfctvStartDt,
                            EfctvEndDt = benefit.EfctvEndDt,
                            CreatedBy = UtilityFunctions.GetCurrentUser(CurrentUser),
                            CreatedTs = timeStamp,
                            LastModfdBy = UtilityFunctions.GetCurrentUser(CurrentUser),
                            LastModfdTs = timeStamp
                        };
                    }

                    repoBnftSvcType.AddOrUpdate(bnftSvcType);
                }
            }

            // If Service Types previously existed on the Benefit and no longer do, delete it.

            if (bnftSvcTypes.IsAny())
            {
                if (serviceTypes.IsAny())
                {
                    foreach (BnftSvcType bnftSvctype in bnftSvcTypes)
                    {
                        if (!serviceTypes.Exists(x => x.SvcTypeSK == bnftSvctype.SvcTypeSK))
                        {
                            bnftSvctype.DelTs = timeStamp;
                            bnftSvctype.LastModfdBy = UtilityFunctions.GetCurrentUser(CurrentUser);
                            bnftSvctype.LastModfdTs = timeStamp;
                            repoBnftSvcType.AddOrUpdate(bnftSvctype);
                        }
                    }
                }
                else
                {
                    foreach (BnftSvcType bnftSvctype in bnftSvcTypes)
                    {
                        bnftSvctype.DelTs = timeStamp;
                        bnftSvctype.LastModfdBy = UtilityFunctions.GetCurrentUser(CurrentUser);
                        bnftSvctype.LastModfdTs = timeStamp;
                        repoBnftSvcType.AddOrUpdate(bnftSvctype);
                    }
                }
            }

        }

        /// <summary>
        /// Set Benefit Criteria Sets
        /// </summary>
        /// <param name="itemToAddOrUpdate">List of RuleSetVM</param>
        /// <param name="bnft">bnft</param>
        /// <param name="repoBnftCrtriaSet">repoBnftCrtriaSet</param>
        /// <param name="repoCrtriaSet">repoCrtriaSet</param>
        /// <param name="repoCrtriaDtl">repoCrtriaDtl</param>
        /// <returns>Rule Sets</returns>
        private List<RuleSetVM> SetBenefitCriteriaSets(List<RuleSetVM> itemToAddOrUpdate, Bnft bnft, IBenefitCriteriaSetRepository repoBnftCrtriaSet, ICriteriaSetRepository repoCrtriaSet, ICriteriaDetailRepository repoCrtriaDtl)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            foreach (RuleSetVM ruleSet in itemToAddOrUpdate)
            {
                CrtriaSet crtriaSet = ruleSet.CrtriaSetSK != 0
                ? repoCrtriaSet.FindOne(c => c.CrtriaSetSK == ruleSet.CrtriaSetSK)
                : new CrtriaSet() { CreatedBy = ruleSet.CurrentUser, CreatedTs = timeStamp };

                crtriaSet.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                crtriaSet.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                crtriaSet.LastModfdBy = UtilityFunctions.GetCurrentUser(ruleSet.CurrentUser);
                crtriaSet.LastModfdTs = timeStamp;

                BnftCrtriaSet benefitCriteriaSet = ruleSet.BnftCrtriaSetSK != 0
                ? repoBnftCrtriaSet.FindOne(c => c.BnftCrtriaSetSK == ruleSet.BnftCrtriaSetSK)
                : new BnftCrtriaSet() { CreatedBy = ruleSet.CurrentUser, CreatedTs = timeStamp };

                benefitCriteriaSet.BnftSK = bnft.BnftSK;
                benefitCriteriaSet.CrtriaSetSK = crtriaSet.CrtriaSetSK;
                benefitCriteriaSet.CrtriaOperTypeSK = (long?)CriteriaOperatorType.Or;
                benefitCriteriaSet.CrtriaSetName = ruleSet.CriteriaSetName;
                benefitCriteriaSet.CrtriaSetPrity = ruleSet.CrtriaSetPrity;
                benefitCriteriaSet.EfctvStartDt = ruleSet.EfctvStartDt;
                benefitCriteriaSet.EfctvEndDt = ruleSet.EfctvEndDt;
                benefitCriteriaSet.LastModfdBy = UtilityFunctions.GetCurrentUser(ruleSet.CurrentUser);
                benefitCriteriaSet.LastModfdTs = timeStamp;

                if (ruleSet.Deleted)
                {
                    benefitCriteriaSet.DelTs = timeStamp;
                }

                //  Adding Navigation Properties
                benefitCriteriaSet.CrtriaSet = crtriaSet;

                repoBnftCrtriaSet.AddOrUpdate(benefitCriteriaSet);

                if (ruleSet.CriteriaDetails.IsAny())
                {
                    foreach (CriteriaDetailVM criteriaDetail in ruleSet.CriteriaDetails)
                    {
                        CrtriaDtl crtriaDtl = criteriaDetail.CrtriaDtlSK != 0
                        ? repoCrtriaDtl.FindOne(c => c.CrtriaDtlSK == criteriaDetail.CrtriaDtlSK)
                        : new CrtriaDtl() { CreatedBy = ruleSet.CurrentUser, CreatedTs = timeStamp };

                        crtriaDtl.CrtriaSetSK = crtriaSet.CrtriaSetSK;
                        crtriaDtl.CrtriaOperTypeSK = (int)CriteriaOperatorType.And;
                        crtriaDtl.CrtriaCondTypeSK = criteriaDetail.CrtriaCondTypeSK;
                        crtriaDtl.ValQulfrTypeSK = criteriaDetail.ValQulfrTypeSK;
                        crtriaDtl.CrtriaPrity = criteriaDetail.CrtriaPrity;
                        crtriaDtl.CrtriaVal = criteriaDetail.CrtriaVal;
                        crtriaDtl.CrtriaDtlDesc = string.Empty;
                        crtriaDtl.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                        crtriaDtl.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                        crtriaDtl.LastModfdBy = criteriaDetail.CurrentUser;
                        crtriaDtl.LastModfdTs = timeStamp;

                        if (criteriaDetail.Deleted)
                        {
                            crtriaDtl.DelTs = UtilityFunctions.GetTimeStamp();
                        }

                        //  Adding Navigation Properties
                        crtriaDtl.CrtriaSet = crtriaSet;
                        crtriaSet.CrtriaDtl.Add(crtriaDtl);

                        repoCrtriaDtl.AddOrUpdate(crtriaDtl);
                    }
                }
                repoCrtriaSet.AddOrUpdate(crtriaSet);
            }

            return itemToAddOrUpdate;
        }

        /// <summary>
        /// Get all Benefits by Search Text
        /// </summary>
        /// <param name="bnfts">The BNFTS.</param>
        /// <returns>List of Benefits and Service Types</returns>
        private List<BenefitServiceTypeVM> GetAllBenefitServiceTypes(IQueryable<Bnft> bnfts)
        {
            List<BenefitServiceTypeVM> benefitServiceTypes = new List<BenefitServiceTypeVM>();
            IQueryable<BnftSvcType> bnftSvcTypes = _repoFactory.BenefitServiceType().FindAll().AsQueryable();

            var query = from mstr in bnfts
                        join dtl in bnftSvcTypes on mstr.BnftSK equals dtl.BnftSK into p
                        from rslt in p.DefaultIfEmpty()
                        select new { mstr, rslt };

            benefitServiceTypes = query
                .Select(bp => new BenefitServiceTypeVM
                {
                    BnftSK = bp.mstr.BnftSK,
                    BenefitName = bp.mstr.BnftName,
                    SvcTypeSK = bp.rslt != null ? bp.rslt.SvcTypeSK : 0,
                    ServiceTypeName = bp.rslt != null ? bp.rslt.SvcType.SvcTypeCode : null,
                    BnftSvcTypeSK = bp.rslt != null ? bp.rslt.BnftSvcTypeSK : 0,
                    BnftPlanBnftSK = 0
                }).ToList();

            return benefitServiceTypes;
        }

        /// <summary>
        /// Get Benefit Definition
        /// </summary>
        /// <param name="benefitSK">benefit SK</param>
        /// <returns>Benefit Definition</returns>
        private BenefitDefinitionVM GetABenefitDefinition(long benefitSK)
        {
            using (var repoBenefit = _repoFactory.Benefit())
            using (var repoBenServType = _repoFactory.BenefitServiceType())
            using (var repoBnftCrtriaSet = _repoFactory.BnftCrtriaSet())
            using (var repoBnftStat = _repoFactory.BnftStat())
            using (var repoStatus = _repoFactory.StatusType())
            {
                Bnft result = repoBenefit.FindOne(s => s.BnftSK == benefitSK);
                BnftStat bnftStat = repoBnftStat.FindAll(s => s.BnftSK == result.BnftSK).OrderByDescending(o => o.CreatedTs).FirstOrDefault();

                DateTime? lastPublish = new DateTime?();
                DateTime? lastSubmtdForTesting = new DateTime?();

                if (result.LastPblshTs != null)
                {
                    lastPublish = result.LastPblshTs.Value.DateTime;
                }

                if (result.LastSubmtdForTestingTs != null)
                {
                    lastSubmtdForTesting = result.LastSubmtdForTestingTs.Value.DateTime;
                }

                StatType statType = new StatType();
                string statDesc = null;

                if (bnftStat != null)
                {
                    statType = repoStatus.FindOne(s => s.StatTypeSK == bnftStat.StatTypeSK);
                    statDesc = statType.StatDesc;
                }
                

                List<ServiceTypeVM> svcTypes = repoBenServType.FindAll(s => s.BnftSK == benefitSK)
                    .Select(s => new ServiceTypeVM()
                    {
                        SvcTypeSK = s.SvcTypeSK,
                        ServiceTypeName = s.SvcType.SvcTypeCode
                    }
                    ).ToList();

                BnftCrtriaSet bnftCrtriaSet = repoBnftCrtriaSet.FindOne(s => s.BnftSK == benefitSK);

                List<RuleSetVM> ruleSets = new List<RuleSetVM>();

                if (bnftCrtriaSet != null)
                {
                    ruleSets = _criteriaGroupBLL.GetAllRuleSets(CriteriaSetType.BenefitDefinition, benefitSK);
                }

                BenefitDefinitionVM benefitDefinitionVM = new BenefitDefinitionVM()
                {
                    BnftSK = result.BnftSK,
                    BenefitName = result.BnftName,
                    EfctvStartDt = result.EfctvStartDt,
                    EfctvEndDt = result.EfctvEndDt,
                    BnftOrder = result.BnftOrder,
                    LastPblshTs = lastPublish,
                    LastSubmtdForTestingTs = lastSubmtdForTesting,
                    StatDesc = statDesc,
                    ServiceTypes = svcTypes,
                    RuleSets = ruleSets
                };

                return benefitDefinitionVM;
            }
        }

        /// <summary>
        /// Get Benefit Detail
        /// </summary>
        /// <param name="benefitSK">benefit SK</param>
        /// <returns>Benefit Detail</returns>
        private BenefitDetailVM GetABenefitDetail(long benefitSK)
        {
            using (var repoBenefit = _repoFactory.Benefit())
            using (var repoBenServType = _repoFactory.BenefitServiceType())
            using (var repoBnftStat = _repoFactory.BnftStat())
            using (var repoStatus = _repoFactory.StatusType())
            {
                Bnft result = repoBenefit.FindOne(s => s.BnftSK == benefitSK);
                BnftStat bnftStat = repoBnftStat.FindAll(s => s.BnftSK == result.BnftSK).OrderByDescending(o => o.CreatedTs).FirstOrDefault();

                DateTime? lastPublish = new DateTime?();
                DateTime? lastSubmtdForTesting = new DateTime?();

                if (result.LastPblshTs != null)
                {
                    lastPublish = UtilityBll.dateUTCToDate(result.LastPblshTs.Value).DateTime;
                }

                if (result.LastSubmtdForTestingTs != null)
                {
                    lastSubmtdForTesting = UtilityBll.dateUTCToDate(result.LastSubmtdForTestingTs.Value).DateTime;
                }

                StatType statType = new StatType();
                string statDesc = null;

                if (bnftStat != null)
                {
                    statType = repoStatus.FindOne(s => s.StatTypeSK == bnftStat.StatTypeSK);
                    statDesc = statType.StatDesc;
                }

                List<ServiceTypeVM> svcTypes = repoBenServType.FindAll(s => s.BnftSK == benefitSK)
                    .Select(s => new ServiceTypeVM()
                    {
                        SvcTypeSK = s.SvcTypeSK,
                        ServiceTypeName = s.SvcType.SvcTypeCode
                    }
                    ).ToList();

                BenefitDetailVM benefitDetailVM = new BenefitDetailVM()
                {
                    BnftSK = result.BnftSK,
                    BenefitName = result.BnftName,
                    EfctvStartDt = result.EfctvStartDt,
                    EfctvEndDt = result.EfctvEndDt,
                    BnftOrder = result.BnftOrder,
                    BnftCode = result.BnftCode,
                    LastPblshTs = lastPublish,
                    LastSubmtdForTestingTs = lastSubmtdForTesting,
                    StatDesc = statDesc,
                    ServiceTypes = svcTypes
                };

                return benefitDetailVM;
            }
        }

        #endregion "Private Methods"

        #endregion "Benefits"
    }
}