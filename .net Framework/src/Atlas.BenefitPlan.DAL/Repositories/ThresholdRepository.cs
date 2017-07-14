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
    /// the Threshold Repository for Benefit Plan
    /// </summary>
    public class ThresholdRepository : EFRepositoryBase<Threshold, BenefitPlanEntities>, IThresholdRepository
    {
        /// <summary>
        /// the Constructor for Threshold Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public ThresholdRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }
        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate"></param>
        public override void AddOrUpdate(Threshold itemToUpdate)
        {
            _db.Threshold.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.ThresholdSK == 0 ? EntityState.Added : EntityState.Modified;
        }

    }
}
