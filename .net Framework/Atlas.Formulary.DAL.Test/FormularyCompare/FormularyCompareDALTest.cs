using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Atlas.Configuration;
using Atlas.Formulary.DAL.Models;
using Atlas.Reference.DAL;
using Atlas.Reference.DAL.Models;
using System.Collections.Generic;
using Atlas.Core.DAL.Models.Containers;
using System.Linq;

namespace Atlas.Formulary.DAL.Test.FormularyCompare
{
    [TestClass]
    public class FormularyCompareDALTest

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
            _formularyEntities = new FormularyEntities(_config);
            _formFactory = new FormularyRepositoryFactory(_config, _formularyEntities);

            _refEntities = new ReferenceEntities(_config);
            _refFactory = new ReferenceRepositoryFactory(_refEntities);

        }

        [TestMethod]
        public void ShouldGetUMCriteria()
        {
            using (var Repo = _formFactory.FormularyCompare())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {

                    //Arrange               
                    spCvrgPrptyType_GetAll_Result result1 = new spCvrgPrptyType_GetAll_Result()
                    {
                        CvrgPrptyTypeDesc = "Override Generic Check",
                        CvrgPrptyTypeSK = 1 

                    };

                    spCvrgPrptyType_GetAll_Result result2 = new spCvrgPrptyType_GetAll_Result()
                    {
                        CvrgPrptyTypeDesc= "Maintenance Drug",
                        CvrgPrptyTypeSK= 6

                    };

                    List<spCvrgPrptyType_GetAll_Result> list = new List<spCvrgPrptyType_GetAll_Result>();

                    list.Add(result1);
                    list.Add(result2);

                    var result = new QueryResult<spCvrgPrptyType_GetAll_Result>();

                    //Act
                    var actualUMResult = Repo.GetUMCriteria().ToList();
                    result.Count = actualUMResult.Count();
                    result.Rows = actualUMResult;

                    //Assert
                   
                    Assert.AreEqual(result.Rows.FirstOrDefault().CvrgPrptyTypeDesc, list.FirstOrDefault().CvrgPrptyTypeDesc);
                    Assert.AreEqual(result.Rows.FirstOrDefault().CvrgPrptyTypeSK, list.FirstOrDefault().CvrgPrptyTypeSK);
                    
                }
            }

        }
    }
}
