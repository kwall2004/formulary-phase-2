using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan
{
    /// <summary>
    /// The Navigation Bread Crumb Controller for Benefit Plan
    /// </summary>
    public class NavigationBreadCrumbController : ApiController
    {
        /// <summary>the Entity BLL</summary>
        private IEntityBLL _entityBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Population Group Plan Benefit Package Controller
        /// </summary>
        /// <param name="entityBLL">the Entity BLL</param>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public NavigationBreadCrumbController(IEntityBLL entityBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _entityBLL = entityBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get the Bread Crumb Navigation by Population Group ID
        /// </summary>
        /// <param name="popGrpSK">the Population Group ID</param>
        /// <returns>the HierarchyNodeDetail Container</returns>
        [HttpGet]
        public IHttpActionResult GetPopulationGroupBreadCrumbModel(long popGrpSK = 0)
        {
            return GetEntityBreadCrumbModel(TenantFamilyHierarchy.PopulationGroup, popGrpSK);
        }

        /// <summary>
        /// Get Hierarchy Detail Information for an Entity
        /// </summary>
        /// <param name="entityHierarchyType">the Entity Type</param>
        /// <param name="entitySK">the Entity Key</param>
        /// <returns>a Hierarchy Node Detail</returns>
        [HttpGet]
        public IHttpActionResult GetEntityBreadCrumbModel(TenantFamilyHierarchy entityType, long entityTypeSK)
        {
            try
            {
                HierarchyNodeDetail breadCrumb = _entityBLL.GetHierarchyDetailInformation(entityType, entityTypeSK);
                var result = new QueryResult<HierarchyNodeDetail>() { Rows = new List<HierarchyNodeDetail>() { breadCrumb }, Count = 1 };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
