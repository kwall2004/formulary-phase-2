using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;
using System.Data.Entity;

namespace Atlas.BenefitPlan.DAL.Repositories
{
    /// <summary>
    /// the EarlyRefillExcption Repository for Benefit Plan
    /// </summary>
    public class EarlyRefillExcptionRepository : EFRepositoryBase<EarlyRefillExcp, BenefitPlanEntities>, IEarlyRefillExcptionRepository
    {
        /// <summary>
        /// the Constructor for EarlyRefillExcption Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public EarlyRefillExcptionRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the Coverage Phase to Add or Update</param>
        public override void AddOrUpdate(EarlyRefillExcp itemToUpdate)
        {
            _db.EarlyRefillExcp.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.EarlyRefillExcpSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}