using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.AdminConfig
{
    /// <summary>
    /// The Benefit Detail Controller for Benefit Plan
    /// </summary>
    public class BenefitDetailController : ApiController
    {
        /// <summary>the Admin Config BLL</summary>
        private IAdminConfigBLL _adminConfigBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Benefit Detail Controller
        /// </summary>
        /// <param name="adminConfigBLL">Admin Config BLL</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public BenefitDetailController(IAdminConfigBLL adminConfigBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _adminConfigBLL = adminConfigBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get a Benefit Detail by id
        /// </summary>
        /// <param name="benefitSK">benefitSK</param>
        /// <returns>List of Benefit Detail</returns>
        [HttpGet]
        public IHttpActionResult BenefitDetail(long bnftSK)
        {
            try
            {
                BenefitDetailVM benefitDetail = _adminConfigBLL.GetBenefitDetail(bnftSK);
                var result = new QueryResult<BenefitDetailVM>() { Rows = new List<BenefitDetailVM>() { benefitDetail }, Count = 1 };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Put Method to Set a Benefit Detail
        /// </summary>
        /// <param name="benefitDetail">the Benefit Detail View Model to Set</param>
        /// <returns>the Benefit Detail View Model</returns>
        [HttpPut]
        public IHttpActionResult UpdateBenefitDetail(BenefitDetailVM benefitDetail)
        {
            return SetBenefitDetail(benefitDetail);
        }

        /// <summary>
        /// Post Method to Set a Benefit Detail
        /// </summary>
        /// <param name="benefitDetail">the Benefit Detail View Model to Set</param>
        /// <returns>the Benefit Detail View Model</returns>
        [HttpPost]
        public IHttpActionResult AddBenefitDetail(BenefitDetailVM benefitDetail)
        {
            benefitDetail.BnftSK = 0;
            return SetBenefitDetail(benefitDetail);
        }

        #region " Private Methods "
        /// <summary>
        /// Method to Set a Benefit Detail
        /// </summary>
        /// <param name="benefitDetail">the Benefit Detail View Model to Set</param>
        /// <returns>the Benefit Detail View Model</returns>
        private IHttpActionResult SetBenefitDetail(BenefitDetailVM benefitDetail)
        {
            try
            {
                benefitDetail.CurrentUser = UtilityFunctions.GetCurrentUser(benefitDetail.CurrentUser);

                if (ValidateBenefitDetail(benefitDetail))
                {
                    BenefitDetailVM result = _adminConfigBLL.SetBenefitDetail(benefitDetail);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.BnftSK }));
                }
                else
                {
                    return Ok(JSONFunctions.AddUpdateErrorReponse(ModelState));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Validate Benefit Detail
        /// </summary>
        /// <param name="benefitDetail">the Benefit Detail View Model to Validate</param>
        private bool ValidateBenefitDetail(BenefitDetailVM benefitDetail)
        {
            if (ModelState.IsValid)
            {
                foreach (Message item in _adminConfigBLL.ValidateBenefitDetail(benefitDetail))
                {
                    ModelState.AddModelError(item.Fieldname, item.MessageText);
                }
            }

            return ModelState.IsValid;
        }
        #endregion
    }
}
