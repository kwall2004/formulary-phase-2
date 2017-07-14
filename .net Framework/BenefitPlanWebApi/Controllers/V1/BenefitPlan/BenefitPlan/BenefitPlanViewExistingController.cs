using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    /// <summary>
    /// The Benefit Plan Cost Share Maximums Controller for Benefit Plan
    /// </summary>
    public class BenefitPlanViewExistingController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Put on hold until further notice
        /// </summary>
        /// <param name="benefitPlanBLL"></param>
        /// <param name="exceptionResponseGenerator"></param>
        public BenefitPlanViewExistingController(IBenefitPlanRepositoryFactory repoFactory, IBenefitPlanBLL benefitPlanBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get all BnftPlanBnfts / Coverage Sets / Network Tiers for a benefit plan
        /// </summary>
        /// <returns>Query Result</returns>
        [HttpGet]
        public IHttpActionResult ViewExistingBenefits(long bnftPlanSK)
        {
            try
            {
                List<ViewExistingBenefitsDetail> existingBenefitsDetail = _repoFactory.AtlasBenefitPlanStoredProcs().ViewExistingBenefitsWithRules(bnftPlanSK)
                    .Select(s => new ViewExistingBenefitsDetail() {
                        BnftName = s.BnftName,
                        SvcTypeCode = s.SvcTypeCode,
                        SvcTypeDesc = s.SvcTypeDesc,
                        NtwrkTierName = s.NtwrkTierName,
                        CvrgSetName = s.CvrgSetName,
                        CopayBfrDeducblAmt = s.CopayBfrDeducblAmt,
                        CopayAfterDeductableIsMetAmt = s.CopayAfterDeductableIsMetAmt,
                        CoinsurancePct = s.CoinsurancePct,
                        ThresholdName = s.ThresholdName,
                        ThresholdQulfrTypeCode = s.ThresholdQulfrTypeCode,
                        ThresholdLimAmt = s.ThresholdLimAmt,
                        CoverageSetRule = s.CoverageSetRule
                    }).ToList();
                var result = new QueryResult<ViewExistingBenefitsDetail>() { Rows = existingBenefitsDetail, Count = existingBenefitsDetail.Count };
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

    }
}
