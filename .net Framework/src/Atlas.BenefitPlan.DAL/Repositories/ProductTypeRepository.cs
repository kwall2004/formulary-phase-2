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
	/// the ProductType Repository for Benefit Plan
	/// </summary>
	public class ProductTypeRepository : EFRepositoryBase<PrdctType, BenefitPlanEntities>, IProductTypeRepository
	{
		/// <summary>
		/// the Constructor for ProductType Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public ProductTypeRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}
	}
}

