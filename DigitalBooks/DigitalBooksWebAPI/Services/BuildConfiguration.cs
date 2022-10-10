using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace DigitalBooksWebAPI.Services
{
    public class BuildConfiguration
    {
        public IConfigurationRoot Configuration { get; private set; }

        public BuildConfiguration(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            this.Configuration = builder.Build();
        }
    }
}
