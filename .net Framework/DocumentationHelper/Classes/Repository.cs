using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using System.Reflection;
using DocumentationHelper.Repositories.Interfaces;
using DocumentationHelper.Repositories;

namespace DocumentationHelper.Classes
{
    public class Repository
    {
        private IDocRepository _repo;
        public Type RepositoryObject { get; set; }
        public string RepositoryName { get; set; }
        public int RepositoryId { get; set; }




        public Repository(Type repository)
        {
            _repo = new DocRepository();
            RepositoryObject = repository;
            RepositoryName = repository.Name;

            //insert/update repository, get the RepositoryId and store it in this object.
            _repo.InsertRepositoryInfo(this);

            //Create list of repositories(send the RepositoryId). Instantiates a RepositoryMethodsList object.
            var Methods = GetRepositoryMethodsList(RepositoryObject);
            var MethodsList = new RepositoryMethodsList(Methods, RepositoryId);
        }

        private List<MethodInfo> GetRepositoryMethodsList(Type repository)
        {
            List<MethodInfo> methods = new List<MethodInfo>();
            MethodInfo[] tempMethods = repository.GetMethods(BindingFlags.NonPublic | BindingFlags.Public | BindingFlags.Static | BindingFlags.Instance | BindingFlags.DeclaredOnly);
            foreach (var method in tempMethods)
            {
                methods.Add(method);
            }

            return methods;
        }

        
    }
}
