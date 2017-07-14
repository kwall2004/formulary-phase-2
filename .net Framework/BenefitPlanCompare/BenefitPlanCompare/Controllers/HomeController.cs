using BenefitPlanCompare.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using System.Xml.Linq;

namespace BenefitPlanCompare.Controllers
{
    public class HomeController : Controller
    {

        private string xmlFilePath = @"J:\Surround SCM\.net Framework\BenefitPlanCompare\BenefitPlanCompare\Files\";
       
        public ActionResult Index()
        {
            XDocument fromAtlasXML = XDocument.Load(string.Format(@"{0}FromAtlas2.xml", xmlFilePath));
            XDocument fromMerlinXML = XDocument.Load(string.Format(@"{0}FromMerlin2.xml", xmlFilePath));
            AtlasBenefitPlanForMerlin fromAtlas = new AtlasBenefitPlanForMerlin().Load(fromAtlasXML.Root);
            AtlasBenefitPlanForMerlin fromMerlin = new AtlasBenefitPlanForMerlin().Load(fromMerlinXML.Root);

            List<CompareResults> results = fromAtlas.CompareEx(fromMerlin);
            ViewBag.Message = results.ToString();
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}