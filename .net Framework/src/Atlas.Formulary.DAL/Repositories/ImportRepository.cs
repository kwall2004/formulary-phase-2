using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Repositories
{
    public class ImportRepository : EFRepositoryBase<Frmlry, FormularyEntities>, IImportRepository
    {
        public ImportRepository(IConfig config, FormularyEntities db) : base(config, db) { }

        public int JobImport(ImportVM DL, long JobTypeSK)
        {
            var result = _db.spJob_PutImport(JobTypeSK, DL.FilePath, DL.FrmlrySK, DL.DrugListSK,DL.UserId);
            if (result > 0)
            {
                return result;
            }
            else
            {
                throw new Exception("Import failed.");
            }
        }
    }
}
