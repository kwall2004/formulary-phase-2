using Atlas.Configuration;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Upload
{
    public class FileImportController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        private IFormularyConfig _config;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repository factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        /// <param name="config">Config injected by environment</param>
        public FileImportController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator, IFormularyConfig config)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
            _config = config;
        }
        
        [HttpPost]
        public IHttpActionResult FileImport(long? SK, string userId, int uploadType)
        {
            var file = HttpContext.Current.Request.Files.Count > 0 ?
                    HttpContext.Current.Request.Files[0] : null;
            try
            {
                if (file?.ContentLength > 0)
                {

                    string serverPath = "";

                    switch (uploadType)
                    {
                        case 1:
                            serverPath = _config.FormularyRulesImportPathString;
                            break;
                        case 2:
                            serverPath = _config.FormularyDetailsImportPathString;
                            break;
                        case 3:
                            serverPath = _config.DrugListDetailsImportPathString;
                            break;
                        default:
                            throw new ArgumentException("Upload type should be 1, 2 or 3!");
                    }

                    string fileExtension = Path.GetExtension(file.FileName);

                    if (fileExtension != ".xls" && fileExtension != ".xlsx")
                    {
                        throw new Exception("Wrong file extension.");
                    }

                    string fileName = Guid.NewGuid() + fileExtension;
                    var path = Path.Combine(serverPath, fileName);
                    file.SaveAs(path);

                    using (var repo = _repoFactory.Import())
                    {
                        var result = repo.JobImport(new ImportVM
                        {
                            DrugListSK = uploadType == 3 ? SK : null,
                            FrmlrySK = (uploadType == 1 || uploadType == 2) ? SK : null,
                            FilePath = path,
                            UserId = userId
                        }, uploadType);
                        return Ok( new { success = true, msg = result });
                    }
                }
                else
                {
                    throw new Exception("Empty or missing file.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

    }
}