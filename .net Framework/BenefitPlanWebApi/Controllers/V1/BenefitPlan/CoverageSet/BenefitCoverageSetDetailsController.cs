using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using Atlas.BenefitPlan.BLL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using BenefitPlanWebApi.Services;
using System.Dynamic;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.CoverageSet
{
    /// <summary>
    /// The Benefit Coverage Set Detail Controller for Benefit Plan
    /// </summary>
    public class BenefitCoverageSetDetailsController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the CoverageSet BLL</summary>
        private ICoverageSetBLL _coverageSetBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Benefit Coverage Set Detail Controller
        /// </summary>
        /// <param name="coverageSetBLL">CoverageSet BLL</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public BenefitCoverageSetDetailsController(IBenefitPlanRepositoryFactory repoFactory,ICoverageSetBLL coverageSetBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _coverageSetBLL = coverageSetBLL;
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get all BnftPlanBnfts / Coverage Sets / Network Tiers for a benefit plan
        /// </summary>
        /// <returns>Query Result</returns>
        [HttpGet]
        public IHttpActionResult GetCoverageSetHeaderByBnftPlanSK(long bnftPlanSK)
        {
            try
            {
                IQueryable<BnftPlanBnft> benefitPlanBenefits = _repoFactory.BenefitPlanBenefit().FindAll(c => c.BnftPlanSK == bnftPlanSK);

                //Create structure first (dynamically because of network tiers)

                List<IDictionary<string, Object>> coverageSetHeaders = new List<IDictionary<string, Object>>();
                foreach (BnftPlanBnft benefitPlanBenefit in benefitPlanBenefits)
                {
                    //dynamic coverageSetHeader = new ExpandoObject();
                    var coverageSetHeader = new ExpandoObject() as IDictionary<string, Object>;

                    Bnft benefit = _repoFactory.Benefit().FindOne(c => c.BnftSK == benefitPlanBenefit.BnftSK);
                    coverageSetHeader.Add("BnftSK", benefit.BnftSK);
                    coverageSetHeader.Add("BnftPlanSK", benefitPlanBenefit.BnftPlanSK);
                    coverageSetHeader.Add("CurrentUser", null);
                    coverageSetHeader.Add("BenefitName", benefit.BnftName);
                    coverageSetHeader.Add("Deleted", false);
                    //one column for each network tier(use the netwrktiers here instead of the numbers.
                    List<BenefitNetworkDetail> benefitNetworkDetails = new List<BenefitNetworkDetail>();
                    foreach (NtwrkTier ntwrkTier in _repoFactory.NetworkTier().FindAll(s => s.BnftPlanSK == bnftPlanSK))
                    {
                        BenefitNetworkDetail benefitNetworkDetail = new BenefitNetworkDetail();

                        NtwrkTierType ntwrkTierType = _repoFactory.NetworkTierType().FindOne(f => f.NtwrkTierTypeSK == ntwrkTier.NtwrkTierTypeSK);
                        benefitNetworkDetail.Name = ntwrkTierType.NtwrkTierName;

                        
                        benefitNetworkDetail.SelectedCoverageSets = _repoFactory.BenefitPlanBenefitCoverageSetNetworkTier()
                               .FindAll(f => f.BnftPlanBnftSK == benefitPlanBenefit.BnftPlanBnftSK && f.NtwrkTierSK == ntwrkTier.NtwrkTierSK)
                               .Select(q => new BenefitNetworkCoverageSetDetail() {
                                   BnftPlanBnftCvrgSetNtwrkTierSK= q.BnftPlanBnftCvrgSetNtwrkTierSK
                                   , CvrgSetName = q.CvrgSet.CvrgSetName
                                   , CvrgSetSK = q.CvrgSetSK 
                                   , CvrgSetPrity = q.CvrgSetPrity
                                   , Deleted = false
                               }).ToList();
                        Deducbl benefitLevelDeductible = _repoFactory.Deductible().FindOne(f => f.BnftPlanBnftSK == benefitPlanBenefit.BnftPlanBnftSK && f.NtwrkTierSK == ntwrkTier.NtwrkTierSK);
                        benefitNetworkDetail.DeductibleAmt = (benefitLevelDeductible != null ? benefitLevelDeductible.DeducblAmt.Value : 0);
                        benefitNetworkDetail.NtwrkTierSK = ntwrkTier.NtwrkTierSK;
                        benefitNetworkDetails.Add(benefitNetworkDetail);
                    }
                    coverageSetHeader.Add("Tiers", benefitNetworkDetails);
                    coverageSetHeaders.Add(coverageSetHeader);
                }
                return Ok(coverageSetHeaders);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Put Method to Set a Benefit Coverage Set Detail
        /// </summary>
        /// <param name = "benefitCoverageSetDetail" > the Benefit Coverage Set Detail View Model to Set</param>
        /// <returns>the Benefit Coverage Set Detail View Model</returns>
        [HttpPut]
        public IHttpActionResult UpdateBenefitCoverageSetDetail(BenefitCoverageSetDetailsVM benefitCoverageSetDetail)
        {
            return SetBenefitCoverageSetDetail(benefitCoverageSetDetail);
        }

        #region " Private Methods "
        /// <summary>
        /// Method to Set a Benefit CoverageSet Detail
        /// </summary>
        /// <param name = "benefitCoverageSetDetail" > the Benefit CoverageSet Detail View Model to Set</param>
        /// <returns>the Benefit CoverageSet Detail View Model</returns>
        private IHttpActionResult SetBenefitCoverageSetDetail(BenefitCoverageSetDetailsVM benefitCoverageSetDetail)
        {
            try
            {
                if (ValidateBenefitCoverageSetDetail(benefitCoverageSetDetail))
                {
                    BenefitCoverageSetDetailsVM result = _coverageSetBLL.SetBenefitCoverageSetDetail(benefitCoverageSetDetail);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.BnftPlanSK }));
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
        /// Validate Benefit CoverageSet Detail
        /// </summary>
        /// <param name = "benefitCoverageSetDetail" > the Benefit CoverageSet Detail View Model to Validate</param>
        private bool ValidateBenefitCoverageSetDetail(BenefitCoverageSetDetailsVM benefitCoverageSetDetail)
        {
            if (ModelState.IsValid)
            {
                foreach (Message item in _coverageSetBLL.ValidateBenefitCoverageSetDetail(benefitCoverageSetDetail))
                {
                    ModelState.AddModelError(item.Fieldname, item.MessageText);
                }
            }

            return ModelState.IsValid;
        }
        #endregion
    }
}