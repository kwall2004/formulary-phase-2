using Atlas.Reference.DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Atlas.Reference.DAL.Models;
using System.Linq.Expressions;
using Atlas.Core.DAL.Repositories;

namespace Atlas.Reference.DAL.Repositories
{
    public class SQLConfigRepository : EFRepositoryBase<AppSettings, ReferenceEntities>, ISqlConfigRepository
    {
        public SQLConfigRepository(ReferenceEntities db) : base(db)
        {
           
        }

        public string GetDeletedTimestampColumn(string environment)
        {
            return _db.AppSettings.FirstOrDefault(a => a.AppKey == "DeletedTimestampColumn" && a.Envmnt == environment && a.AppCode == "Formulary").Value;
        }

        public string GetInactiveTimestampColumn(string environment)
        {
            return _db.AppSettings.FirstOrDefault(a => a.AppKey == "InactiveTimestampColumn" && a.Envmnt == environment && a.AppCode == "Formulary").Value;
        }

        public string GetFormularyRulesImportPath(string environment)
        {
            return _db.AppSettings.FirstOrDefault(a => a.AppKey == "FormularyRulesImportPathString" && a.Envmnt == environment && a.AppCode == "Formulary").Value;
        }

        public string GetFormularyDetailsImportPath(string environment)
        {
            return _db.AppSettings.FirstOrDefault(a => a.AppKey == "FormularyDetailsImportPathString" && a.Envmnt == environment && a.AppCode == "Formulary").Value;
        }

        public string GetDrugListDetailsImportPath(string environment)
        {
            return _db.AppSettings.FirstOrDefault(a => a.AppKey == "DrugListDetailsImportPathString" && a.Envmnt == environment && a.AppCode == "Formulary").Value;
        }

        public string GetFormularySummaryFrontPagePath(string environment)
        {
            return _db.AppSettings.FirstOrDefault(a => a.AppKey == "FormularySummaryFrontTextPathString" && a.Envmnt == environment && a.AppCode == "Formulary").Value;
        }

        public string GetFormularySummaryBackPagePath(string environment)
        {
            return _db.AppSettings.FirstOrDefault(a => a.AppKey == "FormularySummaryBackTextPathString" && a.Envmnt == environment && a.AppCode == "Formulary").Value;
        }

        public string GetFormularySummaryTitlePagePath(string environment)
        {
            return _db.AppSettings.FirstOrDefault(a => a.AppKey == "FormularySummaryTitlePagePathString" && a.Envmnt == environment && a.AppCode == "Formulary").Value;
        }

        public void AddOrUpdate(AppSettings itemToAddOrUpdate)
        {

        }

        public void Delete(AppSettings toDelete)
        {

        }

        public void Dispose()
        {

        }

        public IQueryable<AppSettings> FindAll(Expression<Func<AppSettings, bool>> where = null, IQueryable<AppSettings> setToFilter = null)
        {
            throw new NotImplementedException();
        }

        public AppSettings FindOne(Expression<Func<AppSettings, bool>> where = null)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {

        }
    }
}
