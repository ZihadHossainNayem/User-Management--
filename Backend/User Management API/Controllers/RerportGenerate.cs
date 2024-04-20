using DevExpress.XtraReports.UI;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace User_Management_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportGenerate : ControllerBase
    {
        [HttpGet("user-report")]
        public IActionResult GenerateUserReport()
        {
            // instance of your XtraReport1 class

            XtraReport1 report = new XtraReport1();

            // customize the report as needed (e.g., bind data, set parameters) here


            // export the report to a MemoryStream...........
            MemoryStream stream = new MemoryStream();
            report.ExportToPdf(stream);

            // reset the position of the stream to ensure it can be read from the beginning...........
            stream.Position = 0;

            // return the PDF file here...........
            return File(stream, "application/pdf", "UserReport.pdf");
        }
    }
}
