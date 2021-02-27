using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.IntegrationTests
{
    using static Testing;

    public class TestingBase
    {
        [SetUp]
        public async Task Setup()
        {
            // respawn show reset database to a fresh state
            await ResetState();
        }

    }
}
