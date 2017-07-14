using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models.Containers;
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
    /// The Copay Configuration Controller for Benefit Plan
    /// </summary>
    public class CopayConfigurationController : ApiController
    {
        /// <summary>Out of Network Tier Name</summary>
        private const string OutOfNetworkString = "Out of Network Tier ";

        /// <summary>Out of Network Tier Abbreviation</summary>
        private const string OutOfNetworkAbbrev = "OON";

        /// <summary>the Benefit Plan Pharmacy Type BLL</summary>
        private IBenefitPlanPharmacyTypeBLL _benefitPlanPharmacyTypeBLL;

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Copay Configuration Controller
        /// </summary>
        /// <param name="benefitPlanPharmacyTypeBLL">the Benefit Plan Pharmacy Type BLL</param>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public CopayConfigurationController(IBenefitPlanPharmacyTypeBLL benefitPlanPharmacyTypeBLL, IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _benefitPlanPharmacyTypeBLL = benefitPlanPharmacyTypeBLL;
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get Copay Configuration Benefit Plan ID
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan ID</param>
        /// <returns>the Service Area Configuration VM</returns>
        [HttpGet]
        public IHttpActionResult GetCopayConfiguration(long bnftPlanSK)
        {
            try
            {
                CopayConfigurationVM viewModel = PopulateCopayConfigurationVM(bnftPlanSK);
                var result = new QueryResult<CopayConfigurationVM>() { Rows = new List<CopayConfigurationVM>() { viewModel }, Count = 1 };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }

        }

        #region " Private Methods "
        /// <summary>
        /// Populate the Copay Configuration View Model
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan ID</param>
        /// <returns>populated Copay Configuration View Model</returns>
        private CopayConfigurationVM PopulateCopayConfigurationVM(long bnftPlanSK)
        {
            CopayConfigurationVM viewmodel = new CopayConfigurationVM();
            viewmodel.CopaySetup = _benefitPlanPharmacyTypeBLL.GetAllCopaySetup(bnftPlanSK);
            viewmodel.FormularyTier = _repoFactory.FormularyTier().FindAll(w => w.BnftPlanSK == bnftPlanSK)
                .Select(s => new DropDownList() { Value = s.FrmlryTierSK, Text = s.FrmlryTierNbr.ToString() }).ToList();

            viewmodel.CoveragePhase = _repoFactory.CoveragePhase().FindAll(w => w.BnftPlanSK == bnftPlanSK)
                .Select(s => new DropDownList() { Value = s.CvrgPhaseSK, Text = s.CvrgPhaseType.CvrgPhaseCode }).ToList();

            viewmodel.CopayCoinsuranceLogic = _repoFactory.CopayCoinsuranceLogicType().FindAll()
                .Select(s => new DropDownList() { Value = s.CopayCoinsuranceLogicTypeSK, Text = s.CopayCoinsuranceLogicTypeCode }).ToList();

            viewmodel.NetworkTier = _repoFactory.NetworkTier().FindAll(w => w.BnftPlanSK == bnftPlanSK)
                .Select(s => new DropDownList()
                {
                    Value = s.NtwrkTierSK,
                    Text = s.NtwrkTierType.NtwrkTierName == OutOfNetworkString ? OutOfNetworkAbbrev : s.NtwrkTierType.NtwrkTierNbr.ToString()
                }).ToList();

            viewmodel.PharmacyTypes = GetPharmacyTypes(bnftPlanSK);

            return viewmodel;
        }

        /// <summary>
        /// Get the Pharmacy Types with Day Supply for the Benefit Plan
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan Key</param>
        /// <returns>the List of Pharmacy Types with Day Supply for a Benefit Plan</returns>
        private List<PharmacyTypeWithDaySupply> GetPharmacyTypes(long bnftPlanSK)
        {
            List<PharmacyTypeWithDaySupply> pharmacyTypes = _repoFactory.BenefitPlanPharmacyType().FindAll(w => w.BnftPlanSK == bnftPlanSK)
                .Select(s => new PharmacyTypeWithDaySupply()
                {
                    BnftPlanPharmTypeSK = s.BnftPlanPharmTypeSK,
                    BnftPlanSK = s.BnftPlanSK,
                    PharmTypeSK = s.PharmTypeSK,
                    PharmTypeCode = s.PharmType.PharmTypeCode
                }).ToList();

            pharmacyTypes.ForEach(pharmType =>
            {
                pharmType.DaySupply.AddRange(GetDaySupply(pharmType.BnftPlanPharmTypeSK));
            });
            return pharmacyTypes;
        }

        /// <summary>
        /// Get the Day Supply Records for the Pharmacy Type
        /// </summary>
        /// <param name="bnftPlanPharmTypeSK">Benefit Plan Pharmacy Type SK</param>
        /// <returns>the List of Day Supply for the Benefit Plan Pharmacy Type</returns>
        private List<DaySupply> GetDaySupply(long bnftPlanPharmTypeSK)
        {
            return _repoFactory.BenefitPlanPharmacyTypeDaySupply().FindAll(w => w.BnftPlanPharmTypeSK == bnftPlanPharmTypeSK)
                .Select(s => new DaySupply()
                {
                    BnftPlanPharmTypeDaySuplSK = s.BnftPlanPharmTypeDaySuplSK,
                    DaySuplTypeSK = s.DaySuplTypeSK,
                    DaySuplTypeCode = s.DaySuplType.DaySuplTypeCode
                }).ToList();
        }
        #endregion
    }
}
