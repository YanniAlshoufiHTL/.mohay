using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using transpiler.Logic.Composite_interfaces;

namespace transpiler.Logic.Composite_classes {
    internal class Rect : IKeyword {
        public IString? Name { get; set; }
        public IPosition? Pos { get; set; }
        public INumeric? NumX { get; set; }
        public INumeric? NumY { get; set; }
    }
}