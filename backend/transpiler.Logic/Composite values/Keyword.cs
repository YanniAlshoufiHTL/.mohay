using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using transpiler.Logic.Composite_interfaces;

namespace transpiler.Logic.Composite_values {
    public class Keyword : IKeyword {
        public Keyword(string value) {
            Name = new Value(value);
        }

        public IValue Name { get; set; }
    }
}