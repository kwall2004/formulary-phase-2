using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using System;
using System.Data.Entity;
using System.Linq;
using System.Collections.Generic;
using Atlas.Formulary.DAL.Repositories;
using Atlas.Configuration;

namespace Atlas.Formulary.DAL.Repositories
{
    /// <summary>
    /// DrugThrputClsType Repository DAL
    /// </summary>

    public class DrugThrputcClsTypeRepository : EFRepositoryBase<DrugThrputcClsType, FormularyEntities>, IDrugThrputcClsTypeRepository
    {
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="db">DB context</param>
        public DrugThrputcClsTypeRepository(IConfig config, FormularyEntities db) : base(config, db) { }

        public List<DrugThrputcClsType> GetDrugThrputcClsType()
        {
            var queryResult = _db.DrugThrputcClsType.Where(a => a.InctvTs == null && a.DelTs == null).ToList();
            return queryResult;
        }
    }
}
