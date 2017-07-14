//using System;
//using Microsoft.VisualStudio.TestTools.UnitTesting;
//using Atlas.Formulary.Models;
//using System.Linq;
//using Atlas.Formulary.SqlDataAccess;
//using Atlas.Formulary.Models.Framework.AuditLog;
//using System.Data.Entity.Validation;
//using System.Collections.Generic;
//using System.Text;

//namespace AtlasSQLDataAccessTests
//{
//    [TestClass]
//    public class AuditTests
//    {

//        AuditDataContext context = new AuditDataContext();
//        [TestMethod]
//        public void I_JUST_NEED_A_QUICK_STUB()
//        {
//            byte[] btArray= Convert.FromBase64String("PG1lc3NhZ2U+SGVsbG8hPC9tZXNzYWdlPg==");
//            string str = Encoding.ASCII.GetString(btArray);
//            Assert.IsFalse(String.IsNullOrEmpty(str));


//        }
//        [TestMethod]
//        public void SHOULD_ADD_AUDIT_RECORD()
//        {
//            int ErrorCount = 0;
//            AuditLogEntry log = new AuditLogEntry()
//            {
//                AuditLogActionType = 1,
//                AuditLogChangeData = "AuditLogChangeData",
//                AuditLogFieldName = "AuditLogFieldName",
//                AuditLogModule = "Unit Tests",
//                AuditLogOrgData = "AuditLogOrgData",
//                AuditLogTableName = "TableName",
//                AuditLogUserId = "UserID",
//                AuditLogCreateDate = DateTime.Now

//            };
//            ErrorCount = AddAuditLog(log);
//            Assert.AreEqual(0, ErrorCount);
//        }
//        [TestMethod]
//        public void SHOULD_GET_AUDIT_LOG_LIST()
//        {
//            List<AuditLogEntry> entries = context
//                                        .AuditLogEntries
//                                        .Where(p => p.AuditLogId > -1)
//                                        .ToList();
//            Assert.AreNotEqual(0, entries.Count);

//        }

//        private int AddAuditLog(AuditLogEntry log)
//        {
//            int ErrorCount = 0;

//            context.AuditLogEntries.Add(log);
//            try
//            {

//                context.SaveChanges();
//            }
//            catch (Exception ex)
//            {
//                List<DbEntityValidationResult> result = (List<DbEntityValidationResult>)context.GetValidationErrors();
//                if (result.Count > 0)
//                {
//                    foreach (DbEntityValidationResult r in result)
//                    {
//                        foreach (DbValidationError e in r.ValidationErrors)
//                        {
//                            Console.WriteLine(e.PropertyName + " " + e.ErrorMessage);
//                            ErrorCount++;
//                        }

//                    }

//                }
//            }

//            return ErrorCount;
//        }

//        [TestMethod]
//        public void SHOULD_UPDATE_AUDIT_RECORD()
//        {


//        }
//        [TestCleanup]
//        public void CLEANUP()
//        {
     

//        }
//    }
//}
