using System;
using System.IO;
using System.Text.RegularExpressions;
using System.Data.SqlClient;
using System.Data;
using System.Reflection;
using AtlasWebApi;
using AtlasWebApi.Controllers.V1.Dashboard;
using System.Linq;
using System.Xml;
using System.Collections.Generic;
using Atlas.Formulary.DAL.Repositories;
using Atlas.Formulary.DAL;
using DocumentationHelper.Classes;

namespace DocumentationHelper
{
    class Program
    {
        static void Main(string[] args)
        {
            string projectDirectory = Directory.GetParent(Directory.GetParent(Path.GetDirectoryName(Directory.GetCurrentDirectory())).ToString()).ToString();
            LoadLocalAssemblies(projectDirectory);
            var StoredProcs = new StoredProcDataHandler();
            StoredProcs.GetAllStoredProcedures(projectDirectory);
                
            var assemblies = GetAllAssemblies();
            
            var Controllers = new ControllersList(assemblies);
            Controllers.GetController();
            var Repositories = new RepositoriesList(assemblies);
            //Console.WriteLine("Application completed successfully.");
            //Console.ReadLine();
        }

          


        private static List<Assembly> GetAllAssemblies()
        {
            Assembly[] baseAssemblies = AppDomain.CurrentDomain.GetAssemblies();
            List<Assembly> assemblies = new List<Assembly>();
            foreach (var a in baseAssemblies)
            {
                if (a.FullName.Contains("AtlasWebApi") || a.FullName.Contains("Formulary") || a.FullName.Contains("Reference"))
                {
                    assemblies.Add(a);
                }
            }
            return assemblies;
        }

        private static void LoadLocalAssemblies(string projectDirectory)
        {
            Assembly.Load(AssemblyName.GetAssemblyName(projectDirectory + @"\src\Atlas.Formulary.DAL\bin\Debug\Atlas.Formulary.DAL.dll"));
            Assembly.Load(AssemblyName.GetAssemblyName(projectDirectory + @"\src\Atlas.Reference.DAL\bin\Debug\Atlas.Reference.DAL.dll"));
            Assembly.Load(AssemblyName.GetAssemblyName(projectDirectory + @"\FormularyWebApi\bin\AtlasWebApi.dll"));
        }
        
    }
}
