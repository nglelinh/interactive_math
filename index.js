// Entry point for interactive numerical methods experiments

// Loss function
function loss(X) {
  var x = X[0], y = X[1];
  return Math.sin(y) * x + Math.sin(x) * y + x * x + y * y;
}

// D3 visualization setup
const width = 500, height = 500;
const margin = {top: 20, right: 20, bottom: 40, left: 40};
const xDomain = [-5, 5], yDomain = [-5, 5];
const svg = d3.select('#d3vis')
  .append('svg')
  .attr('width', width)
  .attr('height', height);
const xScale = d3.scaleLinear().domain(xDomain).range([margin.left, width - margin.right]);
const yScale = d3.scaleLinear().domain(yDomain).range([height - margin.bottom, margin.top]);

// Draw axes
svg.append('g')
  .attr('transform', `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(xScale));
svg.append('g')
  .attr('transform', `translate(${margin.left},0)`)
  .call(d3.axisLeft(yScale));

// Draw contour plot of the loss function
function drawContours() {
  const n = 80;
  const xVals = d3.range(n).map(i => xDomain[0] + (xDomain[1] - xDomain[0]) * i / (n-1));
  const yVals = d3.range(n).map(i => yDomain[0] + (yDomain[1] - yDomain[0]) * i / (n-1));
  const values = [];
  for (let j = 0; j < n; ++j) {
    for (let i = 0; i < n; ++i) {
      values.push(loss([xVals[i], yVals[j]]));
    }
  }
  const contours = d3.contours()
    .size([n, n])
    .thresholds(d3.range(5, 50, 5))
    (values);
  svg.selectAll('path.contour').remove();
  svg.selectAll('path.contour')
    .data(contours)
    .enter().append('path')
    .attr('class', 'contour')
    .attr('d', d3.geoPath(d3.geoIdentity().scale(width / n)))
    .attr('fill', 'none')
    .attr('stroke', '#bbb')
    .attr('stroke-width', 1);
}
drawContours();

// Draw the Nelder-Mead simplex steps
function drawSimplexPath(path) {
  svg.selectAll('circle.simplex').remove();
  svg.selectAll('line.simplex').remove();
  for (let i = 0; i < path.length; ++i) {
    const simplex = path[i];
    // Draw simplex edges
    for (let j = 0; j < simplex.length; ++j) {
      const a = simplex[j], b = simplex[(j+1)%simplex.length];
      svg.append('line')
        .attr('class', 'simplex')
        .attr('x1', xScale(a[0]))
        .attr('y1', yScale(a[1]))
        .attr('x2', xScale(b[0]))
        .attr('y2', yScale(b[1]))
        .attr('stroke', d3.interpolateTurbo(i/path.length))
        .attr('stroke-width', 2)
        .attr('opacity', 0.7);
    }
    // Draw simplex vertices
    svg.selectAll('circle.simplex' + i)
      .data(simplex)
      .enter().append('circle')
      .attr('class', 'simplex')
      .attr('cx', d => xScale(d[0]))
      .attr('cy', d => yScale(d[1]))
      .attr('r', 4)
      .attr('fill', d3.interpolateTurbo(i/path.length));
  }
}

// Modified Nelder-Mead to record simplex path
function nelderMeadWithPath(f, x0) {
  const path = [];
  const options = {
    maxIterations: 100,
    callback: function(simplex) {
      // Deep copy simplex
      path.push(simplex.map(v => v.slice()));
    }
  };
  const result = fmin.nelderMead(f, x0, options);
  return {result, path};
}

window.runNelderMeadDemo = function(startX, startY) {
  var {result, path} = nelderMeadWithPath(loss, [startX, startY]);
  document.getElementById('output').textContent =
    'Solution is at x = ' + result.x[0].toFixed(4) + ', y = ' + result.x[1].toFixed(4) +
    ' (loss = ' + loss(result.x).toFixed(4) + ')';
  drawContours();
  drawSimplexPath(path);
};

// Initial draw (optional, can be triggered from HTML)
// window.runNelderMeadDemo(-3.5, 3.5);
