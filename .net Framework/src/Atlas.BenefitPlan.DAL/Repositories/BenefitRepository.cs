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
    /// the Benefit Repository for Benefit Plan
    /// </summary>
    public class BenefitRepository : EFRepositoryBase<Bnft, BenefitPlanEntities>, IBenefitRepository
    {
        /// <summary>
        /// the Constructor for Benefit Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public BenefitRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>S
        /// <param name="itemToUpdate">the Bnft to Add or Update</param>
        public override void AddOrUpdate(Bnft itemToUpdate)
        {
            _db.Bnft.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.BnftSK == 0 ? EntityState.Added : EntityState.Modified;
        }

    }
}
