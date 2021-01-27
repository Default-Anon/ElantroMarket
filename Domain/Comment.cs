using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class Comment
    {
        public Guid Id { get; set; }
        public string Body { get; set; }

        public string Name { get; set; }

        public Guid ProductId { get; set; }

        public Product Product { get; set; }
    }
}
