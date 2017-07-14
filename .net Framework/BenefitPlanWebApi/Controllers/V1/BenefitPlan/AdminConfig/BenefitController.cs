using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using Atlas.BenefitPlan.BLL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    /// <summary>
    /// The Benefit Controller for Benefit Plan
    /// </summary>
    public class BenefitController : ApiController
    {
        /// <summary>the Admin Config BLL</summary>
        private IAdminConfigBLL _adminConfigBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Benefit Controller
        /// </summary>
        /// <param name="adminConfigBLL">Admin Config BLL</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public BenefitController(IAdminConfigBLL adminConfigBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _adminConfigBLL = adminConfigBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the Benefits and return them in a list
        /// </summary>
        /// <returns>List of Benefits</returns>
        [HttpGet]
        public IHttpActionResult Benefits()
        {
            try
            {
                List<Bnft> benefits = _adminConfigBLL.GetAllBenefits().ToList();
                var result = new QueryResult<Bnft>() { Rows = benefits, Count = benefits.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get a Benefit by id
        /// </summary>
        /// <returns>A Benefit</returns>
        [HttpGet]
        public IHttpActionResult Benefits(long benefitSK)
        {
            try
            {
                List<Bnft> benefits = _adminConfigBLL.GetAllBenefits(benefitSK).ToList();
                var result = new QueryResult<Bnft>() { Rows = benefits, Count = benefits.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }


    }
}