using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace transpiler.Logic.Composite_interfaces {
    public interface IString : IExpression {
        public string Name { get; set; }
    }
}