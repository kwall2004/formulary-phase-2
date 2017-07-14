﻿using Atlas.BenefitPlan.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    public class WaiverRiderTypeController : ApiController
    {

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Controller for Waiver Rider Types
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public WaiverRiderTypeController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }


        #region WaiverRider type
        /// <summary>
        /// Get all the WvrRiderType and return them in a list
        /// </summary>
        /// <returns>List of WaiverRider Types</returns>
        [HttpGet]
        public IHttpActionResult WaiverRiderTypes()
        {
            try
            {
                using (var repo = _repoFactory.WaiverRiderType())
                {
                    List<WvrRiderType> wvrRiderType = repo.FindAll().ToList();
                    var result = new QueryResult<WvrRiderType>() { Rows = wvrRiderType, Count = wvrRiderType.Count };
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
        #endregion

    }
}
