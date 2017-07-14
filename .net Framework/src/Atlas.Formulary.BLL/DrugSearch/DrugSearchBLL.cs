using System;
using System.Collections.Generic;
using System.Linq;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Formulary.BLL.Services.DrugSearch;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Models.Containers;
using Atlas.Formulary.DAL.ViewModels;
using Atlas.Formulary.DAL.Models.Interfaces;
using Atlas.Formulary.DAL.Models.Enums;

namespace Atlas.Formulary.BLL.DrugSearch
{
    /// <summary>
    /// Business Logic for both smart and regular drug search functionality.
    /// </summary>
    public class DrugSearchBLL : IDrugSearchBLL
    {
        private IFormularyRepositoryFactory _repoFactory;  
        private IDrugSearchColumnExclusionBitmaskGenerator _bitmaskGen;
        private ISearchWhereCriteriaGenerator _whereCriteriaGen;
        public DrugSearchBLL(IFormularyRepositoryFactory repoFactory, IDrugSearchColumnExclusionBitmaskGenerator bitmaskGen, ISearchWhereCriteriaGenerator whereCriteriaGen)
        {
            _repoFactory = repoFactory;
            _bitmaskGen = bitmaskGen;
            _whereCriteriaGen = whereCriteriaGen;
        }

        /// <summary>
        /// Searches for drugs that match the given collection of criteria. 
        /// </summary>
        /// <param name="queries"></param>
        /// <param name="startIndex"></param>
        /// <param name="count"></param>
        /// <param name="formularyId"></param>
        /// <param name="orderBy"></param>
        /// <param name="userId"></param>
        /// <param name="criteriachange"></param>
        /// <param name="sessionId"></param>
        /// <param name="drugListSK"></param>
        /// <returns></returns>
        public QueryResult<spDrugListSearchFDBv5_Result> Search(
                                                        List<Criteria> queries,
                                                        int startIndex,
                                                        int count,
                                                        long? formularySK,
                                                        string orderBy = "",
                                                        string userId = "",
                                                        bool criteriaChange = true,
                                                        Guid? sessionId = null, 
                                                        long? drugListSK = null, 
                                                        long? coveragePropertyProgramSK = null)
        {
            if(formularySK == 0)
            {
                formularySK = null; //we need this so our obsolete days are returned correctly. there is no formularysk = 0
            }
            var result = new QueryResult<spDrugListSearchFDBv5_Result>();
            string etc = string.Empty;
            long? drugCatgSK = null;

            // Create collection of all SearchQuery with INCLUDE operation.
            List<Criteria> includes = queries.Where(q => q.Operator == "include").ToList();

            // Remove them from the queries.
            queries = queries.Except(includes).ToList();
            long bitmask = _bitmaskGen.GenerateBitmask(includes);


            // Extract ECT ID from queries.
            List<Criteria> etcQuery = queries.Where(q => q.Property == "ETC_ID").ToList();

            if (etcQuery.Count > 0)
            {
                etc = etcQuery.First().Value;
            }

            // Extract Drug Category from results.
            List<Criteria> drugCatgQuery = queries.Where(q => q.Property == "DrugCatgSK").ToList();

            if (drugCatgQuery.Count > 0)
            {
                drugCatgSK = int.Parse(drugCatgQuery.First().Value);
            }

            // Remove them from the queries.
            queries = queries.Except(etcQuery).ToList();
            queries = queries.Except(drugCatgQuery).ToList();

            foreach(Criteria criteriaRow in queries)
            {
                string value = criteriaRow.Value.ToLower();
                if(value == "no" || value == "false")
                {
                    criteriaRow.Value = "0";
                }
                else if(value == "yes" || value == "true")
                {
                    criteriaRow.Value = "1";
                }
            }

            string whereCriteria = _whereCriteriaGen.BuildDrugSearchWhereQuery(queries, DataSourceEnum.FDB); 

            using (var repo = _repoFactory.DrugSearch())
            {
                var drugs = repo.DrugListSearchFDB(whereCriteria, etc, bitmask, formularySK, orderBy, startIndex, count, userId, criteriaChange, sessionId, drugListSK, drugCatgSK, coveragePropertyProgramSK).ToList();
                result.Count = (int)(drugs.Count == 0 ? 0 : drugs[0].RowCount.Value);
                result.Rows = drugs;
            }

            return result;
        }

