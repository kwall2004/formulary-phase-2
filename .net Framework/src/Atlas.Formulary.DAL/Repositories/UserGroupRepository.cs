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
    /// UserGroup Repository DAL
    /// </summary>
    public class UserGroupRepository : EFRepositoryBase<UserGrp, FormularyEntities>, IUserGroupRepository
    {
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="db">DB context</param>
        public UserGroupRepository(IConfig config, FormularyEntities db) : base(config, db) { }

        public List<UserGrp> GetUserGroups()
        {
            var queryResult = _db.UserGrp.ToList();
            return queryResult;
        }

        public List<UserGrpType> GetUserGroupTypes()
        {
            var queryResult = _db.UserGrpType.ToList();
            return queryResult;
        }

        public List<User> GetUsers()
        {
            var queryResult = _db.User.ToList();
            return queryResult;
        }
    }
}
