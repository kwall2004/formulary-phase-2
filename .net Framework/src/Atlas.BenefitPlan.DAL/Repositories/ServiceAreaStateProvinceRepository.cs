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
	/// the ServiceAreaStateProvince Repository for Benefit Plan
	/// </summary>
	public class ServiceAreaStateProvinceRepository : EFRepositoryBase<SvcAreaStPrvncCode, BenefitPlanEntities>, IServiceAreaStateProvinceRepository
	{
		/// <summary>
		/// the Constructor for ServiceAreaStateProvince Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public ServiceAreaStateProvinceRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate">the SvcAreaStPrvncCode to Add or Update</param>
        public override void AddOrUpdate(SvcAreaStPrvncCode itemToUpdate)
        {
            _db.SvcAreaStPrvncCode.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.SvcAreaStPrvncCodeSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

