using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace transpiler.Logic.Composite_interfaces;
internal interface IKeyword : IExpression {
    internal IString Name { get; set; }
}
    