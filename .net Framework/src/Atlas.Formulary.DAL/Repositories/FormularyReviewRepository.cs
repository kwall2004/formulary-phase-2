using Atlas.Configuration;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Repositories
{
    public class FormularyReviewRepository : EFRepositoryBase<Frmlry, FormularyEntities>, IFormularyReviewRepository 
    {
        public FormularyReviewRepository(IConfig config, FormularyEntities db) : base(config, db) { }

        public void InitiateFormularyReview(long formularySK)
        {
            var result = _db.spFormularyReview_Init(formularySK);
            return;

        }

        public List<spFormularyReview_AHFS_Result> FormularyReview_AHFS(long formularySK)
        {
            var result = (_db.spFormularyReview_AHFS(formularySK)).ToList();
            return result;
        }

        public List<spFormularyReview_ETC_Result> FormularyReview_ETC(long formularySK)
        {
            var result = (_db.spFormularyReview_ETC(formularySK)).ToList();
            return result;
        }

        public List<spFormularyReview_Rules_Result> FormularyReview_Rules(long formularySK)
        {
            var result = (_db.spFormularyReview_Rules(formularySK)).ToList();
            return result;
        }

        public List<spFormularyReview_GetV2_Result> GetFormularyReview(long FrmlrySK, long? DrugCatgSK = null, long? ETC_ID = null,
            string AHFS_Id = null, string GPI = null, long? tierSK = null, string where = null)
        {
            var result = _db.spFormularyReview_GetV2(FrmlrySK, DrugCatgSK, ETC_ID, AHFS_Id, GPI, tierSK, where).ToList();
            return result;
        }

        public List<spFormularyReview_Tiers_Result> FormularyReview_Tiers(long formularySK)
        {
            var result = _db.spFormularyReview_Tiers(formularySK).ToList();
            return result;
        }

        public List<spFmrlry_GetAprvlPrity_Result> GetFormularyApprovalPriority(long formularySK)
        {
            var result = _db.spFmrlry_GetAprvlPrity(formularySK).ToList();
            return result;
        }

        public List<spFormularyReview_GPI_Result> FormularyReview_GPI(long formularySK)
        {
            var result = _db.spFormularyReview_GPI(formularySK).ToList();
            return result;
        }

    }
}
