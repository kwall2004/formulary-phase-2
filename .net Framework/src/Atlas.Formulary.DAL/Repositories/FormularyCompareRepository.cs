using Atlas.Formulary.DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Atlas.Formulary.DAL.Models;
using System.Linq.Expressions;
using Atlas.Configuration;
using Atlas.Core.DAL.Exceptions;
using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.ViewModels;
using System.Data.Entity;


namespace Atlas.Formulary.DAL.Repositories
{
    class FormularyCompareRepository : EFRepositoryBase<Frmlry, FormularyEntities>, IFormularyCompareRepository
    {
        public FormularyCompareRepository(IConfig config, FormularyEntities db) : base(config, db) { }
        
        public List<spCvrgPrptyType_GetAll_Result> GetUMCriteria()
        {
            var result = _db.spCvrgPrptyType_GetAll().ToList();
            return result;
        }
        
    }
}
