using Atlas.Core.DAL.Models.Containers;
using Atlas.Formulary.BLL.Services.DrugSearch;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Models.Containers;
using Atlas.Formulary.DAL.Models.Enums;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/// <summary>
/// Business logic for formulary review.
/// </summary>
namespace Atlas.Formulary.BLL.Formulary
{
    public class FormularyReviewBLL : IFormularyReviewBLL
    {
        private IFormularyRepositoryFactory _repoFactory;
        private ISearchWhereCriteriaGenerator _whereClauseGenerator;

        public FormularyReviewBLL(IFormularyRepositoryFactory repoFactory, ISearchWhereCriteriaGenerator whereClauseGenerator)
        {
            _repoFactory = repoFactory;
            _whereClauseGenerator = whereClauseGenerator;
        }

        /// <summary>
        /// Gets the drugs for a formulary review based on the paramters passed. Only one param should be passed 
        /// as the stored proc makes a determination of what to return based on the parameter passed.
        /// </summary>
        /// <param name="formularySK"></param>
        /// <param name="DrugCatgSK"></param>
        /// <param name="ETC_ID"></param>
        /// <param name="AHFS_Id"></param>
        /// <param name="tierSK"></param>
        /// <returns></returns>
        public List<spFormularyReview_GetV2_Result> GetFormularyReview(long formularySK, long? DrugCatgSK = null, 
            long? ETC_ID = null, string AHFS_Id = null, string GPI = null, long? tierSK = null, Criteria criteria = null)
        {
            if (IsValidParameterSet(formularySK, DrugCatgSK, ETC_ID, AHFS_Id))
            {
                using (var repo = _repoFactory.FormularyReview())
                {
                    string where = null;
                    if (criteria != null) // Thorough check occcours in IsValidParameterSet()
                    {
                        where = _whereClauseGenerator.BuildDrugSearchWhereQuery(new List<Criteria>() { criteria }, DataSourceEnum.FDB);
                    }

                    var results = repo.GetFormularyReview(formularySK, DrugCatgSK, ETC_ID, AHFS_Id, GPI, tierSK, where);
                    return results;
                }
            }
            else
            {
                throw new ArgumentException("Improper number of parameters"); 
            }
        }

        /// <summary>
        /// Builds ETC tree for formulary review.
        /// </summary>
        /// <param name="formularySK"></param>
        /// <returns></returns>
        public TreeChildren FormularyEtcTree(long formularySK)
        {
            var tree = new List<spFormularyReview_ETC_Result>();
            var result = new TreeChildren();

            using (var repo = _repoFactory.FormularyReview())
            {
                tree = repo.FormularyReview_ETC(formularySK);
                result = BuildETCTree(tree);
            }

            return result;
        }

        public GpiTreeNode FormularyGpiTree(long formularySK)
        {
            var tree = new List<spFormularyReview_GPI_Result>();
            var result = new GpiTreeNode();

            using (var repo = _repoFactory.FormularyReview())
            {
                tree = repo.FormularyReview_GPI(formularySK);
                result = BuildGPITree(tree);
            }

            return result;
        }

        /// <summary>
        /// Builds the AHFS tree for a formulary review.
        /// </summary>
        /// <param name="formularySK"></param>
        /// <returns></returns>
        public TreeChildrenAHFS FormularyAhfsTree(long formularySK)
        {
            var tree = new List<spFormularyReview_AHFS_Result>();
            var result = new TreeChildrenAHFS();

            using (var repo = _repoFactory.FormularyReview())
            {
                tree = repo.FormularyReview_AHFS(formularySK);
                result = BuildAHFSTree(tree);
            }

            return result;
        }

        /// <summary>
        /// The actual building of the ETC tree.
        /// </summary>
        /// <param name="tree"></param>
        /// <returns></returns>
        private TreeChildren BuildETCTree(List<spFormularyReview_ETC_Result> tree)
        {
            var result = new TreeChildren();

            var lookupTable = new Dictionary<int, TreeChildren>();
            foreach (spFormularyReview_ETC_Result etcRow in tree)
            {
                if (!lookupTable.ContainsKey((int)etcRow.ETC_ID))
                {
                    var lookupChild = new TreeChildren();
                    lookupChild.ETC_ID = (int)etcRow.ETC_ID;
                    lookupChild.ETC_NAME = etcRow.ETC_NAME;
                    lookupChild.leaf = false;
                    lookupChild.PARENT_ETC_ID = (int)etcRow.ETC_PARENT_ETC_ID;

                    lookupTable.Add((int)etcRow.ETC_ID, lookupChild);
                }
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
                    node.leaf = true;
                    possibleParent.leaf = false;
                    possibleParent.children.Add(node);
                }

            }

