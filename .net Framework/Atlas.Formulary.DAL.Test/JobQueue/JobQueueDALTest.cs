using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using Atlas.Formulary.DAL.Repositories;
using Atlas.Configuration;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.ViewModels;

using Atlas.Reference.DAL.ViewModels;
using Atlas.Reference.DAL;
using Atlas.Reference.DAL.Models;


using Atlas.Core.DAL.Models.Containers;
//using AtlasWebApi.Controllers.V1.Upload;

namespace Atlas.Formulary.DAL.Test.JobQueue
{
    [TestClass]
    public class JobQueueDALTest
    {

        private IConfig _config;
        private FormularyEntities _formularyEntities;
        private IFormularyRepositoryFactory _formFactory;

        private IReferenceRepositoryFactory _refFactory;
        private ReferenceEntities _refEntities;

       

        /// <summary>
        /// Sets up.
        /// </summary>
        [TestInitialize]
        public void SetUp()
        {
            _config = new FormularyDevConfig();
            _formularyEntities = new FormularyEntities();
            _formFactory = new FormularyRepositoryFactory(_config, _formularyEntities);

            _refEntities = new ReferenceEntities(_config);
            _refFactory = new ReferenceRepositoryFactory(_refEntities);

        }

        [TestMethod]
        public void ShouldGetAllJobsForUserAndRange()
        {
            using (var r = _formFactory.Formulary())
            {
                using (var Repo = _formFactory.Import())
                {
                    using (var jobRepo = _formFactory.JobQueue())
                    {

                        //Dont Need
                       

                    }
                }
            }
        }

        [TestMethod]
        public void ShouldGetAllUsersForJobQueue()
        {
            using (var Repo = _formFactory.JobQueue())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {

                    //Arrange

                    var maxJobSk = _formularyEntities.Job.Max(x => x.JobSK);
                    var maxJob = _formularyEntities.Job.Where(y => y.JobSK == maxJobSk);
                    var maxActn = maxJob.FirstOrDefault().Actn;

                    Job aJob = new Job()
                    {
                        JobTypeSK = 5,
                        Actn = maxActn + 1,
                        Rslt = null,
                        JobDesc = "New NDC Export",
                        JobStartTs = null,
                        JobEndTs = null,
                        CreatedBy = "Linus Pauling",
                        LastModfdBy = "Linus Pauling", 
                        InctvTs = null,
                        DelTs = null
                     };

                    _formularyEntities.Job.Add(aJob);
                    _formularyEntities.SaveChanges();

                               
                    //Act
                    var actualUsersForJobQueue = Repo.GetAllUsersForJobQueue().ToList();

                    //Assert
                    Assert.IsTrue(actualUsersForJobQueue.Contains(aJob.CreatedBy));

                    _formularyEntities.Job.Remove(aJob);
                    _formularyEntities.SaveChanges();

                }
            }
        }

        //TODO: this end to end testing  https://blog.csainty.com/2009/01/aspnet-mvc-unit-test-file-upload-with.html 
        [TestMethod]
        public void ShouldDeleteJobQueue()
        {
            using (var r = _formFactory.Formulary())
            {
                using (var Repo = _formFactory.Import())
                {
                    using (var jobRepo = _formFactory.JobQueue())
                    {

                        long maxFrmSK = _formularyEntities.Frmlry.Max(y => y.FrmlrySK);
                        string createdBy = "BilboBaggins";

                        var formByCreatedBy = r.FindAll(x => x.CreatedBy.Contains("Bilbo"));

                        var i = formByCreatedBy.ToList().Count();

                        if (i != 0)
                        {
                            foreach (var formularyToBeDeleted in formByCreatedBy)
                            {
                                var j = _formularyEntities.spFormulary_Delete(formularyToBeDeleted.FrmlrySK, DateTime.Now);
                            }
                        }

                        Frmlry aFormulary = makeFormulary(createdBy);

                        r.AddOrUpdate(aFormulary);
                        r.SaveChanges();

                        long jobTypeSK = 1;
                        ImportVM anImportVM = makeImportVM(maxFrmSK, createdBy);

                        var result = Repo.JobImport(anImportVM, jobTypeSK);

                        var allJobsByUser = jobRepo.GetAllJobsForUserAndRange(anImportVM.UserId, null, null).ToList();
                        var theFormularyUsed = _formularyEntities.Frmlry.Where(x => x.CreatedBy.Contains(aFormulary.CreatedBy));


                        Assert.IsTrue(allJobsByUser.Count >= 1);
                        Assert.IsNotNull(allJobsByUser.First().JobTypeCode, "FrmlyImport");
                        Assert.IsNotNull(allJobsByUser.First().JobDesc, "FormularyImport");

                        deleteJobs(jobRepo, allJobsByUser);

                        var deletedallJobsByUser = jobRepo.GetAllJobsForUserAndRange(anImportVM.UserId, null, null).ToList();
                        Assert.AreEqual(deletedallJobsByUser.Count, 0);
                    }
                }

            }
            

        }

        private static void deleteJobs(IJobQueueRepository jobRepo, List<spJob_GetAll_Result> allJobsByUser)
        {
            foreach (var x in allJobsByUser)
            {
                jobRepo.DeleteJobQueue(x.JobSK);
            }
          
            jobRepo.SaveChanges();
        }

        private static ImportVM makeImportVM(long maxFrmSK, string createdBy)
        {
            ImportVM anImportVM = new ImportVM()
            {
                FilePath = "C:\\abba\\hehaw",
                FrmlrySK = maxFrmSK + 1, //Formlry
                DrugListSK = 22222,
                UserId = createdBy
            };
            return anImportVM;
        }

        private Frmlry makeFormulary(string aName)
        {
            Frmlry aFormulary = new Frmlry()
            {
                FrmlrySK = 0,
                LOBSK = 1,
                DrugThrputcClsTypeSK = 1,
                DrugRefDbSK = 1,
                FrmlryName = "My General Integration Test Formulary2",
                FrmlryVer = 1,
                EfctvStartDt = DateTime.Now,
                EfctvEndDt = DateTime.Now,
                CreatedBy = aName,
                CreatedTs = DateTime.Today,
                LastModfdBy = aName,
                LastModfdTs = DateTime.Today,
                DelTs = DateTime.Now,
                InctvTs = DateTime.Now

            };
            return aFormulary;

        }
       
    }
}
