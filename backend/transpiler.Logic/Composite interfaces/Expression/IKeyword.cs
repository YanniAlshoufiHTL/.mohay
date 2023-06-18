using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace transpiler.Logic.Composite_interfaces {
    public interface IKeyword : IExpression {
        public IString Name { get; set; }
    }
}