using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;
using System.Data.Entity;

namespace Atlas.BenefitPlan.DAL.Repositories
{
    /// <summary>
    /// the FillException Repository for Benefit Plan
    /// </summary>
    public class FillExceptionRepository : EFRepositoryBase<FillExcp, BenefitPlanEntities>, IFillExceptionRepository
    {
        /// <summary>
        /// the Constructor for FillException Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public FillExceptionRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the Coverage Phase to Add or Update</param>
        public override void AddOrUpdate(FillExcp itemToUpdate)
        {
            _db.FillExcp.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.FillExcpSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}