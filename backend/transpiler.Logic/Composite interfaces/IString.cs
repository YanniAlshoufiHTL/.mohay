using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace transpiler.Logic.Composite_interfaces {
    internal interface IString : IExpression {
        string Name { get; set; }
    }
}