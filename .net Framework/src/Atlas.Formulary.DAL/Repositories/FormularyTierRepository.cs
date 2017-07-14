using Atlas.Formulary.DAL.Models;
using System.Data.Entity;
using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using Atlas.Configuration;
using Atlas.Formulary.DAL.ViewModels;
using System.Collections.Generic;
using System.Linq;

namespace Atlas.Formulary.DAL.Repositories
{
    public class FormularyTierRepository : EFRepositoryBase<FrmlryTier, FormularyEntities>, IFormularyTierRepository
    {
        public FormularyTierRepository(IConfig config, FormularyEntities db) : base(config, db) { }

        public override void AddOrUpdate(FrmlryTier itemToAddOrUpdate)
        {
            _db.FrmlryTier.Attach(itemToAddOrUpdate);
            _db.Entry(itemToAddOrUpdate).State = itemToAddOrUpdate.FrmlryTierSK == 0 ? EntityState.Added : EntityState.Modified;
        }

        public void PutFormularyTierNames(TierNamesVM tiers)
        {
            var result = (_db.spFormulary_PutTierNames(tiers.FormularySK,
                                                      tiers.TierNumber_List,
                                                      tiers.TierName_List,
                                                      tiers.UserID).ToList());
            if(result.First().ErrorNumber != 0)
            {
                throw new System.Exception(result.First().ErrorMessage.ToString());
            }
            return; 
        }

        public List<spFormulary_GetTierNames_Result> GetFormularyTierNames(long formularySK)
        {
            var data = _db.spFormulary_GetTierNames(formularySK);
            var result = new List<spFormulary_GetTierNames_Result>();
            using (var sequence = data.GetEnumerator())
            {
                while(sequence.MoveNext())
                {
                    result.Add(sequence.Current);
                }
            }
            return result;
        }
    }
}
