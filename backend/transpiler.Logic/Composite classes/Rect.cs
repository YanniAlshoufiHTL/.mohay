using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using transpiler.Logic.Composite_interfaces;

namespace transpiler.Logic.Composite_classes {
    internal class Rect : IExpression {
        public Rect()
        {
            
        }
        public IKeyword? Keyword { get; set; }
        public IPosition? Position { get; set; }
        public INumeric? Size1 { get; set; }
        public INumeric? Size2 { get; set; }
    }
}