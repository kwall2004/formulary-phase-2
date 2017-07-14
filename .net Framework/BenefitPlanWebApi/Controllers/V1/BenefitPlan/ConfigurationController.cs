using Atlas.BenefitPlan.DAL;
using Atlas.Configuration;
using Atlas.Core.WebApi.Services;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan
{
    /// <summary>
    /// The Configuration Controller for Benefit Plan
    /// </summary>
    public class ConfigurationController : ApiController
    {
        /// <summary>the Configuration for Benefit Plan</summary>
        private IConfig _config;

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Frequency Qualifier Type Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public ConfigurationController(IConfig config, IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _config = config;
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }
    }
}
