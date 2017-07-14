using DocumentationHelper.Repositories;
using DocumentationHelper.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace DocumentationHelper.Classes
{
    public class StoredProcDataHandler
    {
        private IDocRepository _repo;

        public StoredProcDataHandler()
        {
            _repo = new DocRepository();
        }
        public void GetAllStoredProcedures(string projectDirectory)
        {
            List<string> paths = new List<string>();
            paths.Add(projectDirectory + @"\src\Atlas.Formulary.DAL\Repositories");
            paths.Add(projectDirectory + @"\src\Atlas.Reference.DAL\Repositories");
            paths.Add(projectDirectory + @"\src\Atlas.Formulary.DAL\Models\Containers");
            foreach (var path in paths)
            {
                string[] files = Directory.GetFiles(path);
                //for each file in directory
                foreach (string file in files)
                {
                    var sp = new StoredProcData();
                    sp.FilePath = file;
                    FileStream inFile = new FileStream(file, FileMode.Open);
                    StreamReader reader = new StreamReader(inFile);

                    //read through the current file and search for sp
                    while (!reader.EndOfStream)
                    {
                        var line = reader.ReadLine();
                        //if sp is found...
                        if (line.Contains("_db.") || line.Contains("[StoredProcedure(\""))
                        {
                            //get the created and last altered dates from the sp
                            _repo.GetStoredProcDates(ref sp, line);
                            //insert the current path to db, if not exists
                            _repo.InsertFilePath(ref sp);
                            //insert the current sp to db, if not exists
                            _repo.InsertSPInfo(ref sp);
                            //insert to the middle relationship table between file and sp, if not exists
                            _repo.InsertSourceFileSPList(ref sp);
                        }
                    }
                    reader.Close();
                    inFile.Close();
                }
            }
        }
    }
}
