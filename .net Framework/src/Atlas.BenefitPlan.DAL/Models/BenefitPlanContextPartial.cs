using Atlas.Configuration;
using Microsoft.Practices.Unity;
using System.Data.Entity;

namespace Atlas.BenefitPlan.DAL.Models
{
    /// <summary>
    /// Class BenefitPlanEntities.
    /// </summary>
    /// <seealso cref="System.Data.Entity.DbContext" />
    public partial class BenefitPlanEntities : DbContext
    {
        /// <summary>
        /// The configuration
        /// </summary>
        private IConfig _config;

        /// <summary>
        /// Initializes a new instance of the <see cref="BenefitPlanEntities"/> class.
        /// </summary>
        /// <param name="config">The configuration.</param>
        [InjectionConstructor]
        public BenefitPlanEntities(IConfig config) : base(config.DefaultConnectionString)
        {
            _config = config;

            this.Configuration.LazyLoadingEnabled = false;
        }
    }
}