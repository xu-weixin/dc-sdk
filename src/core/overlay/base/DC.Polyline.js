/*
 * @Author: Caven
 * @Date: 2020-01-06 15:03:25
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-24 14:54:24
 */

import Overlay from '../Overlay'
import Cesium from '@/namespace'

DC.Polyline = class extends Overlay {
  constructor(positions) {
    if (!DC.Util.checkPositions(positions)) {
      throw new Error('DC.Polyline: the positions invalid')
    }
    super()
    this._positions = DC.P.parsePositions(positions)
    this._delegate = new Cesium.Entity()
    this._state = DC.OverlayState.INITIALIZED
    this.type = DC.OverlayType.POLYLINE
  }

  set positions(positions) {
    if (!DC.Util.checkPositions(positions)) {
      throw new Error('DC.Polyline: the positions invalid')
    }
    this._positions = DC.P.parsePositions(positions)
  }

  get positions() {
    return this._positions
  }

  get center() {
    return DC.Math.center(this._positions)
  }

  get distance() {
    return DC.Math.distance(this._positions)
  }

  _mountedHook() {
    /**
     *  initialize the Overlay parameter
     */
    this._delegate.polyline = {
      ...this._style,
      positions: new Cesium.CallbackProperty(time => {
        return DC.T.transformWGS84ArrayToCartesianArray(this._positions)
      })
    }
  }

  /**
   *
   * @param {*} style
   */
  setStyle(style) {
    if (Object.keys(style).length == 0) {
      return this
    }
    this._style = style
    this._delegate.polyline &&
      DC.Util.merge(this._delegate.polyline, this._style)
    return this
  }

  /**
   *
   * @param {*} entity
   */
  static fromEntity(entity) {
    let polyline = undefined
    if (entity.polyline) {
      let positions = DC.T.transformCartesianArrayToWGS84Array(
        entity.polyline.positions.getValue(Cesium.JulianDate.now())
      )
      polyline = new DC.Polyline(positions)
      polyline.attr = {
        ...entity.properties.getValue(Cesium.JulianDate.now())
      }
    }
    return polyline
  }
}

DC.OverlayType.POLYLINE = 'polyline'
