using Atlas.Configuration;
using Atlas.Core.DAL.Exceptions;
using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Atlas.Formulary.DAL.Repositories
{
    /// <summary>
    /// Formulary Repository DAL
    /// </summary>
    public class FormularyRepository : EFRepositoryBase<Frmlry, FormularyEntities>, IFormularyRepository
    {
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="db">DB context</param>
        public FormularyRepository(IConfig config, FormularyEntities db) : base(config, db) {}

        /// <summary>
        /// Add or update Frmlry record
        /// </summary>
        /// <param name="itemToUpdate">Record</param>
        public override void AddOrUpdate(Frmlry itemToUpdate)
        {
            _db.Frmlry.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.FrmlrySK == 0 ? EntityState.Added : EntityState.Modified;   
        }

       
        /// <summary>
        /// Call Formulary GetAccess Stored Procedure
        /// </summary>
        /// <param name="FormularyId">Formulary Id</param>
        /// <returns></returns>
        public IQueryable<spFormulary_GetAccess_Result> GetAccess(long FormularySK)
        {
            return _db.spFormulary_GetAccess(FormularySK).AsQueryable();
        }

        /// <summary>
        /// Call Formulary GetDrugLists stored procedure
        /// </summary>
        /// <param name="FormularyId">Formulary Id</param>
        /// <returns></returns>
        public IQueryable<spFormulary_GetDrugLists_Result> GetDrugLists(long FormularySK)
        {
            return _db.spFormulary_GetDrugLists(FormularySK).AsQueryable();
        }

        public IQueryable<spFormulary_PutDrugLists_Result> PutDrugLists(long FormularySK, string DrugListNames, string UserId)
        {
            return _db.spFormulary_PutDrugLists(FormularySK, DrugListNames, UserId).AsQueryable();
        }

        /// <summary>
        /// Call Formulary GetHeader stored procedure
        /// </summary>
        /// <param name="FormularyId"></param>
        /// <returns></returns>
        public spFormulary_GetHeader_Result GetHeader(long FormularySK)
        {
            return _db.spFormulary_GetHeader(FormularySK).ToList().FirstOrDefault();
        }

        /// <summary>
        /// Call Formulary GetTierNames stored procedure
        /// </summary>
        /// <param name="FormularyId">Formulary Id</param>
        /// <returns></returns>
        public IQueryable<spFormulary_GetTierNames_Result> GetTierNames(long FormularySK)
        {
            return _db.spFormulary_GetTierNames(FormularySK).AsQueryable();
        }

        /// <summary>
        /// Call Formulary Header Put stored procedure
        /// </summary>
        /// <param name="frmlrySK"></param>
        /// <param name="lOBSK"></param>
        /// <param name="drugThrputcClsTypeSK"></param>
        /// <param name="drugRefDbSK"></param>
        /// <param name="drugPostObsltAlwdDays"></param>
        /// <param name="frmlryName"></param>
        /// <param name="efctvStartDt"></param>
        /// <param name="efctvEndDt"></param>
        /// <param name="planType"></param>
        /// <param name="drugTypeFn"></param>
        /// <param name="userId"></param>
        /// <param name="drugListName_List"></param>
        /// <param name="tierName_List"></param>
        /// <param name="ownerUserGrpSk"></param>
        /// <param name="accessUserGrpSk_List"></param>
        /// <param name="inctvTs"></param>
        /// <param name="delTs"></param>
        /// <returns></returns>
        public long PutFormularyHeader(Nullable<long> frmlrySK,
                                  Nullable<long> lOBSK,
                                  Nullable<long> drugThrputcClsTypeSK,
                                  Nullable<long> drugRefDbSK,
                                  Nullable<int> drugPostObsltAlwdDays,
                                  string frmlryName,
                                  DateTime efctvStartDt,
                                  DateTime efctvEndDt,
                                  string planType,
                                  string drugTypeFn,
                                  bool? isExcludeOTC,
                                  string userId,
                                  string drugListName_List,
                                  string tierName_List,
                                  Nullable<long> ownerUserGrpSk,
                                  string accessUserGrpSk_List,
                                  Nullable<System.DateTimeOffset> inctvTs,
                                  Nullable<System.DateTimeOffset> delTs,
                                  bool autoAddNewNDCs, 
                                  long? summaryReportConfigSK)
        {
            var result = (_db.spFormulary_PutHeader(frmlrySK, lOBSK, drugThrputcClsTypeSK, drugRefDbSK, drugPostObsltAlwdDays, frmlryName, autoAddNewNDCs,
                efctvStartDt, efctvEndDt, planType, drugTypeFn, isExcludeOTC, userId, inctvTs, delTs, summaryReportConfigSK)).FirstOrDefault();


            if (result.ErrorNumber != 0)
            {
                throw new Exception(result.ErrorMessage);
            }

            return result.ErrorSeverity.HasValue ? result.ErrorSeverity.Value: frmlrySK.Value;
        }

        /// <summary>
        /// Mark record as deleted
        /// </summary>
        /// <param name="toDelete">Formulary to delete</param>
        public override void Delete(Frmlry toDelete)
        {
            toDelete.DelTs = DateTime.Now;
            _db.Frmlry.Attach(toDelete);
            _db.Entry(toDelete).Property(x => x.DelTs).IsModified = true;
            _db.SaveChanges();
        }

        public List<spFormulary_GetAll_Result> GetAll()
        {
            var queryResult = _db.spFormulary_GetAll();
            var results = queryResult.ToList();
            return results;
        }

        public List<spFormulary_FullTextSearch_Result> FormularyFullSearch(string searchString)
        {
            var queryResult = _db.spFormulary_FullTextSearch(searchString);
            var results = queryResult.ToList();
            return results;
        }

        public void DeleteFormulary(long formularySK)
        {
            _db.spFormulary_Delete(formularySK, DateTimeOffset.Now);
        }

        public int FormularyValidation(long formularySK)
        {
            var result = _db.spFormularyValidation(formularySK).ToArray().FirstOrDefault();

            if (result == null)
            {
                throw new Exception("Failed to retrieve untiered count from the database!");
            }

            return result.Value;// .UntieredCount.Value;
        }

        /// <summary>
        /// Copy or Update version number of Formulary Header
        /// </summary>
        /// <param name="formularySk_From"></param>
        /// <param name="isNewVersion"></param>
        /// <param name="userId">new version(true) or copy(false)</param>
        public long CopyOrUpdateVersion(int formularySK_From, bool isNewVersion, string userId)
        {
            var result = _db.spFormularyCopy_Put(formularySK_From, userId, isNewVersion).First();

            if (result.ErrorNumber != 0)
            {
                throw new Exception(result.ErrorMessage.ToString());
            }

            return result.ErrorSeverity.Value;
        }

        public void DashboardFormularyApprove(int formularySk, int ApprvlTypePrty, string AprvlNotes, string userId)
        {
            var result = _db.spFrmlryApprove_Put(formularySk, ApprvlTypePrty, AprvlNotes, userId).ToList().FirstOrDefault();
            if (result.ErrorNumber != 0)
            {
                throw new StoredProcedureException(result.ErrorMessage.ToString());
            }

        }

        public void DashboardFormularyReject(DashboardVM parms)
        {
            var result = _db.spFrmlryReject_Put(parms.FrmlrySK, parms.AprvlTypePrity, parms.AprvlNotes, parms.UserId ).ToList();
            if (result.FirstOrDefault().ErrorNumber != 0)
            {
                throw new StoredProcedureException(result.FirstOrDefault().ErrorMessage);
            }
            return;
        }

        public List<FrmlryNotes> GetFormularyNotes(long formularySK)
        {
            var result = _db.FrmlryNotes.Where(r => r.FrmlrySK == formularySK).ToList();
            return result;
        }

        public void ConvertRulesToMedId(long formularySK, string userId)
        {
            var result = _db.spFormularyRules_ConvertToMedId(formularySK, userId);
            //TODO: this errored out for the result.FirstOrDefault()
        }

        public void CombineFormularyRules(long formularySK, string userId)
        {
            var result = _db.spRuleCombination(formularySK, userId);
                 
        }

        public List<spFormulariesForNDC_Get_Result> GetFormulariesByNDC(string NDC)
        {
            var result = _db.spFormulariesForNDC_Get(NDC).ToList();
            return result;
        }

        public long PutFormularyNotes(FormularyNotesVM data, string userId)
        {
            var notes = _db.FrmlryNotes.SingleOrDefault(r => r.FrmlryNoteSK == (data.FrmlryNoteSK.HasValue ? data.FrmlryNoteSK.Value : 0));
            if(notes == null)
            {
                notes = new FrmlryNotes();
                notes.CreatedBy = userId;
                notes.CreatedTs = DateTime.Now;
            }
            notes.AprvlTypeSK = data.AprvlTypeSK.HasValue ? data.AprvlTypeSK.Value : 1;
            notes.FrmlrySK = data.FrmlrySK;
            notes.Notes = data.Notes;
            notes.Subject = data.Subject;
            notes.LastModfdBy = userId;
            notes.LastModfdTs = DateTime.Now;

            if(notes.FrmlryNoteSK == 0)
            {
                _db.FrmlryNotes.Add(notes);
            }

            var changedRows = _db.SaveChanges();
            if (changedRows < 1)
            {
                throw new Exception("failed to create this note.");
            }

            return notes.FrmlryNoteSK;
        }

        public void DeleteFormularyNotes(long formularyNoteSK)
        {
            FrmlryNotes noteToDelete = _db.FrmlryNotes.Find(formularyNoteSK);
            _db.FrmlryNotes.Remove(noteToDelete);
            var result = _db.SaveChanges();
            if(result < 1)
            {
                throw new Exception("Failed to delete note.");
            }
        }

        public List<StatType> GetStatTypes()
        {
            var result = _db.StatType.Where(a => a.DelTs == null && a.InctvTs == null).ToList();
            return result;
        }
    }
}
