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
	/// the DrugClassType Repository for Benefit Plan
	/// </summary>
	public class DrugClassTypeRepository : EFRepositoryBase<DrugClsType, BenefitPlanEntities>, IDrugClassTypeRepository
	{
		/// <summary>
		/// the Constructor for DrugClassType Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public DrugClassTypeRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}
	}
}

