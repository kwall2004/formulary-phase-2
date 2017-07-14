using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.PopulationGroup
{
    /// <summary>
    /// The Population Group Benefit Configuration Controller for Benefit Plan
    /// </summary>
    public class PopulationGroupBenefitConfigurationController : ApiController
    {
        /// <summary>the Entity BLL</summary>
        private IEntityBLL _entityBLL;
        
        /// <summarythe Population Group Plan Benefit Package BLL</summary>
        private IPopulationGroupPlanBenefitPackageBLL _populationGroupPlanBenefitPackageBLL;

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;
        
        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Population Group Plan Benefit Configuration Controller
        /// </summary>
        /// <param name="entityBLL">the Entity BLL</param>
        /// <param name="planBenefitPackageBLL">the Plan Benefit Package BLL</param>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public PopulationGroupBenefitConfigurationController(IEntityBLL entityBLL, IPopulationGroupPlanBenefitPackageBLL populationGroupPlanBenefitPackageBLL, 
            IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _entityBLL = entityBLL;
            _populationGroupPlanBenefitPackageBLL = populationGroupPlanBenefitPackageBLL;
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get Population Group Benefit Configuration by Population Group PBP ID
        /// </summary>
        /// <param name="popGrpPBPSK">the Population Group PBP ID</param>
        /// <returns>the Population Group Benefit Configuration VM</returns>
        [HttpGet]
        public IHttpActionResult GetPopulationGroupPlanBenefitPackage(long popGrpPBPSK)
        {
            if (popGrpPBPSK != 0)
            {
                try
                {
                    PopulationGroupBenefitConfigurationVM viewModel = PopulatePopulationGroupBenefitConfigurationVM(_populationGroupPlanBenefitPackageBLL.GetBenefitConfiguration(popGrpPBPSK));
                    var result = new QueryResult<PopulationGroupBenefitConfigurationVM>() { Rows = new List<PopulationGroupBenefitConfigurationVM>() { viewModel }, Count = 1 };
                    return Ok(result);
                }
                catch (Exception ex)
                {
                    return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
                }
            }
            else
            {
                return BadRequest("PopGrpSK is required, Invalid Request.");
            }
        }

        /// <summary>
        /// Get Method to Get Population Group Benefit Configuration by Population Group ID and PBP ID (Creates a Skeleton)
        /// </summary>
        /// <param name="popGrpSK">the Population Group ID</param>
        /// <param name="pbpSK">the Plan BenefitPackage ID</param>
        /// <returns>the Population Group Benefit Configuration VM</returns>
        [HttpGet]
        public IHttpActionResult GetNewPopulationGroupPlanBenefitPackage(long popGrpSK, long pbpSK)
        {
            try
            {
                PopulationGroupBenefitConfigurationVM viewModel = PopulatePopulationGroupBenefitConfigurationVM(_populationGroupPlanBenefitPackageBLL.GetNewBenefitConfiguration(popGrpSK, pbpSK));
                var result = new QueryResult<PopulationGroupBenefitConfigurationVM>() { Rows = new List<PopulationGroupBenefitConfigurationVM>() { viewModel }, Count = 1 };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Post Method to Set Population GroupPlan Benefit Packages
        /// </summary>
        /// <param name="populationGroupPlanBenefitPackage">thePopulation GroupPlan Benefit Packages to Update</param>
        /// <returns>the Add Update Response - JSON with the Result</returns>
        [HttpPost]
        public IHttpActionResult AddPopulationGroupPlanBenefitPackage(PopulationGroupPlanBenefitPackageVM populationGroupPlanBenefitPackage)
        {
            //  On a Put Zero out the Index Keys to allow Add of a New Population Group Plan Benefit Package
            populationGroupPlanBenefitPackage.PopGrpPBPSK = 0;
            populationGroupPlanBenefitPackage.BenefitPlans.ForEach(s => {
                s.PopGrpBnftPlanSK = 0;
                s.PopGrpPBPSK = populationGroupPlanBenefitPackage.PopGrpPBPSK;
                s.ProviderNetworkTiers.ForEach(t => t.NtwrkNtwrkTierSK = 0);
                }
            );

            return SetPopulationGroupPlanBenefitPackage(populationGroupPlanBenefitPackage);
        }

        /// <summary>
        /// Put Method to Set Population GroupPlan Benefit Packages
        /// </summary>
        /// <param name="populationGroupPlanBenefitPackage">the Population GroupPlan Benefit Packages to Update</param>
        /// <returns>the Add Update Response - JSON with the Result</returns>
        [HttpPut]
        public IHttpActionResult UpdatePopulationGroupPlanBenefitPackage(PopulationGroupPlanBenefitPackageVM populationGroupPlanBenefitPackage)
        {
            return SetPopulationGroupPlanBenefitPackage(populationGroupPlanBenefitPackage);
        }

        #region " Private Methods "
        /// <summary>
        /// Populate the Population Group Benefit View Model
        /// </summary>
        /// <param name="populationGroupPlanBenefitPackage">the Population Group Plan Benefit Package ViewModel </param>
        /// <returns>populated Population Group Benefit Configuration View Model</returns>
        private PopulationGroupBenefitConfigurationVM PopulatePopulationGroupBenefitConfigurationVM(PopulationGroupPlanBenefitPackageVM populationGroupPlanBenefitPackage)
        {
            PopulationGroupBenefitConfigurationVM viewmodel = new PopulationGroupBenefitConfigurationVM();
            viewmodel.PopulationGroupPlanBenefitPackage = populationGroupPlanBenefitPackage;
            long benefitPlanTypePharmacy = _repoFactory.BenefitPlanType().FindAll(w => w.BnftPlanTypeCode=="Pharmacy").Select(s => s.BnftPlanTypeSK).FirstOrDefault();
            long benefitPlanTypeMedical = _repoFactory.BenefitPlanType().FindAll(w => w.BnftPlanTypeCode == "Medical").Select(s => s.BnftPlanTypeSK).FirstOrDefault();

            viewmodel.Networks = _repoFactory.NetworkBenefitPlanType().FindAll(q => q.BnftPlanTypeSK == benefitPlanTypeMedical && q.Ntwrk.DelTs == null && q.Ntwrk.InctvTs == null).Select(s => s.Ntwrk).ToList();

            viewmodel.PharmacyNetworks = _repoFactory.NetworkBenefitPlanType().FindAll(q=>q.BnftPlanTypeSK== benefitPlanTypePharmacy && q.Ntwrk.DelTs == null && q.Ntwrk.InctvTs == null).Select(s=>s.Ntwrk).ToList();

            viewmodel.MACList = _repoFactory.MACList().FindAll().ToList();
            viewmodel.NavigationBreadCrumb = _entityBLL.GetHierarchyDetailInformation(TenantFamilyHierarchy.PopulationGroup, populationGroupPlanBenefitPackage.PopGrpSK);
            viewmodel.AccountPCN = _entityBLL.GetAccountIndustryIdentifierPCN(viewmodel.NavigationBreadCrumb.AcctSK)
                                        .Select(s => new DropDownList() { Value = s.AcctPCNSK, Text = s.TenantPCN.PCN.PCN1 }).ToList();
            viewmodel.AccountRXBIN = _entityBLL.GetAccountIndustryIdentifierRXBIN(viewmodel.NavigationBreadCrumb.AcctSK)
                                        .Select(s => new DropDownList() { Value = s.AcctRXBINSK, Text = s.TenantRXBIN.RXBIN.RXBIN1 }).ToList();

            return viewmodel;
        }

        /// <summary>
        /// PreValidate the View Model
        /// </summary>
        /// <param name="itemToValidate">the View Model to PreValidate</param>
        /// <returns>Validated View Model</returns>
        private void PreValidateViewModel(PopulationGroupPlanBenefitPackageVM itemToValidate)
        {
            ModelState.Clear();

            //  Make sure the Keys down the Tree our Consistent and update all records with the current user from the Main Record.
            itemToValidate.CurrentUser = UtilityFunctions.GetCurrentUser(itemToValidate.CurrentUser);
            itemToValidate.BenefitPlans.ForEach(s =>
            {
                s.PopGrpPBPSK = itemToValidate.PopGrpPBPSK;
                s.CurrentUser = itemToValidate.CurrentUser;
                s.ProviderNetworkTiers.ForEach(t =>
                {
                    t.PopGrpBnftPlanSK = s.PopGrpBnftPlanSK;
                    t.CurrentUser = s.CurrentUser;
                });
            });

            // Re-Validate the Model after applying the Changes
            Validate<PopulationGroupPlanBenefitPackageVM>(itemToValidate);
        }

        /// <summary>
        /// Method to Set Population GroupPlan Benefit Packages
        /// </summary>
        /// <param name="populationGroupPlanBenefitPackage">the Population GroupPlan Benefit Packages to Update</param>
        /// <returns>the Add Update Response - JSON with the Result</returns>
        private IHttpActionResult SetPopulationGroupPlanBenefitPackage(PopulationGroupPlanBenefitPackageVM populationGroupPlanBenefitPackage)
        {
            try
            {
                if (ValidatePopulationGroupPlanBenefitPackage(populationGroupPlanBenefitPackage))
                {
                    PopulationGroupPlanBenefitPackageVM result = _populationGroupPlanBenefitPackageBLL.SetBenefitConfiguration(populationGroupPlanBenefitPackage);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.PopGrpPBPSK }));
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
        /// Validate the Population Group Plan Benefit Package Record - Complex Logic
        /// </summary>
        /// <param name="populationGroupPlanBenefitPackage">the Population GroupPlan Benefit Packages to Update</param>
        private bool ValidatePopulationGroupPlanBenefitPackage(PopulationGroupPlanBenefitPackageVM populationGroupPlanBenefitPackage)
        {
            PreValidateViewModel(populationGroupPlanBenefitPackage);
            // Validate Business Logic for the Entity Address
            if (ModelState.IsValid)
            {
                foreach (Message item in _populationGroupPlanBenefitPackageBLL.ValidateBenefitConfiguration(populationGroupPlanBenefitPackage))
                {
                    ModelState.AddModelError(item.Fieldname, item.MessageText);
                }
            }

            return ModelState.IsValid;
        }
        #endregion
    }
}
