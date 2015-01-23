var ParametricGeometry = (function(){

  // basic template for our parametric function.
  // takes u, v;
  // gives array of proper length (options.paramSize)
  var linear = function(u, v) {
    // x, y, z
    return [u, 0, v];
  };

  var parametric = function(func, options)
  {
    Geometry.call(this, options);
    func = func || linear;
    options = options || {};
    var params = {
      slices: 1,
      paramSize: 3
    };
    this.options = setParams(params, options);
    var t = func(0, 0);
    if(!t.length || t.length != this.options.paramSize)
    {
      throw 'Parametric function returned invalid results, must be array of length ' + this.options.paramSize;
    }
    this.attributes = {
      'a_position': { type: 'v' + this.options.paramSize, values: null },
      'a_texCoord0': { type: 'v2', values: null }
    };
    var n = this.options.slices, l = this.options.paramSize;
    // (n + 1)^2 points to define n x n squares in u,v space
    var len = (n + 1) * (n + 1);
    var position = new Float32Array(len * 3);
    var a_position = new Float32Array(len * l);
    var a_texCoord0 = new Float32Array(len * 2);
    // number of square subdivisions is n^2, 3 indices per face, 2 faces per square
    var faces = new Uint16Array(n * n * 3 * 2);
    var f = 0;
    for(var i = 0; i <= n; i++)
    {
      for(var j = 0; j <= n; j++)
      {
        var u = i / n, v = j / n;
        var slice = func(u, v);
        var idx = i * (n + 1) + j;
        a_texCoord0[idx * 2] = u;
        a_texCoord0[idx * 2 + 1] = v;
        for(var k = 0; k < l; k++)
        {
          a_position[(idx * l) + k] = slice[k];
          if(k < 3)
          {
            position[(idx * l) + k] = slice[k];
          }
        }
        if(l < 3)
        {
          position[(idx * 3) + 2] = 0.0;
        }
        if(i < n && j < n)
        {
          faces[f++] = idx;
          faces[f++] = idx + 1;
          faces[f++] = idx + n + 1;
          faces[f++] = idx + n + 1;
          faces[f++] = idx + 1;
          faces[f++] = idx + n + 2;
        }
      }
    }
    this.geometry.addAttribute('a_position', new THREE.BufferAttribute(a_position, l));
    this.geometry.addAttribute('a_texCoord0', new THREE.BufferAttribute(a_texCoord0, 2));
    this.geometry.addAttribute('position', new THREE.BufferAttribute(position, 3));
    this.geometry.addAttribute('index', new THREE.BufferAttribute(faces, 1));
  };
  inherits(parametric, Geometry);

  return parametric;
}());

imv.Geometries = imv.Geometries || {};
imv.Geometries.Parametric = ParametricGeometry;