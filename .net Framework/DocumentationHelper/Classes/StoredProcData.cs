using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Data.SqlClient;
using DocumentationHelper.Repositories.Interfaces;

namespace DocumentationHelper.Classes
{
    public class StoredProcData
    {
        public int SPListId { get; set; }
        public int SourceFileId { get; set; }
        public string StoredProcName { get; set; }
        public string FilePath { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime LastAlteredDate { get; set; }
        



    }
}
