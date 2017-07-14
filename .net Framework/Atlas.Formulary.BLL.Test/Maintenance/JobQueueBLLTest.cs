
using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Atlas.Formulary.BLL.DrugCategory;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using System.Linq;
using Atlas.Formulary.DAL.Models;
using System.Collections.Generic;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Formulary.DAL.ViewModels;
using Atlas.Formulary.BLL.DrugSearch;
using Atlas.Formulary.BLL.DrugCriteria;
using Atlas.Formulary.BLL.Maintenance;

namespace Atlas.Formulary.BLL.Test.JobQueueBLLTest
{
    [TestClass]
    public class JobQueueBLLTest
    {
       
        private Mock<IFormularyRepositoryFactory> _repoFactoryMock;
        private Mock<IJobQueueRepository> _JobQueueRepoMock;

        [TestInitialize]
        public void SetupTest()
        {
            _repoFactoryMock = new Mock<IFormularyRepositoryFactory>();
            _JobQueueRepoMock = new Mock<IJobQueueRepository>();
          
        }

        [TestMethod]
        public void ShouldGetJobQueueByUserIdReponse()
        {
            // ARRANGE
            String userId = "jsmith";
            var queryResult = new QueryResult<JobQueueVM>();

            var listJobQueue = new List<spJob_GetAll_Result>()
            {
                new spJob_GetAll_Result
                {
                    JobSK=5,
                    JobTypeSK=1,
                    JobTypeCode="FrmlryImport",
                    JobDesc="FormularyImport",
                    JobStartTs=new DateTime(2016 ,11,28),
                    JobEndTs=null,
                    StatDesc="Complete",
                    Actn="615",
                    
                }
            };

            _repoFactoryMock
               .Setup(a => a.JobQueue())
               .Returns(_JobQueueRepoMock.Object);

            _JobQueueRepoMock
                .Setup(a => a.GetAllJobsForUserAndRange(userId,null,null))  
                .Returns(listJobQueue);
               
            

            JobQueueBLL bll = new JobQueueBLL(_repoFactoryMock.Object) { };
           

            // ACT
            var result = bll.GetJobQueuesByUserId(userId,null,null);
            
            // ASSERT        
            Assert.AreEqual(result.Rows.FirstOrDefault().JobSK, listJobQueue.FirstOrDefault().JobSK);
            Assert.AreEqual(result.Rows.FirstOrDefault().JobTypeSK, listJobQueue.FirstOrDefault().JobTypeSK);
            Assert.AreEqual(result.Rows.FirstOrDefault().JobTypeCode, listJobQueue.FirstOrDefault().JobTypeCode);
            Assert.AreEqual(result.Rows.FirstOrDefault().JobDesc, listJobQueue.FirstOrDefault().JobDesc);
            Assert.AreEqual(result.Rows.FirstOrDefault().JobStartTs, listJobQueue.FirstOrDefault().JobStartTs);
            Assert.AreEqual(result.Rows.FirstOrDefault().JobEndTs, listJobQueue.FirstOrDefault().JobEndTs);
            Assert.AreEqual(result.Rows.FirstOrDefault().StatDesc, listJobQueue.FirstOrDefault().StatDesc);
            Assert.AreEqual(result.Rows.FirstOrDefault().Actn, listJobQueue.FirstOrDefault().Actn);
            Assert.AreEqual(result.Count, 1);
            Assert.AreNotEqual(result.Count, 2);

        }

        [TestMethod]
        public void ShouldHaveCorrectCustomNDCResponseException()
        {
            // Arrange


            bool handledException = false;
            string ndc = "11111111111";
            try
            {
                // Act
                //TODO test exception handling
                //var result = bll.Object.GetFormulariesForNDC(ndc);
            }
            catch (Exception ex)
            {
                // Assert
                Assert.IsInstanceOfType(ex, typeof(ArgumentNullException));
                handledException = true;
            }

            Assert.AreEqual(true, handledException);
        }
    }
}
