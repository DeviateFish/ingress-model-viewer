/**
 * A vertex attribute
 */
class VertexAttribute {
  /**
   * A vertex attribute
   * @param  {String} name Name of the attribute
   * @param  {Number} size Size of the attribute (in bytes)
   */
  constructor(name, size, type) {
    this.name = name;
    this.size = size;
    this.type = type;
  }
}

export default VertexAttribute;
