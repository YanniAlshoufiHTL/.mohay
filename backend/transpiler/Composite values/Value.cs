using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using transpiler.Logic.Composite_interfaces;

namespace transpiler.Logic.Composite_values {
    public class Value : IValue {

        public Value(string value) {
            _Value = value;
        }
        public override string ToString() {
            return _Value;
        }
        public string _Value { get; set; }
    }
}