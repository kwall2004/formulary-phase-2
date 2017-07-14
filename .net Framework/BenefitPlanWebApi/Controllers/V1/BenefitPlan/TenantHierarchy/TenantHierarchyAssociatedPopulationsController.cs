using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.TenantHierarchy
{
    public class TenantHierarchyAssociatedPopulationsController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IEntityBLL _entityBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Account  Controller
        /// </summary>
        /// <param name="entityBLL">the Entity BLL Layer</param>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public TenantHierarchyAssociatedPopulationsController(IEntityBLL entityBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _entityBLL = entityBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// get Method to Get Tenant Hierarchy
        /// </summary>
        /// <param name="rootSK">the PBPSK</param>
        /// <returns>the tenant Hierarchy of the family Id</returns>
        [HttpGet]
        public IHttpActionResult TenantHierarchyByPBPSK(long rootSK)
        {
            try
            {
                List<HierarchyTreeNode> tenantHierarchy = _entityBLL.GetTenantHierarchyForBPOrPBPSK(rootSK, false);
                var result = new QueryResult<HierarchyTreeNode>() { Rows = tenantHierarchy, Count = tenantHierarchy.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
