using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Product
    {
        public Guid ProductId { get; set; }
        public string Title { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Price { get; set; }

        public string Category { get; set; }

        public string MainImage { get; set; }
        public List<Image> Images { get; set; }
    }
}
