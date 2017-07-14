using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.Search
{
    /// <summary>
    /// The Tenant Search Controller for Benefit Plan
    /// </summary>
    public class TenantSearchController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Tenant Search Controller
        /// </summary>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        /// <param name="tenantSearchBLL">the Tenant Search BLL</param>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public TenantSearchController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Search Tenants by a Search Text
        /// </summary>
        
        /// <returns>a Query Result of Type TenantHierarchySearch_Result</returns>
        [HttpGet]
        public IHttpActionResult Search(string searchText, TenantSearchType searchType)
        {
            try
            {

                List<TenantHierarchySearch_Result> tenantHierarchy = searchType == TenantSearchType.Basic
                    ? GetTenantSearch(searchText)
                    : GetTenantAdvancedSearch(searchType, searchText);
                var result = new QueryResult<TenantHierarchySearch_Result>() { Rows = tenantHierarchy, Count = tenantHierarchy.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Execute the Basic Tenant Search
        /// </summary>
        /// <param name="SearchText">the Search Text</param>
        /// <returns>List of TenantHierarchy Search Results</returns>
        private List<TenantHierarchySearch_Result> GetTenantSearch(string SearchText)
        {
            using (var repo = _repoFactory.AtlasBenefitPlanStoredProcs())
            {
                return repo.GetTenantHierarchySearch(SearchText).ToList();
            }
        }

        /// <summary>
        /// Execute the Advanced Tenant Search
        /// </summary>
        /// <param name="SearchType">the Type of Search (PBPName, PBPID or LOB</param>
        /// <param name="SearchText">the SearchText</param>
        /// <returns>List of TenantHierarchy Search Results</returns>
        private List<TenantHierarchySearch_Result> GetTenantAdvancedSearch(TenantSearchType SearchType, string SearchText)
        {
            using (var repo = _repoFactory.AtlasBenefitPlanStoredProcs())
            {
                return repo.GetTenantHierarchyAdvancedSearch(SearchType.ToString(), SearchText).ToList();
            }
        }
    }
}
