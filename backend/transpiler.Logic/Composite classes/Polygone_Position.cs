using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using transpiler.Logic.Composite_interfaces;

namespace transpiler.Logic.Composite_classes {
    internal class Polygone_Position : IKeyword {
        public IString? Name { get; set; }
        public List<IPosition>? Positions { get; set; }

    }
}