<template>
  <div class="content">
    <div class="main-content">
      <div class="heading">Shapes</div>
      <div class="part">
        <p class="small-heading">Rectangles</p>
        <hr class="text-break" />

        <p class="text">To create rectangles, you use the "rect" keyword.</p>
        <p class="text">
          After 'rect' you need to add the starting
          <a href="./point.html" class="text-link">point</a> and the width & height of the
          rectangle.
        </p>

        <div class="code-example-box">
          <p class="code-example-heading">Example</p>
          <div class="code-example">
            <p class="code">.r = rect (0, 0) 10 20</p>
          </div>
        </div>
      </div>

      <div class="part">
        <p class="small-heading">Circle</p>
        <hr class="text-break" />

        <p class="text">
          To create circles you use the "circle" keyword.What time is it now in part of the art
          of it I want to see on swami figure out intuitively what time what's happening
        </p>
        <p class="text">
          After rect you need to add a <a href="./point.html" class="text-link">point</a> and a
          radius.
        </p>

        <div class="code-example-box">
          <p class="code-example-heading">Example</p>
          <div class="code-example">
            <p class="code">.c = circle (100, 100) 20</p>
          </div>
        </div>
      </div>

      <div class="part">
        <p class="small-heading">Arc</p>
        <hr class="text-break" />

        <p class="text">In .mohay you can draw parts of a circle.</p>
        <p class="text">This can be done by using the "arc" keyword.</p>
        <p class="text">
          It is followed by a starting point, radius, starting angle and end angle.
        </p>

        <div class="code-example-box">
          <p class="code-example-heading">Example</p>
          <div class="code-example">
            <p class="code">.a = arc (3, 3) 10 20° 30°</p>
          </div>
        </div>
      </div>

      <div class="part">
        <p class="small-heading">Triangle</p>
        <hr class="text-break" />

        <p class="text">Triangles are created by using the "triangle" keyword.</p>
        <p class="text">
          After triangle you need to add three
          <a href="./point.html" class="text-link">points</a>.
        </p>
        <p class="text">Those will be the corners of your triangle</p>

        <div class="code-example-box">
          <p class="code-example-heading">Example</p>
          <div class="code-example">
            <p class="code">.t = triangle (3, 3) (9, 5) (100, 53)</p>
          </div>
        </div>
      </div>

      <div class="part">
        <p class="small-heading">Polygon</p>
        <hr class="text-break" />

        <p class="text">Polygons are created by using the "polygon" keyword.</p>
        <p class="text">There are 2 ways of creating polygons.</p>

        <div>
          <ul>
            <li class="text">
              Either you enter a middle<a href="./point.html" class="text-link">point</a>,
              number of corners, radius between middlepoint and corners and the rotation.
            </li>
            <li class="text">
              Or you just enter as many <a href="./point.html" class="text-link">points</a> as
              you like.
            </li>
          </ul>
        </div>

        <div class="code-example-box">
          <p class="code-example-heading">Example</p>
          <div class="code-example">
            <p class="code">.polygon1 = polygon (1, 1) 6 10 20°</p>
            <p class="code">
              .polygon2 = polygon (1, 1) (4, 10) (8, 16) (10, 100) (49, 28) (47, 19)
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocumentationShapes',
};
</script>

<style lang="scss"></style>
