using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using transpiler.Logic.Composite_interfaces;
using transpiler.Logic.Composite_values;

namespace transpiler.Logic.Composite_classes {
    public class Constant : IConstant {
        public Constant(string value) {
            //wow EEE = ...
            string[] values = StringHelper.GetConstantValues(value);
            //[EEE], [...]
            Name = new Value(values[0]);
            Value = new Value(values[1]);
        }
        public IValue Value { get; set; }
        public IValue Name { get; set; }

        public void ToJSCode(StringBuilder builder) {
            builder.AppendLine($"const {Name} = {Value};");
        }
    }
}