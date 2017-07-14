using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DocumentationHelper.Classes
{
    public class RepositoriesList
    {

        public List<Type> Repositories { get; set; }

        public RepositoriesList(List<Assembly> assemblies)
        {
            //Create List of Repositories
            List<Type> repositories = new List<Type>();

            foreach (Assembly assembly in assemblies)
            {
                foreach (Type type in assembly.GetTypes())
                {
                    if (type.Name.Contains("Repository") && (!type.Name[0].Equals('I')) && (!type.Name.Contains("Factory")))
                    {
                        repositories.Add(type);
                    }
                    else if (type.Name[0].Equals('I') && Char.IsLower(type.Name[1]) && type.Name.Contains("Repository") && (!type.Name.Contains("Factory")))
                    {
                        repositories.Add(type);
                    }
                }
            }

            Repositories = repositories;
        }

        //Method to loop list, for each list, instantiate a Repository object
        public void GetRepository()
        {
            foreach (var repository in this.Repositories)
            {
                var Repository = new Repository(repository);
            }
        }
    }
}
