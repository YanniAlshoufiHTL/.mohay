using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using transpiler.Logic.Composite_interfaces;

namespace transpiler.Logic.Composite_classes {
    public class Constant : IConstant {
        public Constant(string value) {
            //wow EEE = ...
            string[] values = StringHelper.GetConstantValues(value);
            //[EEE], [...]
            Name!.Value = values[0];
            Value!.Value = values[1];
        }
        public IValue Value { get; set; }
        public IValue Name { get; set; }
    }
}