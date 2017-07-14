using Atlas.Core.DAL.Repositories;
using Atlas.Reference.DAL.Models;
using Atlas.Reference.DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Reference.DAL.Repositories
{
    public class NDCRepository: EFRepositoryBase <NDCType, ReferenceEntities>, INDCTypeRepository
    {

        

        public NDCRepository(ReferenceEntities db) : base(db)
        {

        }

        public NDCType GetNdcType(string ndcTypeName)
        {
            var result = _db.NDCType.FirstOrDefault(a => a.NDCTypeName == ndcTypeName);
            return result;
        }



        
    }
}
