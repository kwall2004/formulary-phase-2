using DocumentationHelper.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocumentationHelper.Repositories
{
    public class BaseRepository : IBaseRepository
    {
        public string connectionString;

        public BaseRepository()
        {
            ConnectionStringSettings conSettings = ConfigurationManager.ConnectionStrings["con"];
            connectionString = conSettings.ConnectionString;
        }

        

      
    }
}
