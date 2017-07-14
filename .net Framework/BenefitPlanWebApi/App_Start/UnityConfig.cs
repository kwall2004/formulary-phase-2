using Atlas.BenefitPlan.BLL;
using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Configuration;
using Atlas.Core.BLL.Services;
using Atlas.Core.BLL.Wrapper;
using Atlas.Core.BLL.Wrapper.Contract;
using Atlas.Core.WebApi.Services;
using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.InterceptionExtension;
using System;
using System.Web.Http;
using Unity.WebApi;

namespace BenefitPlanWebApi
{
    /// <summary>
    /// Class UnityConfig.
    /// </summary>
    public static class UnityConfig
    {
        /// <summary>
        /// Registers the components.
        /// </summary>
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();

            GlobalConfiguration.Configuration.DependencyResolver =
                 new UnityDependencyResolver(BuildUnityContainer());
        }

        public static IUnityContainer BuildUnityContainer()
        {
            IUnityContainer container = new UnityContainer();
            container.AddNewExtension<Interception>();
            //container.RegisterType<IDoWork>(
            //                   "myInterceptor",
            //                   new Interceptor<TransparentProxyInterceptor>()
            //                   , new InterceptionBehavior<PolicyInjectionBehavior>()
            //                   ).Configure<Interception>().AddPolicy("policy")
            //                   .AddCallHandler(new AtlasPerformanceInterceptor())
            //                   .AddMatchingRule(
            //                   new CustomAttributeMatchingRule(
            //                       typeof(AtlasPerformanceInterceptorAttribute),
            //                       false));
            // register all your components with the container here
            // it is NOT necessary to register your controllers

            container.RegisterType<BenefitPlanEntities, BenefitPlanEntities>();

            RegisterBLL(container);

            RegisterDAL(container);

            RegisterEnvironmentBased(container);

            return container;
        }

        private static void RegisterEnvironmentBased(IUnityContainer container)
        {
            var env = Environment.GetEnvironmentVariable("ATLAS_ENV", EnvironmentVariableTarget.Machine);

            //Dev and QA both reference the DevExceptionMessageGenerator intentionally.  We want error information there.
            //When we setup the ProdConfig, we will want to use the ProdExceptionMessageGenerator which shows minimal error information.

            switch ((env ?? string.Empty).ToUpper())
            {
                case "PROD":
                    container.RegisterType<IConfig, BenefitPlanProdConfig>();
                    container.RegisterType<IBenefitPlanConfig, BenefitPlanProdConfig>();
                    container.RegisterType<IExceptionMessageGenerator, ProdExceptionMessageGenerator>();
                    break;
                case "UAT":
                    container.RegisterType<IConfig, BenefitPlanUATConfig>();
                    container.RegisterType<IBenefitPlanConfig, BenefitPlanUATConfig>();
                    container.RegisterType<IExceptionMessageGenerator, ProdExceptionMessageGenerator>();
                    break;
                case "QA":
                    container.RegisterType<IConfig, BenefitPlanQAConfig>();
                    container.RegisterType<IBenefitPlanConfig, BenefitPlanQAConfig>();
                    container.RegisterType<IExceptionMessageGenerator, DevExceptionMessageGenerator>();
                    break;
                default: // Dev is assumed.
                    container.RegisterType<IConfig, BenefitPlanDevConfig>();
                    container.RegisterType<IBenefitPlanConfig, BenefitPlanDevConfig>();
                    container.RegisterType<IExceptionMessageGenerator, DevExceptionMessageGenerator>();
                    break;
            }
        }

        private static void RegisterDAL(IUnityContainer container)
        {
            //Benefit Plan
            container.RegisterType<IBenefitPlanRepositoryFactory, BenefitPlanRepositoryFactory>();

        }

        private static void RegisterBLL(IUnityContainer container)
        {
            //Core
            container.RegisterType<IFile, FileWrapper>();

            //Benefit Plan
            container.RegisterType<IAdminConfigBLL, AdminConfigBLL>();
            container.RegisterType<IBenefitPlanBLL, BenefitPlanBLL>();
            container.RegisterType<IBenefitPlanPharmacyTypeBLL, BenefitPlanPharmacyTypeBLL>();
            container.RegisterType<IBenefitPlanTransitionBLL, BenefitPlanTransitionBLL>();            
            container.RegisterType<ICoverageSetBLL, CoverageSetBLL>();
            container.RegisterType<ICriteriaGroupBLL, CriteriaGroupBLL>();
            container.RegisterType<IDataCompareMCSBLL, DataCompareMCSBLL>();
            container.RegisterType<IDataCompareMerlinBLL, DataCompareMerlinBLL>();
            container.RegisterType<IDrugReferenceDatabaseBLL, DrugReferenceDatabaseBLL>();
            container.RegisterType<IEntityBLL, EntityBLL>();
            container.RegisterType<IEntityAddressBLL, EntityAddressBLL>();
            container.RegisterType<IEntityContactBLL, EntityContactBLL>();
            container.RegisterType<IIntegrationBLL, IntegrationBLL>();
            container.RegisterType<IPlanBenefitPackageBLL, PlanBenefitPackageBLL>();
            container.RegisterType<IPlanBenefitPackageServiceAreaBLL, PlanBenefitPackageServiceAreaBLL>();
            container.RegisterType<IPopulationGroupPlanBenefitPackageBLL, PopulationGroupPlanBenefitPackageBLL>();
            container.RegisterType<ISearchWhereCriteriaGenerator, SearchWhereCriteriaGenerator>();
        }
    }
}