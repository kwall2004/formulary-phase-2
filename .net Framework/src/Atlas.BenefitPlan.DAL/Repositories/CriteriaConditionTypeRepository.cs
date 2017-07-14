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
    /// the Constructor for CrtriaCondType Repository
    /// </summary>
    /// <param name="db">the Benefit Plan Entity Framework</param>
    public class CriteriaConditionTypeRepository : EFRepositoryBase<CrtriaCondType, BenefitPlanEntities>, ICriteriaConditionTypeRepository
    {
        public CriteriaConditionTypeRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the CrtriaCondType to Add or Update</param>
        public override void AddOrUpdate(CrtriaCondType itemToUpdate)
        {
            _db.CrtriaCondType.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.CrtriaCondTypeSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}
