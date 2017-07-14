using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Atlas.Core.WebApi.Services;
using Atlas.BenefitPlan.DAL.ViewModels;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.CoverageSet
{
    /// <summary>
    /// The Threshold Controller for Benefit Plan
    /// </summary>
    public class ThresholdController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Threshold Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public ThresholdController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the Thresholds and return them in a list
        /// </summary>
        /// <param name="BnftPlanSK">BnftPlanSK</param>        
        /// <returns>List of Thresholds</returns>
        [HttpGet]
        public IHttpActionResult Threshold(long BnftPlanSK)
        {
            try
            {
                List<ThresholdVM> threshold = GetAllThresholds(BnftPlanSK);
                var result = new QueryResult<ThresholdVM>() { Rows = threshold, Count = threshold.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get All the Thresholds from the drepository
        /// </summary>
        /// <param name="BnftPlanSK">BnftPlanSK</param> 
        /// <returns>List of Thresholds</returns>
        private List<ThresholdVM> GetAllThresholds(long BnftPlanSK)
        {
            using (var repo = _repoFactory.Threshold())
            {
                List<ThresholdVM> thresholds = new List<ThresholdVM>();

                thresholds = repo.FindAll(c => c.BnftPlanSK == BnftPlanSK)
                .Select(s => new ThresholdVM()
                {
                    ThresholdSK = s.ThresholdSK,
                    CvrgSetThresholdSK = 0,
                    BenefitThresholdName = s.ThresholdName,
                    ThresholdQulfrTypeSK = s.ThresholdQulfrTypeSK,
                    ThresholdLimit = s.ThresholdLimAmt,
                    RestartThresholdCalendarYear = s.RestartThresholdAtCalendarYr,
                    RestartThresholdPlanYear = s.RestartThresholdAtPlanYr,
                    ThresholdRestartDaysAfterLastService = s.RestartThresholdAfterSvcDays,
                    ThresholdRestartMonthsAfterLastService = s.RestartThresholdAfterSvcMths,
                    ThresholdRestartDaysAfterMbrEnroll = s.RestartThresholdAfterMbrEnrlmtDays,
                    ThresholdRestartMonthsAfterMbrEnroll = s.RestartThresholdAfterMbrEnrlmtMths,
                    ThresholdRestartAtBegOfMonthNbr = s.RestartThresholdAtBgnofCalendarMthNbr,
                    ApplyToBenefitThreshold = false,
                    LimitByBenefitThreshold = false
                }).ToList();

                return thresholds;
            }
        }

    }
}
