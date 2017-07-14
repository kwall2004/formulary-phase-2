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
	/// the FormularyTier Repository for Benefit Plan
	/// </summary>
	public class FormularyTierRepository : EFRepositoryBase<FrmlryTier, BenefitPlanEntities>, IFormularyTierRepository
	{
		/// <summary>
		/// the Constructor for FormularyTier Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public FormularyTierRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the Plan Benefit Package to Add or Update</param>
        public override void AddOrUpdate(FrmlryTier itemToUpdate)
        {
            _db.FrmlryTier.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.FrmlryTierSK== 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

