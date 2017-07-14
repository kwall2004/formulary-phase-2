using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan
{
    /// <summary>
    /// The Industry Identifier Type Controller for Benefit Plan
    /// </summary>
    public class IndustryIdentifierTypeController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Industry Identifier Type Controller
        /// </summary>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public IndustryIdentifierTypeController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get all Industry Identifier Types
        /// </summary>
        /// <returns>a Query Result of Type IndustryIdentifierType</returns>
        [HttpGet]
        public IHttpActionResult GetAllIndustryIdentifierTypes()
        {
            try
            {
                List<DropDownList> dropdownlist = new List<DropDownList>();
                foreach (var name in Enum.GetNames(typeof(TenantIndustryIdentifier)))
                {
                    dropdownlist.Add(new DropDownList() { Value = (int)Enum.Parse(typeof(TenantIndustryIdentifier), name), Text = name});
                }
                return Ok(dropdownlist);

            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
