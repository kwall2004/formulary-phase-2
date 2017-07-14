using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Atlas.Core.DAL.Models.Containers;
using System.Collections.Generic;
using Atlas.Formulary.BLL.Services.DrugSearch;

namespace Atlas.Formulary.BLL.Test.Services.DrugSearch
{
    [TestClass]
    public class DrugSearchColumnExclusionBitmaskGeneratorTest
    {
        [TestMethod] 
        [ExpectedException(typeof(ArgumentException))]
        public void ShoulHaveCorrectValueWhenPassedInCollectionOfColumns()
        {
            // Given 
            var q1 = new Criteria() { Property = "LN", Operator = "exclude" };
            var q2 = new Criteria() { Property = "BN", Operator = "exclude" };
            var q3 = new Criteria() { Property = "GTC", Operator = "exclude" };
            var queries = new List<Criteria>() { q1, q2, q3 };

            IDrugSearchColumnExclusionBitmaskGenerator bmGenerator = new DrugSearchColumnExclusionBitmaskGenerator();

            // When
            long result = bmGenerator.GenerateBitmask(queries);

            // Then

            Assert.AreEqual(4294704383, result);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void ShouldRemoveAllExcludesFromQueries ()
        {
            // Given 
            var q1 = new Criteria() { Property = "LN", Operator = "exclude" };
            var q2 = new Criteria() { Property = "BN", Operator = "like" };
            var q3 = new Criteria() { Property = "GTC", Operator = "exclude" };
            var queries = new List<Criteria>() { q1, q2, q3 };

            IDrugSearchColumnExclusionBitmaskGenerator bmGenerator = new DrugSearchColumnExclusionBitmaskGenerator();

            // When
            bmGenerator.GenerateBitmask(queries);

            // Then
            Assert.AreEqual(1, queries.Count);
            Assert.AreEqual("BN", queries[0].Property);
        }


        [TestMethod]
        public void ShouldReturnFromQueries()
        {
            // Given 
            var q1 = new Criteria() { Property = "MSGenericIndicator", Operator = "exclude", Value="1" };
            var q2 = new Criteria() { Property = "IsObsolete", Operator = "like", Value="2" };
            var q3 = new Criteria() { Property = "ObsoleteDate", Operator = "exclude", Value="3" };
            var q4 = new Criteria() { Property = "IsCovered", Operator = "exclude",Value="4" };
            var q5= new Criteria() { Property = "GCN_SEQNO", Operator = "exclude",Value="5" };
            var q6 = new Criteria() { Property = "MedId", Operator = "exclude", Value = "6" };
            var q7 = new Criteria() { Property = "RxCUI", Operator = "exclude", Value = "7" };
            var q8 = new Criteria() { Property = "NDDF_RxCUI", Operator = "exclude", Value = "8" };
            var q9 = new Criteria() { Property = "LabelName", Operator = "exclude", Value = "9" };
            var q10 = new Criteria() { Property = "BrandName", Operator = "exclude", Value = "10" };
            var q11 = new Criteria() { Property = "OTC", Operator = "exclude", Value = "11" };
            var q12 = new Criteria() { Property = "DrugType", Operator = "exclude", Value = "12" };
            var q13 = new Criteria() { Property = "ETC_ID", Operator = "exclude", Value = "13" };
            var q14 = new Criteria() { Property = "ETC_NAME", Operator = "exclude", Value = "14" };
            var q15 = new Criteria() { Property = "GCDF_DESC", Operator = "exclude", Value = "15" };
            var q16 = new Criteria() { Property = "GCRT_DESC", Operator = "exclude", Value = "16" };
            var q17 = new Criteria() { Property = "HICL_SEQNO", Operator = "exclude", Value = "17" };
            var q18 = new Criteria() { Property = "GenericName", Operator = "exclude", Value = "18" };
            var q19 = new Criteria() { Property = "GTC", Operator = "exclude", Value = "19" };
            var q20 = new Criteria() { Property = "GTC_DESC", Operator = "exclude", Value = "20" };
            var q21 = new Criteria() { Property = "IsSpecialtyDrug", Operator = "exclude", Value = "21" };
            var q22 = new Criteria() { Property = "TierCode", Operator = "exclude", Value = "22" };
            var q23 = new Criteria() { Property = "PartDExcludedDrug", Operator = "exclude", Value = "23" };
            var q24 = new Criteria() { Property = "MedicaidCarveOutDrug", Operator = "exclude", Value = "24" };
            var q25 = new Criteria() { Property = "IsMaintDrug", Operator = "exclude", Value = "25" };
            var q26 = new Criteria() { Property = "MedicaidFeeScreen", Operator = "exclude", Value = "26" };
            var q27 = new Criteria() { Property = "GPI", Operator = "exclude", Value = "27" };
            var q28 = new Criteria() { Property = "DrugStrength", Operator = "exclude", Value = "28" };
            var q29 = new Criteria() { Property = "DosageForm", Operator = "exclude", Value = "29" };
            var q30 = new Criteria() { Property = "PackageSize", Operator = "exclude", Value = "30" };
            var q31 = new Criteria() { Property = "AHFSCategoryClass", Operator = "exclude", Value = "31" };
            var q32 = new Criteria() { Property = "USPCategoryClass", Operator = "exclude", Value = "32" };
            var q33 = new Criteria() { Property = "DrugLists", Operator = "exclude", Value = "33" };
           
            var queries = new List<Criteria>() { q1, q2, q3,q4,q5,q6,q7,q8,q9,q10,q11,q12,q13,q14,q15,q16,q17,q18,q19,q20,q21,q22,q23,q24,q25,q26,q27,q28,q29,q30,q31,q32,q33 };

            IDrugSearchColumnExclusionBitmaskGenerator bmGenerator = new DrugSearchColumnExclusionBitmaskGenerator();

            // When
            bmGenerator.GenerateBitmask(queries);
            var x = queries[0].Property;
            // Then
            Assert.AreEqual(33, queries.Count);
            Assert.AreEqual(int.Parse("2"), Math.Pow(2,int.Parse(queries[0].Value))); //1<<0
            Assert.AreEqual(int.Parse("4"), Math.Pow(2,int.Parse(queries[1].Value))); //1<<1 
            Assert.AreEqual(int.Parse("8"), Math.Pow(2,int.Parse(queries[2].Value))); //1<<2
            Assert.AreEqual(int.Parse("16"), Math.Pow(2, int.Parse(queries[3].Value))); //1<<3
            Assert.AreEqual(int.Parse("32"), Math.Pow(2,int.Parse(queries[4].Value))); //1<<4     
            Assert.AreEqual(int.Parse("64"), Math.Pow(2,int.Parse(queries[5].Value))); //1<<5
            Assert.AreEqual(int.Parse("128"), Math.Pow(2,int.Parse(queries[6].Value))); //1<<6
            Assert.AreEqual(int.Parse("256"), Math.Pow(2,int.Parse(queries[7].Value))); //1<<7
            Assert.AreEqual(int.Parse("512"), Math.Pow(2,int.Parse(queries[8].Value))); //1<<8
            Assert.AreEqual(int.Parse("1024"), Math.Pow(2,int.Parse(queries[9].Value))); //1<<9
            Assert.AreEqual(int.Parse("2048"), Math.Pow(2,int.Parse(queries[10].Value))); //1<<10
            Assert.AreEqual(int.Parse("4096"), Math.Pow(2, int.Parse(queries[11].Value))); //1<<11
            Assert.AreEqual(int.Parse("8192"), Math.Pow(2, int.Parse(queries[12].Value))); //1<<12
            Assert.AreEqual(int.Parse("16384"), Math.Pow(2, int.Parse(queries[13].Value))); //1<<13
            Assert.AreEqual(int.Parse("32768"), Math.Pow(2, int.Parse(queries[14].Value))); //1<<14
            Assert.AreEqual(int.Parse("65536"), Math.Pow(2, int.Parse(queries[15].Value))); //1<<15
            Assert.AreEqual(int.Parse("131072"), Math.Pow(2, int.Parse(queries[16].Value))); //1<<16
            Assert.AreEqual(int.Parse("262144"), Math.Pow(2, int.Parse(queries[17].Value))); //1<<17
            Assert.AreEqual(int.Parse("524288"), Math.Pow(2, int.Parse(queries[18].Value))); //1<<18
            Assert.AreEqual(int.Parse("1048576"), Math.Pow(2, int.Parse(queries[19].Value))); //1<<19
            Assert.AreEqual(int.Parse("2097152"), Math.Pow(2, int.Parse(queries[20].Value))); //1<<20
            Assert.AreEqual(int.Parse("4194304"), Math.Pow(2, int.Parse(queries[21].Value))); //1<<21
            Assert.AreEqual(int.Parse("8388608"), Math.Pow(2, int.Parse(queries[22].Value))); //1<<22
            Assert.AreEqual(int.Parse("16777216"), Math.Pow(2, int.Parse(queries[23].Value))); //1<<23
            Assert.AreEqual(int.Parse("33554432"), Math.Pow(2, int.Parse(queries[24].Value))); //1<<24
            Assert.AreEqual(int.Parse("67108864"), Math.Pow(2, int.Parse(queries[25].Value))); //1<<25
            Assert.AreEqual(int.Parse("134217728"), Math.Pow(2, int.Parse(queries[26].Value))); //1<<26
            Assert.AreEqual(int.Parse("268435456"), Math.Pow(2, int.Parse(queries[27].Value))); //1<<27
            Assert.AreEqual(int.Parse("536870912"), Math.Pow(2, int.Parse(queries[28].Value))); //1<<28
            Assert.AreEqual(int.Parse("1073741824"), Math.Pow(2, int.Parse(queries[29].Value))); //1<<29
            Assert.AreEqual(Convert.ToInt64("2147483648"), Math.Pow(2, long.Parse(queries[30].Value))); //1<<30
            Assert.AreEqual(Convert.ToInt64("4294967296"), Math.Pow(2, long.Parse(queries[31].Value))); //1<<31
            Assert.AreEqual(Convert.ToInt64("8589934592"), Math.Pow(2, long.Parse(queries[32].Value))); //none
           
        }

       
    }
}
