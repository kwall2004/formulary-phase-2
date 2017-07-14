using Atlas.Configuration;
using Microsoft.Practices.Unity;
using System.Data.Entity;

namespace Atlas.Formulary.DAL.Models
{
    public partial class FormularyEntities : DbContext
    {
        [InjectionConstructor]
        public FormularyEntities(IConfig config) : base(config.DefaultConnectionString)
        {

            this.Configuration.LazyLoadingEnabled = false;
        }
    }
}
