using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;

namespace DocumentationHelper.Classes

{
    public class Controller
    {

        public Type ControllerObject { get; set; }
        public string ControllerName { get; set; }
        public int ControllerId { get; set; }

        public Controller(Type controller)
        {
            ControllerObject = controller;
            ControllerName = controller.Name;

            //insert/update controller. Get the Controller ID and store it in this object
            InsertControllerInfo(this);

            //create list of controller methods(Send the Controller Id) Instantiates a ControllerMethodsList object
            var Methods = GetControllerMethodsList(ControllerObject);
            var MethodsList = new ControllerMethodsList(Methods, ControllerId);
        }

        private List<MethodInfo> GetControllerMethodsList(Type controller)
        {
            List<MethodInfo> methods = new List<MethodInfo>();
            MethodInfo[] tempMethods = controller.GetMethods(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.Static);
            foreach (var method in tempMethods)
            {
                var att = method.GetCustomAttributes(typeof(Attribute));
                foreach (var a in att)
                {
                    if (a.GetType().GetTypeInfo().Name.Contains("Http"))
                    {
                        methods.Add(method);
                    }
                }
            }
            return methods;
        }



        private static string GetConnectionString()
        {
            ConnectionStringSettings conSettings = ConfigurationManager.ConnectionStrings["con"];
            string connectionString = conSettings.ConnectionString;

            return connectionString;
        }

        private static void InsertControllerInfo(Controller controller)
        {
            string connectionString = GetConnectionString();

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
    }
}


