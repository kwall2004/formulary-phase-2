using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;

namespace DocumentationHelper.Classes
{
    public class ControllerMethod
    {

        public MethodInfo Method { get; set; }
        public string MethodName { get; set; }
        public string HttpAttributeType { get; set; }

        public int ControllerId { get; set; }

        public ControllerMethod(MethodInfo method, int controllerId)
        {
            Method = method;
            MethodName = method.Name;
            
            HttpAttributeType = GetAttribute();
            ControllerId = controllerId;
            
            //insert/update db. 
            InsertContollerMethods(this);
        }
        
        private string GetAttribute()
        {
            var attributes = Method.GetCustomAttributes(typeof(Attribute));
            List<string> attributesStrings = new List<string>();
            foreach (var attribute in attributes)
            {
                attributesStrings.Add(attribute.TypeId.ToString());
            }
            return attributesStrings[0];
        }

        private void InsertContollerMethods(ControllerMethod controllerMethod)
        {
            string connectionString = GetConnectionString();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
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
        }

        private static string GetConnectionString()
        {
            ConnectionStringSettings conSettings = ConfigurationManager.ConnectionStrings["con"];
            string connectionString = conSettings.ConnectionString;

            return connectionString;
        }
    }
}
