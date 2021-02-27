using API;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using NUnit.Framework;
using Persistence;
using Respawn;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.IntegrationTests
{

    [SetUpFixture]
    public class Testing
    {
        private static IConfigurationRoot _configuration;
        private static IServiceScopeFactory _scopeFactory;
        private static Checkpoint _checkpoint;

        [OneTimeSetUp]
        public void RunBeforeAnyTests()
        {
            // Setup configuration
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", true, true)
                .AddEnvironmentVariables();

            _configuration = builder.Build();

            var startup = new Startup(_configuration);

            var services = new ServiceCollection();

            // Mok out applicaitonName and Enviroment to allow identity
            services.AddSingleton(Mock.Of<IWebHostEnvironment>(w =>
              w.ApplicationName == "API" &&
              w.EnvironmentName == "Development"));

            // Should start applicatioon as a Dev enviroment
            startup.ConfigureServices(services);

            // scope factory to create services within a seperate scope - each request in a normal API would result in it's own instance of a service...
            _scopeFactory = services.BuildServiceProvider().GetService<IServiceScopeFactory>();


            // setup respawn
            _checkpoint = new Checkpoint
            {
                TablesToIgnore = new[] { "__EFMigrationsHistory" }
            };

        }

        public static async Task ResetState()
        {
            await _checkpoint.Reset(_configuration.GetConnectionString("DefaultConnection"));
        }

        // Add entity to database
        public static async Task AddAsync<TEntity>(TEntity entity)
            where TEntity : class
        {
            using IServiceScope scope = _scopeFactory.CreateScope();

            var context = scope.ServiceProvider.GetService<DataContext>();

            context.Add(entity);

            await context.SaveChangesAsync();
        }

        // Send Mediator request
        public static async Task<TResponse> SendAsync<TResponse>(IRequest<TResponse> request)
        {
            using IServiceScope scope = _scopeFactory.CreateScope();

            var mediator = scope.ServiceProvider.GetService<IMediator>();

            return await mediator.Send(request);
        }
    }
}