        public QueryResult<spDrugListSearchMedispanV2_Result> SearchMedispan(
                                                       List<Criteria> queries,
                                                       int startIndex,
                                                       int count,
                                                       long? formularySK,
                                                       string orderBy = "",
                                                       string userId = "",
                                                       bool criteriaChange = true,
                                                       Guid? sessionId = null,
                                                       long? drugListSK = null,
                                                       long? coveragePropertyProgramSK = null)
        {
            if (formularySK == 0)
            {
                formularySK = null; //we need this so our obsolete days are returned correctly. there is no formularysk = 0
            }
            var result = new QueryResult<spDrugListSearchMedispanV2_Result>();
            string gpi = string.Empty;
            long? drugCatgSK = null;

            // Create collection of all SearchQuery with INCLUDE operation.
            List<Criteria> includes = queries.Where(q => q.Operator == "include").ToList();

            // Remove them from the queries.
            queries = queries.Except(includes).ToList();
            long bitmask = _bitmaskGen.GenerateBitmask(includes);


            // Extract GPI from queries.
            List<Criteria> gpiQuery = queries.Where(q => q.Property == "GPI").ToList();

            if (gpiQuery.Count > 0)
            {
                gpi = gpiQuery.First().Value;
            }

            // Extract Drug Category from results.
            List<Criteria> drugCatgQuery = queries.Where(q => q.Property == "DrugCatgSK").ToList();

            if (drugCatgQuery.Count > 0)
            {
                drugCatgSK = int.Parse(drugCatgQuery.First().Value);
            }

            // Remove them from the queries.
            queries = queries.Except(gpiQuery).ToList();
            queries = queries.Except(drugCatgQuery).ToList();

            foreach (Criteria criteriaRow in queries)
            {
                string value = criteriaRow.Value.ToLower();
                if (value == "no" || value == "false")
                {
                    criteriaRow.Value = "0";
                }
                else if (value == "yes" || value == "true")
                {
                    criteriaRow.Value = "1";
                }
            }

            string whereCriteria = _whereCriteriaGen.BuildDrugSearchWhereQuery(queries, DataSourceEnum.Medispan);

            using (var repo = _repoFactory.DrugSearch())
            {
                var drugs = repo.DrugListSearchMedispan(whereCriteria, gpi, bitmask, formularySK, orderBy, startIndex, count, userId, criteriaChange, sessionId, drugListSK, drugCatgSK, coveragePropertyProgramSK).ToList();
                result.Count = (int)(drugs.Count == 0 ? 0 : drugs[0].RowCount.Value);
                result.Rows = drugs;
            }

            return result;
        }


        /// <summary>
        /// Full text search accross all filterable fields (fileds that can have criteria). 
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public QueryResult<SmartSearchResult> SmartSearch(string query, long? smartDrugSearchColumnSK)
        {
            var result = new QueryResult<SmartSearchResult>();

            using (var repo = _repoFactory.DrugSearch())
            {
                var smartSearch = repo.SmartDrugSearchFDB(query, smartDrugSearchColumnSK);

                smartSearch.ForEach(drug =>
                {
                    var r = new SmartSearchResult();
                    r.BrandName = drug.BrandName; 
                    r.GCN = drug?.GCN_SEQNO?.ToString();
                    r.GenericName = drug.GenericName;
                    r.HICL = drug?.HICL_SEQNO?.ToString();
                    r.LabelName = drug.LabelName;
                    r.NDC = drug.NDC;
                    r.MedId = drug.MedId;
                    r.GPI = drug.GPI;
                    r.Rule = GenerateRuleForSmartSearch(drug);
                    result.Rows.Add(r);
                });
                
            }

            return result;
        }


