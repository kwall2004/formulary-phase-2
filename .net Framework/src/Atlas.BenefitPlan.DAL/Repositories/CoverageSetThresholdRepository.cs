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
    /// the Coverage Set Threshold Repository for Benefit Plan
    /// </summary>
    public class CoverageSetThresholdRepository : EFRepositoryBase<CvrgSetThreshold, BenefitPlanEntities>, ICoverageSetThresholdRepository
    {
        /// <summary>
        /// the Constructor for Coverage Set Threshold Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public CoverageSetThresholdRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }
        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate"></param>
        public override void AddOrUpdate(CvrgSetThreshold itemToUpdate)
        {
            _db.CvrgSetThreshold.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.CvrgSetThresholdSK == 0 ? EntityState.Added : EntityState.Modified;
        }

    }
}
