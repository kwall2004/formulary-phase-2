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
    public interface IFormularyReviewRepository : IRepository<Frmlry>
    {

        void InitiateFormularyReview(long formularySK);

        List<spFormularyReview_AHFS_Result> FormularyReview_AHFS(long formularySK);

        List<spFormularyReview_ETC_Result> FormularyReview_ETC(long formularySK);

        List<spFormularyReview_Rules_Result> FormularyReview_Rules(long formularySK);

        List<spFormularyReview_GetV2_Result> GetFormularyReview(long FrmlrySK, long? DrugCatgSK = null, long? ETC_ID = null,
            string AHFS_Id = null, string GPI = null, long? tierSK = null, string where = null);

        List<spFormularyReview_Tiers_Result> FormularyReview_Tiers(long formularySK);

        List<spFmrlry_GetAprvlPrity_Result> GetFormularyApprovalPriority(long formularySK);

        List<spFormularyReview_GPI_Result> FormularyReview_GPI(long formularySK);

    }
}
