using Atlas.Configuration;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.BLL.CustomNDC;
using Atlas.Formulary.BLL.DrugCategory;
using Atlas.Formulary.BLL.DrugCriteria;
using Atlas.Formulary.BLL.DrugSearch;
using Atlas.Formulary.BLL.Formulary;
using Atlas.Formulary.BLL.Maintenance;
using Atlas.Formulary.BLL.Services.DrugSearch;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models;
using Atlas.Reference.DAL;
using Atlas.Reference.DAL.Models;
using AtlasWebApi.App_Start;
using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.InterceptionExtension;
using System;
using System.Web.Http;
using Unity.WebApi;

namespace AtlasWebApi
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

            GlobalConfiguration.Configuration.DependencyResolver = 
                new UnityDependencyResolver(BuildUnityContainer());
        }
        /// <summary>
        /// Builds unity container
        /// </summary>
        /// <returns></returns>
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

            container.RegisterType<FormularyEntities, FormularyEntities>();
            container.RegisterType<ReferenceEntities, ReferenceEntities>();

            RegisterBLL(container);

            RegisterDAL(container);

            RegisterEnvironmentBased(container);

            return container;
        }

        private static void RegisterEnvironmentBased(IUnityContainer container)
        {
            string env = Environment.GetEnvironmentVariable("ATLAS_ENV", EnvironmentVariableTarget.Machine);
            
            switch (env)
            {
                case "PROD":
                    container.RegisterType<IConfig, FormularyProdConfig>();
                    container.RegisterType<IFormularyConfig, FormularyProdConfig>();
                    container.RegisterType<IExceptionMessageGenerator, DevExceptionMessageGenerator>();
                    RegisterAppSettingsInstance(container, env);
                    break;
                case "UAT":
                    container.RegisterType<IConfig, FormularyUATConfig>();
                    container.RegisterType<IFormularyConfig, FormularyUATConfig>();
                    container.RegisterType<IExceptionMessageGenerator, DevExceptionMessageGenerator>();
                    RegisterAppSettingsInstance(container, env);
                    break;
                case "QA":
                    container.RegisterType<IConfig, FormularyQAConfig>();
                    container.RegisterType<IFormularyConfig, FormularyQAConfig>();
                    container.RegisterType<IExceptionMessageGenerator, DevExceptionMessageGenerator>();
                    RegisterAppSettingsInstance(container, env);
                    break;
                default: // Dev is assumed.
                    container.RegisterType<IConfig, FormularyDevConfig>();
                    container.RegisterType<IFormularyConfig, FormularyDevConfig>();
                    container.RegisterType<IExceptionMessageGenerator, DevExceptionMessageGenerator>();
                    RegisterAppSettingsInstance(container, env);
                    break;
            }
        }

        private static void RegisterDAL(IUnityContainer container)
        {
            //Formulary
            container.RegisterType<IFormularyRepositoryFactory, FormularyRepositoryFactory>();

            //Reference
            container.RegisterType<IReferenceRepositoryFactory, ReferenceRepositoryFactory>();
        }

        private static void RegisterBLL(IUnityContainer container)
        {

            container.RegisterType<IFormularyReviewBLL, FormularyReviewBLL>(); 
            container.RegisterType<IDrugSearchBLL, DrugSearchBLL>();
            container.RegisterType<IDrugCategoryBLL, DrugCategoryBLL>();
            container.RegisterType<IDrugCriteriaBLL, DrugCriteriaBLL>();
            container.RegisterType<IDrugSearchColumnExclusionBitmaskGenerator, DrugSearchColumnExclusionBitmaskGenerator>();
            container.RegisterType<ISearchWhereCriteriaGenerator, SearchWhereCriteriaGenerator>();
            container.RegisterType<IJobQueueBLL, JobQueueBLL>();
            container.RegisterType<ICustomNDCBLL, CustomNDCBLL>();

        }

        private static void RegisterAppSettingsInstance(IUnityContainer container, string environment)
        {
            string env = environment ?? "DEV";
            var resolve = container.Resolve<IReferenceRepositoryFactory>();
            var sqlFactory = new SqlConfigFactory(resolve);
            var appSettings = sqlFactory.FormularyAppSettings(env);
            container.RegisterInstance<IFormularyConfig>(appSettings);
        }
    }
}