using DocumentationHelper.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocumentationHelper.Repositories.Interfaces
{
    interface IDocRepository : IBaseRepository
    {
        void GetStoredProcDates(ref StoredProcData sp, string line);
        void InsertControllerInfo(Controller controller);
        void InsertContollerMethods(ControllerMethod controllerMethod);
        void InsertRepositoryInfo(Repository repository);
        void InsertRepositoryMethods(RepositoryMethod repositoryMethod);
        void InsertFilePath(ref StoredProcData sp); 
        void InsertSPInfo(ref StoredProcData sp);
        void InsertSourceFileSPList(ref StoredProcData sp);

         

    }
}
