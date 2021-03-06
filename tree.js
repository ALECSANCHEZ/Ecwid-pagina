
var treeData = [
    {
      "name": "Top Level",
      "parent": "null",
      "children": [
        {
          "name": "Level 2: A",
          "parent": "Top Level",
          "children": [
            {
              "name": "Son of A",
              "parent": "Level 2: A",
              "children":[
                {
                  "name": "Level 3:A",
                  "parent": "Daughter of A"
  
                },
                {
                  "name": "son 3:A",
                  "parent": "Daughter of A"
  
                },
                {
                  "name": "son g:A",
                  "parent": "Daughter of A"
  
                }
              ]
            },
            {
              "name": "Daughter of A",
              "parent": "Level 2: A",
              "children":[
                {
                  "name": "Level 3:A",
                  "parent": "Daughter of A"
  
                },
                {
                  "name": "son 3:A",
                  "parent": "Daughter of A"
  
                },
                {
                  "name": "son g:A",
                  "parent": "Daughter of A"
  
                }
              ]
            },
            {
              "name": "Daughter of A.1",
              "parent": "Level 2: A",
              "children":[
                {
                  "name": "Level 3:A",
                  "parent": "Daughter of A.1"
  
                },
                {
                  "name": "son 3:A",
                  "parent": "Daughter of A.1"
  
                },
                {
                  "name": "son g:A",
                  "parent": "Daughter of A.1"
  
                }
              ]
            }
          ]
        },
        {
          "name": "Level 2: B",
          "parent": "Top Level",
          "children":[
                {
                  "name": "Level 3:A",
                  "parent": "Daughter of A.1"
  
                },
                {
                  "name": "son 3:A",
                  "parent": "Daughter of A.1"
  
                },
                {
                  "name": "son g:A",
                  "parent": "Daughter of A.1"
  
                }
              ]
        },
        {
          "name": "Daughter of A",
          "parent": "Level 2: A",
          "children":[
                {
                  "name": "Level 3:A",
                  "parent": "Daughter of A.1"
  
                }
              ]
        }
      ]
    }
  ];
  
  
 
  
  // ************** Generate the tree diagram	 *****************
  var dimensionScreen = screen.width /2
  var margin = {top: 40, right: 20, bottom: 40, left: 1200},
      width = screen.width - margin.right - margin.left,
      height = screen.height - margin.top - margin.bottom;
      
  var i = 0,
      duration = 750,
      root;
  
  var tree = d3.layout.tree()
      .size([height, width]);
  
  var diagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.y, d.x*1.5]; });
  
  var svg = d3.select(".tree").append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ") rotate(90)");
  
  root = treeData[0];
  root.x0 = height / 2;
  root.y0 = 0;
    
  update(root);
  
  d3.select(self.frameElement).style("height", "500px");
  
  function update(source) {
  
    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);
  
    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 180; });
  
    // Update the nodes???
    var node = svg.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });
  
    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ") rotate(270)"; })
        .on("click", click);

    nodeEnter.append("filter")
    .attr("id", "image_user")
    .attr("x", "0%")
    .attr("y", "0%")
    .attr("width", "100%")
    .attr("height", "100%")
    .append("feImage")
    .attr("xlink:href", "https://cdn.pixabay.com/photo/2014/04/02/17/07/user-307993_960_720.png")
  
  
  
    nodeEnter.append("circle")
        .attr("r", 1e-6)
      .attr("filter", "url(#image_user)")
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
  
    //Here you can edit the name of the each node
    nodeEnter.append("text")
        .attr("x", -25) 
        .attr("dy", "3em") 
        .attr("text-anchor", function(d) { return d.children || d._children ? "start" : "start"; })
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1e-6);
  
    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x*1.5 + ") rotate(270)"; });
  
    nodeUpdate.select("circle")
        .attr("r", 10)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
  
    nodeUpdate.select("text")
        .style("fill-opacity", 1);
  
    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ") rotate(270)"; })
        .remove();
  
    nodeExit.select("circle")
        .attr("r", 1e-6);
  
    nodeExit.select("text")
        .style("fill-opacity", 1e-6);
  
    // Update the links???
    var link = svg.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });
  
    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
          var o = {x: source.x0, y: source.y0};
          return diagonal({source: o, target: o});
        });
  
    // Transition links to their new position.
    link.transition()
        .duration(duration)
        .attr("d", diagonal);
  
    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = {x: source.x, y: source.y};
          return diagonal({source: o, target: o});
        })
        .remove();
  
    // Stash the old positions for transition.
    nodes.forEach(function(d) {
      d.x0 = d.x*1.5;
      d.y0 = d.y;
    });
  }
  
  // Toggle children on click.
  function click(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update(d);
  }