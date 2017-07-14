using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.BLL.Utility;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.BLL.Utility;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Atlas.BenefitPlan.BLL
{
    /// <summary>
    /// The Entity BLL for Benefit Plan
    /// </summary>
    /// <seealso cref="Atlas.BenefitPlan.BLL.Interfaces.IEntityBLL" />
    public class EntityBLL : IEntityBLL
    {
        /// <summary>
        /// the Benefit Plan Repository Factory
        /// </summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>
        /// The Constructor for the Entity BLL for Benefit Plan
        /// </summary>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        public EntityBLL(IBenefitPlanRepositoryFactory repoFactory)
        {
            _repoFactory = repoFactory;
        }

        #region " Tenant Hierarchy "

        /// <summary>
        /// Get the entity hierarchy by TenantFamilyId
        /// </summary>
        /// <param name="tenantFamSK">the id for the root tenant family</param>
        /// <returns>a Hierarchy Tree Node with all children for the family</returns>
        public HierarchyTreeNode GetTenantHierarchyForTenantFamily(long tenantFamSK)
        {
            HierarchyTreeNode nodeTenantFamily = new HierarchyTreeNode();

            //load Tenant Family
            using (var repoTenantFamily = _repoFactory.TenantFamily())
            using (var repoTenant = _repoFactory.Tenant())
            using (var repoAcct = _repoFactory.Account())
            using (var repoGrp = _repoFactory.Group())
            using (var repoPopGrp = _repoFactory.PopulationGroup())
            {
                TenantFam tenantFam = repoTenantFamily.FindOne(c => c.TenantFamSK == tenantFamSK);
                nodeTenantFamily = UtilityBll.loadHierarchyNode(tenantFam.TenantFamSK, TenantFamilyHierarchy.TenantFamily, tenantFam.TenantFamName, tenantFam.EfctvStartDt, tenantFam.EfctvEndDt, tenantFam.InctvTs);

                List<Tenant> tenantList = repoTenant.FindAll(c => c.TenantFamSK == tenantFamSK).ToList();
                foreach (Tenant tenant in tenantList)
                {
                    //load tenants
                    HierarchyTreeNode nodeTenant = UtilityBll.loadHierarchyNode(tenant.TenantSK, TenantFamilyHierarchy.Tenant, tenant.TenantName, tenant.EfctvStartDt, tenant.EfctvEndDt, tenant.InctvTs);
                    List<Acct> acctList = repoAcct.FindAll(c => c.TenantSK == tenant.TenantSK).ToList();
                    foreach (Acct acct in acctList)
                    {
                        //load account
                        HierarchyTreeNode nodeAcct = UtilityBll.loadHierarchyNode(acct.AcctSK, TenantFamilyHierarchy.Account, acct.AcctName, acct.EfctvStartDt, acct.EfctvEndDt, acct.InctvTs);
                        List<Grp> grpList = repoGrp.FindAll(c => c.AcctSK == acct.AcctSK).ToList();
                        foreach (Grp grp in grpList)
                        {
                            //load groups
                            HierarchyTreeNode nodeGrp = UtilityBll.loadHierarchyNode(grp.GrpSK, TenantFamilyHierarchy.Group, grp.GrpName, grp.EfctvStartDt, grp.EfctvEndDt, grp.InctvTs);
                            List<PopGrp> popGrpList = repoPopGrp.FindAll(c => c.GrpSK == grp.GrpSK).ToList();
                            foreach (PopGrp popGrp in popGrpList)
                            {
                                //load population groups
                                HierarchyTreeNode nodePopGrp = UtilityBll.loadHierarchyNode(popGrp.PopGrpSK, TenantFamilyHierarchy.PopulationGroup, popGrp.PopGrpName, popGrp.EfctvStartDt, popGrp.EfctvEndDt, popGrp.InctvTs);
                                nodeGrp.ChildrenNodes.Add(nodePopGrp);
                            }
                            nodeAcct.ChildrenNodes.Add(nodeGrp);
                        }
                        nodeTenant.ChildrenNodes.Add(nodeAcct);
                    }
                    nodeTenantFamily.ChildrenNodes.Add(nodeTenant);
                }
            }
            TenantHierarchyVM tenantHierarchyVM = new TenantHierarchyVM();
            tenantHierarchyVM.HierarchyTreeNode = nodeTenantFamily;
            tenantHierarchyVM.TenantFamilySK = tenantFamSK;
            return nodeTenantFamily;
        }

        /// <summary>
        /// Get all entity hierarchy by PBPSK
        /// </summary>
        /// <param name="rootSK">the id of the package</param>
        /// <param name="forBenefitPlan">is it for benefit plan or PBP</param>
        /// <returns>a Hierarchy Tree Node with all children for the family</returns>
        public List<HierarchyTreeNode> GetTenantHierarchyForBPOrPBPSK(long rootSK, bool forBenefitPlan)
        {
            List<HierarchyTreeNode> hierarchyTreeNodes = new List<HierarchyTreeNode>();

            //GetAccount PBP and then load associated hierarchy
            using (IAtlasBenefitPlanStoredProcsRepository repoTenantFamily = _repoFactory.AtlasBenefitPlanStoredProcs())
            {
                List<TenantHierarchySearch_Result> result;
                if (forBenefitPlan )
                { 
                    result = repoTenantFamily.GetTenantHierarchyAdvancedSearch(TenantSearchType.BnftPlanSK.ToString(), rootSK.ToString()).ToList<TenantHierarchySearch_Result>();
                }
                else
                {
                    result = repoTenantFamily.GetTenantHierarchyAdvancedSearch(TenantSearchType.PBPSK.ToString(), rootSK.ToString()).ToList<TenantHierarchySearch_Result>();
                }

                foreach (TenantHierarchySearch_Result item in result)
                {
                    //Find the tenant family. If there move on else add
                    HierarchyTreeNode tenantFamily = hierarchyTreeNodes.FirstOrDefault<HierarchyTreeNode>(htn => htn.EntitySK == item.TenantFamSK);
                    if (tenantFamily == null)
                    {
                        HierarchyTreeNode nodeTenantFamily = UtilityBll.loadHierarchyNode(item.TenantFamSK, TenantFamilyHierarchy.TenantFamily, item.TenantFamName, DateTime.MinValue, DateTime.MaxValue, null);
                        hierarchyTreeNodes.Add(nodeTenantFamily);
                        tenantFamily = hierarchyTreeNodes.FirstOrDefault<HierarchyTreeNode>(htn => htn.EntitySK == item.TenantFamSK);
                    }
                    //else do nothing because this TF has been added

                    //Find the tenant. If there move on else add
                    HierarchyTreeNode tenant = tenantFamily.ChildrenNodes.FirstOrDefault<HierarchyTreeNode>(htn => htn.EntitySK == item.TenantSK);
                    if (tenant == null)
                    {
                        HierarchyTreeNode nodeTenant = UtilityBll.loadHierarchyNode(item.TenantSK.Value, TenantFamilyHierarchy.Tenant, item.TenantName, DateTime.MinValue, DateTime.MaxValue, null);
                        tenantFamily.ChildrenNodes.Add(nodeTenant);
                        tenant = tenantFamily.ChildrenNodes.FirstOrDefault<HierarchyTreeNode>(htn => htn.EntitySK == item.TenantSK);
                    }
                    //else do nothing because this tenant has been added

                    //Find the acct. If there move on else add
                    HierarchyTreeNode acct = tenant.ChildrenNodes.FirstOrDefault<HierarchyTreeNode>(htn => htn.EntitySK == item.AcctSK);
                    if (acct == null)
                    {
                        HierarchyTreeNode nodeAcct = UtilityBll.loadHierarchyNode(item.AcctSK.Value, TenantFamilyHierarchy.Account, item.AcctName, DateTime.MinValue, DateTime.MaxValue, null);
                        tenant.ChildrenNodes.Add(nodeAcct);
                        acct = tenant.ChildrenNodes.FirstOrDefault<HierarchyTreeNode>(htn => htn.EntitySK == item.AcctSK);
                    }
                    //else do nothing because this account has been added

                    //Find the grp. If there move on else add
                    HierarchyTreeNode grp = acct.ChildrenNodes.FirstOrDefault<HierarchyTreeNode>(htn => htn.EntitySK == item.GrpSK);
                    if (grp == null)
                    {
                        HierarchyTreeNode nodeGrp = UtilityBll.loadHierarchyNode(item.GrpSK.Value, TenantFamilyHierarchy.Group, item.GrpName, DateTime.MinValue, DateTime.MaxValue, null);
                        acct.ChildrenNodes.Add(nodeGrp);
                        grp = acct.ChildrenNodes.FirstOrDefault<HierarchyTreeNode>(htn => htn.EntitySK == item.GrpSK);
                    }
                    //else do nothing because this Group has been added

                    HierarchyTreeNode popGrp = grp.ChildrenNodes.FirstOrDefault<HierarchyTreeNode>(htn => htn.EntitySK == item.PopGrpSK);
                    if (popGrp == null)
                    {
                        HierarchyTreeNode nodePopGrp = UtilityBll.loadHierarchyNode(item.PopGrpSK.Value, TenantFamilyHierarchy.PopulationGroup, item.PopGrpName, DateTime.MinValue, DateTime.MaxValue, null);
                        grp.ChildrenNodes.Add(nodePopGrp);
                        popGrp = grp.ChildrenNodes.FirstOrDefault<HierarchyTreeNode>(htn => htn.EntitySK == item.PopGrpSK);
                    }
                    //else do nothing because this Pop Group has been added
                }
            }
            return hierarchyTreeNodes;
        }

        /// <summary>
        /// Get Hierarchy Detail Information for an Entity
        /// </summary>
        /// <param name="entityHierarchyType">the Entity Type</param>
        /// <param name="entitySK">the Entity Key</param>
        /// <returns>a Hierarchy Node Detail</returns>
        public HierarchyNodeDetail GetHierarchyDetailInformation(TenantFamilyHierarchy entityHierarchyType, long entitySK)
        {
            switch (entityHierarchyType)
            {
                case TenantFamilyHierarchy.TenantFamily:
                    return _repoFactory.TenantFamily().FindAll(c => c.TenantFamSK == entitySK)
                    .Select(w => new HierarchyNodeDetail()
                    {
                        TenantFamSK = w.TenantFamSK,
                        TenantFamName = w.TenantFamName,
                        TenantSK = 0,
                        TenantName = string.Empty,
                        AcctSK = 0,
                        AcctName = string.Empty,
                        GrpSK = 0,
                        GrpName = string.Empty,
                        PopGrpSK = 0,
                        PopGrpName = string.Empty
                    }).FirstOrDefault();

                case TenantFamilyHierarchy.Tenant:
                    return _repoFactory.Tenant().FindAll(c => c.TenantSK == entitySK)
                      .Select(w => new HierarchyNodeDetail()
                      {
                          TenantFamSK = w.TenantFam.TenantFamSK,
                          TenantFamName = w.TenantFam.TenantFamName,
                          TenantSK = w.TenantSK,
                          TenantName = w.TenantName,
                          AcctSK = 0,
                          AcctName = string.Empty,
                          GrpSK = 0,
                          GrpName = string.Empty,
                          PopGrpSK = 0,
                          PopGrpName = string.Empty
                      }).FirstOrDefault();

                case TenantFamilyHierarchy.Account:
                    return _repoFactory.Account().FindAll(c => c.AcctSK == entitySK)
                        .Select(w => new HierarchyNodeDetail()
                        {
                            TenantFamSK = w.Tenant.TenantFam.TenantFamSK,
                            TenantFamName = w.Tenant.TenantFam.TenantFamName,
                            TenantSK = w.Tenant.TenantSK,
                            TenantName = w.Tenant.TenantName,
                            AcctSK = w.AcctSK,
                            AcctName = w.AcctName,
                            GrpSK = 0,
                            GrpName = string.Empty,
                            PopGrpSK = 0,
                            PopGrpName = string.Empty
                        }).FirstOrDefault();

                case TenantFamilyHierarchy.Group:
                    return _repoFactory.Group().FindAll(c => c.GrpSK == entitySK)
                        .Select(w => new HierarchyNodeDetail()
                        {
                            TenantFamSK = w.Acct.Tenant.TenantFam.TenantFamSK,
                            TenantFamName = w.Acct.Tenant.TenantFam.TenantFamName,
                            TenantSK = w.Acct.Tenant.TenantSK,
                            TenantName = w.Acct.Tenant.TenantName,
                            AcctSK = w.Acct.AcctSK,
                            AcctName = w.Acct.AcctName,
                            GrpSK = w.GrpSK,
                            GrpName = w.GrpName,
                            PopGrpSK = 0,
                            PopGrpName = string.Empty
                        }).FirstOrDefault();

                case TenantFamilyHierarchy.PopulationGroup:
                    return _repoFactory.PopulationGroup().FindAll(c => c.PopGrpSK == entitySK)
                        .Select(w => new HierarchyNodeDetail()
                        {
                            TenantFamSK = w.Grp.Acct.Tenant.TenantFam.TenantFamSK,
                            TenantFamName = w.Grp.Acct.Tenant.TenantFam.TenantFamName,
                            TenantSK = w.Grp.Acct.Tenant.TenantSK,
                            TenantName = w.Grp.Acct.Tenant.TenantName,
                            AcctSK = w.Grp.Acct.AcctSK,
                            AcctName = w.Grp.Acct.AcctName,
                            GrpSK = w.Grp.GrpSK,
                            GrpName = w.Grp.GrpName,
                            PopGrpSK = w.PopGrpSK,
                            PopGrpName = w.PopGrpName
                        }).FirstOrDefault();

                default:
                    break;
            }

            return new HierarchyNodeDetail();
        }

        #endregion " Tenant Hierarchy "

        #region " Tenant Family #

        /// <summary>
        /// Get Tenant Family View Model by Tenant Family ID
        /// </summary>
        /// <param name="tenantFamSK">the Tenant Family ID</param>
        /// <returns>Tenant Family View Model</returns>
        public TenantFamilyVM GetTenantFamily(long tenantFamSK)
        {
            using (var repository = _repoFactory.TenantFamily())
            {
                TenantFam result = repository.FindOne(s => s.TenantFamSK == tenantFamSK);
                return new TenantFamilyVM()
                {
                    TenantFamSK = result.TenantFamSK,
                    TenantFamName = result.TenantFamName,
                    EfctvStartDt = result.EfctvStartDt,
                    EfctvEndDt = result.EfctvEndDt
                };
            }
        }

        /// <summary>
        /// Add or Update a Tenant Family
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Tenant Family Entry to Add or Update</param>
        /// <returns>TenantFamilyVM.</returns>
        public TenantFamilyVM SetTenantFamily(TenantFamilyVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            using (var repository = _repoFactory.TenantFamily())
            {
                TenantFam tenantFamily = itemToAddOrUpdate.TenantFamSK != 0
                    ? repository.FindOne(c => c.TenantFamSK == itemToAddOrUpdate.TenantFamSK)
                    : new TenantFam() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

                tenantFamily.TenantFamName = itemToAddOrUpdate.TenantFamName;
                tenantFamily.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
                tenantFamily.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
                tenantFamily.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                tenantFamily.LastModfdTs = timeStamp;

                repository.AddOrUpdate(tenantFamily);
                repository.SaveChanges();

                itemToAddOrUpdate.TenantFamSK = tenantFamily.TenantFamSK;
                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Validate a Tenant Family Name
        /// </summary>
        /// <param name="itemToValidate">the Tenant Family Entry to Validate</param>
        /// <returns>List&lt;Message&gt;.</returns>
        public List<Message> ValidateTenantFamily(TenantFamilyVM itemToValidate)
        {
            List<Message> result = new List<Message>();
            IQueryable<TenantFam> tenantFamilys =
                _repoFactory.TenantFamily().FindAll(t => t.TenantFamSK != itemToValidate.TenantFamSK && t.TenantFamName == itemToValidate.TenantFamName);

            if (!(tenantFamilys.Count() == 0))
            {
                result.Add(new Message() { MessageText = string.Format("Tenant Family: ({0}) already exists.", itemToValidate.TenantFamName), Fieldname = "tenantFamily.TenantFamName" });
            }

            return result;
        }

        #endregion " Tenant Family #

        #region " Tenant #

        /// <summary>
        /// Get Tenant View Model by Tenant ID
        /// </summary>
        /// <param name="tenantSK">the Tenant ID</param>
        /// <returns>Tenant View Model</returns>
        public TenantVM GetTenant(long tenantSK)
        {
            using (var repository = _repoFactory.Tenant())
            using (var spRepository = _repoFactory.AtlasBenefitPlanStoredProcs())
            {
                Tenant result = repository.FindOne(s => s.TenantSK == tenantSK);
                List<TenantIndustryIdentifierVM> tenantIdentifiers = spRepository.GetTenantIndustryIdentifier(tenantSK)
                    .Select(s => new TenantIndustryIdentifierVM()
                    {
                        IndustryIdentifier = (TenantIndustryIdentifier)System.Enum.Parse(typeof(TenantIndustryIdentifier), s.TenantIndustryIdentifier),
                        TenantTypeKey = s.TenantTypeKey,
                        ValueID = s.ValueID,
                        Type = s.Type,
                        Value = s.Value,
                        Description = s.Description,
                        EfctvStartDt = s.EfctvStartDt,
                        EfctvEndDt = s.EfctvEndDt,
                        Deleted = false
                    }
                ).ToList();

                return new TenantVM()
                {
                    TenantSK = result.TenantSK,
                    TenantFamSK = result.TenantFamSK,
                    TenantName = result.TenantName,
                    EfctvStartDt = result.EfctvStartDt,
                    EfctvEndDt = result.EfctvEndDt,
                    TenantIndustryIdentifiers = tenantIdentifiers.AsEnumerable()
                };
            }
        }

        /// <summary>
        /// Set RXBIN
        /// </summary>
        /// <param name="repoRXBIN">The repo rxbin.</param>
        /// <param name="industryIdentifier">The RXBIN</param>
        /// <returns>The RXBIN Record that is entered</returns>
        private RXBIN SetRXBIN(IRXBINRepository repoRXBIN, TenantIndustryIdentifierVM industryIdentifier)
        {
            RXBIN rxBIN = repoRXBIN.FindOne(c => c.RXBIN1 == industryIdentifier.Value);
            if (rxBIN == null)
            {
                DateTime timestamp = UtilityFunctions.GetTimeStamp();

                rxBIN = new RXBIN()
                {
                    RXBIN1 = industryIdentifier.Value,
                    RXBINDesc = industryIdentifier.Description,
                    EfctvStartDt = UtilityFunctions.GetEffectiveStartDate(),
                    EfctvEndDt = UtilityFunctions.GetEffectiveEndDate(),
                    CreatedBy = UtilityFunctions.GetCurrentUser(industryIdentifier.CurrentUser),
                    CreatedTs = timestamp,
                    LastModfdBy = UtilityFunctions.GetCurrentUser(industryIdentifier.CurrentUser),
                    LastModfdTs = timestamp
                };
                repoRXBIN.AddOrUpdate(rxBIN);
            }

            industryIdentifier.ValueID = rxBIN.RXBINSK;
            return rxBIN;
        }

        /// <summary>
        /// Set PCN
        /// </summary>
        /// <param name="repoPCN">The repo PCN.</param>
        /// <param name="industryIdentifier">The PCN</param>
        /// <returns>The PCN Record that is entered</returns>
        private PCN SetPCN(IPCNRepository repoPCN, TenantIndustryIdentifierVM industryIdentifier)
        {
            PCN pcn = repoPCN.FindOne(c => c.PCN1 == industryIdentifier.Value);
            if (pcn == null)
            {
                DateTime timestamp = UtilityFunctions.GetTimeStamp();

                pcn = new PCN()
                {
                    PCN1 = industryIdentifier.Value,
                    PCNDesc = industryIdentifier.Description,
                    EfctvStartDt = UtilityFunctions.GetEffectiveStartDate(),
                    EfctvEndDt = UtilityFunctions.GetEffectiveEndDate(),
                    CreatedBy = UtilityFunctions.GetCurrentUser(industryIdentifier.CurrentUser),
                    CreatedTs = timestamp,
                    LastModfdBy = UtilityFunctions.GetCurrentUser(industryIdentifier.CurrentUser),
                    LastModfdTs = timestamp
                };
                repoPCN.AddOrUpdate(pcn);
            }

            industryIdentifier.ValueID = pcn.PCNSK;
            return pcn;
        }

        /// <summary>
        /// Set PayerID
        /// </summary>
        /// <param name="repoPayerID">The repo payer identifier.</param>
        /// <param name="industryIdentifier">The PayerID</param>
        /// <returns>The PayerID Record that is entered</returns>
        private PayerID SetPayerID(IPayerIdRepository repoPayerID, TenantIndustryIdentifierVM industryIdentifier)
        {
            PayerID payerID = repoPayerID.FindOne(c => c.PayerID1 == industryIdentifier.Value);
            if (payerID == null)
            {
                DateTime timestamp = UtilityFunctions.GetTimeStamp();

                payerID = new PayerID()
                {
                    PayerID1 = industryIdentifier.Value,
                    PayerIDDesc = industryIdentifier.Description,
                    EfctvStartDt = UtilityFunctions.GetEffectiveStartDate(),
                    EfctvEndDt = UtilityFunctions.GetEffectiveEndDate(),
                    CreatedBy = UtilityFunctions.GetCurrentUser(industryIdentifier.CurrentUser),
                    CreatedTs = timestamp,
                    LastModfdBy = UtilityFunctions.GetCurrentUser(industryIdentifier.CurrentUser),
                    LastModfdTs = timestamp
                };
                repoPayerID.AddOrUpdate(payerID);
            }

            industryIdentifier.ValueID = payerID.PayerIDSK;
            return payerID;
        }

        /// <summary>
        /// Add Tenant Industry identifiers to Tenant
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Tenant</param>
        /// <param name="tenant">The tenant.</param>
        /// <param name="repoRXBIN">The repo rxbin.</param>
        /// <param name="repoPCN">The repo PCN.</param>
        /// <param name="repoPayerID">The repo payer identifier.</param>
        /// <param name="repoTenRXBIN">The repo ten rxbin.</param>
        /// <param name="repoTenPCN">The repo ten PCN.</param>
        /// <param name="repoTenPayID">The repo ten pay identifier.</param>
        private void SetTenantIndustryIdentifiers(TenantVM itemToAddOrUpdate, Tenant tenant, IRXBINRepository repoRXBIN, IPCNRepository repoPCN, IPayerIdRepository repoPayerID, ITenantRXBINRepository repoTenRXBIN, ITenantPCNRepository repoTenPCN, ITenantPayerIdRepository repoTenPayID)
        {
            if (itemToAddOrUpdate.TenantIndustryIdentifiers.IsAny())
            {
                DateTime timeStamp = UtilityFunctions.GetTimeStamp();

                foreach (TenantIndustryIdentifierVM industryIdentifier in itemToAddOrUpdate.TenantIndustryIdentifiers)
                {
                    switch (industryIdentifier.IndustryIdentifier)
                    {
                        case TenantIndustryIdentifier.BIN:
                            RXBIN rxBIN = SetRXBIN(repoRXBIN, industryIdentifier);
                            TenantRXBIN tenantRXBIN = new TenantRXBIN();

                            tenantRXBIN = new TenantRXBIN() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };
                            tenantRXBIN.TenantSK = itemToAddOrUpdate.TenantSK;
                            tenantRXBIN.Tenant = tenant;
                            tenantRXBIN.RXBINSK = rxBIN.RXBINSK;
                            tenantRXBIN.RXBIN = rxBIN;
                            tenantRXBIN.EfctvStartDt = industryIdentifier.EfctvStartDt;
                            tenantRXBIN.EfctvEndDt = industryIdentifier.EfctvEndDt;
                            tenantRXBIN.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                            tenantRXBIN.LastModfdTs = timeStamp;

                            repoTenRXBIN.AddOrUpdate(tenantRXBIN);
                            break;

                        case TenantIndustryIdentifier.PCN:
                            PCN pcn = SetPCN(repoPCN, industryIdentifier);
                            TenantPCN tenantPCN = new TenantPCN();

                            tenantPCN = new TenantPCN() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };
                            tenantPCN.TenantSK = itemToAddOrUpdate.TenantSK;
                            tenantPCN.Tenant = tenant;
                            tenantPCN.PCNSK = pcn.PCNSK;
                            tenantPCN.PCN = pcn;
                            tenantPCN.EfctvStartDt = industryIdentifier.EfctvStartDt;
                            tenantPCN.EfctvEndDt = industryIdentifier.EfctvEndDt;
                            tenantPCN.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                            tenantPCN.LastModfdTs = timeStamp;

                            repoTenPCN.AddOrUpdate(tenantPCN);
                            break;

                        case TenantIndustryIdentifier.PayerID:
                            PayerID payerID = SetPayerID(repoPayerID, industryIdentifier);
                            TenantPayerID tenantPayerID = new TenantPayerID();

                            tenantPayerID = new TenantPayerID() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };
                            tenantPayerID.TenantSK = itemToAddOrUpdate.TenantSK;
                            tenantPayerID.Tenant = tenant;
                            tenantPayerID.PayerIDSK = payerID.PayerIDSK;
                            tenantPayerID.PayerID = payerID;
                            tenantPayerID.EfctvStartDt = industryIdentifier.EfctvStartDt;
                            tenantPayerID.EfctvEndDt = industryIdentifier.EfctvEndDt;
                            tenantPayerID.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                            tenantPayerID.LastModfdTs = timeStamp;
                            repoTenPayID.AddOrUpdate(tenantPayerID);
                            break;

                        default:
                            break;
                    }
                }
            }
        }

        /// <summary>
        /// Add or Update a Tenant
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Tenant Entry to Add or Update</param>
        /// <returns>TenantVM.</returns>
        public TenantVM SetTenant(TenantVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            using (var repository = _repoFactory.Tenant())
            using (var repoRXBIN = _repoFactory.RXBIN())
            using (var repoPCN = _repoFactory.PCN())
            using (var repoPayerID = _repoFactory.PayerId())
            using (var repoTenRXBIN = _repoFactory.TenantRXBIN())
            using (var repoTenPCN = _repoFactory.TenantPCN())
            using (var repoTenPayID = _repoFactory.TenantPayerId())
            {
                Tenant tenant = itemToAddOrUpdate.TenantSK != 0
                ? repository.FindOne(c => c.TenantSK == itemToAddOrUpdate.TenantSK)
                : new Tenant() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

                tenant.TenantFamSK = itemToAddOrUpdate.TenantFamSK;
                tenant.TenantName = itemToAddOrUpdate.TenantName;
                tenant.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
                tenant.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
                tenant.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                tenant.LastModfdTs = timeStamp;

                repository.AddOrUpdate(tenant);

                SetTenantIndustryIdentifiers(itemToAddOrUpdate, tenant, repoRXBIN, repoPCN, repoPayerID, repoTenRXBIN, repoTenPCN, repoTenPayID);

                repository.SaveChanges();

                itemToAddOrUpdate.TenantSK = tenant.TenantSK;
                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Validate a Tenant Name
        /// </summary>
        /// <param name="itemToValidate">the Tenant Entry to Validate</param>
        /// <returns>List&lt;Message&gt;.</returns>
        public List<Message> ValidateTenant(TenantVM itemToValidate)
        {
            List<Message> result = new List<Message>();
            IQueryable<Tenant> tenants = _repoFactory.Tenant()
                .FindAll(t => t.TenantSK != itemToValidate.TenantSK && t.TenantFamSK == itemToValidate.TenantFamSK && t.TenantName == itemToValidate.TenantName);

            TenantFam tenantFamily = _repoFactory.TenantFamily().FindOne(w => w.TenantFamSK == itemToValidate.TenantFamSK);
            if (!ValidateDateRange(new DateTimeRange(tenantFamily.EfctvStartDt, tenantFamily.EfctvEndDt), new DateTimeRange(itemToValidate.EfctvStartDt, itemToValidate.EfctvEndDt)))
            {
                result.Add(new Message()
                {
                    MessageText = string.Format("Invalid Effective Start ({0:d}) and End Date ({1:d}) for Tenant. The range is outside the bounds of the Tenant Family ({2:d} - {3:d})."
                                                , itemToValidate.EfctvStartDt, itemToValidate.EfctvEndDt, tenantFamily.EfctvStartDt, tenantFamily.EfctvEndDt),
                    Fieldname = string.Format("tenant.EfctvStartDt")
                });
            }

            if (!(tenants.Count() == 0))
            {
                result.Add(new Message() { MessageText = string.Format("Tenant: ({0}) already exists.", itemToValidate.TenantName), Fieldname = "tenant.TenantName" });
            }

            foreach (TenantIndustryIdentifierVM industryIdentifier in itemToValidate.TenantIndustryIdentifiers)
            {
                switch (industryIdentifier.IndustryIdentifier)
                {
                    case TenantIndustryIdentifier.BIN:
                        IQueryable<TenantRXBIN> tenantRxBin = _repoFactory.TenantRXBIN()
                            .FindAll(a => a.TenantSK == itemToValidate.TenantSK && a.RXBIN.RXBIN1 == industryIdentifier.Value);

                        if (!ValidateDateRange(new DateTimeRange(itemToValidate.EfctvStartDt, itemToValidate.EfctvEndDt), new DateTimeRange(industryIdentifier.EfctvStartDt, industryIdentifier.EfctvEndDt)))
                        {
                            result.Add(new Message()
                            {
                                MessageText = string.Format("Invalid Effective Start ({0:d}) and End Date ({1:d}) for BIN. The range is outside the bounds of the Tenant ({2:d} - {3:d})."
                                                            , industryIdentifier.EfctvStartDt, industryIdentifier.EfctvEndDt, itemToValidate.EfctvStartDt, itemToValidate.EfctvEndDt),
                                Fieldname = string.Format("tenant.BIN.EfctvStartDt")
                            });
                        }

                        if (!(tenantRxBin.Count() == 0))
                        {
                            result.Add(new Message() { MessageText = string.Format("Tenant BIN: ({0}) already exists.", industryIdentifier.Value), Fieldname = "tenant.BIN" });
                        }

                        break;

                    case TenantIndustryIdentifier.PCN:
                        IQueryable<TenantPCN> tenantPCN = _repoFactory.TenantPCN()
                            .FindAll(a => a.TenantSK == itemToValidate.TenantSK && a.PCN.PCN1 == industryIdentifier.Value);

                        if (!ValidateDateRange(new DateTimeRange(itemToValidate.EfctvStartDt, itemToValidate.EfctvEndDt), new DateTimeRange(industryIdentifier.EfctvStartDt, industryIdentifier.EfctvEndDt)))
                        {
                            result.Add(new Message()
                            {
                                MessageText = string.Format("Invalid Effective Start ({0:d}) and End Date ({1:d}) for PCN. The range is outside the bounds of the Tenant ({2:d} - {3:d})."
                                                            , industryIdentifier.EfctvStartDt, industryIdentifier.EfctvEndDt, itemToValidate.EfctvStartDt, itemToValidate.EfctvEndDt),
                                Fieldname = string.Format("tenant.PCN.EfctvStartDt")
                            });
                        }

                        if (!(tenantPCN.Count() == 0))
                        {
                            result.Add(new Message() { MessageText = string.Format("Tenant PCN: ({0}) already exists.", industryIdentifier.Value), Fieldname = "tenant.PCN" });
                        }
                        break;

                    case TenantIndustryIdentifier.PayerID:
                        IQueryable<TenantPayerID> tenantPayerID = _repoFactory.TenantPayerId()
                            .FindAll(a => a.TenantSK == itemToValidate.TenantSK && a.PayerID.PayerID1 == industryIdentifier.Value);

                        if (!ValidateDateRange(new DateTimeRange(itemToValidate.EfctvStartDt, itemToValidate.EfctvEndDt), new DateTimeRange(industryIdentifier.EfctvStartDt, industryIdentifier.EfctvEndDt)))
                        {
                            result.Add(new Message()
                            {
                                MessageText = string.Format("Invalid Effective Start ({0:d}) and End Date ({1:d}) for PayerID. The range is outside the bounds of the Tenant ({2:d} - {3:d})."
                                                            , industryIdentifier.EfctvStartDt, industryIdentifier.EfctvEndDt, itemToValidate.EfctvStartDt, itemToValidate.EfctvEndDt),
                                Fieldname = string.Format("tenant.PayerID.EfctvStartDt")
                            });
                        }

                        if (!(tenantPayerID.Count() == 0))
                        {
                            result.Add(new Message() { MessageText = string.Format("Tenant PayerID: ({0}) already exists.", industryIdentifier.Value), Fieldname = "tenant.PayerID" });
                        }
                        break;

                    default:
                        result.Add(new Message() { MessageText = string.Format("Tenant: ({0}) has an invalid BIN, PCN, Payer ID Type.", industryIdentifier.IndustryIdentifier), Fieldname = "tenant.BIN, tenant.PCN, tenant.PayerID" });
                        break;
                }
            }

            return result;
        }

        #endregion " Tenant #

        #region " Account #

        /// <summary>
        /// Get Account View Model by Account ID
        /// </summary>
        /// <param name="acctSK">the Account ID</param>
        /// <returns>Account View Model</returns>
        public AccountVM GetAccount(long acctSK)
        {
            using (var repository = _repoFactory.Account())
            using (var spRepository = _repoFactory.AtlasBenefitPlanStoredProcs())
            {
                Acct result = repository.FindOne(s => s.AcctSK == acctSK);
                List<AccountIndustryIdentifierVM> accountIdentifiers = spRepository.GetAccountTenantIndustryIdentifier(acctSK)
                    .Select(s => new AccountIndustryIdentifierVM()
                    {
                        IndustryIdentifier = (TenantIndustryIdentifier)System.Enum.Parse(typeof(TenantIndustryIdentifier), s.TenantIndustryIdentifier),
                        TenantTypeKey = s.TenantTypeKey,
                        AcctTypeKey = s.AcctTypeKey,
                        ValueID = s.ValueID,
                        Type = s.Type,
                        Value = s.Value,
                        Deleted = false
                    }
                ).ToList();

                return new AccountVM()
                {
                    AcctSK = result.AcctSK,
                    TenantSK = result.TenantSK,
                    AcctName = result.AcctName,
                    AcctNbr = result.AcctNbr,
                    EfctvStartDt = result.EfctvStartDt,
                    EfctvEndDt = result.EfctvEndDt,
                    AccountIndustryIdentifiers = accountIdentifiers.AsEnumerable()
                };
            }
        }

        /// <summary>
        /// Gets the accounts by tenant fam sk.
        /// </summary>
        /// <param name="tenantFamSK">The tenant fam sk.</param>
        /// <returns>List&lt;Acct&gt;.</returns>
        public List<Acct> GetAccountsByTenantFamSK(long tenantFamSK)
        {
            using (var repo = _repoFactory.Account())
            {
                List<Acct> accounts = repo.FindAll(c => c.Tenant.TenantFamSK == tenantFamSK).ToList();
                return accounts;
            }
        }

        /// <summary>
        /// Gets all of the Account PCN for a Account ID
        /// </summary>
        /// <param name="acctSK">the AcctID</param>
        /// <returns>an IQuerable of all the Account PCNs</returns>
        public IQueryable<AcctPCN> GetAccountIndustryIdentifierPCN(long acctSK)
        {
            return _repoFactory.AccountPCN().FindAll(w => w.AcctSK == acctSK);
        }

        /// <summary>
        /// Gets all of the Account RXBIN for a Account ID
        /// </summary>
        /// <param name="acctSK">the acctID</param>
        /// <returns>an IQuerable of all the Account RXBINS</returns>
        public IQueryable<AcctRXBIN> GetAccountIndustryIdentifierRXBIN(long acctSK)
        {
            return _repoFactory.AccountRXBIN().FindAll(w => w.AcctSK == acctSK);
        }

        /// <summary>
        /// Gets the account industry identifier payer identifier.
        /// </summary>
        /// <param name="acctSK">The acct sk.</param>
        /// <returns>IQueryable&lt;AcctPayerID&gt;.</returns>
        public IQueryable<AcctPayerID> GetAccountIndustryIdentifierPayerID(long acctSK)
        {
            return _repoFactory.AccountPayerId().FindAll(w => w.AcctSK == acctSK);
        }

        /// <summary>
        /// Add Tenant Industry identifiers to Account
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Account</param>
        /// <param name="account">The account.</param>
        /// <param name="repoAcctRXBIN">The repo acct rxbin.</param>
        /// <param name="repoAcctPCN">The repo acct PCN.</param>
        /// <param name="repoAcctPayID">The repo acct pay identifier.</param>
        private void SetTenantIndustryIdentifiers(AccountVM itemToAddOrUpdate, Acct account, IAccountRXBINRepository repoAcctRXBIN, IAccountPCNRepository repoAcctPCN, IAccountPayerIdRepository repoAcctPayID)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            foreach (AccountIndustryIdentifierVM industryIdentifier in itemToAddOrUpdate.AccountIndustryIdentifiers)
            {
                if (industryIdentifier.AcctTypeKey == 0)
                {
                    switch (industryIdentifier.IndustryIdentifier)
                    {
                        case TenantIndustryIdentifier.BIN:
                            AcctRXBIN acctRXBIN = new AcctRXBIN();

                            acctRXBIN = new AcctRXBIN() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };
                            acctRXBIN.AcctSK = itemToAddOrUpdate.AcctSK;
                            acctRXBIN.Acct = account;
                            acctRXBIN.TenantRXBINSK = industryIdentifier.TenantTypeKey;
                            acctRXBIN.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                            acctRXBIN.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                            acctRXBIN.LastModfdBy = UtilityFunctions.GetCurrentUser(industryIdentifier.CurrentUser);
                            acctRXBIN.LastModfdTs = timeStamp;

                            repoAcctRXBIN.AddOrUpdate(acctRXBIN);
                            break;

                        case TenantIndustryIdentifier.PCN:
                            AcctPCN acctPCN = new AcctPCN();

                            acctPCN = new AcctPCN() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };
                            acctPCN.AcctSK = itemToAddOrUpdate.AcctSK;
                            acctPCN.Acct = account;
                            acctPCN.TenantPCNSK = industryIdentifier.TenantTypeKey;
                            acctPCN.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                            acctPCN.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                            acctPCN.LastModfdBy = UtilityFunctions.GetCurrentUser(industryIdentifier.CurrentUser);
                            acctPCN.LastModfdTs = timeStamp;

                            repoAcctPCN.AddOrUpdate(acctPCN);
                            break;

                        case TenantIndustryIdentifier.PayerID:
                            AcctPayerID acctPayerID = new AcctPayerID();

                            acctPayerID = new AcctPayerID() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };
                            acctPayerID.AcctSK = itemToAddOrUpdate.AcctSK;
                            acctPayerID.Acct = account;
                            acctPayerID.TenantPayerIDSK = industryIdentifier.TenantTypeKey;
                            acctPayerID.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                            acctPayerID.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                            acctPayerID.LastModfdBy = UtilityFunctions.GetCurrentUser(industryIdentifier.CurrentUser);
                            acctPayerID.LastModfdTs = timeStamp;

                            repoAcctPayID.AddOrUpdate(acctPayerID);
                            break;

                        default:
                            break;
                    }
                }
            }
        }

        /// <summary>
        /// Add or Update a Account
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Account Entry to Add or Update</param>
        /// <returns>AccountVM.</returns>
        public AccountVM SetAccount(AccountVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            using (var repository = _repoFactory.Account())
            using (var repoAcctRXBIN = _repoFactory.AccountRXBIN())
            using (var repoAcctPCN = _repoFactory.AccountPCN())
            using (var repoAcctPayID = _repoFactory.AccountPayerId())
            {
                Acct account = itemToAddOrUpdate.AcctSK != 0
                ? repository.FindOne(c => c.AcctSK == itemToAddOrUpdate.AcctSK)
                : new Acct() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

                account.TenantSK = itemToAddOrUpdate.TenantSK;
                account.AcctName = itemToAddOrUpdate.AcctName;
                account.AcctDesc = itemToAddOrUpdate.AcctName;
                account.AcctNbr = itemToAddOrUpdate.AcctNbr;
                account.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
                account.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
                account.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                account.LastModfdTs = timeStamp;

                repository.AddOrUpdate(account);

                SetTenantIndustryIdentifiers(itemToAddOrUpdate, account, repoAcctRXBIN, repoAcctPCN, repoAcctPayID);

                repository.SaveChanges();

                itemToAddOrUpdate.AcctSK = account.AcctSK;
                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Validate a Account Name
        /// </summary>
        /// <param name="itemToValidate">the Account Entry to Validate</param>
        /// <returns>List&lt;Message&gt;.</returns>
        public List<Message> ValidateAccount(AccountVM itemToValidate)
        {
            List<Message> result = new List<Message>();
            IQueryable<Acct> accounts = _repoFactory.Account()
                .FindAll(t => t.AcctSK != itemToValidate.AcctSK && t.TenantSK == itemToValidate.TenantSK && t.AcctName == itemToValidate.AcctName);

            Tenant tenant = _repoFactory.Tenant().FindOne(w => w.TenantSK == itemToValidate.TenantSK);
            if (!ValidateDateRange(new DateTimeRange(tenant.EfctvStartDt, tenant.EfctvEndDt), new DateTimeRange(itemToValidate.EfctvStartDt, itemToValidate.EfctvEndDt)))
            {
                result.Add(new Message()
                {
                    MessageText = string.Format("Invalid Effective Start ({0:d}) and End Date ({1:d}) for Account. The range is outside the bounds of the Tenant ({2:d} - {3:d})."
                                                , itemToValidate.EfctvStartDt, itemToValidate.EfctvEndDt, tenant.EfctvStartDt, tenant.EfctvEndDt),
                    Fieldname = string.Format("account.EfctvStartDt")
                });
            }


            if (!(accounts.Count() == 0))
            {
                result.Add(new Message() { MessageText = string.Format("Account: ({0}) already exists.", itemToValidate.AcctName), Fieldname = "account.AcctName" });
            }

            foreach (AccountIndustryIdentifierVM industryIdentifier in itemToValidate.AccountIndustryIdentifiers)
            {
                switch (industryIdentifier.IndustryIdentifier)
                {
                    case TenantIndustryIdentifier.BIN:
                        IQueryable<AcctRXBIN> acctRxBin = _repoFactory.AccountRXBIN()
                            .FindAll(a => a.AcctSK == itemToValidate.AcctSK && a.TenantRXBIN.RXBIN.RXBIN1 == industryIdentifier.Value);

                        if (!(acctRxBin.Count() == 0))
                        {
                            result.Add(new Message() { MessageText = string.Format("Account BIN: ({0}) already exists.", industryIdentifier.Value), Fieldname = "account.BIN" });
                        }
                        break;

                    case TenantIndustryIdentifier.PCN:
                        IQueryable<AcctPCN> acctPCN = _repoFactory.AccountPCN()
                            .FindAll(a => a.AcctSK == itemToValidate.AcctSK && a.TenantPCN.PCN.PCN1 == industryIdentifier.Value);

                        if (!(acctPCN.Count() == 0))
                        {
                            result.Add(new Message() { MessageText = string.Format("Account PCN: ({0}) already exists.", industryIdentifier.Value), Fieldname = "account.PCN" });
                        }
                        break;

                    case TenantIndustryIdentifier.PayerID:
                        IQueryable<AcctPayerID> acctPayerID = _repoFactory.AccountPayerId()
                            .FindAll(a => a.AcctSK == itemToValidate.AcctSK && a.TenantPayerID.PayerID.PayerID1 == industryIdentifier.Value);

                        if (!(acctPayerID.Count() == 0))
                        {
                            result.Add(new Message() { MessageText = string.Format("Account PayerID: ({0}) already exists.", industryIdentifier.Value), Fieldname = "account.PayerID" });
                        }
                        break;

                    default:
                        result.Add(new Message() { MessageText = string.Format("Account: ({0}) has an invalid BIN, PCN, Payer ID Type.", industryIdentifier.IndustryIdentifier), Fieldname = "account.BIN, account.PCN, account.PayerID" });
                        break;
                }
            }

            return result;
        }

        #endregion " Account #

        #region " Group #

        /// <summary>
        /// Get Group View Model by Group ID
        /// </summary>
        /// <param name="grpSK">the Group ID</param>
        /// <returns>Group View Model</returns>
        public GroupVM GetGroup(long grpSK)
        {
            using (var repository = _repoFactory.Group())
            {
                Grp result = repository.FindOne(s => s.GrpSK == grpSK);
                return new GroupVM()
                {
                    GrpSK = result.GrpSK,
                    AcctSK = result.AcctSK,
                    GrpName = result.GrpName,
                    GrpNbr = result.GrpNbr,
                    HIOSIssuerID = result.HIOSIssuerID,
                    EfctvStartDt = result.EfctvStartDt,
                    EfctvEndDt = result.EfctvEndDt
                };
            }
        }

        /// <summary>
        /// Get Group View Models by AcctSK
        /// </summary>
        /// <param name="acctSK">the account ID</param>
        /// <returns>List of Group View Model</returns>
        public List<GroupVM> GetGroupsByAcctSK(long acctSK)
        {
            return _repoFactory.Group().FindAll(s => s.AcctSK == acctSK)
            .Select(s => new GroupVM()
            {
                GrpSK = s.GrpSK,
                AcctSK = s.AcctSK,
                GrpName = s.GrpName,
                GrpNbr = s.GrpNbr,
                HIOSIssuerID = s.HIOSIssuerID,
                EfctvStartDt = s.EfctvStartDt,
                EfctvEndDt = s.EfctvEndDt
            }
            ).ToList();
        }

        /// <summary>
        /// Add or Update a Group
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Group Entry to Add or Update</param>
        /// <returns>GroupVM.</returns>
        public GroupVM SetGroup(GroupVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            using (var repository = _repoFactory.Group())
            {
                Grp group = itemToAddOrUpdate.GrpSK != 0
                    ? repository.FindOne(c => c.GrpSK == itemToAddOrUpdate.GrpSK)
                    : new Grp() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

                group.AcctSK = itemToAddOrUpdate.AcctSK;
                group.GrpName = itemToAddOrUpdate.GrpName;
                group.GrpNbr = itemToAddOrUpdate.GrpNbr;
                group.HIOSIssuerID = itemToAddOrUpdate.HIOSIssuerID;
                group.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
                group.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
                group.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                group.LastModfdTs = timeStamp;

                repository.AddOrUpdate(group);
                repository.SaveChanges();

                itemToAddOrUpdate.GrpSK = group.GrpSK;
                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Validate a Group Name
        /// </summary>
        /// <param name="itemToValidate">the Group Entry to Validate</param>
        /// <returns>List&lt;Message&gt;.</returns>
        public List<Message> ValidateGroup(GroupVM itemToValidate)
        {
            List<Message> result = new List<Message>();
            IQueryable<Grp> groups = _repoFactory.Group()
                .FindAll(t => t.GrpSK != itemToValidate.GrpSK && t.AcctSK == itemToValidate.AcctSK && t.GrpName == itemToValidate.GrpName);

            Acct account = _repoFactory.Account().FindOne(w => w.AcctSK == itemToValidate.AcctSK);
            if (!ValidateDateRange(new DateTimeRange(account.EfctvStartDt, account.EfctvEndDt), new DateTimeRange(itemToValidate.EfctvStartDt, itemToValidate.EfctvEndDt)))
            {
                result.Add(new Message()
                {
                    MessageText = string.Format("Invalid Effective Start ({0:d}) and End Date ({1:d}) for Group. The range is outside the bounds of the Account ({2:d} - {3:d})."
                                                , itemToValidate.EfctvStartDt, itemToValidate.EfctvEndDt, account.EfctvStartDt, account.EfctvEndDt),
                    Fieldname = string.Format("group.EfctvStartDt")
                });
            }

            if (!(groups.Count() == 0))
            {
                result.Add(new Message() { MessageText = string.Format("Group: ({0}) already exists.", itemToValidate.GrpName), Fieldname = "group.GrpName" });
            }

            return result;
        }

        #endregion " Group #

        #region " Population Group #

        /// <summary>
        /// Get Population Group View Model by Population Group ID
        /// </summary>
        /// <param name="popGrpSK">the Population Group ID</param>
        /// <returns>Population Group View Model</returns>
        public PopulationGroupVM GetPopulationGroup(long popGrpSK)
        {
            using (var repository = _repoFactory.PopulationGroup())
            {
                IQueryable<PopGrp> result = repository.FindAll(s => s.PopGrpSK == popGrpSK);

                PopulationGroupVM viewModel = result.Select(pg => new PopulationGroupVM()
                {
                    PopGrpSK = pg.PopGrpSK,
                    GrpSK = pg.GrpSK,
                    PopGrpName = pg.PopGrpName,
                    CntrctID = pg.CntrctID,
                    HIOSPlanID = pg.HIOSPlanID,
                    UseAddrasDefaultforEnrlmtInd = pg.UseAddrasDefaultforEnrlmtInd,
                    EfctvStartDt = pg.EfctvStartDt,
                    EfctvEndDt = pg.EfctvEndDt
                }).First();

                return viewModel;
            }
        }

        /// <summary>
        /// Get population Group View Models by GrpSK
        /// </summary>
        /// <param name="grpSK">the group ID</param>
        /// <returns>List of PopulationGroup View Model</returns>
        public List<PopulationGroupVM> GetPopulationGroupsByGrpSK(long grpSK)
        {
            return _repoFactory.PopulationGroup().FindAll(s => s.GrpSK == grpSK)
            .Select(pg => new PopulationGroupVM()
            {
                PopGrpSK = pg.PopGrpSK,
                GrpSK = pg.GrpSK,
                PopGrpName = pg.PopGrpName,
                CntrctID = pg.CntrctID,
                HIOSPlanID = pg.HIOSPlanID,
                UseAddrasDefaultforEnrlmtInd = pg.UseAddrasDefaultforEnrlmtInd,
                EfctvStartDt = pg.EfctvStartDt,
                EfctvEndDt = pg.EfctvEndDt
            }
            ).ToList();
        }

        /// <summary>
        /// Add or Update a Population Group
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Population Group Entry to Add or Update</param>
        /// <returns>PopulationGroupVM.</returns>
        public PopulationGroupVM SetPopulationGroup(PopulationGroupVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            using (var repository = _repoFactory.PopulationGroup())
            {
                PopGrp populationGroup = itemToAddOrUpdate.PopGrpSK != 0
                ? repository.FindOne(c => c.PopGrpSK == itemToAddOrUpdate.PopGrpSK)
                : new PopGrp() { CreatedBy = itemToAddOrUpdate.CurrentUser, CreatedTs = timeStamp };

                populationGroup.GrpSK = itemToAddOrUpdate.GrpSK;
                populationGroup.PopGrpName = itemToAddOrUpdate.PopGrpName;
                populationGroup.CntrctID = itemToAddOrUpdate.CntrctID;
                populationGroup.HIOSPlanID = itemToAddOrUpdate.HIOSPlanID;
                populationGroup.UseAddrasDefaultforEnrlmtInd = itemToAddOrUpdate.UseAddrasDefaultforEnrlmtInd;
                populationGroup.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
                populationGroup.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
                populationGroup.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                populationGroup.LastModfdTs = timeStamp;

                repository.AddOrUpdate(populationGroup);
                repository.SaveChanges();

                itemToAddOrUpdate.PopGrpSK = populationGroup.PopGrpSK;
                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Validate a Population Group Name
        /// </summary>
        /// <param name="itemToValidate">the Population Group Entry to Validate</param>
        /// <returns>List&lt;Message&gt;.</returns>
        public List<Message> ValidatePopulationGroup(PopulationGroupVM itemToValidate)
        {
            List<Message> result = new List<Message>();
            IQueryable<PopGrp> populationGroups = _repoFactory.PopulationGroup()
                .FindAll(t => t.PopGrpSK != itemToValidate.PopGrpSK && t.GrpSK == itemToValidate.GrpSK && t.PopGrpName == itemToValidate.PopGrpName);

            Grp group  = _repoFactory.Group().FindOne(w => w.GrpSK == itemToValidate.GrpSK);
            if (!ValidateDateRange(new DateTimeRange(group.EfctvStartDt, group.EfctvEndDt), new DateTimeRange(itemToValidate.EfctvStartDt, itemToValidate.EfctvEndDt)))
            {
                result.Add(new Message()
                {
                    MessageText = string.Format("Invalid Effective Start ({0:d}) and End Date ({1:d}) for Population Group. The range is outside the bounds of the Group ({2:d} - {3:d})."
                                                , itemToValidate.EfctvStartDt, itemToValidate.EfctvEndDt, group.EfctvStartDt, group.EfctvEndDt),
                    Fieldname = string.Format("populationgroup.EfctvStartDt")
                });
            }

            if (!(populationGroups.Count() == 0))
            {
                result.Add(new Message() { MessageText = string.Format("PopulationGroup: ({0}) already exists.", itemToValidate.PopGrpName), Fieldname = "populationgroup.PopGrpName" });
            }

            return result;
        }

        #endregion " Population Group #

        /// <summary>
        /// Validate to make sure the Child Date Range is inside the Parent
        /// </summary>
        /// <param name="Parent">Parent Date Range</param>
        /// <param name="Child">Child Date Range</param>
        /// <returns>true if the Child Date Range is inside the Parent Date Range</returns>
        private bool ValidateDateRange (DateTimeRange Parent, DateTimeRange Child)
        {
            if (!(Child.Inside(Parent)))
            {
                return false;
            }
            return true;
        }

    }
}