            result.children = lookupTable.Values.Where(x => x.PARENT_ETC_ID == 0).ToList();
            return result;
        }


        /// <summary>
        /// The actual building of the AHFS tree.
        /// </summary>
        /// <param name="tree"></param>
        /// <returns></returns>
        private TreeChildrenAHFS BuildAHFSTree(List<spFormularyReview_AHFS_Result> tree)
        {
            var result = new TreeChildrenAHFS();

            var lookupTable = new Dictionary<string, TreeChildrenAHFS>();
            foreach (spFormularyReview_AHFS_Result etcRow in tree)
            {
                if (!lookupTable.ContainsKey(etcRow.AHFS_Id))
                {
                    var lookupChild = new TreeChildrenAHFS();
                    if (string.IsNullOrEmpty(etcRow.AHFS_ParentId))
                    {
                        etcRow.AHFS_ParentId = "0";
                    }
                    lookupChild.AHFS_Id = etcRow.AHFS_Id;
                    lookupChild.AHFS_Name = etcRow.AHFS_Name;
                    lookupChild.leaf = true;
                    lookupChild.AHFS_ParentId = etcRow.AHFS_ParentId;

                    lookupTable.Add(etcRow.AHFS_Id, lookupChild);

                }
            }

            foreach (var node in lookupTable.Values)
            {
                TreeChildrenAHFS possibleParent;
                if (lookupTable.TryGetValue(node.AHFS_ParentId, out possibleParent))
                {
                    if (possibleParent.children == null)
                    {
                        possibleParent.children = new List<TreeChildrenAHFS>();
                    }
                    possibleParent.leaf = false;
                    possibleParent.children.Add(node);
                }

            }

            result.children = lookupTable.Values.Where(x => x.AHFS_ParentId == "0" ).ToList();
            return result;
        }

        private GpiTreeNode BuildGPITree(List<spFormularyReview_GPI_Result> tree)
        {
            var result = new GpiTreeNode();

            var lookupTable = new Dictionary<string, GpiTreeNode>();
            foreach (spFormularyReview_GPI_Result gpiRow in tree)
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
                if (node.GPI_Parent != null)
                {
                    GpiTreeNode parent;
                    if (lookupTable.TryGetValue(node.GPI_Parent, out parent))
                    {
                        parent.leaf = false;
                        parent.children.Add(node);
                    }
                }
            }

            result.children = lookupTable.Values.Where(x => x.GPI_Parent == null).ToList();
            return result;
        }


        /// <summary>
        /// Checks that only one of the parameters other than formularySK has been passed.
        /// </summary>
        /// <param name="formularySK"></param>
        /// <param name="DrugCatgSK"></param>
        /// <param name="ETC_ID"></param>
        /// <param name="AHFS_Id"></param>
        /// <returns></returns>
        private bool IsValidParameterSet(long formularySK, long? DrugCatgSK = null, long? ETC_ID = null, string AHFS_Id = null)
        {
            var isValid = false;

            int nullCounter = 0;
            if (!DrugCatgSK.HasValue)
            {
                nullCounter += 1;
            }

            if (!ETC_ID.HasValue)
            {
                nullCounter += 1;
            }

            if (string.IsNullOrEmpty(AHFS_Id))
            {
                nullCounter += 1;
            }

            if (nullCounter < 2)
            {
                return isValid;
            }
            else
            {
                isValid = true;
                return isValid;
            }
        }

        /// <summary>
        /// The AHFS child type. 
        /// </summary>
        public class TreeChildrenAHFS // TODO: Move this to it's own viewmodel file.
        {
            public string AHFS_Id { get; set; }
            public string AHFS_ParentId { get; set; }
            public string AHFS_Name { get; set; }
            public bool leaf { get; set; }
            public List<TreeChildrenAHFS> children { get; set; }
        }
    }
    


}
