using Atlas.Configuration;
using Microsoft.Practices.Unity;

namespace Atlas.Reference.DAL.Models
{
    public partial class ReferenceEntities
    {
        private IConfig _config;

        [InjectionConstructor]
        public ReferenceEntities(IConfig config) : base(config.ReferenceConnectionString)
        {
            _config = config;
            this.Configuration.LazyLoadingEnabled = false;
        }
    }
}
