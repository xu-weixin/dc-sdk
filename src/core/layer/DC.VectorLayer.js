/*
 * @Author: Caven
 * @Date: 2020-01-02 16:42:03
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-14 19:04:51
 */

import Cesium from '@/namespace'
import Layer from './Layer'

/**
 * The vector layer is used to add various enitity, which is essentially a CustomDataSource
 * that is used to place entities of the same class or business attribute into the same layer
 */
DC.VectorLayer = class extends Layer {
  constructor(id) {
    super(id)
    this._delegate = new Cesium.CustomDataSource(id)
    this._state = DC.LayerState.INITIALIZED
    this.type = DC.LayerType.VECTOR
  }

  clear() {
    this._delegate.entities && this._delegate.entities.removeAll()
    this._cache = {}
    this._state = DC.LayerState.CLEARED
    return this
  }
}

DC.LayerType.VECTOR = 'vector'
