using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DocumentationHelper.Classes
{

    public class RepositoryMethodsList
    {
        public List<MethodInfo> Methods { get; set; }
        public int RepositoryId { get; set; }

        public RepositoryMethodsList(List<MethodInfo> methods, int repositoryId)
        {
            Methods = methods;
            RepositoryId = repositoryId;

            //Loop methods. For each method, instantiate a RepositoryMethod object.
            foreach (var method in this.Methods)
            {
                var RepositoryMethod = new RepositoryMethod(method, this.RepositoryId);
            }
        }
    }
}
