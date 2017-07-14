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
    /// <summary>
    /// the Constructor for BnftSvcType Repository
    /// </summary>
    /// <param name="db">the Benefit Plan Entity Framework</param>
    public class BenefitServiceTypeRepository : EFRepositoryBase<BnftSvcType, BenefitPlanEntities>, IBenefitServiceTypeRepository
    {
        public BenefitServiceTypeRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the BnftSvcType to Add or Update</param>
        public override void AddOrUpdate(BnftSvcType itemToUpdate)
        {
            _db.BnftSvcType.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.BnftSvcTypeSK == 0 ? EntityState.Added : EntityState.Modified;
        }

    }
}
