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
    /// the Benefit Criteria Set Repository for Benefit Plan
    /// </summary>
    public class BenefitCriteriaSetRepository : EFRepositoryBase<BnftCrtriaSet, BenefitPlanEntities>, IBenefitCriteriaSetRepository
    {
        /// <summary>
        /// the Constructor for Benefit Criteria Set Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public BenefitCriteriaSetRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }
        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate"></param>
        public override void AddOrUpdate(BnftCrtriaSet itemToUpdate)
        {
            _db.BnftCrtriaSet.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.BnftCrtriaSetSK == 0 ? EntityState.Added : EntityState.Modified;
        }

    }
}
