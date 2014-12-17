var inherits = function(a, b) {
  function C(){}
  C.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new C();
  a.prototype.constructor = a;
};

var setParams = function(base, opts, deep)
{
  for(var i in base)
  {
    if(base.hasOwnProperty(i) && opts.hasOwnProperty(i))
    {
      if(deep && typeof(base[i]) == 'object' && typeof(opts[i]) == 'object')
      {
        base[i] = setParams(base[i], opts[i], deep);
      }
      else
      {
        base[i] = opts[i];
      }
    }
  }
  return base;
};

var copyInto = function(obj, params)
{
  for(var i in params)
  {
    if(params.hasOwnProperty(i))
    {
      if(typeof(obj[i]) == 'object' && typeof(params[i]) == 'object')
      {
        obj[i] = copyInto(obj[i], params[i]);
      }
      else
      {
        obj[i] = params[i];
      }
    }
  }
  return obj;
};

var cloneUniforms = function(uniforms, exclude)
{
  var ret = {};
  for(var i in uniforms)
  {
    if(uniforms.hasOwnProperty(i) && (!exclude || !(i in exclude)))
    {
      var u = uniforms[i];
      if(typeof(u.value) == 'object' && 'clone' in u.value)
      {
        ret[i] = { type: u.type, value: u.value.clone() };
      }
      else
      {
        ret[i] = { type: u.type, value: u.value };
      }
    }
  }
  return ret;
};

var copyUniforms = function(uniforms, exclude)
{
  var ret = {};
  for(var i in uniforms)
  {
    if(uniforms.hasOwnProperty(i) && (!exclude || !(i in exclude)))
    {
      ret[i] = uniforms[i];
    }
  }
  return ret;
};

var asyncForeach = function(arr, callback, complete, delay)
{
  delay = delay || 0;
  var i = 0, n = arr.length;
  var next = function()
  {
    if(i >= n)
    {
      complete();
      return;
    }
    callback(arr[i], i);
    i++;
    setTimeout(next, delay);
  };
  setTimeout(next, 0);
};

imv.Utilities = imv.Utilities || {};
imv.Utilities.cloneUniforms = cloneUniforms;
imv.Utilities.copyUniforms = copyUniforms;
imv.Utilities.asyncForeach = asyncForeach;
imv.Utilities.setParams = setParams;
imv.Utilities.inherits = inherits;