using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.ViewModels;
using System.Collections.Generic;

namespace Atlas.Formulary.DAL.Repositories.Interfaces
{
    public interface IFormularyTierRepository : IRepository<FrmlryTier>
    {
        void PutFormularyTierNames(TierNamesVM tiers);
        List<spFormulary_GetTierNames_Result> GetFormularyTierNames(long formularySK);
    }
}