        /// <summary>
        /// Full text search accross all filterable fields (fileds that can have criteria). 
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public QueryResult<SmartSearchResult> SmartSearchMedispan(string query, long? smartDrugSearchColumnSK)
        {
            var result = new QueryResult<SmartSearchResult>();

            using (var repo = _repoFactory.DrugSearch())
            {
                var smartSearch = repo.SmartDrugSearchMS(query, smartDrugSearchColumnSK);

                smartSearch.ForEach(drug =>
                {
                    var r = new SmartSearchResult();
                    r.BrandName = drug.BrandName;
                    r.GCN = drug?.GCN_SEQNO?.ToString();
                    r.GenericName = drug.GenericName;
                    r.HICL = drug?.HICL_SEQNO?.ToString();
                    r.LabelName = drug.LabelName;
                    r.NDC = drug.NDC;
                    r.MedId = drug.MedId;
                    r.GPI = drug.GPI;
                    r.Rule = GenerateRuleForSmartSearch(drug);
                    result.Rows.Add(r);
                });

            }

            return result;
        }


        /// <summary>
        /// Full text search that is specialized to respect obsolete dates with respect to 
        /// the days after obsolete set in a formulary's header. 
        /// </summary>
        /// <param name="query"></param>
        /// <param name="frmlrySK"></param>
        /// <returns></returns>
        public QueryResult<SmartSearchResult> FormularyConfigSmartSearch(string query, long? frmlrySK, long? smartDrugSearchColumnSK)
        {
            var result = new QueryResult<SmartSearchResult>();

            using (var repo = _repoFactory.DrugSearch())
            {
                var smartSearch = repo.SmartDrugSearchFormulary(query, frmlrySK, smartDrugSearchColumnSK);

                smartSearch.ForEach(drug =>
                {
                    var r = new SmartSearchResult();
                    r.BrandName = drug.BrandName;
                    r.GCN = drug?.GCN_SEQNO?.ToString();
                    r.GenericName = drug.GenericName;
                    r.HICL = drug?.HICL_SEQNO?.ToString();
                    r.LabelName = drug.LabelName;
                    r.NDC = drug.NDC;
                    r.MedId = drug.MedId;
                    r.GPI = drug.GPI;
                    r.Rule = GenerateRuleForSmartSearch(drug);
                    result.Rows.Add(r);
                });

            }

            return result;
        }

        public QueryResult<SmartSearchResult> FormularyConfigSmartSearchMedispan(string query, long? frmlrySK, long? smartDrugSearchColumnSK)
        {
            var result = new QueryResult<SmartSearchResult>();

            using (var repo = _repoFactory.DrugSearch())
            {
                var smartSearch = repo.SmartFormularyConfigSearchMedispan(query, frmlrySK, smartDrugSearchColumnSK);

                smartSearch.ForEach(drug =>
                {
                    var r = new SmartSearchResult();
                    r.BrandName = drug.BrandName;
                    r.GCN = drug?.GCN_SEQNO?.ToString();
                    r.GenericName = drug.GenericName;
                    r.HICL = drug?.HICL_SEQNO?.ToString();
                    r.LabelName = drug.LabelName;
                    r.NDC = drug.NDC;
                    r.MedId = drug.MedId;
                    r.GPI = drug.GPI;
                    r.Rule = GenerateRuleForSmartSearch(drug);
                    result.Rows.Add(r);
                });

            }

            return result;
        }


        /// <summary>
        /// Full text search that is specialized to respect obsolete dates with respect to
        /// the days after obsolete set in a drug list's header.
        /// </summary>
        /// <param name="query"></param>
        /// <param name="drugListSK"></param>
        /// <returns></returns>
        public QueryResult<SmartSearchResult> DrugListSmartSearch(string query, long? drugListSK, long? smartDrugSearchColumnSK)
        {
            var result = new QueryResult<SmartSearchResult>();

            using (var repo = _repoFactory.DrugSearch())
            {
                var smartSearch = repo.SmartDrugSearchDrugList(query, drugListSK, smartDrugSearchColumnSK);

                smartSearch.ForEach(drug =>
                {
                    var r = new SmartSearchResult();
                    r.BrandName = drug.BrandName;
                    r.GCN = drug?.GCN_SEQNO?.ToString();
                    r.GenericName = drug.GenericName;
                    r.HICL = drug?.HICL_SEQNO?.ToString();
                    r.LabelName = drug.LabelName;
                    r.NDC = drug.NDC;
                    r.MedId = drug.MedId;
                    r.GPI = drug.GPI;
                    r.Rule = GenerateRuleForSmartSearch(drug);
                    result.Rows.Add(r);
                });

            }

            return result;
        }
        
