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
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Upload
{
    public class FileExportController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        private IFormularyConfig _config;

        public FileExportController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator, IFormularyConfig config)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
            _config = config;
        }

        [HttpGet]
        public HttpResponseMessage FileExport(string FilePath)
        {
            try
            {
                var fileExtension = Path.GetExtension(FilePath);
                string contentType = string.Empty;
                switch (fileExtension)
                {
                    case ".xls":
                        contentType = "application/vnd.ms-excel";
                        break;
                    case ".xlsx":
                        contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                        break;
                    case ".pdf":
                        contentType = "application/pdf";
                        break;
                    default:
                        throw new Exception("Unsupported mime-type");
                }

                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                response.Content = new StreamContent(new FileStream(FilePath, FileMode.Open, FileAccess.Read));
                response.Content.Headers.ContentType = MediaTypeHeaderValue.Parse(contentType);

                return response;
            }
            catch(Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
        }
    }
}
