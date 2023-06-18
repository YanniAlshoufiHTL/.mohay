using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using transpiler.Logic.Composite_interfaces;

namespace transpiler.Logic.Composite_classes {
    public class Variable : IVariable {
        public Variable(string value) {
            //x1 = ...
            string[] values = value.Split(" ");
            Name!.Value = values[0];
            Value!.Value = values[2];

        }
        public IValue Name { get; set; }
        public IValue Value { get; set; }
    }
}