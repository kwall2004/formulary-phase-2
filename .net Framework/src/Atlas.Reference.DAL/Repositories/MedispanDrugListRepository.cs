using Atlas.Core.DAL.Repositories;
using Atlas.Reference.DAL.ViewModels;
using Atlas.Reference.DAL.Models;
using Atlas.Reference.DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Reference.DAL.Repositories
{
    public class MedispanDrugListRepository : EFRepositoryBase<MedispanDrugList, ReferenceEntities>, IMedispanDrugListRepository
    {

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="db">DB context</param>
        public MedispanDrugListRepository(ReferenceEntities db) : base(db)
        {

        }

        public override void AddOrUpdate(MedispanDrugList itemToUpdate)
        {
            _db.MedispanDrugList.Attach(itemToUpdate);
            var foundNdc = _db.MedispanDrugList.FirstOrDefault(a => a.NDC == itemToUpdate.NDC);
            
            if(foundNdc == null)
            {
                _db.Entry(itemToUpdate).State =  EntityState.Added;
            }
            else
            {
                _db.Entry(itemToUpdate).State = EntityState.Modified;
            }          
        }

    }
}
