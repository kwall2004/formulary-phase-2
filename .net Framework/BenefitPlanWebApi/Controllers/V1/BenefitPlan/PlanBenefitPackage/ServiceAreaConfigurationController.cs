using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Enums;
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

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.PlanBenefitPackage
{
    /// <summary>
    /// The Plan Benefit Package Service Area Configuration Controller for Benefit Plan
    /// </summary>
    public class ServiceAreaConfigurationController : ApiController
    {

        /// <summary>
        /// the Benefit Plan Repository Factory
        /// </summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>
        /// the Plan Benefit Package business
        /// </summary>
        private IPlanBenefitPackageServiceAreaBLL _planBenefitPackageServiceAreaBLL;
        /// <summary>
        /// the Atlas Exception Message Generator
        /// </summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor for the PlanBenefitPackage Controller
        /// </summary>
        /// <param name="repoFactory"></param>
        /// <param name="planBenefitPackageBLL"></param>
        /// <param name="exceptionResponseGenerator"></param>
        public ServiceAreaConfigurationController(IBenefitPlanRepositoryFactory repoFactory, IPlanBenefitPackageServiceAreaBLL planBenefitPackageServiceAreaBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _planBenefitPackageServiceAreaBLL = planBenefitPackageServiceAreaBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get the Service Area Lookup Container
        /// </summary>
        /// <param name="lookupType">the Service Area Lookup Type</param>
        /// <param name="svcAreaSK">the Service Area SK</param>
        /// <param name="lookupTypeSK">the Lookup Type SK</param>
        /// <returns>the Service Area Lookup Container</returns>
        [HttpGet]
        public IHttpActionResult GetServiceAreaLookup(ServiceAreaAddressHierarchy lookupType, long svcAreaSK, long lookupTypeSK)
        {
            try
            {
                ServiceAreaLookup viewModel = _planBenefitPackageServiceAreaBLL.GetServiceAreaLookup(lookupType, svcAreaSK, lookupTypeSK);
                if (viewModel.LookupDetails.Count() == 0)
                {
                    switch (lookupType)
                    {
                        case ServiceAreaAddressHierarchy.StateProvince:
                            viewModel = _planBenefitPackageServiceAreaBLL.GetServiceAreaLookup(ServiceAreaAddressHierarchy.Country, svcAreaSK);
                            break;
                        case ServiceAreaAddressHierarchy.County:
                            viewModel = _planBenefitPackageServiceAreaBLL.GetServiceAreaLookup(ServiceAreaAddressHierarchy.StateProvince, svcAreaSK, viewModel.ServiceAreaBreadCrumb.ISOCntryCodeSK);
                            break;
                        case ServiceAreaAddressHierarchy.PostalCode:
                            viewModel = _planBenefitPackageServiceAreaBLL.GetServiceAreaLookup(ServiceAreaAddressHierarchy.County, svcAreaSK, viewModel.ServiceAreaBreadCrumb.StPrvncCodeSK);
                            break;
                    }
                }
                return Ok(new QueryResult<ServiceAreaLookup>() { Rows = new List<ServiceAreaLookup>() { viewModel }, Count = 1 });
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get Method to Get  Plan Benefit Package Service Area Configuration by PBP ID
        /// </summary>
        /// <param name="pbpSK">the Plan Benefit Package ID</param>
        /// <returns>the Service Area Configuration VM</returns>
        [HttpGet]
        public IHttpActionResult GetPlanBenefitPackageServiceArea(long pbpSK)
        {
            if (pbpSK != 0)
            {
                try
                {
                  
                    ServiceAreaConfigurationVM viewModel = PopulateServiceAreaConfigurationVM(pbpSK);
                    var result = new QueryResult<ServiceAreaConfigurationVM>() { Rows = new List<ServiceAreaConfigurationVM>() { viewModel }, Count = 1 };
                    return Ok(result);
                }
                catch (Exception ex)
                {
                    return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
                }
            }
            else
            {
                return BadRequest("PBPSK is required, Invalid Request.");
            }
        }

        /// <summary>
        /// Get Service Area hierarchy by SvcAreaSK
        /// </summary>
        /// <param name="svcAreaSK">the id of the package</param>
        /// <returns>a Hierarchy Tree Node with all children for the family</returns>
        [HttpGet]
        public IHttpActionResult ServiceAreaForSvcAreaSK(long svcAreaSK)
        {
            try
            {
                List<HierarchyTreeNode> serviceAreaNodes = _planBenefitPackageServiceAreaBLL.GetServiceAreaForSvcAreaSK(svcAreaSK);
                var result = new QueryResult<HierarchyTreeNode>() { Rows = serviceAreaNodes, Count = serviceAreaNodes.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Post Method to Set Service Area Configuration
        /// </summary>
        /// <param name="serviceAreaUpdate">the service Area Configuration</param>
        /// <returns>the Add Update Response - JSON with the Result</returns>
        [HttpPost]
        public IHttpActionResult AddPlanBenefitPackageServiceArea(ServiceAreaUpdateVM serviceAreaUpdate)
        {
            //  On a Put Zero out the Index Keys to allow Add of a New Population Group Plan Benefit Package
            serviceAreaUpdate.SvcAreaSK = 0;
            serviceAreaUpdate.Transactions.ForEach(s => {
                s.SvcAreaTypeSK = 0;
                s.SvcAreaSK = serviceAreaUpdate.SvcAreaSK;
            });
            return SetServiceAreaConfiguration(serviceAreaUpdate);
        }
            
        /// <summary>
        /// Put Method to Set Service Area Configuration
        /// </summary>
        /// <param name="serviceAreaUpdate">the service Area Configuration</param>
        /// <returns>the Add Update Response - JSON with the Result</returns>
        [HttpPut]
        public IHttpActionResult UpdatePlanBenefitPackageServiceArea(ServiceAreaUpdateVM serviceAreaUpdate)
        {
            serviceAreaUpdate.Transactions.ForEach(s => {
                s.SvcAreaSK = serviceAreaUpdate.SvcAreaSK;
            });
            return SetServiceAreaConfiguration(serviceAreaUpdate);
        }

        #region " Private Methods "
        /// <summary>
        /// Populate the Service Area Configuration View Model
        /// </summary>
        /// <param name="pbpSK">the Plan Benefit Package ID</param>
        /// <returns>populated Population Group Benefit Configuration View Model</returns>
        private ServiceAreaConfigurationVM PopulateServiceAreaConfigurationVM(long pbpSK)
        {
            ServiceAreaConfigurationVM viewmodel = _repoFactory.PlanBenefitPackage().FindAll(w => w.PBPSK == pbpSK)
                .Select(s => new ServiceAreaConfigurationVM() { PBPSK = s.PBPSK, PBPName = s.PBPName }).FirstOrDefault();
            viewmodel = viewmodel ?? new ServiceAreaConfigurationVM();
            viewmodel.ServiceAreas = _planBenefitPackageServiceAreaBLL.GetPlanBenefitPackageServiceAreas(pbpSK);

            return viewmodel;
        }
        /// <summary>
        /// PreValidate the View Model
        /// </summary>
        /// <param name="itemToValidate">the View Model to PreValidate</param>
        /// <returns>Validated View Model</returns>
        private void PreValidateViewModel(ServiceAreaUpdateVM itemToValidate)
        {
            ModelState.Clear();
            // Re-Validate the Model after applying the Changes
            Validate<ServiceAreaUpdateVM>(itemToValidate);

            itemToValidate.CurrentUser = UtilityFunctions.GetCurrentUser(itemToValidate.CurrentUser);
        }
        /// <summary>
        /// Method to Set Service Area Configuration
        /// </summary>
        /// <param name="serviceAreaUpdate">the service Area Configuration</param>
        /// <returns>the Add Update Response - JSON with the Result</returns>
        private IHttpActionResult SetServiceAreaConfiguration(ServiceAreaUpdateVM serviceAreaUpdate)
        {
            try
            {
                PreValidateViewModel(serviceAreaUpdate);

                if (ModelState.IsValid)
                {
                    ServiceAreaUpdateVM result = _planBenefitPackageServiceAreaBLL.SetServiceAreaConfiguration(serviceAreaUpdate);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.SvcAreaSK }));
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
        #endregion
    }
}