        public QueryResult<SmartSearchResult> DrugListSmartSearchMedispan(string query, long? drugListSK, long? smartDrugSearchColumnSK)
        {
            var result = new QueryResult<SmartSearchResult>();

            using (var repo = _repoFactory.DrugSearch())
            {
                var smartSearch = repo.SmartDrugListSearchMedispan(query, drugListSK, smartDrugSearchColumnSK);

                smartSearch.ForEach(drug =>
                {
                    var r = new SmartSearchResult();
                    r.BrandName = drug.BrandName;
                    r.GCN = drug?.GCN_SEQNO?.ToString();
                    r.GenericName = drug.GenericName;
                    r.HICL = drug?.HICL_SEQNO?.ToString();
                    r.LabelName = drug.LabelName;
                    r.NDC = drug.NDC;
                    r.MedId = drug.MedId;
                    r.GPI = drug.GPI;
                    r.Rule = GenerateRuleForSmartSearch(drug);
                    result.Rows.Add(r);
                });

            }

            return result;
        }


        /// <summary>
        /// Constructs and returns the ETC tree for the drug search view.
        /// </summary>
        /// <returns></returns>
        public TreeChildren FormularyEtcTree()
        {
            var tree = new List<spETCHierarchy_Get_Result>();
            var result = new TreeChildren();

            using (var drugSearchRepo = _repoFactory.DrugSearch())
            {
                tree = drugSearchRepo.FormularyTreeSearch();
                result = BuildETCTree(tree);
            }

            return result;
        }

        /// <summary>
        /// Generates the rule that is used in the on click of a smart search result. 
        /// </summary>
        /// <param name="drug"></param>
        /// <returns></returns>
        private Criteria GenerateRuleForSmartSearch(ISmartSearchResult drug)
        {
            var result = new Criteria();
            result.Operator = "=";

            int maxRank = -1;
            
            if (drug.BrandName_Rank > maxRank)
            {
                maxRank = drug.BrandName_Rank.Value;
                result.Property = "BrandName";
                result.Value = drug.BrandName;
            }
            if (drug.DosageForm_Rank > maxRank)
            {
                maxRank = drug.DosageForm_Rank.Value;
                result.Property = "DosageForm";
                result.Value = drug.DosageForm;
            }
            if (drug.DrugStrength_Rank > maxRank)
            {
                maxRank = drug.DrugStrength_Rank.Value;
                result.Property = "DrugStrength";
                result.Value = drug.DrugStrength;
            }
            if (drug.DrugType_Rank > maxRank)
            {
                maxRank = drug.DrugType_Rank.Value;
                result.Property = "DrugType";
                result.Value = drug.DrugType;
            }
            if (drug.ETC_NAME_Rank > maxRank)
            {
                maxRank = drug.ETC_NAME_Rank.Value;
                result.Property = "ETC_NAME";
                result.Value = drug.ETC_NAME;
            }
            if (drug.RouteAdministration_Rank > maxRank)
            {
                maxRank = drug.RouteAdministration_Rank.Value;
                result.Property = "RouteAdministration";
                result.Value = drug.RouteAdministration;
            }
            if (drug.GenericName_Rank > maxRank)
            {
                maxRank = drug.GenericName_Rank.Value;
                result.Property = "GenericName";
                result.Value = drug.GenericName;
            }
            if (drug.GTC_DESC_Rank > maxRank)
            {
                maxRank = drug.GTC_DESC_Rank.Value;
                result.Property = "GTC_DESC";
                result.Value = drug.GTC_DESC;
            }
            if (drug.LabelName_Rank > maxRank)
            {
                maxRank = drug.LabelName_Rank.Value;
                result.Property = "LabelName";
                result.Value = drug.LabelName;
            }
            if (drug.NDC_Rank > maxRank)
            {
                maxRank = drug.NDC_Rank.Value;
                result.Property = "NDC";
                result.Value = drug.NDC;
            }
            if(drug.GCN_SEQNO_Rank > maxRank)
            {
                maxRank = drug.GCN_SEQNO_Rank.Value;
                result.Property = "GCN_SEQNO";
                result.Value = drug.GCN_SEQNO;
            }
            if(drug.MedId_Rank > maxRank)
            {
                maxRank = drug.MedId_Rank.Value;
                result.Property = "MedId";
                result.Value = drug.MedId;
            }
            if (drug.GPI_Rank > maxRank)
            {
                maxRank = drug.GPI_Rank.Value;
                result.Property = "GPI";
                result.Value = drug.GPI;
            }

            return result;
        }


