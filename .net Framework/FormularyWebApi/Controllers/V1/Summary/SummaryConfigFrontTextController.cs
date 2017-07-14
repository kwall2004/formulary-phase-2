using Atlas.Configuration;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.ViewModels.SummaryVM;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Summary
{
    public class SummaryConfigFrontTextController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        private IFormularyConfig _config;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repository factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public SummaryConfigFrontTextController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator, IFormularyConfig config)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
            _config = config;
        }

        [HttpGet]
        public IHttpActionResult GetFormularySummaryConfigFrontText(long configSectionSK)
        {
            try
            {
                using (var summaryConfig = _repoFactory.FormularySummary())
                {
                    var repoResult = summaryConfig.GetSummaryReportConfigSection(configSectionSK);
                    var stringSplit = repoResult.SctnCfgJSON.Split('.');
                    var indexOfName = stringSplit[0].LastIndexOf(@"\") + 1;
                    int firstColon = repoResult.SctnCfgJSON.IndexOf(":") + 2;
                    stringSplit[0] = stringSplit[0].Remove(firstColon, indexOfName - firstColon);
                    stringSplit[1] = "." + stringSplit[1];
                    repoResult.SctnCfgJSON = string.Join("", stringSplit);

                    var result = JsonConvert.DeserializeObject(repoResult.SctnCfgJSON);
                    var list = new List<object>();
                    list.Add(result);
                    return Ok(list);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpPost]
        public IHttpActionResult PutFormularySummaryConfigFrontText(long configSectionSK, bool isTitlePageOnly, string DefaultFrontTextPath = null)
        {
            try
            {
                using (var summaryConfig = _repoFactory.FormularySummary())
                {
                    //if we find a file, we can assume its a new upload
                    var rawData = new SummaryConfigFrontVM();
                    var serverPath = _config.FormularySummaryFrontPagePathString;
                    string path = string.Empty;

                    var file = HttpContext.Current.Request.Files.Count > 0 ? HttpContext.Current.Request.Files[0] : null;
                    if (file?.ContentLength > 0)
                    {
                        var uploadedFileName = file.FileName;
                        path = Path.Combine(serverPath, uploadedFileName);
                        file.SaveAs(path);
                    }
                    else 
                    {
                        path = Path.Combine(serverPath, DefaultFrontTextPath);  
                    }
                    rawData.DefaultFrontTextPath = path;
                    rawData.IsTitlePageOnly = isTitlePageOnly;

                    var sectionConfigJson = JsonConvert.SerializeObject(rawData);
                    var result = summaryConfig.PutSummaryReportConfigSection(configSectionSK, sectionConfigJson);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpGet]
        public IHttpActionResult GetAllFrontTextFiles()
        {
            try
            {
                var files = Directory.GetFiles(_config.FormularySummaryFrontPagePathString);
                List<string> fileNames = new List<string>();
                foreach (var file in files)
                {
                    fileNames.Add(Path.GetFileName(file));
                }
                return Ok(fileNames);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }



    }
}
