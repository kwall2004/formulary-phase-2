using Atlas.Core.DAL.Models.Containers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    /// <summary>
    /// The Benefit Service Type Controller for Benefit Plan
    /// </summary>
    public class BenefitServiceTypeController : ApiController
    {
        /// <summary>the Admin Config BLL</summary>
        private IAdminConfigBLL _adminConfigBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the BenefitServiceType Controller
        /// </summary>
        /// <param name="adminConfigBLL">Admin Config BLL</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public BenefitServiceTypeController(IAdminConfigBLL adminConfigBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _adminConfigBLL = adminConfigBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Gets Benefits with or without Service Types
        /// </summary>
        /// <returns>List of BenefitServiceTypes</returns>
        [HttpGet]
        public IHttpActionResult BenefitServiceTypes()
        {
            try
            {
                List<BenefitServiceTypeVM> bnftSvcTypes = _adminConfigBLL.GetAllBenefitServiceTypes().ToList();
                var result = new QueryResult<BenefitServiceTypeVM>() { Rows = bnftSvcTypes, Count = bnftSvcTypes.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Gets Benefits with or without Service Types based on Search Text
        /// </summary>
        /// <returns>List of BenefitServiceTypes</returns>
        [HttpGet]
        public IHttpActionResult BenefitServiceTypes(string searchText)
        {
            try
            {
                List<BenefitServiceTypeVM> bnftSvcTypes = _adminConfigBLL.GetAllBenefitServiceTypes(searchText).ToList();
                var result = new QueryResult<BenefitServiceTypeVM>() { Rows = bnftSvcTypes, Count = bnftSvcTypes.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

    }
}