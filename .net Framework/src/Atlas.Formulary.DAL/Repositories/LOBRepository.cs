using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using System;
using System.Data.Entity;
using System.Linq;
using System.Collections.Generic;
using Atlas.Configuration;

namespace Atlas.Formulary.DAL.Repositories
{
    /// <summary>
    /// LOB Repository DAL
    /// </summary>
    public class LOBRepository : EFRepositoryBase<LOB, FormularyEntities>, ILOBRepository
    {
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="db">DB context</param>
        public LOBRepository(IConfig config, FormularyEntities db) : base(config, db) { }

        public List<LOB> GetLOB()
        {
            var queryResult = _db.LOB.Where(a => a.InctvTs == null && a.DelTs == null).ToList();
            return queryResult;
        }
    }
}
