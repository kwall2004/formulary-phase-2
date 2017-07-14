using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Formulary.BLL.Services.DrugSearch;
using Atlas.Formulary.DAL.Models.Enums;

namespace Atlas.Formulary.BLL.Test.Services.DrugSearch
{
    [TestClass]
    public class SearchWhereCriteriaGeneratorTest
    {
        [TestMethod]
        public void ShouldHaveCorrectResponseWhenSuppliedCriteria()
        {
            // Arrange
            var q1 = new Criteria() { Property = "NDC", Operator = "=", Value = "0001" };
            var q2 = new Criteria() { Property = "NDC", Operator = "!=", Value = "0002123" };
            var q3 = new Criteria() { Property = "IsObsolete", Operator = "IN", Value = "false" };
            var q4 = new Criteria() { Property = "NDC", Operator = "NOT IN", Value = "0012" };
            var q5 = new Criteria() { Property = "NDC", Operator = "LIKE", Value = "0012" };
            var q6 = new Criteria() { Property = "NDC", Operator = "NOT LIKE", Value = "0012" };
            var q7 = new Criteria() { Property = "IsCovered", Operator = "LIKE", Value = "0012" };
            var q8 = new Criteria() { Property = "DrugLists", Operator = "=", Value = "***" };
            var q9 = new Criteria() { Property = "DrugLists", Operator = "!=", Value = "***" };

            var queries12 = new List<Criteria>() { q1, q2 };
            var queries34 = new List<Criteria>() { q3, q4 };
            var queries56 = new List<Criteria>() { q5, q6 };
            var queries78 = new List<Criteria>() { q7, q8 };
            var queries89 = new List<Criteria>() { q8, q9 };

            DataSourceEnum ds = new DataSourceEnum() { };
           
            // Act
            ISearchWhereCriteriaGenerator generator = new SearchWhereCriteriaGenerator();
            string result12 = generator.BuildDrugSearchWhereQuery(queries12, ds);
            string result34 = generator.BuildDrugSearchWhereQuery(queries34, ds);
            string result56 = generator.BuildDrugSearchWhereQuery(queries56, ds);
            string result78 = generator.BuildDrugSearchWhereQuery(queries78, ds);
            string result89 = generator.BuildDrugSearchWhereQuery(queries89, ds);
            

            // Assert
            string wrongExpected12 = "WHERE (NDC like '%0001%' OR NDC !='0002123' ) AND (IsObsolete ='false' )";
            string correctExpected12="WHERE (FDBDrugList.NDC IN ('0001'))  AND (FDBDrugList.NDC NOT IN ('0002123')) ";
            Assert.AreNotEqual(wrongExpected12, result12);
            Assert.AreEqual(correctExpected12, result12);

            string wrongExpected34 = "WHERE (NDC like '%0001%' OR NDC !='0002123' ) AND (IsObsolete ='false' )";
            string correctExpected34 = "WHERE (FDBDrugList.IsObsolete IN ('false'))  AND (FDBDrugList.NDC NOT IN ('0012')) ";
            Assert.AreNotEqual(wrongExpected34, result34);
            Assert.AreEqual(correctExpected34, result34);

            string wrongExpected56 = "WHERE (NDC like '%0001%' OR NDC !='0002123' ) AND (IsObsolete ='false' )";
            string correctExpected56 = "WHERE (FDBDrugList.NDC LIKE '%0012%')  AND (FDBDrugList.NDC NOT LIKE '%0012%') ";
            Assert.AreNotEqual(wrongExpected56, result56);
            Assert.AreEqual(correctExpected56, result56);

            string wrongExpected78 = "WHERE (NDC like '%0001%' OR NDC !='0002123' ) AND (IsObsolete ='false' )";
            string correctExpected78 = "WHERE (FormularyCache.IsCovered LIKE '%0012%')  AND (FormularyCache.DrugLists IS NULL) ";
            Assert.AreNotEqual(wrongExpected78, result78);
            Assert.AreEqual(correctExpected78, result78);

            string wrongExpected89 = "WHERE (NDC like '%0001%' OR NDC !='0002123' ) AND (IsObsolete ='false' )";
            string correctExpected89 = "WHERE (FDBDrugList.FormularyCache.DrugLists IS NULL)  AND (FormularyCache.DrugLists IS NOT NULL) ";
            Assert.AreNotEqual(wrongExpected89, result89);
            Assert.AreEqual(correctExpected89, result89);


        }

        [TestMethod]
        public void ShouldNotHaveIncorrectResponseWhenSuppliedCriteria()
        {
            // Arrange
            var q1 = new Criteria() { Property = "NDC", Operator = "like", Value = "0001" };
            var q2 = new Criteria() { Property = "NDC", Operator = "!=", Value = "0002123" };
            var q3 = new Criteria() { Property = "IsObsolete", Operator = "=", Value = "false" };
            var queries = new List<Criteria>() { q1, q2, q3 };

            string expected = "WHERE (NDC like '%0001%' OR NDC !='0002123' ) OR (IsObsolete ='false' )";

            DataSourceEnum ds = new DataSourceEnum() { };

            // Act
            ISearchWhereCriteriaGenerator generator = new SearchWhereCriteriaGenerator();
            string result = generator.BuildDrugSearchWhereQuery(queries, ds);

            // Assert
            Assert.AreNotEqual(expected, result);
        }

    }
}
