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
	/// the AllowedPrescribersList Repository for Benefit Plan
	/// </summary>
	public class AllowedPrescribersListRepository : EFRepositoryBase<AlwdPrescribersList, BenefitPlanEntities>, IAllowedPrescribersListRepository
	{
		/// <summary>
		/// the Constructor for AllowedPrescribersList Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public AllowedPrescribersListRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        /// Overrides Add or Update method for Allowed Prescribers List
        /// </summary>
        /// <param name="itemToUpdate"></param>
        public override void AddOrUpdate(AlwdPrescribersList itemToUpdate)
        {
            _db.AlwdPrescribersList.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.AlwdPrescribersListSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

