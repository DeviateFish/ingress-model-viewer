/**
 * A vertex attribute
 */
class VertexAttribute {
  /**
   * A vertex attribute
   * @param  {String} name Name of the attribute
   * @param  {Number} size Size of the attribute (in bytes)
   */
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }
}

export default VertexAttribute;
