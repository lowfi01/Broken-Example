using Domain;
using NUnit.Framework;
using System.Threading.Tasks;
using System;
using FluentAssertions;

namespace Application.IntegrationTests
{
    using static Testing;

    public class GetAllActivtiesTest : TestingBase
    {
        [Test]
        public async Task ShouldReturnAllActivities()
        {
            await AddAsync<Activity>(new Activity
            {
                Title = "NUNIT Testing",
                Description = "testing",
                Venue = "Culture",
                Category = "something",
                City = "Melbourne",
                Date = DateTime.Now
            });

            var query = new Activities.List.Query();

            var result = await SendAsync(query);

            result.Should().NotBeNull();
            result.Should().HaveCount(1);
        }
    }
}