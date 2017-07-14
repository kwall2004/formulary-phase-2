using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.BenefitPlan.DAL.Repositories
{
    public class ServiceTypeRepository : EFRepositoryBase<SvcType, BenefitPlanEntities>, IServiceTypeRepository
    {
        /// <summary>
        /// the Constructor for SvcType Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public ServiceTypeRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the SvcType to Add or Update</param>
        public override void AddOrUpdate(SvcType itemToUpdate)
        {
            _db.SvcType.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.SvcTypeSK == 0 ? EntityState.Added : EntityState.Modified;
        }

    }
}
