
using DocumentationHelper.Classes;
using DocumentationHelper.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace DocumentationHelper.Repositories
{
    public class DocRepository : BaseRepository, IDocRepository
    {

        public void InsertControllerInfo(Controller controller)
        {
            
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("spDocController_Put", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@ControllerName", controller.ControllerName));

                    conn.Open();

                    controller.ControllerId = Convert.ToInt32(cmd.ExecuteScalar());
                }
            }
        }

        public void InsertContollerMethods(ControllerMethod controllerMethod)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            using (SqlCommand cmd = new SqlCommand("spDocControllerMethod_Put", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@ControllerMethodName", controllerMethod.MethodName));
                cmd.Parameters.Add(new SqlParameter("@HttpAttributeType", controllerMethod.HttpAttributeType));
                cmd.Parameters.Add(new SqlParameter("@ControllerId", controllerMethod.ControllerId));

                conn.Open();

                cmd.ExecuteScalar();
            }
            
        }

        public void InsertRepositoryInfo(Repository repository)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("spDocRepository_Put", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@RepositoryName", repository.RepositoryName));

                    conn.Open();

                    repository.RepositoryId = Convert.ToInt32(cmd.ExecuteScalar());
                }
            }
        }

        public void InsertRepositoryMethods(RepositoryMethod repositoryMethod)
        {
            if (!repositoryMethod.MethodName.Contains("System.IDisposable"))
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("spDocRepositoryMethod_Put", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@RepositoryMethodName", repositoryMethod.MethodName));
                        cmd.Parameters.Add(new SqlParameter("@RepositoryId", repositoryMethod.RepositoryId));

                        conn.Open();

                        cmd.ExecuteScalar();
                    }
                }
            }
        }

        private bool IsSPNameValid(StoredProcData sp)
        {
            if (sp.StoredProcName[0] != 's' && sp.StoredProcName[1] != 'p')
            {
                return false;
            }
            else
            {
                return true;
            }
        } 



        public void GetStoredProcDates(ref StoredProcData sp, string line)
        {
            if (line.Contains("[StoredProcedure(\""))
            {
                string[] substring1 = Regex.Split(line, "\"");
                sp.StoredProcName = substring1[1];
            }
            else
            {
                string[] substring1 = Regex.Split(line, "_db.");
                string[] substring2 = substring1[1].Split('(');
                sp.StoredProcName = substring2[0];
            }
            
            if (!IsSPNameValid(sp)) { return ; }

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("spDocSPData_Get", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@SPName", sp.StoredProcName));
                    conn.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        sp.LastAlteredDate = Convert.ToDateTime(rdr["LAST_ALTERED"]);
                        sp.CreatedDate = Convert.ToDateTime(rdr["CREATED"]);
                    }
                }

                if (!sp.CreatedDate.HasValue)
                {
                    sp.StoredProcName = "INVALID";
                }
            }
        }

        public void InsertFilePath(ref StoredProcData sp)
        {
            if (!IsSPNameValid(sp)) { return ; }

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("spDocFileData_Put", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@FilePath", sp.FilePath));
                    cmd.Parameters.AddWithValue("@ReturnValue", SqlDbType.Int).Direction = ParameterDirection.ReturnValue;
                    conn.Open();

                    sp.SourceFileId = Convert.ToInt32(cmd.ExecuteScalar());
                }
            }
        }

        public void InsertSPInfo(ref StoredProcData sp)
        {
            if (!IsSPNameValid(sp)) { return; }

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("spDocSPList_Put", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@SPName", sp.StoredProcName));
                    cmd.Parameters.Add(new SqlParameter("@SPLastAltered", sp.LastAlteredDate));
                    cmd.Parameters.Add(new SqlParameter("@SPCreated", sp.CreatedDate));
                    cmd.Parameters.AddWithValue("@ReturnValue", SqlDbType.Int).Direction = ParameterDirection.ReturnValue;
                    conn.Open();

                    sp.SPListId = Convert.ToInt32(cmd.ExecuteScalar());
                }
            }
        }

        public void InsertSourceFileSPList( ref StoredProcData sp)
        {
            if (!IsSPNameValid(sp)) { return; }

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("spDocSourceFileSPList_Put", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@SourceFileId", sp.SourceFileId));
                    cmd.Parameters.Add(new SqlParameter("@SPListId", sp.SPListId));
                    cmd.Parameters.AddWithValue("@ReturnValue", SqlDbType.Int).Direction = ParameterDirection.ReturnValue;
                    conn.Open();

                    cmd.ExecuteScalar();
                }
            }
        }
    }
}
