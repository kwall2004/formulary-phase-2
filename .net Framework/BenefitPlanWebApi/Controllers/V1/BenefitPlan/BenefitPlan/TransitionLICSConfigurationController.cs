using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    /// <summary>
    /// The Transition LICS Configuration Controller for Benefit Plan
    /// </summary>
    public class TransitionLICSConfigurationController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanTransitionBLL _benefitPlanTransitionBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Transition LICS Configuration Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public TransitionLICSConfigurationController(IBenefitPlanTransitionBLL benefitPlanTransitionBLL, IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _benefitPlanTransitionBLL = benefitPlanTransitionBLL;
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get Transition LICS Configuration Benefit Plan ID
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan ID</param>
        /// <returns>the Transition LICS Configuration VM</returns>
        [HttpGet]
        public IHttpActionResult GetTransitionLICSConfiguration(long bnftPlanSK)
        {
            try
            {
                TransitionLICSConfigurationVM viewModel = PopulateTransitionLICSConfigurationVM(bnftPlanSK);
                var result = new QueryResult<TransitionLICSConfigurationVM>() { Rows = new List<TransitionLICSConfigurationVM>() { viewModel }, Count = 1 };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
                       
        }

        #region " Private Methods "
        /// <summary>
        /// Populate the Transition LICS Configuration View Model
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan ID</param>
        /// <returns>populated Transition LICS Configuration View Model</returns>
        private TransitionLICSConfigurationVM PopulateTransitionLICSConfigurationVM(long bnftPlanSK)
        {
            TransitionLICSConfigurationVM viewmodel = new TransitionLICSConfigurationVM();
            viewmodel.TransitionRules  = _benefitPlanTransitionBLL.GetTransitionRules(bnftPlanSK);
            viewmodel.LICSSetup = _benefitPlanTransitionBLL.GetLowIncomeCostSharingSubsidys(bnftPlanSK);
            viewmodel.LICSType = _repoFactory.LowIncomeCostSharingSubsidyType().FindAll()
                .Select(s => new DropDownList() { Value = s.LICSTypeSK, Text = s.LICSTypeDesc }).ToList();
            viewmodel.FormularyTier = _repoFactory.FormularyTier().FindAll(w => w.BnftPlanSK == bnftPlanSK)
                .Select(s => new DropDownList() { Value = s.FrmlryTierSK, Text = s.FrmlryTierNbr.ToString() }).ToList();
            viewmodel.CoveragePhase = _repoFactory.CoveragePhase().FindAll(w => w.BnftPlanSK == bnftPlanSK)
                .Select(s => new DropDownList() { Value = s.CvrgPhaseSK, Text = s.CvrgPhaseType.CvrgPhaseCode }).ToList();
            viewmodel.CopayCoinsuranceLogic = _repoFactory.CopayCoinsuranceLogicType().FindAll()
                .Select(s => new DropDownList() { Value = s.CopayCoinsuranceLogicTypeSK, Text = s.CopayCoinsuranceLogicTypeCode }).ToList();
            viewmodel.Months = Enum.GetNames(typeof(Month))
                .Select(s => new DropDownList() { Value = (int)Enum.Parse(typeof(Month), s), Text = s.ToString() }).ToList();
            return viewmodel;
        }
        #endregion
    }
}
