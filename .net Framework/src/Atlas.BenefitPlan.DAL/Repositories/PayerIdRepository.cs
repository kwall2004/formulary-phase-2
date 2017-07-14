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
	/// the PayerId Repository for Benefit Plan
	/// </summary>
	public class PayerIdRepository : EFRepositoryBase<PayerID, BenefitPlanEntities>, IPayerIdRepository
	{
		/// <summary>
		/// the Constructor for PayerId Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public PayerIdRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the PayerID to Add or Update</param>
        public override void AddOrUpdate(PayerID itemToUpdate)
        {
            _db.PayerID.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.PayerIDSK == 0 ? EntityState.Added : EntityState.Modified;
        }

    }
}