        /// <summary>
        /// Builds the ETC tree. 
        /// </summary>
        /// <param name="tree"></param>
        /// <returns></returns>
        private TreeChildren BuildETCTree(List<spETCHierarchy_Get_Result> tree)
        {
            var result = new TreeChildren();

            var lookupTable = new Dictionary<int, TreeChildren>();

            foreach (spETCHierarchy_Get_Result etcRow in tree)
            {
                var lookupChild = new TreeChildren();
                lookupChild.ETC_ID = (int)etcRow.ETC_ID;
                lookupChild.ETC_NAME = etcRow.ETC_NAME;
                lookupChild.leaf = true;
                lookupChild.PARENT_ETC_ID = (int)etcRow.ETC_PARENT_ETC_ID;

                lookupTable.Add((int)etcRow.ETC_ID, lookupChild);
            }

            foreach (var node in lookupTable.Values)
            {
                TreeChildren possibleParent;
                if (lookupTable.TryGetValue(node.PARENT_ETC_ID.Value, out possibleParent))
                {
                    if (possibleParent.children == null)
                    {
                        possibleParent.children = new List<TreeChildren>();
                    }
                    possibleParent.leaf = false;
                    possibleParent.children.Add(node);
                }

            }

            var rootNode = new TreeChildren();
            rootNode.ETC_ID = 0;
            rootNode.ETC_NAME = "All";
            rootNode.PARENT_ETC_ID = null;
            rootNode.leaf = false;
            rootNode.children = new List<TreeChildren>();
            rootNode.children.AddRange(lookupTable.Values.Where(x => x.PARENT_ETC_ID == 0 || x.PARENT_ETC_ID == -1).ToList());

            return rootNode;
        }

        public GpiTreeNode GetGpiTree()
        {
            var tree = new List<spGPIHierarchy_Get_Result>();
            var result = new GpiTreeNode();

            using (var drugSearchRepo = _repoFactory.DrugSearch())
            {
                tree = drugSearchRepo.GetGPIHierarchy();
                result = BuildGpiTree(tree);
            }

            return result;
        }

        private GpiTreeNode BuildGpiTree(List<spGPIHierarchy_Get_Result> tree)
        {
            var result = new TreeChildren();

            var lookupTable = new Dictionary<string, GpiTreeNode>();

            foreach (spGPIHierarchy_Get_Result gpiRow in tree)
            {
                var lookupChild = new GpiTreeNode();
                lookupChild.GPI = gpiRow.GPI;
                lookupChild.GPI_Name = gpiRow.GPI_Name;
                lookupChild.leaf = true;
                lookupChild.GPI_Parent = gpiRow.GPI_Parent;

                lookupTable.Add(gpiRow.GPI, lookupChild);
            }

            foreach (var node in lookupTable.Values)
            {
                if(node.GPI_Parent != null)
                {
                    GpiTreeNode parent;
                    if (lookupTable.TryGetValue(node.GPI_Parent, out parent))
                    {
                        parent.leaf = false;
                        parent.children.Add(node);
                    }
                }              
            }

            var rootNode = new GpiTreeNode();
            rootNode.GPI = "0";
            rootNode.GPI_Name = "All";
            rootNode.GPI_Parent = null;
            rootNode.leaf = false;
            rootNode.children = new List<GpiTreeNode>();
            rootNode.children.AddRange(lookupTable.Values.Where(x => x.GPI_Parent == null).ToList());

            return rootNode;
        }

    }
}
