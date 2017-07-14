//// ***********************************************************************
//// Assembly         : ProxyDataAccessTests
//// Author           : b1454
//// Created          : 04-29-2016
////
//// Last Modified By : b1454
//// Last Modified On : 04-29-2016
//// ***********************************************************************
//// <copyright file="ProxyDataAccessSystemTests.cs" company="">
////     Copyright ©  2016
//// </copyright>
//// <summary></summary>
//// ***********************************************************************
//using System;
//using System.Threading.Tasks;
//using Atlas.Formulary.Models.Test;
//using Atlas.Formulary.ProxyDataAccess;
//using Microsoft.VisualStudio.TestTools.UnitTesting;

//namespace ProxyDataAccessTests
//{
//    /// <summary>
//    /// Class ProxyDataAccessSystemTests.
//    /// </summary>
//    [TestClass]
//    public class ProxyDataAccessSystemTests
//    {


//        ProxyDataAccessService serv = new ProxyDataAccessService();
//        string url = "http://services.groupkt.com/country/get/all";
//        /// <summary>
//        /// Authenticaties succeeds.
//        /// </summary>
//        [TestMethod]
//        public void SOAP_AUTHENTICATION_SUCCEEDS()
//        {
//           string session = serv.AuthenticationService.AuthenticateUser("jsmith", "pword");



//        }
//        [TestMethod]
//        public void SOAP_AUTHENTICATION_FAILS()
//        {
//            string session = serv.AuthenticationService.AuthenticateUser(Guid.NewGuid().ToString(), Guid.NewGuid().ToString());
//            Assert.IsTrue(string.IsNullOrEmpty(session));

//        }
//        [TestMethod]
//        public void RESTFUL_CALL_SUCCEEDS()
//        {
//            string str = serv
//                            .RestService
//                            .InvokeRestfulService
//                                    (
//                                            "http://services.groupkt.com/country/get/all",
//                                             Atlas
//                                             .Framework
//                                             .ProxyDataAccess
//                                             .HttpVerb
//                                             .GET
//                                    );

//            Assert.IsFalse(string.IsNullOrEmpty(str));

//        }
//        [TestMethod]
//        public async Task ASYNC_RESTFUL_CALL_SUCCEEDS()
//        {

//            string str = await serv.RestService.InvokeRestfulServiceAsync
//                                                        (
//                                                            url,
//                                                            Atlas
//                                                            .Framework
//                                                            .ProxyDataAccess
//                                                            .HttpVerb
//                                                            .GET
//                                                            );

//            Assert.IsFalse(string.IsNullOrEmpty(str));


//        }
//        [TestMethod]
//        public void SERIALIZED_RESTFUL_CALL_SUCCEEDS()
//        {
//            ProxyDataAccessService<Atlas.Formulary.Models.Test.RootObject> serv = new ProxyDataAccessService<Atlas.Formulary.Models.Test.RootObject>();
//            RootObject obj = serv.GetRestService().InvokeRestfulService
//                                                        (
//                                                            url,
//                                                            Atlas
//                                                            .Framework
//                                                            .ProxyDataAccess
//                                                            .HttpVerb
//                                                            .GET
//                                                            );

//            Assert.AreNotEqual(0, obj.RestResponse.result.Length);


//        }
//        [TestMethod]
//        public async Task SERIALIZEDASYNC_RESTFUL_CALL_SUCCEEDS()
//        {

//            ProxyDataAccessService<Atlas.Formulary.Models.Test.RootObject> serv = new ProxyDataAccessService<Atlas.Formulary.Models.Test.RootObject>();
//            RootObject obj = await serv.GetRestService().InvokeRestfulServiceAsync
//                                                        (
//                                                            url,
//                                                            Atlas
//                                                            .Framework
//                                                            .ProxyDataAccess
//                                                            .HttpVerb
//                                                            .GET
//                                                            );

//            Assert.AreNotEqual(0, obj.RestResponse.result.Length);



//        }
//    }
//}
