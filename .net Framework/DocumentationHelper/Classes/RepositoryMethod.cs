using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using DocumentationHelper.Repositories.Interfaces;
using DocumentationHelper.Repositories;

namespace DocumentationHelper.Classes
{
    public class RepositoryMethod
    {
        private IDocRepository _repo;
        public MethodInfo Method { get; set; }
        public string MethodName { get; set; }
        public int RepositoryId { get; set; }

        public RepositoryMethod(MethodInfo method, int repositoryId)
        {
            _repo = new DocRepository();
            Method = method;
            MethodName = method.Name;
            RepositoryId = repositoryId;

            //insert/update db
            _repo.InsertRepositoryMethods(this);

               

        }
    }
}
